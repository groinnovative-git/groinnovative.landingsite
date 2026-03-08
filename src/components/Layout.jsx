import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import TopLoaderBar from './TopLoaderBar'

export default function Layout() {
    const { pathname } = useLocation()
    const [showTop, setShowTop] = useState(false)

    // Normalize path (remove trailing slash except for Root)
    const currentPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
    const validRoutes = ['/', '/about', '/services', '/contact']
    const showFooter = validRoutes.includes(currentPath)

    // Scroll to top instantly on route change to prevent "two scroll" jump issue
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
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
