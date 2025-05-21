import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY!
// Initialize the Generative AI API with the API key
const genAI = new GoogleGenerativeAI(apiKey)

export const runtime = 'edge' // Enable Edge runtime

export async function POST(req: Request) {
    try {
        // For simplicity in Edge runtime, we'll perform a basic authentication check
        const authHeader = req.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized. Please log in and try again.' },
                { status: 401 }
            )
        }

        // We could verify the token here if needed
        // For now, we'll just continue with the API request
        // In a production environment, you should validate the token

        // Continue with the rest of your code...
        const { messages } = await req.json()

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Invalid request format' },
                { status: 400 }
            )
        } // Convert messages to Gemini format, ensuring correct role mapping
        const geminiMessages = messages.slice(0, -1).map((msg) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }))

        // Get the last message (user's input) to send
        const lastMessage = messages[messages.length - 1]
        if (!lastMessage) {
            return NextResponse.json(
                { error: 'No message to process' },
                { status: 400 }
            )
        }

        // Validate history has proper order (should start with user)
        if (geminiMessages.length > 0 && geminiMessages[0].role !== 'user') {
            // Ensure the first message is from a user
            console.log(
                'Fixing message order to ensure first message is from user'
            )
            // If the first message is not from user, we need to adjust
            if (geminiMessages[0].role === 'model') {
                geminiMessages.shift()
            }
        } // Initialize the Gemini model - use gemini-pro which has higher quota limits
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' }) // Start chat with history(ensuring there's valid history)
        const chat = model.startChat({
            history: geminiMessages.length > 0 ? geminiMessages : [],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1000
            }
        })

        // For streaming response
        const streamingResp = await chat.sendMessageStream([
            { text: lastMessage.content }
        ])

        // Create a text encoder and a readable stream
        const encoder = new TextEncoder()
        const readableStream = new ReadableStream({
            async start(controller) {
                // Handle the streaming chunks
                for await (const chunk of streamingResp.stream) {
                    const chunkText = chunk.text()
                    if (chunkText) {
                        controller.enqueue(
                            encoder.encode(
                                `data: ${JSON.stringify({ content: chunkText })}\n\n`
                            )
                        )
                    }
                }
                controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                controller.close()
            }
        })

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive'
            }
        })
    } catch (error: any) {
        console.error('Chat API error:', error)

        // Check for rate limit error (HTTP 429)
        if (error.message?.includes('429') || error.status === 429) {
            // Extract retry delay from error details if available
            let retryAfter = 5 // Default to 5 seconds

            try {
                if (error.errorDetails && Array.isArray(error.errorDetails)) {
                    // Find the RetryInfo object
                    const retryInfo = error.errorDetails.find((detail: any) =>
                        detail['@type']?.includes('RetryInfo')
                    )

                    if (retryInfo && retryInfo.retryDelay) {
                        // Parse the retry delay (format "41s")
                        const delayMatch = retryInfo.retryDelay.match(/(\d+)s/)
                        if (delayMatch && delayMatch[1]) {
                            retryAfter = parseInt(delayMatch[1], 10)
                        }
                    }
                }
            } catch (parseError) {
                console.error('Error parsing retry info:', parseError)
            }

            return NextResponse.json(
                {
                    error: 'Rate limit exceeded. Please try again in a moment.',
                    isRateLimit: true,
                    retryAfter
                },
                { status: 429 }
            )
        }

        // Handle other API-related errors
        if (error.message?.includes('400')) {
            return NextResponse.json(
                { error: 'Invalid request to AI service.' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
