import { useState } from 'react'
import useAnimateIn from '../hooks/useAnimateIn'
import './Pricing.css'

const plans = [
    {
        tier: 'Starter',
        mPrice: '$29', yPrice: '$23',
        desc: 'Perfect for solo founders and small teams exploring automation.',
        features: ['Up to 5 active workflows', '500 automation runs/month', '20+ integrations', 'Email & Slack notifications', 'Community support'],
        cta: 'Start Free Trial',
        featured: false,
    },
    {
        tier: 'Growth',
        mPrice: '$89', yPrice: '$71',
        desc: 'For fast-moving teams who need automation at scale.',
        features: ['Unlimited workflows', '10,000 runs/month', '100+ integrations', 'AI workflow builder', 'Priority support (24h)', 'Analytics & reporting', 'Team collaboration'],
        cta: 'Get Started',
        featured: true,
    },
    {
        tier: 'Enterprise',
        mPrice: 'Custom', yPrice: 'Custom',
        desc: 'Full-scale automation with dedicated success management.',
        features: ['Unlimited runs & workflows', 'Custom integrations', 'Dedicated AI training', 'SSO & advanced security', 'SLA guarantee', '24/7 dedicated support', 'On-boarding & training'],
        cta: 'Contact Sales',
        featured: false,
    },
]

export default function Pricing() {
    const [yearly, setYearly] = useState(false)
    const headerRef = useAnimateIn()
    return (
        <section className="pricing-section" id="pricing">
            <div className="container">
                <div className="section-header animate-in" ref={headerRef}>
                    <div className="sec-badge">Pricing</div>
                    <h2 className="sec-title">Straightforward pricing.<br />No surprises.</h2>
                    <p className="sec-sub">Start free. Scale as you grow. Cancel any time.</p>
                    <div className="p-toggle">
                        <span className={`p-lbl${!yearly ? ' p-active' : ''}`}>Monthly</span>
                        <label className="p-switch">
                            <input type="checkbox" checked={yearly} onChange={() => setYearly(v => !v)} />
                            <span className="p-slider" />
                        </label>
                        <span className={`p-lbl${yearly ? ' p-active' : ''}`}>
                            Yearly <em className="save-badge">Save 20%</em>
                        </span>
                    </div>
                </div>
                <div className="pricing-grid">
                    {plans.map((p, i) => (
                        <PriceCard key={i} plan={p} yearly={yearly} delay={i * 80} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function PriceCard({ plan, yearly, delay }) {
    const ref = useAnimateIn(delay)
    const price = yearly ? plan.yPrice : plan.mPrice
    return (
        <div className={`p-card${plan.featured ? ' p-featured' : ''} animate-in`} ref={ref}>
            {plan.featured && <div className="p-popular-pill">Most Popular</div>}
            <p className="p-tier">{plan.tier}</p>
            <div className="p-amount">
                {price !== 'Custom' && <span className="p-curr">$</span>}
                <span className="p-num">{price.replace('$', '')}</span>
                {price !== 'Custom' && <span className="p-per">/mo</span>}
            </div>
            <p className="p-desc">{plan.desc}</p>
            <ul className="p-list">
                {plan.features.map(f => <li key={f}><span className="p-tick">✓</span>{f}</li>)}
            </ul>
            <a
                href="#contact"
                className={plan.featured ? 'p-btn p-btn-grad' : 'p-btn p-btn-secondary'}
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
                {plan.cta}
            </a>
        </div>
    )
}
