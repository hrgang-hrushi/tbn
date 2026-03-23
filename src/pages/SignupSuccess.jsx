import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'

export default function SignupSuccess() {
  const { currentUser } = useAuth()
  const [newsletterEmail, setNewsletterEmail] = useState(currentUser?.email || '')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNewsletterSignup = async (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setLoading(true)
    try {
      await setDoc(doc(db, 'newsletter', newsletterEmail), {
        email: newsletterEmail,
        uid: currentUser?.uid || 'anonymous',
        subscribedAt: new Date().toISOString()
      })
      setSubscribed(true)
    } catch (err) {
      console.error('Newsletter error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-success" style={{ 
      maxWidth: 800, 
      margin: '60px auto', 
      padding: '60px 40px', 
      textAlign: 'center',
      background: 'rgba(15, 17, 22, 0.6)', 
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: 32, 
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
    }}>
      <div style={{ 
        fontSize: 80, 
        marginBottom: 24,
        display: 'inline-block',
        filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))',
        WebkitTextStroke: '2px white',
        color: 'transparent'
      }}>
        🎉
      </div>
      
      <h1 style={{ fontSize: 48, fontWeight: 400, marginBottom: 16, color: 'var(--accent)', letterSpacing: '-1px' }}>
        Welcome to the Network!
      </h1>
      
      <p style={{ fontSize: 20, color: 'var(--muted)', marginBottom: 48, lineHeight: 1.6 }}>
        Hi <span style={{ color: '#4ade80', fontWeight: 600 }}>{currentUser?.displayName || 'there'}</span>, we&apos;re thrilled to have you join the Teen Business Network. 
        Your account has been successfully created.
      </p>

      <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 32, marginBottom: 48, border: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ fontSize: 24, marginBottom: 24, color: '#fff' }}>Take your first steps:</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>1</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 18, marginBottom: 8, color: '#fff' }}>Join our Newsletter</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 16, lineHeight: 1.5 }}>
                Hear great entrepreneurs&apos; journeys and tips for networking.
              </p>
              {!subscribed ? (
                <form onSubmit={handleNewsletterSignup} style={{ display: 'flex', gap: 12 }}>
                  <input 
                    type="email" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email"
                    style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 16px', color: '#fff' }}
                  />
                  <button disabled={loading} type="submit" style={{ padding: '10px 20px', borderRadius: 8, background: 'var(--accent)', color: '#000', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                    {loading ? '...' : 'Sign Up'}
                  </button>
                </form>
              ) : (
                <div style={{ color: '#4ade80', fontSize: 14, fontWeight: 500 }}>✓ You&apos;re on the list!</div>
              )}
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>2</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 18, marginBottom: 8, color: '#fff' }}>Upcoming Events</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 16, lineHeight: 1.5 }}>
                Don&apos;t miss out on our next networking session.
              </p>
              <Link to="/" state={{ scrollTo: 'events' }} style={{ display: 'inline-block', padding: '10px 24px', borderRadius: 8, border: '1px solid var(--accent)', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                Network Now
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>3</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 18, marginBottom: 8, color: '#fff' }}>Follow us on Instagram</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 16, lineHeight: 1.5 }}>
                Hear updates, Quiz your Biz, win prizes & challenges.
              </p>
              <a href="https://www.instagram.com/teenbusinessnetwork/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
                @teenbusinessnetwork →
              </a>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>4</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 18, marginBottom: 8, color: '#fff' }}>Join the Community</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 16, lineHeight: 1.5 }}>
                Connect with 170+ members in our active group chat.
              </p>
              <a href="https://ig.me/j/AbY8Gy4ZIqRBvrtx/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 24px', borderRadius: 8, background: '#fff', color: '#000', textDecoration: 'none', fontWeight: 600 }}>
                Join Group Chat
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <Link to="/" className="cta" style={{ padding: '16px 40px', borderRadius: 100, fontSize: 16 }}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
