import { useEffect, useRef, useState } from 'react'

export default function useCountUp(end, duration = 1800, startOnVisible = true) {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (!startOnVisible) { startCount(); return }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasStarted) {
                setHasStarted(true)
                startCount()
                observer.disconnect()
            }
        }, { threshold: 0.5 })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [hasStarted])

    function startCount() {
        const startTime = performance.now()
        const endVal = parseFloat(end.toString().replace(/[^0-9.]/g, ''))
        function tick(now) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setCount(Math.floor(eased * endVal))
            if (progress < 1) requestAnimationFrame(tick)
            else setCount(endVal)
        }
        requestAnimationFrame(tick)
    }

    return { count, ref }
}
