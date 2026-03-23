import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const saveUserToFirestore = async (user) => {
    const userPath = `users/${user.uid}`
    console.log('Saving/Updating user in Firestore:', userPath)
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Anonymous',
        createdAt: new Date().toISOString()
      }, { merge: true })
      console.log('User data synced successfully')
    } catch (err) {
      console.error('Firestore sync error:', err)
      handleFirestoreError(err, OperationType.WRITE, userPath)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    console.log('Starting login for:', email)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Login successful')
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      setError('Failed to log in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)
    console.log('Starting Google Sign-in')
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      console.log('Google Sign-in successful:', result.user.uid)
      await saveUserToFirestore(result.user)
      console.log('Navigating to welcome after Google sign-in')
      navigate('/welcome')
    } catch (err) {
      console.error('Google Sign-in error:', err)
      setError('Failed to sign in with Google.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page" style={{ 
      maxWidth: 440, 
      margin: '40px auto', 
      padding: '48px 32px', 
      background: 'rgba(15, 17, 22, 0.6)', 
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: 24, 
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 8, fontSize: 32, fontWeight: 600, color: '#fff' }}>Welcome Back</h2>
      <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 32, fontSize: 16 }}>Log in to your account.</p>
      
      {error && <div style={{ padding: 14, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 12, marginBottom: 24, fontSize: 14, border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}
      
      <button 
        onClick={handleGoogleSignIn}
        disabled={loading}
        style={{ 
          width: '100%', 
          padding: '14px', 
          borderRadius: 12, 
          border: '1px solid rgba(255,255,255,0.1)', 
          background: 'rgba(255,255,255,0.05)', 
          color: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 12, 
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 500,
          transition: 'all 0.2s ease',
          marginBottom: 24
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }}></div>
        <span style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }}></div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>Email Address</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            style={{ 
              padding: '14px 16px', 
              borderRadius: 12, 
              border: '1px solid rgba(255,255,255,0.1)', 
              background: 'rgba(255,255,255,0.02)', 
              color: '#fff', 
              fontSize: 16,
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>Password</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ 
              padding: '14px 16px', 
              borderRadius: 12, 
              border: '1px solid rgba(255,255,255,0.1)', 
              background: 'rgba(255,255,255,0.02)', 
              color: '#fff', 
              fontSize: 16,
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="cta" 
          style={{ 
            marginTop: 12, 
            padding: '16px', 
            borderRadius: 100,
            justifyContent: 'center',
            cursor: loading ? 'not-allowed' : 'pointer', 
            opacity: loading ? 0.7 : 1,
            fontSize: 16
          }}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: 'var(--muted)' }}>
        Don&apos;t have an account? <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
      </p>
    </div>
  )
}
