import Link from 'next/link'

export function Footer() {
    return (
        <footer className="w-full border-t py-6">
            <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
                <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} Chatbot App. All rights
                    reserved.
                </p>
                <div className="flex gap-4">
                    <Link
                        className="text-muted-foreground text-sm hover:underline"
                        href="#"
                    >
                        Terms
                    </Link>
                    <Link
                        className="text-muted-foreground text-sm hover:underline"
                        href="#"
                    >
                        Privacy
                    </Link>
                    <Link
                        className="text-muted-foreground text-sm hover:underline"
                        href="#"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    )
}
