import { useRef, useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import './ServicesVideoShowcase.css'

/* ── Step data: one entry per video ── */
const STEPS = [
  {
    num: '01',
    tag: 'Website Creation',
    title: 'Sites That Convert, Not Just Impress',
    desc: 'Conversion-first landing pages and business websites built with lightning performance, mobile-perfect design, and SEO foundations baked in from day one.',
    src: '/videos/V1.mp4',
  },
  {
    num: '02',
    tag: 'Software Development',
    title: 'Applications Built for Tomorrow',
    desc: 'Custom web and mobile apps engineered with modern architecture, clean code, and integrations that scale effortlessly alongside your business.',
    src: '/videos/V2.mp4',
  },
  {
    num: '03',
    tag: 'SEO & Digital Marketing',
    title: 'Rank Higher. Reach Further. Convert Better.',
    desc: 'Data-driven SEO, paid ad campaigns, and full-funnel marketing strategies that drive qualified traffic and compound revenue over time.',
    src: '/videos/V3.mp4',
  },
  {
    num: '04',
    tag: 'Brand & Visual Identity',
    title: 'Brands That Command Premium Attention',
    desc: 'Logos, visual systems, and social content crafted to position your business at the top tier of your market — from first impression to lasting trust.',
    src: '/videos/V4.mp4',
  },
]

export default function ServicesVideoShowcase() {
  const scrollAreaRef = useRef(null)
  const videoRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [videoOpacity, setVideoOpacity] = useState(1)

  // Refs to avoid stale closures inside the scroll listener
  const currentIdxRef = useRef(0)
  const isTransitionRef = useRef(false)

  // Track scroll progress through the sticky scroll area only
  const { scrollYProgress } = useScroll({
    target: scrollAreaRef,
    offset: ['start start', 'end end'],
  })

  /* ── Scroll → video switch ── */
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      // Clamp so we never exceed index 3 at the very end
      const clamped = Math.min(0.9999, Math.max(0, v))
      const newIdx = Math.floor(clamped * STEPS.length)

      if (newIdx !== currentIdxRef.current && !isTransitionRef.current) {
        isTransitionRef.current = true
        currentIdxRef.current = newIdx

        // 1. Fade out
        setVideoOpacity(0)

        // 2. Swap source + fade in after 280 ms
        setTimeout(() => {
          setActiveIndex(newIdx)
          setVideoOpacity(1)
          // Allow next transition after fade-in settles
          setTimeout(() => { isTransitionRef.current = false }, 350)
        }, 280)
      }
    })

    return unsubscribe
  }, [scrollYProgress])

  /* ── Load & play when source changes ── */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.load()
    v.play().catch(() => { /* autoplay blocked — silent */ })
  }, [activeIndex])

  /* ── Preload the next video ── */
  useEffect(() => {
    const nextSrc = STEPS[(activeIndex + 1) % STEPS.length].src
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'video'
    link.href = nextSrc
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [activeIndex])

  return (
    <section className="svs-section section">

      {/* ── Header ── */}
      <div className="container">
        <div className="svs-header">
          <motion.div
            className="badge badge-accent"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-dot" style={{ background: 'var(--accent)' }} />
            IN ACTION
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Built to Perform.{' '}
            <span className="gradient-text">Designed to Impress.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Scroll through our showcase — watch how Gro Innovative transforms
            ideas into high-impact digital products, one service at a time.
          </motion.p>
        </div>
      </div>

      {/* ── Scroll-tracking sticky area ── */}
      <div className="svs-scroll-area" ref={scrollAreaRef}>
        <div className="container">
          <div className="svs-grid">

            {/* LEFT — animated step list */}
            <div className="svs-steps-col">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className={`svs-step${activeIndex === i ? ' svs-step--active' : ''}`}
                >
                  <div className="svs-step-num">{step.num}</div>
                  <span className="svs-step-tag">{step.tag}</span>
                  <h3 className="svs-step-title">{step.title}</h3>
                  <p className="svs-step-desc">{step.desc}</p>
                  <div className="svs-step-bar">
                    <div
                      className={`svs-step-bar-fill${activeIndex === i ? ' svs-step-bar-fill--active' : ''}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — sticky video player */}
            <div className="svs-video-col">
              <div className="svs-video-frame">

                {/* Neon rim glow */}
                <div className="svs-glow" />

                {/* Single video — src swapped with crossfade via opacity */}
                <video
                  ref={videoRef}
                  src={STEPS[activeIndex].src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="svs-video"
                  style={{
                    opacity: videoOpacity,
                    transition: 'opacity 0.28s ease',
                  }}
                />

                {/* Overlay: current tag + progress dots */}
                <div className="svs-video-bottom">
                  <span className="svs-video-tag">{STEPS[activeIndex].tag}</span>
                  <div className="svs-dots">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`svs-dot${activeIndex === i ? ' svs-dot--active' : ''}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}
