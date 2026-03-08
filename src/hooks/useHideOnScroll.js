import { useState, useEffect, useRef } from 'react'

/**
 * useHideOnScroll
 * - Hides navbar when scrolling DOWN past `threshold` px
 * - Shows navbar when scrolling UP
 * - Ignores scroll deltas < `delta` px to prevent jitter
 * - Always shows navbar when scrollY <= `threshold`
 * - Uses passive listener + requestAnimationFrame for performance
 */
export function useHideOnScroll({ threshold = 120, delta = 10 } = {}) {
    const [hidden, setHidden] = useState(false)
    const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
    const ticking = useRef(false)

    useEffect(() => {
        const updateScroll = () => {
            const currentScrollY = window.scrollY
            const diff = currentScrollY - lastScrollY.current

            if (currentScrollY <= threshold) {
                setHidden(false)
            } else if (Math.abs(diff) >= delta) {
                if (diff > 0) {
                    setHidden(true) // scrolling down
                } else {
                    setHidden(false) // scrolling up
                }
                lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0
            }
            ticking.current = false
        }

        const onScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(updateScroll)
                ticking.current = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [threshold, delta])

    return hidden
}
