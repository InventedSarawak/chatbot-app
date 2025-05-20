import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { Footer } from '@/components/landing/footer'

export function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2 font-bold">
                        <span className="text-primary text-xl">
                            Chatbot App
                        </span>
                    </div>
                    <nav className="hidden gap-6 md:flex">
                        <a
                            className="text-sm font-medium hover:underline"
                            href="#features"
                        >
                            Features
                        </a>
                        <a
                            className="text-sm font-medium hover:underline"
                            href="#testimonials"
                        >
                            Testimonials
                        </a>
                        <a
                            className="text-sm font-medium hover:underline"
                            href="#pricing"
                        >
                            Pricing
                        </a>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <TestimonialsSection />
            </main>
            <Footer />
        </div>
    )
}
