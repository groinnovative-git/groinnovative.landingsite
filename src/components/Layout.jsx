import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageCircleMore, Phone, Bot, X, Headset } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import TopLoaderBar from './TopLoaderBar'
import FloatingChatbot from './FloatingChatbot'

export default function Layout() {
    const { pathname } = useLocation()
    const [showTop, setShowTop] = useState(false)
    const [showCallOptions, setShowCallOptions] = useState(false)
    const [isChatbotOpen, setIsChatbotOpen] = useState(false)
    const [isFabOpen, setIsFabOpen] = useState(false)
    const [windowSize, setWindowSize] = useState({ 
        w: typeof window !== 'undefined' ? window.innerWidth : 1000, 
        h: typeof window !== 'undefined' ? window.innerHeight : 800 
    })

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
        setIsFabOpen(false)
        setIsChatbotOpen(false)
    }, [pathname])

    // Show scroll-to-top button after 300px scroll & handle window resize
    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 300)
        const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight })
        
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleResize)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
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

            <FloatingChatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />

            <motion.div
                className="floating-contact-stack"
                aria-label="Quick contact actions"
                drag
                dragConstraints={{ 
                    left: -windowSize.w + 64, 
                    right: 20, 
                    top: -windowSize.h + 160, 
                    bottom: 80 
                }}
                dragMomentum={false}
                dragElastic={0}
                style={{ touchAction: 'none' }} // Prevents page scroll while dragging on mobile
            >
                <div className={`fab-menu-items${isFabOpen ? ' open' : ''}`}>
                    {/* Chatbot Toggle */}
                    <button
                        type="button"
                        className={`floating-contact-btn floating-chatbot-btn${isChatbotOpen ? ' active' : ''}`}
                        onClick={() => { setIsChatbotOpen(prev => !prev); setIsFabOpen(false); }}
                        aria-label="Open Chatbot"
                    >
                        <Bot size={20} />
                    </button>

                    {/* Phone Call Wrap */}
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

                    {/* WhatsApp */}
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="floating-contact-btn floating-whatsapp-btn"
                        aria-label="Chat on WhatsApp"
                        onClick={() => setIsFabOpen(false)}
                    >
                        <MessageCircleMore size={18} />
                    </a>
                </div>

                {/* Main FAB Toggle */}
                <button
                    type="button"
                    className={`floating-contact-btn fab-main-btn${isFabOpen ? ' active' : ''}`}
                    onClick={() => {
                        setIsFabOpen(prev => !prev);
                        if (isFabOpen) setShowCallOptions(false);
                    }}
                    aria-label="Contact options"
                >
                    {isFabOpen ? <X size={22} /> : <Headset size={22} />}
                </button>
            </motion.div>

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
