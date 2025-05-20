import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Interactive AI Conversations Made Simple
                        </h1>
                        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                            Experience powerful AI chat capabilities that help
                            you get answers, solve problems, and boost your
                            productivity.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Button asChild size="lg">
                            <Link href="/signup">Get Started</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
