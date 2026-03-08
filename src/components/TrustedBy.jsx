import './TrustedBy.css'

const logos = [
    'Google', 'Microsoft', 'Stripe', 'Vercel', 'Notion',
    'Figma', 'Shopify', 'Airbnb', 'GitHub', 'Linear',
]

export default function TrustedBy() {
    const doubled = [...logos, ...logos]
    return (
        <section className="trusted-section">
            <p className="trusted-label">Trusted by world-class teams</p>
            <div className="ticker-wrap">
                <div className="ticker-track">
                    {doubled.map((name, i) => (
                        <div className="ticker-item" key={i}>
                            <span className="ticker-dot" />
                            {name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
