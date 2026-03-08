import { useState } from 'react'
import useAnimateIn from '../hooks/useAnimateIn'
import './FAQ.css'

const faqs = [
    { q: 'How quickly can I set up Antigraty?', a: 'Most teams have their first workflow running within 15 minutes of signing up. Our onboarding wizard and AI assistant guide you through connecting tools and building your first automation — no technical experience required.' },
    { q: 'Do I need to know how to code?', a: 'Absolutely not. Antigraty is built for non-technical users. You describe what you want in plain language, and the AI builds the workflow for you. Engineers can also access the API and advanced configuration if needed.' },
    { q: 'How many integrations does Antigraty support?', a: 'We support 200+ integrations including Slack, HubSpot, Salesforce, Notion, Google Workspace, Airtable, Stripe, Zapier webhooks, and more. New integrations are added weekly based on user requests.' },
    { q: 'What happens if a workflow fails?', a: "Antigraty monitors every run in real-time. If a step fails, you're immediately notified via Slack or email with a full error report. You can retry, edit, or redirect failed runs with a single click from the dashboard." },
    { q: 'Is my data secure?', a: 'Security is paramount. Antigraty is SOC 2 Type II certified, uses AES-256 encryption at rest and in transit, supports SSO, and never stores your credentials — only encrypted OAuth tokens. Enterprise plans include custom data residency.' },
    { q: 'Can I migrate from another automation tool?', a: 'Yes. We offer free migration assistance for teams coming from tools like Zapier, Make, or n8n. Our success team will map your existing workflows into Antigraty and ensure zero disruption to your operations.' },
]

function FaqItem({ q, a, isOpen, onToggle, delay }) {
    const ref = useAnimateIn(delay)
    return (
        <div className={`faq-item${isOpen ? ' open' : ''} animate-in`} ref={ref}>
            <button className="faq-q" onClick={onToggle}>
                {q}
                <span className="faq-chev">⌄</span>
            </button>
            {/* Smooth height via grid-template-rows trick */}
            <div className="faq-ans-wrap">
                <div className="faq-ans-inner">
                    <div className="faq-ans"><p>{a}</p></div>
                </div>
            </div>
        </div>
    )
}

export default function FAQ() {
    const [open, setOpen] = useState(null)
    const headerRef = useAnimateIn()
    return (
        <section className="faq-section">
            <div className="container">
                <div className="section-header animate-in" ref={headerRef}>
                    <div className="sec-badge">FAQ</div>
                    <h2 className="sec-title">Everything you need to know</h2>
                    <p className="sec-sub">Still curious? Reach out to our team — we reply within minutes.</p>
                </div>
                <div className="faq-list">
                    {faqs.map((f, i) => (
                        <FaqItem
                            key={i} q={f.q} a={f.a}
                            isOpen={open === i}
                            onToggle={() => setOpen(open === i ? null : i)}
                            delay={i * 60}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
