import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MessageCircleMore, Phone } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import TopLoaderBar from './TopLoaderBar'
import FloatingChatbot from './FloatingChatbot'

export default function Layout() {
    const { pathname } = useLocation()
    const [showTop, setShowTop] = useState(false)
    const [showCallOptions, setShowCallOptions] = useState(false)

    const whatsappNumber = '919361304808'
    const whatsappText = encodeURIComponent('Hello Gro Innovative, I would like to know more about your services.')
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

    const primaryPhone = '+919345306018'
    const secondaryPhone = '+919363461876'

    // Normalize path (remove trailing slash except for Root)
    const currentPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
    const validRoutes = ['/', '/about', '/services', '/contact']
    const showFooter = validRoutes.includes(currentPath)

    // Scroll to top instantly on route change to prevent "two scroll" jump issue
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        setShowCallOptions(false)
    }, [pathname])

    // Show scroll-to-top button after 300px scroll
    useEffect(() => {
        const fn = () => setShowTop(window.scrollY > 300)
        window.addEventListener('scroll', fn, { passive: true })
        return () => window.removeEventListener('scroll', fn)
    }, [])

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <>
            <TopLoaderBar />
            <Navbar />
            <main>
                <Outlet />
            </main>

            {showFooter && <Footer />}

            <FloatingChatbot />

            <div className="floating-contact-stack" aria-label="Quick contact actions">
                <div className={`floating-call-wrap${showCallOptions ? ' open' : ''}`}>
                    <div className="floating-call-panel" role="dialog" aria-label="Call options">
                        <a href={`tel:${primaryPhone}`} className="floating-call-link">
                            <span className="floating-call-label">Primary Number</span>
                            <strong>9345306018</strong>
                        </a>
                        <a href={`tel:${secondaryPhone}`} className="floating-call-link">
                            <span className="floating-call-label">Secondary Number</span>
                            <strong>9363461876</strong>
                        </a>
                    </div>
                    <button
                        type="button"
                        className={`floating-contact-btn floating-call-btn${showCallOptions ? ' active' : ''}`}
                        onClick={() => setShowCallOptions((prev) => !prev)}
                        aria-label="Show call numbers"
                        aria-expanded={showCallOptions}
                    >
                        <Phone size={20} />
                    </button>
                </div>

                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floating-contact-btn floating-whatsapp-btn"
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircleMore size={18} />
                </a>
            </div>

            {/* Scroll-to-top FAB */}
            <button
                className={`scroll-top-btn${showTop ? ' visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                </svg>
            </button>
        </>
    )
}
