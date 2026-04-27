import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
    Search, PenTool, Code, Bug, Rocket, LifeBuoy,
    Eye, Target, Zap, Star, Users, Shield, TrendingUp, RefreshCw
} from 'lucide-react'
import ParticleCanvas from '../components/ParticleCanvas'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { PAGE_SEO } from '../seo/seoConfig'
import { breadcrumbSchema, organizationSchema, aboutFaqSchema, aboutFaqData } from '../seo/schemas'
import './About.css'

import useReveal from '../hooks/useReveal'

/* ── Framer Motion variants ── */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}
const fadeUpBlur = {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } }
}
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}
const staggerFast = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
}
const slideFromLeft = {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}
const slideFromRight = {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}
const cardAnim = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
const lineGrow = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } }
}
const checkPop = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
}

/* ── Count-up component ── */
function CountUp({ target, prefersReduced }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (prefersReduced) { el.textContent = target; return }
        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            obs.disconnect()
            const dur = 1200, start = performance.now()
            const tick = (now) => {
                const p = Math.min((now - start) / dur, 1)
                const ease = 1 - Math.pow(1 - p, 3)
                el.textContent = Math.round(ease * target)
                if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        }, { threshold: 0.5 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [target, prefersReduced])
    return <span ref={ref} className="team-count">0</span>
}

/* ── Data ── */
const expertiseItems = [
    'Product design & UI/UX engineering',
    'Scalable web & software development',
    'AI-powered automation & workflows',
    'Business-focused digital transformation',
]

const coreValues = [
    { icon: Zap, title: 'Innovation First', desc: 'Always exploring smarter and better solutions' },
    { icon: Star, title: 'Quality Over Everything', desc: 'Clean, scalable, and maintainable code' },
    { icon: Users, title: 'User-Centric Thinking', desc: 'Every product is built for real users' },
    { icon: Shield, title: 'Transparency & Trust', desc: 'Clear communication at every step' },
    { icon: TrendingUp, title: 'Performance Driven', desc: 'Focused on results, not just delivery' },
    { icon: RefreshCw, title: 'Continuous Growth', desc: 'Improving with every project we build' },
]

const whyUsItems = [
    'Product-first UI/UX with conversion focus',
    'Clean architecture & scalable systems',
    'AI-powered automation & smart workflows',
    'Performance-optimized applications',
    'Tailor-made business solutions (not templates)',
    'Long-term support & partnership mindset',
    'Agile and transparent development process',
]

const processSteps = [
    {
        n: '01', icon: Search, title: 'Discover & Understand',
        desc: 'Deep dive into your business goals, users, and challenges. Map out scope, technologies, and deliverables.'
    },
    {
        n: '02', icon: PenTool, title: 'Design & Prototype',
        desc: 'Create intuitive UI/UX with clear user flows. You see exactly what you\'re getting before a single line of code.'
    },
    {
        n: '03', icon: Code, title: 'Develop & Build',
        desc: 'Scalable, clean, and high-performance development in agile sprints with continuous feedback loops.'
    },
    {
        n: '04', icon: Bug, title: 'Test & Optimize',
        desc: 'Ensure quality, speed, and reliability across devices. Rigorous automated and manual testing.'
    },
    {
        n: '05', icon: Rocket, title: 'Launch & Scale',
        desc: 'Smooth deployment with zero downtime, cloud infrastructure setup, and continuous improvements.'
    },
    {
        n: '06', icon: LifeBuoy, title: 'Support & Grow',
        desc: 'Ongoing support, updates, feature additions, and scaling strategies as your business evolves.'
    },
]

const approachSteps = [
    { num: '01', title: 'Discover', desc: 'Understand business & user needs through research and stakeholder alignment.' },
    { num: '02', title: 'Design', desc: 'Create engaging experiences with wireframes, UI systems, and prototypes.' },
    { num: '03', title: 'Develop', desc: 'Build scalable solutions with clean code and modern architecture.' },
    { num: '04', title: 'Optimize & Grow', desc: 'Improve continuously with data, performance tuning, and ongoing support.' },
]

const teamRoles = [
    { role: 'UI/UX Designers', count: 2, line: 'Design systems, UX flows, and conversion-focused UI.' },
    { role: 'Flutter Developers', count: 3, line: 'Cross-platform mobile apps with native performance.' },
    { role: 'Frontend Developers', count: 3, line: 'Pixel-perfect interfaces with React and modern stacks.' },
    { role: 'Backend Developers', count: 3, line: 'Scalable APIs, databases, and server architecture.' },
    { role: 'QA Testers', count: 3, line: 'Rigorous testing for flawless, production-ready releases.' },
    { role: 'Deployment Engineers', count: 2, line: 'CI/CD pipelines, cloud infra, and zero-downtime deploys.' },
]

/* ══════════════════════════════════════════════════════════════════════════════ */
export default function About() {
    useReveal()
    const prefersReduced = useReducedMotion()
    const [openFaq, setOpenFaq] = useState(null)

    return (
        <div className="page-enter about-page">
            <SEO {...PAGE_SEO.about} />
            <StructuredData data={[
                organizationSchema,
                aboutFaqSchema,
                breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'About', path: '/about' },
                ]),
            ]} />

            {/* ─── 1. HERO ───────────────────────────────────────────────────── */}
            <section className="hero-section about-hero">
                <ParticleCanvas />
                <div className="hero-left-glow" />
                <div className="container">
                    <div className="hero-grid-wrapper CenteredLayout">
                        <div className="hero-content centered" style={{ maxWidth: 880 }}>
                            <div className="badge reveal" style={{ boxShadow: '0 0 20px rgba(16,185,129,0.15)' }}>
                                <span className="badge-dot" />ABOUT GRO INNOVATIVE
                            </div>
                            <h1 className="hero-headline reveal reveal-delay-1">
                                Your Digital Growth{' '}
                                <span className="gradient-text">Partner</span>
                            </h1>
                            <p className="hero-sub reveal reveal-delay-2" style={{ maxWidth: 740 }}>
                                Groinnovative is a software development and digital services company helping businesses worldwide build websites, custom software, SEO systems, digital marketing campaigns, maintenance workflows, and brand visuals. The company supports business websites, ecommerce platforms, admin panels, dashboards, SEO-ready websites, lead-generation campaigns, and ongoing digital support.
                            </p>
                            <div className="hero-actions reveal reveal-delay-3">
                                <Link to="/contact" className="btn btn-primary">
                                    Contact Us <span className="arr">→</span>
                                </Link>
                                <Link to="/services" className="btn btn-secondary">
                                    Explore Services <span className="arr">→</span>
                                </Link>
                            </div>
                            <div className="trust-pills reveal reveal-delay-4">
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg>Free Consultation</span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg>NDA Protected</span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg>Remote Friendly</span>
                            </div>
                            <div className="scroll-indicator" aria-hidden="true">
                                <span className="scroll-indicator-label">Scroll Down</span>
                                <div className="scroll-indicator-mouse">
                                    <div className="scroll-indicator-wheel" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 2. WHO WE ARE — Editorial Layout ───────────────────────── */}
            <section className="section about-who-section">
                <div className="container">

                    {/* Centered Header */}
                    <div className="who-header">
                        <motion.div
                            className="badge who-badge"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <span className="badge-dot" />WHO WE ARE
                        </motion.div>
                        <motion.h2
                            className="who-headline"
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            We Don't Just Build —{' '}
                            <span className="gradient-text">We Partner</span>
                        </motion.h2>
                        {!prefersReduced && (
                            <motion.div
                                className="vm-underline"
                                variants={lineGrow}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                style={{ margin: '18px auto 0' }}
                            />
                        )}
                    </div>

                    {/* Body: Text | Divider | Pillars */}
                    <motion.div
                        className="who-body"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Left — Description */}
                        <motion.div className="who-body-left" variants={slideFromLeft}>
                            <p className="who-lead">
                                Groinnovative is a forward-thinking digital solutions company based in Tamil Nadu, focused on helping startups, founders, and growing businesses across India build scalable, high-performing digital products.
                            </p>
                            <p className="who-sub">
                                We don't just design and develop — we partner with businesses to transform ideas into real, impactful solutions. From strategy to deployment, we combine technology, design, and intelligence to deliver products that are not only visually premium but also performance-driven and business-focused.
                            </p>
                            <p className="who-sub">
                                We believe in building solutions that{' '}
                                <strong className="who-highlight">grow with your business</strong>,
                                not just software that works.
                            </p>
                        </motion.div>

                        {/* Center — Vertical Divider */}
                        <motion.div className="who-divider-v" variants={fadeUp} />

                        {/* Right — Numbered Pillars */}
                        <motion.div className="who-body-right" variants={slideFromRight}>
                            <p className="who-pillars-label">What We Stand For</p>
                            <div className="who-pillars">
                                {expertiseItems.map((item, i) => (
                                    <motion.div key={item} className="who-pillar" variants={cardAnim}>
                                        <span className="who-pillar-num">0{i + 1}</span>
                                        <span className="who-pillar-text">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </section>

            {/* ─── 3. VISION • MISSION • CORE VALUES — Combined ────────────── */}
            <section className="section section-alt about-vmv-section">
                <div className="container">
                    <div className="about-vm-header">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="badge"
                            style={{ justifyContent: 'center' }}
                        >
                            <span className="badge-dot" />OUR DIRECTION
                        </motion.div>
                        <motion.h2
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Vision • Mission •{' '}
                            <span className="gradient-text">Core Values</span>
                        </motion.h2>
                        {!prefersReduced && (
                            <motion.div
                                className="vm-underline"
                                variants={lineGrow}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            />
                        )}
                    </div>

                    {/* Vision + Mission — Split Layout */}
                    <motion.div
                        className="split-layout vmv-split"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.div className="vmv-card glass-vmv-card" variants={prefersReduced ? fadeUp : slideFromLeft}>
                            <div className="vmv-icon-wrap">
                                <Eye size={24} strokeWidth={1.8} />
                            </div>
                            <h3 className="vmv-card-title">Our Vision</h3>
                            <p className="vmv-card-desc">
                                To become a globally trusted digital growth partner, empowering businesses with innovative, scalable, and future-ready technology solutions.
                            </p>
                        </motion.div>

                        <motion.div className="vmv-card glass-vmv-card" variants={prefersReduced ? fadeUp : slideFromRight}>
                            <div className="vmv-icon-wrap">
                                <Target size={24} strokeWidth={1.8} />
                            </div>
                            <h3 className="vmv-card-title">Our Mission</h3>
                            <p className="vmv-card-desc">
                                To help businesses grow faster by delivering modern digital experiences, AI-integrated systems, and scalable products through a transparent, agile, and results-driven approach.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Core Values — 3-col grid */}
                    <motion.div
                        className="values-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <p className="values-label">Our Core Values</p>
                    </motion.div>
                    <motion.div
                        className="values-grid"
                        variants={staggerFast}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {coreValues.map(({ icon: Icon, title, desc }) => (
                            <motion.div key={title} variants={cardAnim} className="value-card">
                                <div className="value-icon-wrap">
                                    <Icon size={20} strokeWidth={1.8} />
                                </div>
                                <h4 className="value-title">{title}</h4>
                                <p className="value-desc">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── 4. WHY CHOOSE US — Split Layout ─────────────────────────── */}
            {/*<section className="section about-why-section">
                <div className="container">
                    <motion.div
                        className="split-layout why-split"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.div className="split-left" variants={slideFromLeft}>
                            <div className="badge"><span className="badge-dot" />WHY CHOOSE US</div>
                            <h2 className="split-heading">
                                Why Businesses Choose{' '}
                                <span className="gradient-text">Gro Innovative</span>
                            </h2>
                            <p className="split-desc">
                                We go beyond development — we build growth-focused digital solutions that are engineered for performance, usability, scalability, and long-term business value.
                            </p>
                            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 8, alignSelf: 'flex-start' }}>
                                Start Your Project <span className="arr">→</span>
                            </Link>
                        </motion.div>

                        <motion.div
                            className="split-right checklist-right"
                            variants={stagger}
                        >
                            {whyUsItems.map((item) => (
                                <motion.div
                                    key={item}
                                    variants={prefersReduced ? cardAnim : slideFromRight}
                                    className="why-item"
                                >
                                    <motion.span className="why-check" variants={checkPop}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                    </motion.span>
                                    <span>{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>*/}

            {/* ─── 5. HOW WE WORK — 6-Step Process ────────────────────────── */}
            <section className="section section-alt about-process-section">
                <div className="container">
                    <div className="about-vm-header">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="badge"
                            style={{ justifyContent: 'center' }}
                        >
                            <span className="badge-dot" />HOW IT WORKS
                        </motion.div>
                        <motion.h2
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Our <span className="gradient-text">Process</span>
                        </motion.h2>
                        {!prefersReduced && (
                            <motion.div
                                className="vm-underline"
                                variants={lineGrow}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            />
                        )}
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="team-subtitle"
                        >
                            A clear, agile workflow designed for speed, quality, and long-term growth.
                        </motion.p>
                    </div>

                    <motion.div
                        className="steps-grid"
                        variants={staggerFast}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {processSteps.map((s) => {
                            const Icon = s.icon
                            return (
                                <motion.div key={s.n} variants={cardAnim} className="step-card">
                                    <div className="step-num">{s.n}</div>
                                    <div className="step-icon-badge">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </div>
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ─── 6. OUR APPROACH — Framework ─────────────────────────────── */}
            {/*<section className="section about-approach-section">
                <div className="container">
                    <motion.div
                        className="split-layout approach-split"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.div className="split-left" variants={slideFromLeft}>
                            <div className="badge"><span className="badge-dot" />OUR APPROACH</div>
                            <h2 className="split-heading">
                                From Concept to{' '}
                                <span className="gradient-text">Success</span>
                            </h2>
                            <p className="split-desc">
                                A proven framework that takes your idea from concept to a high-performing digital product. We focus on <strong style={{ color: 'var(--primary)' }}>long-term value</strong>, not just short-term delivery.
                            </p>
                            <div className="approach-flow">
                                {approachSteps.map((step, i) => (
                                    <div key={step.num} className="approach-flow-item">
                                        <span className="approach-flow-label">{step.title}</span>
                                        {i < approachSteps.length - 1 && (
                                            <span className="approach-flow-arrow">→</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div className="split-right approach-cards" variants={staggerFast}>
                            {approachSteps.map((step) => (
                                <motion.div key={step.num} variants={cardAnim} className="approach-card-new">
                                    <span className="approach-num-new">{step.num}</span>
                                    <div className="approach-card-body">
                                        <h4 className="approach-card-title">{step.title}</h4>
                                        <p className="approach-card-desc">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>*/}

            {/* ─── 7. OUR TEAM ──────────────────────────────────────────────── */}
            <section className="section section-alt about-team-section">
                <div className="container">
                    <div className="about-vm-header">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="badge"
                            style={{ justifyContent: 'center' }}
                        >
                            <span className="badge-dot" />OUR TEAM
                        </motion.div>
                        <motion.h2
                            variants={fadeUpBlur}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            The Team Behind <span className="gradient-text">Gro Innovative</span>
                        </motion.h2>
                        {!prefersReduced && (
                            <motion.div
                                className="vm-underline"
                                variants={lineGrow}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            />
                        )}
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="team-subtitle"
                        >
                            A multi-disciplinary team delivering design, development, testing, and deployment with a clean agile workflow.
                        </motion.p>
                    </div>
                    <motion.div
                        className="team-grid"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {teamRoles.map(t => (
                            <motion.div
                                key={t.role}
                                variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } } }}
                                className="team-card"
                            >
                                <CountUp target={t.count} prefersReduced={prefersReduced} />
                                <h3>{t.role}</h3>
                                <p>{t.line}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── GEO FAQ SECTION ────────────────────────────────────────────── */}
            <section className="about-faq-section section" style={{ background: 'var(--card)' }}>
                <div className="container">
                    <div className="section-header services-section-head">
                        <div className="badge"><span className="badge-dot" />COMPANY FAQ</div>
                        <h2>Common Questions About Groinnovative</h2>
                    </div>
                    <motion.div
                        className="about-faq-list"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        {aboutFaqData.map((item, index) => {
                            const isOpen = openFaq === index
                            return (
                                <motion.article className={`about-faq-item card${isOpen ? ' open' : ''}`} key={item.q} variants={cardAnim}>
                                    <button
                                        type="button"
                                        className="about-faq-question"
                                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{item.q}</span>
                                        <span className="about-faq-plus">{isOpen ? '-' : '+'}</span>
                                    </button>
                                    <div className="about-faq-answer-wrap">
                                        <div className="about-faq-answer">
                                            <p>{item.a}</p>
                                        </div>
                                    </div>
                                </motion.article>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ─── 8. ABOUT CTA — Partner-focused ─────────────────────────── */}
            <section className="cta-banner section section-dark">
                <div className="container">
                    <div className="section-header cta-section-head">
                        <div className="badge"><span className="badge-dot" />WORK WITH US</div>
                        <h2>
                            You&apos;ve Seen Who We Are.{' '}
                            <span className="gradient-text">Now Let&apos;s Build Together.</span>
                        </h2>
                        <p>
                            From a dedicated team to a transparent process — Groinnovative is ready to become your long-term digital growth partner.
                        </p>
                    </div>
                    <div className="cta-banner-inner home-cta-panel">
                        <motion.div
                            className="home-cta-copy"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        >
                            <span className="home-cta-eyebrow">Why partner with us</span>
                            <h2 style={{ color: '#fff' }}>A team invested in your growth, not just your project.</h2>
                            <p>
                                You've met our values, our process, and our team. We're not a faceless agency — we're builders, designers, and strategists who stay with you from the first call to the final launch and beyond.
                            </p>
                            <div className="home-cta-points">
                                <span>Dedicated team, not freelancers</span>
                                <span>Transparent at every step</span>
                                <span>Long-term support mindset</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="home-cta-side"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
                        >
                            <div className="home-cta-card card">
                                <span className="home-cta-card-kicker">Ready to start?</span>
                                <strong>Let's turn your vision into a product that performs.</strong>
                                <p>Tell us your goal and where you're stuck. We'll help you map the right approach and show you exactly what the smartest next step looks like.</p>
                                <div className="home-cta-mini-list">
                                    <span>Free initial consultation</span>
                                    <span>NDA protected discussion</span>
                                    <span>Honest, no-pressure scoping</span>
                                </div>
                                <Link to="/contact" className="btn btn-white btn-lg">
                                    Start a Conversation <span className="arr">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
