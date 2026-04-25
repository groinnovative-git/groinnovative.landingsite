import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ParticleCanvas from '../components/ParticleCanvas'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { PAGE_SEO } from '../seo/seoConfig'
import { breadcrumbSchema, serviceSchemas, servicesFaqSchema, servicesFaqData } from '../seo/schemas'
import { ArrowRight, Lock, Search, ShieldCheck, Sparkles, Wrench, Zap } from 'lucide-react'
import LiveProjects from '../components/sections/LiveProjects'
import './Services.css'

const services = [
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
        title: 'Website Creation',
        desc: 'Groinnovative creates responsive, SEO-ready websites for businesses worldwide. The service is suitable for companies, service providers, ecommerce brands, startups, and professionals who need a modern online presence.',
        features: [
            'Responsive website design',
            'Mobile-friendly layout',
            'Fast-loading pages',
            'Enquiry/contact forms',
            'WhatsApp and call integration',
            'SEO-ready page structure',
            'Launch support'
        ],
        whoFor: ['Small businesses', 'Service providers', 'Startups', 'Ecommerce brands', 'Local companies', 'Personal brands'],
        useCases: 'Groinnovative can build business websites, company websites, portfolio websites, landing pages, ecommerce websites, and lead-generation websites.',
        related: ['SEO Optimization', 'Digital Marketing', 'Site Maintenance', 'Logo & Poster Creation'],
        buttonText: 'Get a Quote',
        category: 'Web Presence',
        accent: 'Conversion-focused websites',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
        title: 'Software Development',
        desc: 'Groinnovative develops secure and scalable custom software applications for businesses globally. The service helps companies automate workflows, manage operations, and scale digital infrastructure reliably.',
        features: [
            'Admin panels',
            'Dashboards',
            'CRM systems',
            'ERP systems',
            'Portals',
            'Business automation',
            'Custom integrations'
        ],
        whoFor: ['Growing businesses', 'Enterprise teams', 'Agencies', 'Logistics companies', 'Healthcare providers', 'Educational institutions'],
        useCases: 'Groinnovative can build admin panels, dashboards, CRM systems, ERP systems, customer portals, booking systems, billing systems, and business automation tools.',
        related: ['Website Creation', 'Website Maintenance', 'SEO Optimization'],
        buttonText: 'Start a Project',
        category: 'Engineering',
        accent: 'Scalable applications',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
        title: 'SEO Optimization',
        desc: 'Groinnovative provides comprehensive SEO optimization to improve website visibility and Google rankings for businesses worldwide. The strategy focuses on sustainable organic traffic growth.',
        features: [
            'Technical SEO',
            'On-page SEO',
            'Keyword planning',
            'Local SEO',
            'Indexing setup',
            'Sitemap generation',
            'Structured content'
        ],
        whoFor: ['Local businesses', 'Ecommerce stores', 'B2B service providers', 'Startups', 'Content platforms'],
        useCases: 'Groinnovative SEO services include technical SEO, on-page SEO, keyword planning, local SEO, sitemap setup, indexing support, and search-friendly content structure.',
        related: ['Website Creation', 'Digital Marketing', 'Site Maintenance'],
        buttonText: 'Boost My SEO',
        category: 'Search Growth',
        accent: 'SEO-ready structure',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
        title: 'Digital Marketing',
        desc: 'Groinnovative executes data-driven digital marketing campaigns for brands globally. The focus is on generating qualified leads, maximizing ad spend, and accelerating digital growth.',
        features: [
            'Google Ads',
            'Meta Ads',
            'Social media marketing',
            'Landing pages',
            'Lead generation',
            'Conversion tracking',
            'Campaign optimization'
        ],
        whoFor: ['Service businesses', 'Retailers', 'B2B companies', 'Real estate firms', 'Educational institutes'],
        useCases: 'Groinnovative digital marketing services can support Google Ads, Meta Ads, Instagram promotions, Facebook campaigns, landing page campaigns, and lead generation strategies.',
        related: ['Website Creation', 'SEO Optimization', 'Logo & Poster Creation'],
        buttonText: 'Grow My Leads',
        category: 'Demand Gen',
        accent: 'Digital growth',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
        title: 'Website Maintenance',
        desc: 'Groinnovative ensures long-term stability with ongoing website maintenance, updates, and support for businesses worldwide. The service protects websites from vulnerabilities and performance degradation.',
        features: [
            'Updates',
            'Bug fixes',
            'Backup',
            'Security checks',
            'Speed optimization',
            'Hosting support',
            'Monthly support'
        ],
        whoFor: ['Existing website owners', 'Ecommerce operators', 'Agencies', 'Corporate brands', 'High-traffic portals'],
        useCases: 'Groinnovative maintenance services include website updates, bug fixing, backup, security checks, speed optimization, hosting support, and monthly support.',
        related: ['Website Creation', 'Software Development'],
        buttonText: 'Maintain My Site',
        category: 'Support',
        accent: 'Maintenance and support',
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
        title: 'Logo & Poster Creation',
        desc: 'Groinnovative designs professional brand visuals including logos, posters, and marketing graphics for businesses globally. The service ensures brand identity is consistent and engaging.',
        features: [
            'Logo design',
            'Posters',
            'Banners',
            'Social media creatives',
            'Flyers',
            'Brochures',
            'Brand visuals'
        ],
        whoFor: ['New startups', 'Rebranding companies', 'Event organizers', 'Retail brands', 'Digital marketers'],
        useCases: 'Groinnovative design services include business logos, posters, banners, social media creatives, flyers, brochures, brand visuals, and marketing graphics.',
        related: ['Website Creation', 'Digital Marketing'],
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
    const [openFaq, setOpenFaq] = useState(null)
    return (
        <div className="page-enter services-page">
            <SEO {...PAGE_SEO.services} />
            <StructuredData data={[
                breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Services', path: '/services' },
                ]),
                ...serviceSchemas,
                servicesFaqSchema
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
                                From strategy to launch, we build conversion-focused websites, scalable applications, SEO foundations, and marketing systems designed to generate leads and long-term growth for businesses globally.
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
                            <span className="services-section-line">What services does</span>
                            <span className="services-section-line">Groinnovative provide?</span>
                        </h2>
                        <p>Groinnovative provides website creation, custom software development, SEO optimization, digital marketing, site maintenance, logo design, and poster creation for businesses worldwide.</p>
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
                                    <p style={{ marginBottom: '16px' }}>{service.desc}</p>
                                </div>

                                <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
                                    <div>
                                        <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What is included:</strong>
                                        <ul className="service-card-list">
                                            {service.features.map((feature) => (
                                                <li key={feature}>
                                                    <span className="service-card-check">✓</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Who it is for:</strong>
                                        <ul className="service-card-list" style={{ gap: '6px' }}>
                                            {service.whoFor.map((item) => (
                                                <li key={item} style={{ fontSize: '0.85rem' }}>
                                                    <span className="service-card-check" style={{ fontSize: '1rem' }}>•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '24px' }}>
                                    <p style={{ marginBottom: '8px' }}><strong>Use Cases:</strong> {service.useCases}</p>
                                    <p><strong>Related:</strong> {service.related.join(', ')}</p>
                                </div>

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

            <section className="services-faq-section section">
                <div className="container">
                    <div className="section-header services-section-head">
                        <div className="badge"><span className="badge-dot" />FAQ</div>
                        <h2>Common Questions</h2>
                    </div>
                    <motion.div
                        className="services-faq-list"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        {servicesFaqData.map((item, index) => {
                            const isOpen = openFaq === index
                            return (
                                <motion.article className={`services-faq-item card${isOpen ? ' open' : ''}`} key={item.q} variants={revealItem}>
                                    <button
                                        type="button"
                                        className="services-faq-question"
                                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{item.q}</span>
                                        <span className="services-faq-plus">{isOpen ? '-' : '+'}</span>
                                    </button>
                                    <div className="services-faq-answer-wrap">
                                        <div className="services-faq-answer">
                                            <p>{item.a}</p>
                                        </div>
                                    </div>
                                </motion.article>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

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
