import { useRef, useCallback } from 'react'

export default function useTilt(maxTilt = 12) {
    const ref = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width  // 0–1
        const y = (e.clientY - rect.top) / rect.height  // 0–1
        const rotateX = (0.5 - y) * maxTilt * 2
        const rotateY = (x - 0.5) * maxTilt * 2
        const glowX = Math.round(x * 100)
        const glowY = Math.round(y * 100)
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`
        el.style.setProperty('--glow-x', `${glowX}%`)
        el.style.setProperty('--glow-y', `${glowY}%`)
    }, [maxTilt])

    const handleMouseLeave = useCallback(() => {
        const el = ref.current
        if (!el) return
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }, [])

    return { ref, handleMouseMove, handleMouseLeave }
}
