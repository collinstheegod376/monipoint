'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (!error) alert('Check email to confirm!')
      else alert(error.message)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error) router.push('/dashboard')
      else alert(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-container-margin">
      <form onSubmit={handleAuth} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,122,255,0.08)] border border-surface-container slide-up-fade">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-2 text-on-surface">{isSignUp ? 'Create Account' : 'Welcome back'}</h1>
        <p className="font-body-md text-on-surface-variant mb-6">{isSignUp ? 'Start sending money effortlessly.' : 'Log in to your Stitch wallet.'}</p>
        
        <input className="w-full mb-4 p-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:outline-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full mb-6 p-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:outline-none" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <button disabled={loading} type="submit" className="w-full h-14 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-label-md shadow-sm active:scale-95 transition-transform mb-4">
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
        </button>
        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full text-primary font-label-md text-sm hover:underline">
          {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
        </button>
      </form>
    </div>
  )
}
