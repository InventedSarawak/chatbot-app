'use client'

import { useAuthCheck } from '@/hooks/use-auth-check'
import { LandingPage } from '@/components/landing/landing-page'
import { Chat } from '@/components/ui/chat'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
// import { fetchWithRetry } from '@/utils/api-helpers'

// Sample initial chat messages
const initialMessages = [
    {
        id: '1',
        role: 'assistant',
        content: 'Hi! How can I help you today?'
    }
]

export default function Home() {
    const { isAuthenticated, isLoading } = useAuthCheck()
    const [messages, setMessages] = useState(initialMessages)
    const [input, setInput] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [suggestions] = useState<string[]>([
        'Tell me about artificial intelligence',
        'How does machine learning work?',
        'Explain quantum computing'
    ])

    const handleSubmit = async (
        event?: { preventDefault?: () => void } | undefined
    ) => {
        if (event?.preventDefault) event.preventDefault()
        if (!input.trim()) return

        setIsGenerating(true)

        const userMessage = {
            id: String(Date.now()),
            role: 'user',
            content: input
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')

        try {
            // Get the current session
            const {
                data: { session }
            } = await supabase.auth.getSession()

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.access_token || ''}`
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage]
                })
            })

            if (!response.ok) {
                throw new Error('Failed to fetch response')
            }

            const data = await response.json()
            setMessages((prev) => [...prev, data.message])
        } catch (error) {
            console.error('Error:', error)
            setMessages((prev) => [
                ...prev,
                {
                    id: String(Date.now() + 1),
                    role: 'assistant',
                    content:
                        'Sorry, I encountered an error processing your request.'
                }
            ])
        } finally {
            setIsGenerating(false)
        }
    }

    const stopGenerating = () => {
        // In a real implementation, you would abort the fetch request
        setIsGenerating(false)
    }

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <LandingPage />
    }

    return (
        <div className="flex h-screen flex-col">
            <header className="bg-background/95 border-b backdrop-blur">
                <div className="container flex h-14 items-center">
                    <div className="flex items-center gap-2 font-bold">
                        <span className="text-primary">Gemini Chat</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Button
                            variant="ghost"
                            onClick={async () => {
                                await supabase.auth.signOut()
                            }}
                        >
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-hidden p-4">
                <div className="mx-auto h-full max-w-4xl">
                    <Chat
                        messages={messages}
                        input={input}
                        handleInputChange={(e) => setInput(e.target.value)}
                        handleSubmit={handleSubmit}
                        isGenerating={isGenerating}
                        stop={stopGenerating}
                        append={(message: {
                            role: 'user'
                            content: string
                        }) => {
                            const userMessage = {
                                id: String(Date.now()),
                                role: 'user',
                                content: message.content
                            }
                            setMessages((prev) => [...prev, userMessage])

                            // This will trigger fetching a response
                            // Get the current session
                            supabase.auth
                                .getSession()
                                .then(({ data: { session } }) => {
                                    fetch('/api/chat', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${session?.access_token || ''}`
                                        },
                                        body: JSON.stringify({
                                            messages: [...messages, userMessage]
                                        })
                                    })
                                        .then((response) => response.json())
                                        .then((data) => {
                                            setMessages((prev) => [
                                                ...prev,
                                                data.message
                                            ])
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error)
                                            setMessages((prev) => [
                                                ...prev,
                                                {
                                                    id: String(Date.now() + 1),
                                                    role: 'assistant',
                                                    content:
                                                        'Sorry, I encountered an error processing your request.'
                                                }
                                            ])
                                        })
                                })
                        }}
                        setMessages={setMessages}
                        suggestions={suggestions}
                    />
                </div>
            </main>
        </div>
    )
}
