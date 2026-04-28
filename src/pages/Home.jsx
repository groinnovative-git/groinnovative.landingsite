import { useEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion, useMotionValue, useSpring, useInView, useAnimationFrame } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import ParticleCanvas from '../components/ParticleCanvas'
import EyeFollowIcon from '../components/EyeFollowIcon'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { PAGE_SEO } from '../seo/seoConfig'
import { organizationSchema, localBusinessSchema, websiteSchema, breadcrumbSchema, faqSchema } from '../seo/schemas'
import './Home.css'


/* Count-up */
function CountUp({ target, suffix = '' }) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            obs.disconnect()
            const dur = 1800; const start = performance.now()
            const tick = (now) => {
                const p = Math.min((now - start) / dur, 1)
                const ease = 1 - Math.pow(1 - p, 3)
                el.textContent = Math.floor(ease * target) + suffix
                if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        }, { threshold: 0.5 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [target, suffix])
    return <span ref={ref}>0{suffix}</span>
}

const services = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>, title: 'Website Creation', desc: 'Business websites, company websites, ecommerce platforms, portfolio sites, and landing pages built for speed, SEO, and lead generation.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>, title: 'SEO Optimization', desc: 'Technical SEO, on-page SEO, local SEO, keyword strategy, sitemap setup, indexing support, and Google visibility improvement for businesses.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>, title: 'Software Development', desc: 'Custom web applications, admin panels, dashboards, CRM, ERP, booking systems, billing systems, and business automation software.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>, title: 'Digital Marketing', desc: 'Google Ads, Meta Ads, Instagram promotion, social media marketing, lead generation funnels, and landing page campaigns for business growth.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, title: 'Website Maintenance', desc: 'Website updates, bug fixing, backup, security checks, speed optimization, hosting support, and monthly maintenance for live websites.', color: 'rgba(16, 185, 129, 0.1)' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>, title: 'Logo & Poster Creation', desc: 'Business logos, social media posters, banners, flyers, brochures, and brand visuals designed for digital and print use.', color: 'rgba(16, 185, 129, 0.1)' },
]

const stats = [
    { value: 10, suffix: '+', label: 'Clients Served' },
    { value: 15, suffix: '+', label: 'Projects Delivered' },
    { value: 2, suffix: '+', label: 'Years Experience' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

const whyUs = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, title: 'Fast Execution', desc: 'Agile delivery with clear milestones. Most projects move from concept to launch in weeks not months  with full transparency.' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>, title: 'Enterprise Quality', desc: 'Built with modern architectures, clean code, and rigorous testing standards to ensure long-term performance and reliability.' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></svg>, title: 'Long-Term Partnership', desc: 'From development to maintenance and optimization, we support your growth beyond launch ensuring continuous improvement.' },
]

const testimonials = [
    {
        quote: 'GroInnovative helped us move from a basic online presence to a professional lead-focused website. The process was fast, clear, and reliable.',
        name: 'Arun Prakash',
        role: 'Founder, Local Service Brand',
        metric: 'Better conversion clarity',
    },
    {
        quote: 'Their team understood both design and technical execution. We got a cleaner site, stronger positioning, and faster turnaround than expected.',
        name: 'Mithra Devi',
        role: 'Director, Growing Business',
        metric: 'Launch delivered on time',
    },
    {
        quote: 'What stood out was support after delivery. Changes were handled quickly, and the final output felt polished and business-ready.',
        name: 'Karthik Raj',
        role: 'Operations Lead, SME',
        metric: 'Reliable post-launch support',
    },
]

const homeFaqs = [
    {
        q: 'What services does Groinnovative provide?',
        a: 'Groinnovative provides website creation, custom software development, SEO optimization, digital marketing, website maintenance, logo design, and poster creation for businesses worldwide.',
    },
    {
        q: 'Does Groinnovative build custom software?',
        a: 'Yes. Groinnovative builds custom software such as admin panels, dashboards, business portals, CRM systems, ERP systems, booking systems, and automation tools based on client requirements.',
    },
    {
        q: 'Does Groinnovative provide SEO services?',
        a: 'Yes. Groinnovative provides technical SEO, on-page SEO, keyword planning, local SEO, indexing support, sitemap setup, and search-friendly website structure to improve Google visibility.',
    },
    {
        q: 'Does Groinnovative provide website maintenance?',
        a: 'Yes. Groinnovative supports website updates, bug fixes, backups, speed optimization, security checks, hosting support, and monthly maintenance to keep your site running smoothly.',
    },
    {
        q: 'Where does Groinnovative provide services?',
        a: 'Groinnovative is a global digital services company supporting clients worldwide with web development, software, and marketing solutions.',
    },
    {
        q: 'How much does website development cost?',
        a: 'Website development cost depends on the number of pages, design complexity, features, domain, hosting, content, forms, payment gateway, and support requirements. Contact Groinnovative for a project-specific estimate.',
    },
    {
        q: 'How long does it take to build a website?',
        a: 'The timeline depends on the project scope. A simple business website can be completed in a few weeks, while ecommerce websites, custom software, or feature-rich platforms may take more time depending on complexity.',
    },
    {
        q: 'Can Groinnovative build both website and SEO setup?',
        a: 'Yes. Groinnovative can build a responsive business website with SEO-ready structure, technical setup, sitemap, indexing support, and search-friendly page content — all in one project.',
    },
]

// Framer Motion Variants for Why Section
const fadeInUpBadge = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
const fadeInUpHeading = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.05 } }
}
const fadeInUpP = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.12 } }
}
const staggerContainerLeft = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}
const itemLeft = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
const staggerContainerRight = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}
const itemRight = {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
}
const lineDraw = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
}

const serviceContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}
const servicesSplitOffsets = [
    { x: -180, y: -120, rotate: -8 },
    { x: 0, y: -120, rotate: -3 },
    { x: 180, y: -120, rotate: 7 },
    { x: -180, y: 120, rotate: 5 },
    { x: 0, y: 120, rotate: 2 },
    { x: 180, y: 120, rotate: -6 },
]
const serviceCardAnim = {
    hidden: (custom) => ({
        opacity: 0,
        x: custom.x,
        y: custom.y,
        rotate: custom.rotate,
        scale: 0.82,
    }),
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
}
const homeSectionStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
}
const homeSectionItem = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

export default function Home() {
    useReveal()
    const navigate = useNavigate()
    const [openFaq, setOpenFaq] = useState(0)
    const prefersReducedMotion = useReducedMotion()
    const servicesRef = useRef(null)
    const servicesInView = useInView(servicesRef, { once: true, amount: 0.28 })
    
    // Testimonial Scroll Refs
    const trackRef = useRef(null)
    const isPausedRef = useRef(false)
    const isDraggingRef = useRef(false)
    const x = useMotionValue(0)

    useAnimationFrame((t, delta) => {
        if (prefersReducedMotion) return
        
        let currentX = x.get()
        
        // Auto-scroll logic
        if (!isPausedRef.current && !isDraggingRef.current) {
            // Clamp delta to prevent huge jumps if tab was inactive
            const dt = Math.min(delta, 50)
            currentX -= 0.05 * dt
        }

        // Boundary wrap logic (infinite loop)
        if (trackRef.current) {
            const halfWidth = trackRef.current.scrollWidth / 2
            if (currentX <= -halfWidth) {
                currentX += halfWidth
            } else if (currentX > 0) {
                currentX -= halfWidth
            }
        }
        x.set(currentX)
    })

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

    const handleMouseMove = (e) => {
        if (prefersReducedMotion) return
        const { currentTarget, clientX, clientY } = e
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div className="page-enter home-page">
            <SEO {...PAGE_SEO.home} />
            <StructuredData data={[
                organizationSchema,
                localBusinessSchema,
                websiteSchema,
                breadcrumbSchema([{ name: 'Home', path: '/' }]),
                faqSchema,
            ]} />
            {/* ── HERO ── */}
            <section className="hero-section">
                <ParticleCanvas />
                <div className="hero-left-glow" />
                <div className="container">
                    <div className="hero-grid-wrapper CenteredLayout">
                        <div className="hero-content centered">
                            <div className="hero-eye-mark reveal reveal-delay-1" aria-hidden="true">
                                <EyeFollowIcon />
                            </div>
                            <h1 className="hero-headline reveal reveal-delay-1">
                                <span className="hero-nowrap-line">
                                    Software Development & Digital Solutions
                                </span><br />
                                for Modern Businesses
                            </h1>
                            <p className="hero-sub reveal reveal-delay-2">
                                Groinnovative helps businesses worldwide build modern websites, scalable software applications, SEO-ready platforms, digital marketing campaigns, maintenance workflows, and brand visuals.
                            </p>
                            <div className="hero-actions reveal reveal-delay-3">
                                <Link to="/contact" className="btn btn-primary">
                                    ✔ Start a Project
                                </Link>
                                <Link to="/services" className="btn btn-secondary">
                                    ✔ Explore Services
                                </Link>
                            </div>
                            {/* Floating trust pills */}
                            <div className="trust-pills reveal reveal-delay-4">
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg> Free Consultation</span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg> No Lock-in Contracts</span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" style={{ verticalAlign: 'middle', marginRight: 8 }}><polyline points="20 6 9 17 4 12" /></svg> NDA Protected</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scroll-indicator" aria-hidden="true">
                    {/* <span className="scroll-indicator-label">Scroll Down</span> */}
                    <div className="scroll-indicator-mouse">
                        <div className="scroll-indicator-wheel" />
                    </div>
                </div>
            </section>


            {/* ── STATS ── */}
            <section className="stats-section section-alt">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((s, index) => (
                            <div className="stat-card reveal" key={s.label}>
                                <span className="stat-card-index">0{index + 1}</span>
                                <span className="stat-card-rail" aria-hidden="true" />
                                <div className="stat-card-inner">
                                    <div className="stat-num"><CountUp target={s.value} suffix={s.suffix} /></div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="section services-section">
                <div className="services-particles-wrap" aria-hidden>
                    {/* ParticleCanvas removed — hero already has one; 2 canvases doubled CPU cost */}
                </div>
                <div className="container relative-z" ref={servicesRef}>
                    <div className="section-header">
                        <div className="badge reveal"><span className="badge-dot" />What We Do</div>
                        <h2 className="reveal reveal-delay-1">End-to-End Digital & Software Solutions</h2>
                        <p className="reveal reveal-delay-2">From idea to launch we handle every layer of your digital product.</p>
                    </div>
                    <div className="services-showcase">
                        <motion.div
                            className="services-stack-intro"
                            initial={false}
                            animate={servicesInView ? { opacity: 0, scale: 0.88, y: -12, filter: 'blur(8px)' } : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            aria-hidden="true"
                        >
                            <div className="services-stack-card card services-stack-card-back" />
                            <div className="services-stack-card card services-stack-card-mid" />
                            <div className="services-stack-card card services-stack-card-front">
                                <div className="services-stack-badge">All Services</div>
                                <h3>Web, SEO, Software & Growth</h3>
                                <p>One focused team handling the full digital journey from idea to launch.</p>
                                <div className="services-stack-tags">
                                    <span>Websites</span>
                                    <span>SEO</span>
                                    <span>Software</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                        className="grid-3 services-grid"
                        variants={serviceContainer}
                        initial="hidden"
                        animate={servicesInView ? 'visible' : 'hidden'}
                    >
                        {services.map((s, index) => {
                            const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                            return (
                            <motion.div
                                key={s.title}
                                variants={serviceCardAnim}
                                custom={servicesSplitOffsets[index]}
                                className="card service-card"
                                onClick={() => navigate('/services#' + slug)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="icon-box" style={{ background: s.color, color: 'var(--primary)' }}>{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                <span className="card-link">Explore Service <span className="arr">→</span></span>
                            </motion.div>
                            )
                        })}
                        </motion.div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 48, position: 'relative', zIndex: 1 }}>
                        <Link to="/services" className="btn btn-secondary">View All Services <span className="arr">→</span></Link>
                    </div>
                </div>
            </section>

            {/* ── WHY US ── */}
            <section className="why-section section-alt section" onMouseMove={handleMouseMove}>
                {!prefersReducedMotion && (
                    <motion.div
                        className="mouse-glow-overlay"
                        style={{ x: smoothX, y: smoothY }}
                    />
                )}
                <div className="container">
                    <motion.div variants={fadeInUpBadge} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="badge why-section-badge"><span className="badge-dot" />WHY GROINNOVATIVE</motion.div>
                    <div className="why-inner">
                        <div className="why-text">
                            <motion.h2 variants={fadeInUpHeading} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} style={{ marginBottom: 20 }}>Why Choose Groinnovative for Website and Software Development?</motion.h2>
                            <motion.p variants={fadeInUpP} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} style={{ marginBottom: 32 }}>
                                Groinnovative is a software development and web design company that builds scalable digital systems for businesses worldwide. From custom web applications and responsive business websites to SEO optimization and digital marketing, we combine clean execution with long-term growth support.
                            </motion.p>
                            <motion.div variants={staggerContainerLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
                                {whyUs.map((w) => (
                                    <motion.div variants={itemLeft} key={w.title} className="why-item">
                                        <div className="why-icon" style={{ color: 'var(--primary)' }}>{w.icon}</div>
                                        <div>
                                            <strong>{w.title}</strong>
                                            <p>{w.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="why-visual">
                            <motion.div variants={lineDraw} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="why-line" />
                            <motion.div variants={staggerContainerRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="why-card-stack">
                                <motion.div variants={itemRight} className="why-card wc-1">
                                    <strong>Strategy & Discovery</strong>
                                    <p>Week 1: Strategy, planning & system architecture</p>
                                </motion.div>
                                <motion.div variants={itemRight} className="why-card wc-2">
                                    <strong>Engineering & Development</strong>
                                    <p>Weeks 2–6: Agile development & iterative delivery</p>
                                </motion.div>
                                <motion.div variants={itemRight} className="why-card wc-3">
                                    <strong>Deployment & Scaling</strong>
                                    <p>Week 7+: Deployment, optimization & scaling support</p>
                                </motion.div>
                            </motion.div>
                        </div>
                        <motion.div variants={fadeInUpBadge} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="why-cta-wrap">
                            <Link to="/services" className="btn btn-primary">
                                See How We Work <span className="arr">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="testimonials-section section-alt section">
                <div className="container">
                    <div className="section-header testimonials-head">
                        <div className="badge"><span className="badge-dot" />Testimonials</div>
                        <h2 className="reveal reveal-delay-1">What Clients Remember Working With Us</h2>
                        <p className="reveal reveal-delay-2">Clear communication, reliable delivery, and polished execution are the things clients mention most often after launch.</p>
                    </div>
                </div>
                <motion.div
                    className="testimonials-marquee"
                    variants={homeSectionItem}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div 
                        className="testimonial-row testimonial-row-left"
                        style={{ overflow: 'hidden' }}
                    >
                        <motion.div 
                            className="testimonial-track" 
                            ref={trackRef}
                            style={{ width: 'max-content', display: 'flex', x }}
                            drag="x"
                            dragConstraints={{ left: -999999, right: 999999 }}
                            dragElastic={0}
                            dragMomentum={false}
                            onDragStart={() => { isDraggingRef.current = true }}
                            onDragEnd={() => { isDraggingRef.current = false }}
                            onMouseEnter={() => { isPausedRef.current = true }}
                            onMouseLeave={() => { isPausedRef.current = false }}
                            onTouchStart={() => { isPausedRef.current = true }}
                            onTouchEnd={() => { isPausedRef.current = false }}
                            onTouchCancel={() => { isPausedRef.current = false }}
                        >
                            {[0, 1].map((groupIndex) => (
                                <div
                                    className="testimonial-track-group"
                                    key={`group-${groupIndex}`}
                                    aria-hidden={groupIndex === 1 ? 'true' : undefined}
                                >
                                    {testimonials.map((item, index) => (
                                        <article className="testimonial-scroll-card card" key={`single-${groupIndex}-${item.name}-${index}`}>
                                            <div className="testimonial-mini-top">
                                                <span className="testimonial-metric">{item.metric}</span>
                                            </div>
                                            <p>"{item.quote}"</p>
                                            <div className="testimonial-mini-meta">
                                                <strong>{item.name}</strong>
                                                <span>{item.role}</span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <section className="home-faq-section section">
                <div className="container">
                    <div className="section-header faq-section-head">
                        <div className="badge"><span className="badge-dot" />FAQ</div>
                        <h2 className="reveal reveal-delay-1">Common Questions Before You Start</h2>
                        <p className="reveal reveal-delay-2">Before reaching out, most businesses want clarity on pricing, timelines, support, and what working together will actually look like.</p>
                    </div>
                    <motion.div
                        className="home-faq-intro card"
                        variants={homeSectionItem}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="home-faq-intro-copy">
                            <h3>Need a project-specific answer?</h3>
                            <p>If your requirement is unique, we can review your business case and suggest the right next step without forcing unnecessary complexity.</p>
                        </div>
                        <Link to="/contact" className="btn btn-secondary">Ask Your Question <span className="arr">→</span></Link>
                    </motion.div>
                    <motion.div
                        className="home-faq-list"
                        variants={homeSectionStagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        {homeFaqs.map((item, index) => {
                            const isOpen = openFaq === index
                            return (
                                <motion.article className={`home-faq-item card${isOpen ? ' open' : ''}`} key={item.q} variants={homeSectionItem}>
                                    <button
                                        type="button"
                                        className="home-faq-question"
                                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{item.q}</span>
                                        <span className="home-faq-plus">
                                            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                        </span>
                                    </button>
                                    <div className="home-faq-answer-wrap">
                                        <div className="home-faq-answer">
                                            <p>{item.a}</p>
                                        </div>
                                    </div>
                                </motion.article>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="cta-banner section section-dark">
                <div className="container">
                    <div className="section-header cta-section-head">
                        <div className="badge"><span className="badge-dot" />CTA</div>
                        <h2 className="reveal reveal-delay-1">Start with a Clear Plan, Not Guesswork</h2>
                        <p className="reveal reveal-delay-2">If you already know you need a better website, stronger system, or cleaner execution path, we can help you define the right move.</p>
                    </div>
                    <div className="cta-banner-inner home-cta-panel">
                        <motion.div
                            className="home-cta-copy"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        >
                            <span className="home-cta-eyebrow">What you get</span>
                            <h2 style={{ color: '#fff' }}>A focused consultation that turns your idea into an actionable roadmap.</h2>
                            <p>We help you understand what to build, what to avoid, and what the smartest next step looks like for your business right now.</p>
                            <div className="home-cta-points">
                                <span>Free project discussion</span>
                                <span>Clear scope guidance</span>
                                <span>Launch and support mindset</span>
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
                                <span className="home-cta-card-kicker">Next step</span>
                                <strong>Book a free consultation</strong>
                                <p>Tell us your goal, current blockers, and timeline. We will help you map the right approach and recommend what actually matters first.</p>
                                <div className="home-cta-mini-list">
                                    <span>Website or software direction</span>
                                    <span>SEO and growth suitability</span>
                                    <span>Launch and support clarity</span>
                                </div>
                                <Link to="/contact" className="btn btn-white btn-lg">
                                    Start Your Project <span className="arr">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
