import useAnimateIn from '../hooks/useAnimateIn'
import './CTA.css'

export default function CTA() {
    const ref = useAnimateIn()

    const scrollTo = (href) => {
        const el = document.querySelector(href)
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
    }

    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-inner animate-in" ref={ref}>
                    {/* glow orbs */}
                    <div className="cta-orb-l" aria-hidden />
                    <div className="cta-orb-r" aria-hidden />

                    <div className="cta-content">
                        <div className="sec-badge" style={{ marginBottom: 28, justifyContent: 'center' }}>Ready to lift off?</div>
                        <h2 className="sec-title" style={{ marginBottom: 18 }}>
                            Stop losing time.<br />Start gaining velocity.
                        </h2>
                        <p className="sec-sub" style={{ marginBottom: 44, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
                            Join 3,000+ teams who've deployed Antigraty to work faster, smarter, and without the drag of manual work.
                        </p>
                        <div className="cta-btns">
                            <a href="#contact" className="btn-grad"
                                onClick={e => { e.preventDefault(); scrollTo('#contact') }}>
                                Get Started — Free <span style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>→</span>
                            </a>
                            <a href="#pricing" className="btn-secondary"
                                onClick={e => { e.preventDefault(); scrollTo('#pricing') }}>
                                View Pricing
                            </a>
                        </div>
                        <p className="cta-fine">No credit card required · Free 14-day trial · Cancel any time</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
