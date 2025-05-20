import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Session } from '@supabase/supabase-js'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            setLoading(true)

            const {
                data: { session },
                error
            } = await supabase.auth.getSession()

            if (error) {
                console.error('Error getting session:', error)
            }

            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        }

        getInitialSession()

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session)
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error
            return { data, error: null }
        } catch (error) {
            console.error('Error signing in:', error)
            return { data: null, error }
        }
    }

    const signUp = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            })

            if (error) throw error
            return { data, error: null }
        } catch (error) {
            console.error('Error signing up:', error)
            return { data: null, error }
        }
    }

    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google'
            })

            if (error) throw error
            return { data, error: null }
        } catch (error) {
            console.error('Error signing in with Google:', error)
            return { data: null, error }
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        } catch (error) {
            console.error('Error signing out:', error)
            return { error }
        }
    }

    return {
        user,
        session,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut
    }
}
