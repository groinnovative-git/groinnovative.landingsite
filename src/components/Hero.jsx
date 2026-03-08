import { useEffect, useRef } from 'react'
import useMagnet from '../hooks/useMagnet'
import ParticleCanvas from './ParticleCanvas'
import './Hero.css'

export default function Hero() {
    const badgeRef = useRef(null)
    const title1Ref = useRef(null)
    const title2Ref = useRef(null)
    const title3Ref = useRef(null)
    const subRef = useRef(null)
    const btnsRef = useRef(null)

    const magnet1 = useMagnet(0.4)
    const magnet2 = useMagnet(0.3)

    // Staggered entrance
    useEffect(() => {
        const lines = [badgeRef, title1Ref, title2Ref, title3Ref, subRef, btnsRef]
        lines.forEach((r, i) => {
            if (!r.current) return
            r.current.style.opacity = '0'
            r.current.style.transform = 'translateY(40px)'
            r.current.style.filter = 'blur(8px)'
            r.current.style.transition = `opacity 0.75s ease ${i * 0.13}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.13}s, filter 0.6s ease ${i * 0.13}s`
            setTimeout(() => {
                if (r.current) {
                    r.current.style.opacity = '1'
                    r.current.style.transform = 'translateY(0)'
                    r.current.style.filter = 'blur(0)'
                }
            }, 60)
        })
    }, [])

    const scrollTo = (href) => {
        const el = document.querySelector(href)
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
    }

    return (
        <section className="hero" id="home">

            {/* ── Interactive Green Constellation Background ── */}
            <div className="hero-canvas-overlay" aria-hidden>
                <ParticleCanvas />
                <div className="hero-canvas-fade" />
            </div>

            {/* Content */}
            <div className="hero-content">
                <div className="badge hero-badge" ref={badgeRef}>
                    <span className="badge-dot" />
                    ACCELERATE YOUR Businesses
                </div>

                <h1 className="hero-title">
                    <span className="hero-line" ref={title1Ref}>AI Driven Software &</span>
                    <span className="hero-line hero-line-accent" ref={title2Ref}>Growth Systems</span>
                    <span className="hero-line hero-line-dim" ref={title3Ref}>for Modern Businesses</span>
                </h1>

                <p className="hero-sub" ref={subRef}>
                    We design and build scalable SaaS platforms, intelligent websites, and automation ready digital products engineered for performance, visibility, and long-term growth.
                </p>

                <div className="hero-btns" ref={btnsRef}>
                    <div className="magnet-wrap" ref={magnet1.ref} onMouseMove={magnet1.handleMouseMove} onMouseLeave={magnet1.handleMouseLeave}>
                        <a href="#contact" className="btn btn-primary" onClick={e => { e.preventDefault(); scrollTo('#contact') }}>
                            <span className="cta-label">✔ Start a Project</span>
                        </a>
                    </div>
                    <div className="magnet-wrap" ref={magnet2.ref} onMouseMove={magnet2.handleMouseMove} onMouseLeave={magnet2.handleMouseLeave}>
                        <a href="#features" className="btn btn-secondary" onClick={e => { e.preventDefault(); scrollTo('#features') }}>
                            ✔ Explore Services
                        </a>
                    </div>
                </div>

                {/* Live stats strip */}
                <div className="hero-micro-stats">
                    <span className="ms-item"><span className="ms-dot green" />Free Consultation</span>
                    <span className="ms-sep">·</span>
                    <span className="ms-item"><span className="ms-dot green" />Scalable Solutions</span>
                    <span className="ms-sep">·</span>
                    <span className="ms-item"><span className="ms-dot green" />NDA Protected</span>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-hint" aria-hidden>
                <div className="scroll-mouse"><div className="scroll-dot" /></div>
                <span className="scroll-label">Scroll to explore</span>
            </div>
        </section>
    )
}
