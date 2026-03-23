import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Footer(){
  const navigate = useNavigate()
  const location = useLocation()
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)

  const onEventsClick = (e) => {
    e.preventDefault()
    if(location.pathname === '/'){
      const el = document.getElementById('events')
      if(el) el.scrollIntoView({ behavior: 'smooth' })
      else navigate('/', { state: { scrollTo: 'events' } })
    } else {
      navigate('/', { state: { scrollTo: 'events' } })
    }
  }

  const onSubscribe = (e) => {
    e.preventDefault()
    setShowNewsletterPopup(true)
  }

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">Teen Business Network</div>
            <p className="footer-tagline">Empowering teens to build, learn, and launch together.</p>
            <div className="footer-socials">
              <a aria-label="Instagram" href="https://www.instagram.com/tbn.hyd/" target="_blank" rel="noreferrer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a aria-label="LinkedIn" href="https://www.linkedin.com/company/111655463/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B00SEAPlKRlyCX2GWo7f1sw%3D%3D" target="_blank" rel="noreferrer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8.5 10.5V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8.5" cy="8" r="1" fill="currentColor"/>
                  <path d="M12 16V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 12.2C12 11.1 12.9 10.3 14 10.3C15.1 10.3 16 11.1 16 12.2V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
              <a aria-label="YouTube" href="https://www.youtube.com/@doodposcast" target="_blank" rel="noreferrer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9.8 10.2C9.8 9.87 10.16 9.67 10.44 9.84L14.49 12.21C14.76 12.37 14.76 12.76 14.49 12.92L10.44 15.29C10.16 15.46 9.8 15.26 9.8 14.93V10.2Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Explore</h4>
              <Link to="/">Home</Link>
              <a href="/ #events" onClick={onEventsClick}>Events</a>
              <a href="mailto:teenbusinessnetwork@gmail.com">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </div>
            <div className="footer-col">
              <h4>Newsletter</h4>
              <button type="button" className="cta footer-newsletter-btn" onClick={onSubscribe}>Subscribe</button>
              <small className="newsletter-note">We’ll open email instructions to add you.</small>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Teen Business Network</p>
          <nav className="footer-bottom-nav">
            <a href="mailto:teenbusinessnetwork@gmail.com">Contact</a>
          </nav>
        </div>
      </div>

      {showNewsletterPopup && (
        <div className="newsletter-popup-overlay" role="dialog" aria-modal="true" aria-label="Newsletter instructions">
          <div className="newsletter-popup-card">
            <h4>Join Newsletter</h4>
            <p>Please email us and type <strong>Newsletter</strong> so we can add you.</p>
            <div className="newsletter-popup-actions">
              <a className="cta" href="mailto:teenbusinessnetwork@gmail.com">Email TBN</a>
              <button type="button" className="cta cta--ghost" onClick={() => setShowNewsletterPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}