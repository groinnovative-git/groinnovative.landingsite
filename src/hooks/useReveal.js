import { useEffect } from 'react';

/**
 * useReveal — scroll-reveal hook shared across all pages.
 *
 * FIX: On hard refresh, IntersectionObserver fires asynchronously *after*
 * the first paint, causing hero elements to flash invisible for a frame.
 * We now use a two-step approach:
 *   1. `requestAnimationFrame` → immediately reveal ALL .reveal elements that
 *      are already inside the viewport on mount (handles hero-above-fold).
 *   2. IntersectionObserver → reveals elements as they scroll into view.
 *
 * This eliminates the misaligned/invisible flash on page refresh while
 * keeping the scroll-triggered reveal for below-fold sections.
 */
export default function useReveal() {
    useEffect(() => {
        const els = Array.from(document.querySelectorAll('.reveal'));
        if (!els.length) return;

        // ── Step 1: Immediately reveal items already in the viewport ──────────
        // Using rAF so the browser has computed layout before we check positions.
        const rafId = requestAnimationFrame(() => {
            els.forEach(el => {
                const rect = el.getBoundingClientRect();
                const inView = rect.top < window.innerHeight && rect.bottom > 0;
                if (inView) el.classList.add('visible');
            });
        });

        // ── Step 2: Watch remaining items with IntersectionObserver ───────────
        // threshold: 0 means "fire as soon as even 1px enters the viewport"
        const obs = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0, rootMargin: '0px 0px -40px 0px' }
        );

        // Only observe elements not already made visible in step 1
        els.forEach(el => {
            if (!el.classList.contains('visible')) obs.observe(el);
        });

        return () => {
            cancelAnimationFrame(rafId);
            obs.disconnect();
        };
    }, []);
}
