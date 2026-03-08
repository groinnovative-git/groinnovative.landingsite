import { useEffect } from 'react'
import useTilt from '../hooks/useTilt'
import useAnimateIn from '../hooks/useAnimateIn'
import './Features.css'


const cards = [
    {
        title: 'Seamless Integrations',
        desc: 'Connect Slack, HubSpot, Notion & 200+ tools — unify your entire stack in one intelligent layer.',
        cls: 'card-blue',
        visual: 'integrations',
        tag: 'Integration Layer',
    },
    {
        title: 'AI-Powered Actions',
        desc: 'Describe what you want done. Antigraty writes the workflow, executes it, and reports back — no code needed.',
        cls: 'card-orange',
        visual: 'prompt',
        tag: 'AI Engine',
    },
    {
        title: 'Visual Workflow Builder',
        desc: 'Drag, connect, and launch automations visually — from simple if-this-then-that to complex multi-step flows.',
        cls: 'card-purple',
        visual: 'workflow',
        tag: 'Builder',
    },
    {
        title: 'Multi-Channel Delivery',
        desc: 'Push results to email, SMS, Slack, webhooks, or any API — your automations reach the right places, every time.',
        cls: 'card-teal',
        visual: 'channels',
        tag: 'Delivery',
    },
]

function MockRow({ icon, label }) {
    return <div className="mock-row"><span className="mock-ico">{icon}</span><span>{label}</span></div>
}

function CardVisual({ type }) {
    if (type === 'integrations') return (
        <div className="feat-mock">
            <MockRow icon="💬" label="Slack — Workspace Connected" />
            <MockRow icon="🎯" label="HubSpot — CRM Synced" />
            <MockRow icon="📝" label="Notion — Docs Updated" />
        </div>
    )
    if (type === 'prompt') return (
        <div className="feat-mock feat-prompt">
            <div className="prompt-box"><span className="pcursor">|</span> Automate my entire pipeline</div>
            <div className="prompt-chips"><span>Trigger</span><span>Execute</span><span>Notify</span></div>
            <div className="prompt-result">✓ Workflow deployed in 1.2s</div>
        </div>
    )
    if (type === 'workflow') return (
        <div className="feat-mock feat-workflow">
            <div className="wf-node">Trigger Event</div>
            <div className="wf-arr">→</div>
            <div className="wf-node wf-accent">AI Process</div>
            <div className="wf-arr">→</div>
            <div className="wf-node">Send Output</div>
        </div>
    )
    return (
        <div className="feat-mock feat-channels">
            <MockRow icon="⚡" label="Workflow Trigger" />
            <MockRow icon="📧" label="Email Delivery" />
            <MockRow icon="💬" label="Slack Notification" />
        </div>
    )
}

function FeatCard({ card, delay }) {
    const tilt = useTilt(10)
    const cardRef = tilt.ref // useTilt ref — we apply animate-in manually below

    // Manually apply animate-in via IntersectionObserver
    useEffect(() => {
        const el = cardRef.current
        if (!el) return
        el.style.opacity = '0'
        el.style.transform = 'translateY(32px)'
        el.style.filter = 'blur(4px)'
        el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, filter 0.5s ease ${delay}ms`
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
                el.style.filter = 'blur(0)'
                obs.disconnect()
            }
        }, { threshold: 0.15 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [cardRef, delay]) // Added cardRef and delay to dependency array for correctness

    return (
        <div
            className={`feat-card ${card.cls}`}
            ref={cardRef}
            onMouseMove={tilt.handleMouseMove}
            onMouseLeave={tilt.handleMouseLeave}
            style={{ transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease, border-color 0.35s ease' }}
        >
            {/* Mouse-tracked glow follows cursor */}
            <div className="card-mouse-glow" />

            <div className="feat-tag">{card.tag}</div>
            <div className="feat-card-img">
                <CardVisual type={card.visual} />
            </div>
            <div className="feat-card-body">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="feat-learn">Learn more →</div>
            </div>
        </div>
    )
}

export default function Features() {
    const headerRef = useAnimateIn()
    return (
        <section className="features-section" id="features">
            <div className="container">
                <div className="section-header animate-in" ref={headerRef}>
                    <div className="sec-badge">Our Services</div>
                    <h2 className="sec-title">Built for teams that demand<br />extraordinary results</h2>
                    <p className="sec-sub">One platform to automate, integrate, and orchestrate — so your team stops wasting time and starts creating impact.</p>
                </div>
                <div className="features-grid">
                    {cards.map((c, i) => <FeatCard key={c.title} card={c} delay={i * 80} />)}
                </div>
            </div>
        </section>
    )
}
