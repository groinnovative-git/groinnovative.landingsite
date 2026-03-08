import './Stats.css'
import useCountUp from '../hooks/useCountUp'

const stats = [
    { end: 500, suffix: '+', label: 'Projects Delivered', prefix: '' },
    { end: 98, suffix: '%', label: 'Client Satisfaction', prefix: '' },
    { end: 50, suffix: 'M+', label: 'Lines of Code Written', prefix: '' },
    { end: 12, suffix: '+', label: 'Years of Excellence', prefix: '' },
    { end: 200, suffix: '+', label: 'Global Clients', prefix: '' },
]

function StatItem({ end, suffix, label }) {
    const { count, ref } = useCountUp(end, 2000)
    return (
        <div className="stat-item" ref={ref}>
            <div className="stat-value">
                <span className="stat-num">{count}</span>
                <span className="stat-suf">{suffix}</span>
            </div>
            <div className="stat-label">{label}</div>
        </div>
    )
}

export default function Stats() {
    return (
        <section className="stats-section">
            <div className="stats-line" />
            <div className="container">
                <div className="stats-grid">
                    {stats.map((s, i) => (
                        <StatItem key={i} {...s} />
                    ))}
                </div>
            </div>
            <div className="stats-line" />
        </section>
    )
}
