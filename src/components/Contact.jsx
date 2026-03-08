import { useState } from 'react'
import useAnimateIn from '../hooks/useAnimateIn'
import './Contact.css'

export default function Contact() {
    const [status, setStatus] = useState('idle')
    const headerRef = useAnimateIn()
    const formRef = useAnimateIn(100)

    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus('sending')
        setTimeout(() => {
            setStatus('sent')
            setTimeout(() => { setStatus('idle'); e.target.reset() }, 3500)
        }, 1500)
    }

    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <div className="section-header animate-in" ref={headerRef}>
                    <div className="sec-badge">Get In Touch</div>
                    <h2 className="sec-title">Let's remove your friction together</h2>
                    <p className="sec-sub">Tell us about your workflow challenges. We'll respond with a plan not a sales pitch.</p>
                </div>
                <div className="contact-wrap">
                    <div className="contact-info">
                        <InfoItem icon="✉" title="Email" value="hello@antigraty.com" href="mailto:hello@antigraty.com" />
                        <InfoItem icon="💬" title="Live Chat" value="Chat with us on Slack" href="#" />
                        <InfoItem icon="📍" title="Based In" value="Global — Remote First" />
                        <InfoItem icon="🕐" title="Response Time" value="Under 4 hours, guaranteed" />
                        <div className="contact-socials">
                            <a href="#" className="soc-link">Twitter</a>
                            <a href="#" className="soc-link">LinkedIn</a>
                            <a href="#" className="soc-link">GitHub</a>
                        </div>
                    </div>
                    <form className="contact-form animate-in" ref={formRef} onSubmit={handleSubmit}>
                        <div className="form-row">
                            <FormGroup label="Your Name *" type="text" name="name" placeholder="Alex Johnson" required />
                            <FormGroup label="Work Email *" type="email" name="email" placeholder="alex@company.com" required />
                        </div>
                        <div className="form-row">
                            <FormGroup label="Company" type="text" name="company" placeholder="Your Company Inc." />
                            <div className="form-grp">
                                <label>Team Size</label>
                                <select name="size">
                                    <option value="">Select size</option>
                                    <option>1–10 people</option>
                                    <option>11–50 people</option>
                                    <option>51–200 people</option>
                                    <option>200+ people</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>What's your biggest workflow challenge? *</label>
                            <textarea name="message" rows={5} placeholder="E.g., We spend 3 hours/day manually moving data between tools and it's killing our velocity..." required />
                        </div>
                        <button type="submit" className="btn-grad form-btn" disabled={status === 'sending'}>
                            {status === 'idle' && 'Send Message →'}
                            {status === 'sending' && 'Sending...'}
                            {status === 'sent' && '✓ Sent! We\'ll be in touch.'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

function InfoItem({ icon, title, value, href }) {
    return (
        <div className="info-item">
            <div className="info-icon">{icon}</div>
            <div>
                <h4>{title}</h4>
                {href ? <a href={href}>{value}</a> : <span>{value}</span>}
            </div>
        </div>
    )
}

function FormGroup({ label, type, name, placeholder, required }) {
    return (
        <div className="form-grp">
            <label>{label}</label>
            <input type={type} name={name} placeholder={placeholder} required={required} />
        </div>
    )
}
