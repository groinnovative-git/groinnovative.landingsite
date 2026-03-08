import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './TopLoaderBar.css'

export default function TopLoaderBar() {
    const { pathname } = useLocation()
    const [phase, setPhase] = useState('') // '' | 'loading' | 'done' | 'fade-out'
    const prevPath = useRef(pathname)
    const timeouts = useRef([])

    useEffect(() => {
        // Skip on initial mount
        if (prevPath.current === pathname) return
        prevPath.current = pathname

        // Clear any pending timeouts
        timeouts.current.forEach(clearTimeout)
        timeouts.current = []

        // Phase 1: loading (bar expands to 85%)
        setPhase('loading')

        // Phase 2: done (bar fills to 100%)
        timeouts.current.push(setTimeout(() => setPhase('done'), 400))

        // Phase 3: fade out
        timeouts.current.push(setTimeout(() => setPhase('fade-out'), 600))

        // Phase 4: reset
        timeouts.current.push(setTimeout(() => setPhase(''), 1000))

        return () => timeouts.current.forEach(clearTimeout)
    }, [pathname])

    if (!phase) return null

    return <div className={`top-loader-bar ${phase}`} />
}
