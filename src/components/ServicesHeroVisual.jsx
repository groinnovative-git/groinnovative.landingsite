import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import OrbitTrustRing from './OrbitTrustRing'
import './ServicesHeroVisual.css'

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReduced(mq.matches)
        const handler = (e) => setReduced(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])
    return reduced
}

// Pre-computed dot positions (no random on each render)
const DOTS = [
    { left: '8%',  top: '12%' }, { left: '22%', top: '5%'  }, { left: '38%', top: '18%' },
    { left: '52%', top: '6%'  }, { left: '67%', top: '22%' }, { left: '82%', top: '9%'  },
    { left: '91%', top: '35%' }, { left: '79%', top: '53%' }, { left: '88%', top: '70%' },
    { left: '73%', top: '86%' }, { left: '55%', top: '93%' }, { left: '38%', top: '89%' },
    { left: '19%', top: '83%' }, { left: '5%',  top: '69%' }, { left: '13%', top: '50%' },
    { left: '4%',  top: '31%' }, { left: '46%', top: '76%' }, { left: '63%', top: '59%' },
]

const CHIPS = [
    {
        label: 'SEO Score', value: '94/100',
        style: { top: '8%', left: '2%' },
        icon: (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        ),
    },
    {
        label: 'Load Time', value: '1.2s',
        style: { top: '42%', right: '0%' },
        icon: (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
    {
        label: 'Uptime', value: '99.9%',
        style: { bottom: '26%', left: '0%' },
        icon: (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        label: 'Leads', value: '+340%',
        style: { bottom: '5%', right: '2%' },
        icon: (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6"  y1="20" x2="6"  y2="16" />
            </svg>
        ),
    },
]

const BARS = [55, 72, 48, 88, 64, 91, 76]

export default function ServicesHeroVisual() {
    const reduced = usePrefersReducedMotion()
    const containerRef = useRef(null)
    const [hovered, setHovered] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springCfg = { damping: 22, stiffness: 200 }
    const rotateX = useSpring(useTransform(mouseY, [-1, 1], [6, -6]), springCfg)
    const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), springCfg)

    const handleMouseMove = (e) => {
        if (reduced || !containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(((e.clientX - rect.left) / rect.width)  * 2 - 1)
        mouseY.set(((e.clientY - rect.top)  / rect.height) * 2 - 1)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
        setHovered(false)
    }

    return (
        <div
            ref={containerRef}
            className={`shv-outer${hovered ? ' shv-outer--hov' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {/* Ambient radial glow */}
            <div className="shv-glow" />

            {/* Background particle dots */}
            {!reduced && DOTS.map((d, i) => (
                <span
                    key={i}
                    className="shv-dot"
                    style={{
                        left: d.left,
                        top: d.top,
                        '--delay': `${(i * 0.33) % 3}s`,
                        '--dur':   `${2.4 + (i * 0.42) % 2.2}s`,
                    }}
                />
            ))}

            {/* Expanding pulse ring */}
            {!reduced && <span className="shv-pulse" />}

            {/* ── Main glass panel ── */}
            <motion.div
                className="shv-panel"
                style={reduced ? {} : {
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Corner bracket accents */}
                <i className="shv-corner shv-corner--tl" />
                <i className="shv-corner shv-corner--tr" />
                <i className="shv-corner shv-corner--bl" />
                <i className="shv-corner shv-corner--br" />

                {/* Scan line */}
                <span className={`shv-scan${hovered && !reduced ? ' shv-scan--fast' : ''}`} />

                {/* Status row */}
                <div className="shv-status">
                    <span className="shv-blink-dot" />
                    <span className="shv-status-txt">SYSTEMS ONLINE</span>
                    <span className="shv-sep">·</span>
                    <span className="shv-version">GRO_STACK v2.4</span>
                </div>

                {/* KPI metrics */}
                <div className="shv-metrics">
                    {[['99.9%', 'UPTIME'], ['1.2s', 'LOAD'], ['A+', 'SEO']].map(([val, lbl]) => (
                        <div key={lbl} className="shv-metric">
                            <span className="shv-metric-val">{val}</span>
                            <span className="shv-metric-lbl">{lbl}</span>
                        </div>
                    ))}
                </div>

                <div className="shv-divider" />

                {/* Bar chart */}
                <div className="shv-chart-wrap">
                    <span className="shv-chart-lbl">PERF INDEX</span>
                    <div className="shv-bars">
                        {BARS.map((h, i) => (
                            <motion.span
                                key={i}
                                className="shv-bar"
                                style={{ height: `${h}%`, transformOrigin: 'bottom center' }}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.5 + i * 0.07, duration: 0.45, ease: 'easeOut' }}
                            />
                        ))}
                    </div>
                </div>

                <div className="shv-divider" />

                {/* Line graph */}
                <div className="shv-graph-wrap">
                    <span className="shv-chart-lbl">GROWTH TREND</span>
                    <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="shv-svg">
                        <defs>
                            <linearGradient id="shvAreaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%"   stopColor="#10B981" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0"    />
                            </linearGradient>
                        </defs>

                        {/* Area fill */}
                        <motion.path
                            d="M 0 46 L 28 36 L 56 28 L 84 16 L 112 22 L 140 6 L 200 10 L 200 50 L 0 50 Z"
                            fill="url(#shvAreaGrad)"
                            stroke="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6, duration: 0.6 }}
                        />

                        {/* Line */}
                        <motion.path
                            d="M 0 46 L 28 36 L 56 28 L 84 16 L 112 22 L 140 6 L 200 10"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.4, delay: 0.7, ease: 'easeInOut' }}
                        />

                        {/* Peak dot */}
                        <motion.circle
                            cx="140" cy="6" r="2.5"
                            fill="#10B981"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8, duration: 0.3 }}
                        />
                        <motion.circle
                            cx="200" cy="10" r="2"
                            fill="#34D399"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ delay: 2.0, duration: 0.3 }}
                        />
                    </svg>
                </div>
            </motion.div>

            {/* ── Orbit trust ring (4 rotating badges) ── */}
            <OrbitTrustRing />

            {/* ── Floating metric chips ── */}
            {CHIPS.map((chip, i) => (
                <motion.div
                    key={chip.label}
                    className="shv-chip"
                    style={chip.style}
                    initial={{ opacity: 0, y: 0 }}
                    animate={reduced
                        ? { opacity: 1, y: 0 }
                        : { opacity: 1, y: [0, -7, 0] }
                    }
                    transition={reduced
                        ? { delay: 0.3 + i * 0.1, duration: 0.4 }
                        : {
                            opacity: { delay: 0.6 + i * 0.15, duration: 0.5 },
                            y: {
                                delay: 0.8 + i * 0.2,
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            },
                        }
                    }
                >
                    <span className="shv-chip-ico">{chip.icon}</span>
                    <div className="shv-chip-body">
                        <span className="shv-chip-val">{chip.value}</span>
                        <span className="shv-chip-lbl">{chip.label}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
