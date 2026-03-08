/**
 * ServicesHorizontalVideoScroll
 *
 * Scroll-driven horizontal video showcase.
 * The outer section is 500vh tall — this is the "scroll tunnel".
 * Inside lives a sticky frame that stays locked to the viewport.
 * As the user scrolls down, the horizontal video track slides left
 * revealing V1 → V2 → V3 → V4 with a spring-smoothed motion.
 *
 * Math:
 *   track width = 400% of track-wrap
 *   each panel  = 25% of track  = 100% of track-wrap
 *   xPercent 0 → -75 shifts the track left by 3 full panel widths
 *   so panel 1 … panel 4 all pass through the viewport
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './ServicesHorizontalVideoScroll.css'

/* ── Panel data ── */
const PANELS = [
  {
    id: 'V1',
    label: 'Website Creation',
    desc: 'Conversion-first landing pages built to turn visitors into paying customers.',
    src: '/videos/V1.mp4',
  },
  {
    id: 'V2',
    label: 'Software Development',
    desc: 'Scalable web & mobile apps engineered for performance and long-term growth.',
    src: '/videos/V2.mp4',
  },
  {
    id: 'V3',
    label: 'SEO & Digital Marketing',
    desc: 'Data-driven campaigns that rank higher, reach further, and convert better.',
    src: '/videos/V3.mp4',
  },
  {
    id: 'V4',
    label: 'Brand & Visual Identity',
    desc: 'Premium logos and brand systems that position you at the top of your market.',
    src: '/videos/V4.mp4',
  },
]

export default function ServicesHorizontalVideoScroll() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex]   = useState(0)
  const [hintVisible, setHintVisible]   = useState(true)

  /* ── Scroll progress through the 500vh section ──
     offset 'start start' → 'end end':
       0 = section top  reaches viewport top
       1 = section bottom reaches viewport bottom
     This guarantees the sticky is always in view during 0 → 1 */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /* ── Horizontal translation ──
     xPercent 0 → -75 on a 400%-wide track
     = translateX(0) → translateX(-300% of container)
     = panel 1 fully visible → panel 4 fully visible           */
  const rawX    = useTransform(scrollYProgress, [0, 1], [0, -75])
  const smoothX = useSpring(rawX, { stiffness: 80, damping: 20 })

  /* ── Active panel for dot indicator ── */
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(PANELS.length - 1, Math.floor(v * PANELS.length))
      setActiveIndex(idx)
      if (v > 0.02) setHintVisible(false) // hide "scroll" hint after user starts
    })
    return unsubscribe
  }, [scrollYProgress])

  return (
    /* ── 500vh scroll tunnel ── */
    <section ref={sectionRef} className="shvs-section">

      {/* ── Sticky frame ── */}
      <div className="shvs-sticky">
        <div className="container">

          {/* Header */}
          <div className="shvs-header">
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
              className="shvs-title"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Built to Perform.{' '}
              <span className="gradient-text">Designed to Impress.</span>
            </motion.h2>

            <motion.p
              className="shvs-subtitle"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Scroll to tour our work — every product we ship, crafted with
              precision.
            </motion.p>
          </div>

          {/* ── Track wrapper (clips horizontal overflow) ── */}
          <div className="shvs-track-wrap">

            {/* Neon rim glow sits above the video */}
            <div className="shvs-glow" />

            {/* Animated track — slides left as progress rises */}
            <motion.div
              className="shvs-track"
              style={{ xPercent: smoothX }}
            >
              {PANELS.map((panel) => (
                <div key={panel.id} className="shvs-panel">
                  <video
                    src={panel.src}
                    className="shvs-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />

                  {/* Gradient overlay + label */}
                  <div className="shvs-panel-overlay">
                    <span className="shvs-panel-id">{panel.id}</span>
                    <div className="shvs-panel-text">
                      <div className="shvs-panel-label">{panel.label}</div>
                      <div className="shvs-panel-desc">{panel.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Progress dots + labels ── */}
          <div className="shvs-progress">
            {PANELS.map((panel, i) => (
              <div
                key={panel.id}
                className={`shvs-progress-step${
                  activeIndex === i ? ' shvs-progress-step--active' : ''
                }`}
              >
                <div className="shvs-progress-dot" />
                <span className="shvs-progress-label">{panel.label}</span>
              </div>
            ))}
          </div>

          {/* Scroll hint — fades once user starts scrolling */}
          {hintVisible && (
            <div className="shvs-scroll-hint">
              <svg
                width="14" height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
              Scroll to explore
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
