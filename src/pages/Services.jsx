import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ParticleCanvas from '../components/ParticleCanvas'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { PAGE_SEO } from '../seo/seoConfig'
import { breadcrumbSchema, serviceSchemas } from '../seo/schemas'
import { ArrowRight, Lock, Search, ShieldCheck, Sparkles, Wrench, Zap } from 'lucide-react'
import LiveProjects from '../components/sections/LiveProjects'
import './Services.css'

const services = [
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
        title: 'Website Creation',
        desc: 'High-converting websites and landing pages built with modern UI, fast performance, and lead-focused structure.',
        features: ['Conversion-first UX + mobile responsive', 'Lightning performance + Core Web Vitals', 'SEO-ready structure + clean sitemap', 'Analytics + lead tracking setup'],
        buttonText: 'Get a Quote',
        category: 'Web Presence',
        accent: 'Conversion-focused websites',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
        title: 'Software Development',
        desc: 'Custom web and mobile applications engineered for scale, security, and long-term maintainability.',
        features: ['Web apps (React/Next.js) + APIs', 'Admin dashboards + authentication', 'Payment, booking, CRM integrations', 'Scalable architecture + clean code'],
        buttonText: 'Start a Project',
        category: 'Engineering',
        accent: 'Scalable applications',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
        title: 'SEO Optimization',
        desc: 'Technical SEO + on-page optimization to improve rankings, visibility, and qualified traffic.',
        features: ['Technical audit + fixes', 'Keyword strategy + content plan', 'On-page SEO + internal linking', 'Indexing + sitemap + schema setup'],
        buttonText: 'Boost My SEO',
        category: 'Search Growth',
        accent: 'SEO-ready structure',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
        title: 'Digital Marketing',
        desc: 'Growth campaigns designed to generate demand strategy, creatives, ads, and funnels.',
        features: ['Lead-gen funnels + landing pages', 'Google/Meta ads + tracking', 'Social content plan', 'Reporting + optimization cycles'],
        buttonText: 'Grow My Leads',
        category: 'Demand Gen',
        accent: 'Digital growth',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
        title: 'Site Maintenance',
        desc: 'Keep your site secure, fast, and updated with ongoing support and monthly improvements.',
        features: ['Security updates + backups', 'Speed optimization + uptime checks', 'Content updates + bug fixes', 'Monthly reporting + recommendations'],
        buttonText: 'Maintain My Site',
        category: 'Support',
        accent: 'Maintenance and support',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
        title: 'Logo & Poster Creation',
        desc: 'Modern brand visuals designed for trust logos and posters for digital + print.',
        features: ['Logo concepts + brand direction', 'Social media posters + banners', 'Print-ready exports', 'Simple brand consistency guide'],
        buttonText: 'Create My Brand',
        category: 'Brand Assets',
        accent: 'Branding visuals',
    },
]

const heroTrustBadges = [
    { label: 'Fast Delivery', icon: Zap },
    { label: 'NDA Protected', icon: Lock },
    { label: 'SEO-Ready Build', icon: Search },
    { label: 'Post-Launch Support', icon: Wrench },
]

const fadeInUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
}

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}

const revealItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
}

export default function Services() {
    return (
        <div className="page-enter services-page">
            <SEO {...PAGE_SEO.services} />
            <StructuredData data={[
                breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Services', path: '/services' },
                ]),
                ...serviceSchemas,
            ]} />

            <section className="relative w-full page-hero" style={{ padding: 0 }}>
                <ParticleCanvas />
                <div className="page-hero-bg" />
                <div
                    className="pointer-events-none absolute inset-0 z-[1]"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(16,185,129,0.08) 0%, transparent 70%)',
                    }}
                />
                <div className="container relative z-[2] services-hero-shell">
                    <div className="hero-grid-wrapper CenteredLayout services-hero-layout" style={{ minHeight: 'auto' }}>
                        <div className="hero-content centered services-hero-content" style={{ maxWidth: 880 }}>
                            <motion.div
                                className="badge badge-accent services-hero-badge"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                            >
                                <span className="badge-dot" />
                                WHAT WE OFFER
                            </motion.div>

                            <motion.h1
                                className="hero-headline services-hero-title"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.08 }}
                            >
                                <span className="services-hero-line">High Performance Websites,</span>
                                <span className="services-hero-line gradient-text">Software & Growth Systems</span>
                            </motion.h1>

                            <motion.p
                                className="services-hero-text"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.16 }}
                            >
                                From strategy to launch we build conversion focused websites, scalable applications, SEO foundations, and marketing systems designed to generate leads and long-term growth.
                            </motion.p>

                            <motion.div
                                className="services-hero-trust"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.28 }}
                            >
                                {heroTrustBadges.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <span key={item.label} className="services-trust-pill">
                                            <Icon className="services-trust-pill-icon" />
                                            <span>{item.label}</span>
                                        </span>
                                    )
                                })}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services-overview" className="section services-overview-section">
                <div className="container">
                    <div className="section-header services-section-head">
                        <div className="badge"><span className="badge-dot" />Service Overview</div>
                        <h2>
                            <span className="services-section-line">Premium digital services designed</span>
                            <span className="services-section-line">to convert, perform, and scale.</span>
                        </h2>
                        <p>Each service is structured to support business growth, stronger digital systems, and a more reliable launch path.</p>
                    </div>

                    <motion.div
                        className="services-bento"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.14 }}
                    >
                        {services.map((service, index) => (
                            <motion.article
                                key={service.title}
                                className={`service-card service-card-${index + 1}`}
                                variants={revealItem}
                            >
                                <div className="service-card-top">
                                    <span className="service-card-label">{service.category}</span>
                                    <div className="service-card-icon icon-box">{service.icon}</div>
                                </div>

                                <div className="service-card-copy">
                                    <span className="service-card-accent">{service.accent}</span>
                                    <h3>{service.title}</h3>
                                    <p>{service.desc}</p>
                                </div>

                                <ul className="service-card-list">
                                    {service.features.map((feature) => (
                                        <li key={feature}>
                                            <span className="service-card-check">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/contact" className="service-card-cta">
                                    {service.buttonText}
                                    <ArrowRight size={16} />
                                </Link>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            <LiveProjects variant="services" />

            <section className="section services-consultation-section">
                <div className="container">
                    <div className="services-consultation-panel">
                        <motion.div
                            className="services-consultation-copy"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        >
                            <span className="services-consultation-kicker">Consultation / Get a Quote</span>
                            <h2>Have an idea? Let&apos;s turn it into a digital product.</h2>
                            <p>We help shape the right website, software, SEO, growth, and support direction before execution begins.</p>
                        </motion.div>

                        <motion.div
                            className="services-consultation-card"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
                        >
                            <strong>Consultation focus</strong>
                            <ul className="services-consultation-list">
                                <li>Website or software direction</li>
                                <li>SEO and growth planning</li>
                                <li>Launch and support clarity</li>
                            </ul>
                            <Link to="/contact" className="btn btn-white btn-lg">
                                Start Your Project <span className="arr">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
