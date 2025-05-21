import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY!
const genAI = new GoogleGenerativeAI(apiKey)

export type GeminiMessage = {
    role: 'user' | 'model'
    parts: string
}

export async function generateChatResponse(messages: GeminiMessage[]) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

        const chat = model.startChat({
            history: messages.map((msg) => ({
                role: msg.role,
                parts: [{ text: msg.parts }]
            })),
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1000
            }
        })

        const result = await chat.sendMessage(
            messages[messages.length - 1].parts
        )
        const response = await result.response
        const text = response.text()

        return { text, error: null }
    } catch (error) {
        console.error('Error generating response:', error)
        return {
            text: 'Sorry, I encountered an error processing your request.',
            error
        }
    }
}
