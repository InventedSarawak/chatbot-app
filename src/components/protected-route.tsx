'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return <>{children}</>
}
