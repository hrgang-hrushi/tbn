import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BlurText from './BlurText'
// subscribe UI removed per request

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    }
  }
}

const item = {
  hidden: { y: 8, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Hero(){
  const heroWide = import.meta.env.BASE_URL + 'assets/hero-wide.jpg';
  return (
    <motion.section className="hero" variants={container} initial="hidden" animate="show">
      <motion.h1 variants={item} style={{ margin: 0, color: '#ffffff' }}>
        Build Smart,<br />Network Smart.
      </motion.h1>
      <motion.p variants={item}>
        <BlurText text="TBN is a youth-led entrepreneurial community empowering students with resources, events, and real networking opportunities to grow." />
      </motion.p>
      <motion.div variants={item}>
        <Link className="cta" to="/signup">
          <svg className="icon-ne" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
            <path d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16669M15.8334 10L10.0001 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Get started now
        </Link>
      </motion.div>
      {/* subscribe form removed */}
      <motion.div className="hero-trust" variants={item}>
        <p className="trust-text">
          <BlurText text="Members trust us" delay={0.2} />
        </p>
        <div className="stars-rating">
          <div className="stars">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <span className="rating-number">4.9</span>
          <div className="rating-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="20" rx="4" fill="#ffffff" fillOpacity="0.1"/>
              <path d="M10 6v8M6 10h8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </motion.div>
        {/* Picture section under reviews */}
        <div className="hero-picture-section">
          <div className="hero-glow-left"></div>
          <div className="hero-glow-right"></div>
          <img
            src={heroWide}
            alt="Hero visual"
            className="hero-picture"
          />
        </div>
    </motion.section>
  )
}
