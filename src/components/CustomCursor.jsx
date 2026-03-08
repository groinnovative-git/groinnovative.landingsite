import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const pos = useRef({ x: 0, y: 0 })
    const ring = useRef({ x: 0, y: 0 })
    const raf = useRef(null)

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none'

        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY }
            const dot = dotRef.current
            if (dot) {
                dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
            }
        }

        const lerp = (a, b, t) => a + (b - a) * t

        const animate = () => {
            ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
            ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
            const r = ringRef.current
            if (r) {
                r.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
            }
            raf.current = requestAnimationFrame(animate)
        }

        // Expand on hoverable elements
        const addHover = (e) => {
            const el = e.target.closest('a,button,[data-cursor="expand"]')
            if (el && ringRef.current) {
                ringRef.current.classList.add('cursor-expand')
            }
        }
        const removeHover = () => {
            if (ringRef.current) ringRef.current.classList.remove('cursor-expand')
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        document.addEventListener('mouseover', addHover)
        document.addEventListener('mouseout', removeHover)
        raf.current = requestAnimationFrame(animate)

        return () => {
            document.body.style.cursor = ''
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', addHover)
            document.removeEventListener('mouseout', removeHover)
            cancelAnimationFrame(raf.current)
        }
    }, [])

    return (
        <>
            <div className="cursor-dot" ref={dotRef} />
            <div className="cursor-ring" ref={ringRef} />
        </>
    )
}
