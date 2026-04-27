import { Link } from 'react-router-dom'
import './Footer.css'
import logoImg from '../assets/logo1.png'

const services = [
    { label: 'Website Creation', to: '/services' },
    { label: 'Software Development', to: '/services' },
    { label: 'SEO Optimization', to: '/services' },
    { label: 'Digital Marketing', to: '/services' },
    { label: 'Website Maintenance', to: '/services' },
    { label: 'Logo & Poster Design', to: '/services' },
]
const company = [
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
]
import { Linkedin, Instagram } from 'lucide-react'

const social = [
    { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/groinnovative' },
    { icon: <Instagram size={18} />, label: 'Instagram', href: 'https://www.instagram.com/groinnovative' },
]

export default function Footer() {
    return (
        <footer className="gi-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="gi-logo" onClick={() => window.scrollTo(0, 0)} style={{ marginBottom: 16, display: 'inline-block' }}>
                            <img src={logoImg} alt="Groinnovative software development company logo" className="gi-logo-img" width="274" height="64" loading="lazy" style={{ height: '64px', width: 'auto', display: 'block' }} />
                        </Link>
                        <p className="footer-tagline">
                            Trusted by 30+ clients globally.<br />
                            Websites, software, SEO, and digital growth.
                        </p>
                        <div className="footer-socials">
                            {social.map(s => (
                                <a key={s.label} href={s.href} className="social-icon" aria-label={s.label} target="_blank" rel="noopener noreferrer">{s.icon}</a>
                            ))}
                        </div>
                    </div>
                    {/* Services */}
                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul>
                            {services.map(s => <li key={s.label}><Link to={s.to}>{s.label}</Link></li>)}
                        </ul>
                    </div>
                    {/* Company */}
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            {company.map(c => (
                                <li key={c.label}><Link to={c.to}>{c.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    {/* Contact */}
                    <div className="footer-col">
                        <h4>Get in Touch</h4>
                        <ul className="footer-contact-list">
                            <li>groinnovative@gmail.com</li>
                            <li> +91 9345306018 , +91 9003343806</li>
                            <li> Available Worldwide</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Groinnovative. All rights reserved.</p>
                    <p>Made with ❤️ by Groinnovative</p>
                </div>
            </div>
        </footer>
    )
}
