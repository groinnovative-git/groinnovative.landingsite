import { createContext, useContext, useRef, useCallback } from 'react'

const TransitionContext = createContext(null)
export function usePageTransition() { return useContext(TransitionContext) }

const FADE_IN_MS = 220   // how fast the veil covers the viewport
const FADE_OUT_MS = 380   // how fast the veil reveals new content

export function TransitionProvider({ children }) {
    const veilRef = useRef(null)
    const isAnimating = useRef(false)

    const triggerTransition = useCallback((callback) => {
        if (isAnimating.current) return
        isAnimating.current = true
        const veil = veilRef.current
        if (!veil) { callback?.(); isAnimating.current = false; return }

        // ── Phase 1: Fade veil IN fast (content disappears) ──
        veil.style.transition = `opacity ${FADE_IN_MS}ms cubic-bezier(0.4, 0, 1, 1)`
        veil.style.opacity = '1'
        veil.style.visibility = 'visible'

        setTimeout(() => {
            // ── Phase 2: Instant jump while veil covers viewport ──
            callback?.()

            // ── Phase 3: Mark target section, fade veil OUT slow ──
            requestAnimationFrame(() => {
                // Inject staggered entrance on the new section
                const sections = document.querySelectorAll('section[id]')
                let targetSection = null
                let minDist = Infinity
                sections.forEach(sec => {
                    const dist = Math.abs(sec.getBoundingClientRect().top)
                    if (dist < minDist) { minDist = dist; targetSection = sec }
                })
                if (targetSection) {
                    targetSection.classList.remove('section-enter')
                    void targetSection.offsetWidth
                    targetSection.classList.add('section-enter')
                    setTimeout(() => targetSection.classList.remove('section-enter'), 900)
                }

                // Fade veil out
                veil.style.transition = `opacity ${FADE_OUT_MS}ms cubic-bezier(0.2, 0, 0, 1)`
                veil.style.opacity = '0'

                setTimeout(() => {
                    veil.style.visibility = 'hidden'
                    isAnimating.current = false
                }, FADE_OUT_MS + 30)
            })
        }, FADE_IN_MS + 10)
    }, [])

    return (
        <TransitionContext.Provider value={triggerTransition}>
            {children}
            {/* Minimal veil — NO strips, just a clean darkening */}
            <div
                ref={veilRef}
                className="transition-veil"
                aria-hidden
                style={{ opacity: 0, visibility: 'hidden' }}
            />
        </TransitionContext.Provider>
    )
}
