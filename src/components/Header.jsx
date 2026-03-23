import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Header(){
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const { currentUser, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const onEventsClick = (e) => {
    e.preventDefault()
    // If already on home, just scroll. Otherwise navigate to home and request scroll.
    if(location.pathname === '/' ){
      const el = document.getElementById('events')
      if(el) el.scrollIntoView({ behavior: 'smooth' })
      else {
        // fallback: navigate to home with state
        navigate('/', { state: { scrollTo: 'events' } })
      }
    } else {
      navigate('/', { state: { scrollTo: 'events' } })
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="brand">Teen Business Network</Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <a href="/#events" onClick={onEventsClick}>Events</a>
          <a href="mailto:teenbusinessnetwork@gmail.com">Contact</a>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{currentUser.displayName || currentUser.email}</span>
              <button onClick={handleLogout} className="cta" style={{ border: 'none', cursor: 'pointer' }}>
                Log out
              </button>
            </div>
          ) : (
            <Link className="cta" to="/signup">
              Get started
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
