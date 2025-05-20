'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useAuthCheck() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const {
                    data: { session }
                } = await supabase.auth.getSession()
                setIsAuthenticated(!!session)
            } catch (error) {
                console.error('Error checking authentication:', error)
                setIsAuthenticated(false)
            }
        }

        checkAuth()

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setIsAuthenticated(!!session)
            }
        )

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    return { isAuthenticated, isLoading: isAuthenticated === null }
}
