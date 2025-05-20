import { CheckCircle, MessageSquare, Shield, Zap } from 'lucide-react'

export function FeaturesSection() {
    return (
        <section className="bg-muted/40 w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                            Key Features
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                            Everything you need for AI conversations
                        </h2>
                        <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform provides powerful AI chat capabilities
                            with enterprise-grade security and reliability.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                        <div className="rounded-full border p-2">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">
                            Smart Conversations
                        </h3>
                        <p className="text-muted-foreground text-center text-sm">
                            Advanced AI that understands context and provides
                            relevant responses.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                        <div className="rounded-full border p-2">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Lightning Fast</h3>
                        <p className="text-muted-foreground text-center text-sm">
                            Get instant responses with our optimized
                            infrastructure.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                        <div className="rounded-full border p-2">
                            <Shield className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Secure & Private</h3>
                        <p className="text-muted-foreground text-center text-sm">
                            Your conversations are encrypted and never shared.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                        <div className="rounded-full border p-2">
                            <CheckCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">Easy to Use</h3>
                        <p className="text-muted-foreground text-center text-sm">
                            Simple, intuitive interface that anyone can use
                            immediately.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
