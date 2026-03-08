import useAnimateIn from '../hooks/useAnimateIn'
import './Testimonials.css'

const testimonials = [
    { initials: 'JT', name: 'James Thornton', role: 'VP of Operations, FlowStack', stars: 5, text: '"Antigraty cut our manual reporting time from 12 hours per week to under 30 minutes. Absolutely game-changing. I wish we had found this two years ago."' },
    { initials: 'SM', name: 'Sophia Mendes', role: 'Head of Growth, OrbitalHQ', stars: 5, text: '"We connected Salesforce, Intercom, and Slack in 15 minutes. Antigraty just... works. Our team gained back nearly 25% of their capacity."' },
    { initials: 'RK', name: 'Rahul Kapoor', role: 'CTO, PivotHQ', stars: 5, text: '"I was skeptical about no-code automation tools, but Antigraty\'s AI is in a different league. It actually understands context and builds smart, reliable workflows."' },
    { initials: 'LP', name: 'Lena Park', role: 'Founder, Streamline.io', stars: 5, text: '"We scaled from 50 to 500 clients without hiring a single extra operations person. Antigraty is the reason. Exceptional product, exceptional support."' },
    { initials: 'DO', name: 'Daniel Osei', role: 'CMO, BrightBase', stars: 5, text: '"Our marketing campaigns now run themselves. Lead scoring, email sequences, Slack alerts — all automated with Antigraty. Conversion is up 40%."' },
    { initials: 'AY', name: 'Aisha Yusuf', role: 'COO, VelocityApp', stars: 5, text: '"Antigraty is the closest thing to having a digital operations team. It never sleeps, never misses a trigger, and keeps improving as we add more workflows."' },
]

export default function Testimonials() {
    const headerRef = useAnimateIn()
    return (
        <section className="testi-section" id="testimonials">
            <div className="container">
                <div className="section-header animate-in" ref={headerRef}>
                    <div className="sec-badge">Client Reviews</div>
                    <h2 className="sec-title">Loved by teams who move fast</h2>
                    <p className="sec-sub">From scrappy startups to scaling enterprises — here's what they say after switching to Antigraty.</p>
                </div>
                <div className="testi-grid">
                    {testimonials.map((t, i) => (
                        <TestiCard key={i} {...t} delay={i * 70} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function TestiCard({ initials, name, role, stars, text, delay }) {
    const ref = useAnimateIn(delay)
    return (
        <div className="testi-card animate-in" ref={ref}>
            <div className="testi-avatar">{initials}</div>
            <h4 className="testi-name">{name}</h4>
            <p className="testi-role">{role}</p>
            <div className="testi-stars">{'★'.repeat(stars)}</div>
            <p className="testi-text">{text}</p>
        </div>
    )
}
