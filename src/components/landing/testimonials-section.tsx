import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function TestimonialsSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                            Testimonials
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                            What our users say
                        </h2>
                        <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Discover how our AI chatbot has helped people
                            improve productivity and find solutions faster.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage
                                        src="/avatars/01.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">
                                        Jane Doe
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Product Manager
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                "This chatbot has become an essential part of my
                                workflow. It helps me draft emails, generate
                                reports, and solve problems quickly."
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage
                                        src="/avatars/02.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>JS</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">
                                        John Smith
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Developer
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                "The code assistance is impressive. It helps me
                                debug issues and explains complex concepts in an
                                easy-to-understand way."
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage
                                        src="/avatars/03.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">
                                        Sarah Connor
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Student
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">
                                "I use this chatbot for research and studying.
                                It explains concepts clearly and helps me
                                organize my notes effectively."
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
