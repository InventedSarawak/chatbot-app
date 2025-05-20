'use client'

import { useAuthCheck } from '@/hooks/use-auth-check'
import { LandingPage } from '@/components/landing/landing-page'
import { Chat } from '@/components/ui/chat'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Sample initial chat messages - replace with your actual implementation
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
    const [suggestions, setSuggestions] = useState<string[]>(['How can I help?', 'Tell me more', 'What else?'])
    // Updated implementation
    const handleSubmit = (
        event?: { preventDefault?: () => void } | undefined,
        options?: { experimental_attachments?: FileList | undefined }
    ) => {
        if (event?.preventDefault) event.preventDefault()
        if (!input.trim()) return

        const userMessage = {
            id: String(Date.now()),
            role: 'user',
            content: input
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')

        // Simulate AI response - replace with actual API call
        setTimeout(() => {
            const aiMessage = {
                id: String(Date.now() + 1),
                role: 'assistant',
                content: `Thanks for your message: "${input}"`
            }
            setMessages((prev) => [...prev, aiMessage])
        }, 1000)
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
                        <span className="text-primary">Chatbot App</span>
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
                        isGenerating={false}
                        stop={() => {}}
                        append={(message: any) => {
                            setMessages((prev) => [
                                ...prev,
                                {
                                    id: String(Date.now()),
                                    role: 'user',
                                    content: message
                                }
                            ])
                            // Replace with actual API call
                        }}
                        setMessages={setMessages}
                        suggestions={suggestions}
                    />
                </div>
            </main>
        </div>
    )
}
