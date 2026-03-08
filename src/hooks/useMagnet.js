import { useRef, useCallback } from 'react'

export default function useMagnet(strength = 0.45) {
    const ref = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) * strength
        const dy = (e.clientY - cy) * strength
        el.style.transform = `translate(${dx}px, ${dy}px)`
        el.style.transition = 'transform 0.15s cubic-bezier(0.23,1,0.32,1)'
    }, [strength])

    const handleMouseLeave = useCallback(() => {
        const el = ref.current
        if (!el) return
        el.style.transform = 'translate(0,0)'
        el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)'
    }, [])

    return { ref, handleMouseMove, handleMouseLeave }
}
