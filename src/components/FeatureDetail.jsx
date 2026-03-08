import useAnimateIn from '../hooks/useAnimateIn'
import './FeatureDetail.css'

function StepsVisual() {
    const steps = [
        { icon: '🔗', label: 'Connect Your Tools' },
        { icon: '✍️', label: 'Describe in Plain English' },
        { icon: '🤖', label: 'AI Builds the Workflow' },
        { icon: '🚀', label: 'Launch & Iterate' },
    ]
    return (
        <div className="steps-visual">
            {steps.map((s, i) => (
                <div key={i}>
                    <div className={`step-item${i === 0 ? ' step-active' : ''}`}>
                        <span>{s.icon}</span>{s.label}
                    </div>
                    {i < steps.length - 1 && <div className="step-line" />}
                </div>
            ))}
        </div>
    )
}

function MetricsVisual() {
    const metrics = [
        { label: 'Hours Saved / Week', value: '20+', color: '#DA4E24' },
        { label: 'Error Reduction', value: '94%', color: '#0098F3' },
        { label: 'Cost Reduction', value: '60%', color: '#8B3CF7' },
        { label: 'Team Velocity', value: '3×', color: '#27c93f' },
    ]
    return (
        <div className="metrics-visual">
            {metrics.map(m => (
                <div className="metric-card" key={m.label}>
                    <span className="metric-val" style={{ color: m.color }}>{m.value}</span>
                    <span className="metric-lbl">{m.label}</span>
                </div>
            ))}
        </div>
    )
}

// Separate component so hook runs at component top-level
function DetailBlock({ block }) {
    const ref = useAnimateIn()
    const pts = block.points
    return (
        <div className={`detail-block${block.reverse ? ' reverse' : ''} animate-in`} ref={ref}>
            <div className="detail-mockup">
                <div className="dm-border">
                    <div className={`dm-inner ${block.visual === 'steps' ? 'dm-steps' : 'dm-metrics'}`}>
                        <div className="dm-glow dm-g1" />
                        <div className="dm-glow dm-g2" />
                        <div className="dm-content">
                            {block.visual === 'steps' ? <StepsVisual /> : <MetricsVisual />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-text">
                <div className="sec-badge" style={{ display: 'inline-block' }}>{block.badge}</div>
                <h3>{block.title.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}</h3>
                <p>{block.sub}</p>
                <ul className="detail-list">
                    {pts.map(pt => <li key={pt}><span className="check">✓</span>{pt}</li>)}
                </ul>
                <a href="#contact" className="btn-grad" style={{ marginTop: 24, display: 'inline-flex' }}
                    onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                    Get Started — Free
                </a>
            </div>
        </div>
    )
}

const blocks = [
    {
        badge: 'How It Works',
        title: 'Simple to start.\nPowerful at scale.',
        sub: 'Antigraty gets you running in minutes — and grows with you from day one. No heavy setup, no engineering resources.',
        points: ['Connect your tools in 60 seconds', 'Describe your workflow in plain English', 'AI builds and deploys the automation', 'Monitor, refine, and expand effortlessly'],
        visual: 'steps',
        reverse: false,
    },
    {
        badge: 'Why It Matters',
        title: 'Stop drowning in\nmanual work.',
        sub: 'The average knowledge worker spends 4+ hours daily on repetitive tasks. Antigraty gives those hours back — permanently.',
        points: ['Save 20+ hours per week per team member', 'Reduce human error by 94% with AI checks', 'Ship faster with zero extra headcount', 'Scale operations without scaling costs'],
        visual: 'metrics',
        reverse: true,
    },
]

export default function FeatureDetail() {
    const headerRef = useAnimateIn()
    return (
        <section className="detail-section" id="how-it-works">
            <div className="container">
                <div className="section-header animate-in" ref={headerRef}>
                    <div className="sec-badge">Deep Dive</div>
                    <h2 className="sec-title">Build, scale and automate<br />your entire operation</h2>
                    <p className="sec-sub">Antigraty removes the invisible tax of manual work — so every person on your team can focus on what machines can't replace.</p>
                </div>
                {blocks.map((b, i) => <DetailBlock key={i} block={b} />)}
            </div>
        </section>
    )
}
