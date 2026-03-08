import { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Zap, Lock, Search, LifeBuoy } from 'lucide-react';

const trustItems = [
    { id: 1, label: 'Fast Delivery', icon: Zap },
    { id: 2, label: 'NDA Protected', icon: Lock },
    { id: 3, label: 'SEO-Ready Build', icon: Search },
    { id: 4, label: 'Post-Launch Support', icon: LifeBuoy },
];

export default function OrbitTrustRing() {
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [radius, setRadius] = useState(200); // Default to desktop radius

    useEffect(() => {
        // Handle reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);
        const listener = (event) => setIsReducedMotion(event.matches);
        mediaQuery.addEventListener('change', listener);

        // Handle window resize for responsive radius
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setRadius(135); // Mobile radius
            } else {
                setRadius(200); // Desktop radius
            }
        };

        handleResize(); // Set initial radius
        window.addEventListener('resize', handleResize);

        return () => {
            mediaQuery.removeEventListener('change', listener);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Mouse parallax setup
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate normalized distance from center (-1 to 1)
        const x = (clientX - centerX) / (width / 2);
        const y = (clientY - centerY) / (height / 2);

        // Max tilt in degrees
        const maxTilt = 15;
        mouseX.set(x * maxTilt);
        mouseY.set(y * maxTilt);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const transform = useMotionTemplate`perspective(1000px) rotateX(${-springY.get()}deg) rotateY(${springX.get()}deg)`;


    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Dotted Orbit Ring Base */}
            <svg className="absolute w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.2)"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                />
            </svg>

            {/* Orbiting Container */}
            <motion.div
                className="absolute w-full h-full flex items-center justify-center transform-gpu"
                animate={{
                    rotate: isReducedMotion ? 0 : 360,
                }}
                transition={
                    isReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                        }
                }
            >
                {/* Badges */}
                {trustItems.map((item, index) => {
                    const Icon = item.icon;
                    // Calculate base angle in radians (starting from top, 0 degrees is mathematically right, so subtract PI/2)
                    const angleDegrees = (index * 360) / trustItems.length;
                    const angleRadians = (angleDegrees - 90) * (Math.PI / 180);

                    const x = radius * Math.cos(angleRadians);
                    const y = radius * Math.sin(angleRadians);

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute pointer-events-auto"
                            style={{
                                x,
                                y,
                            }}
                        >
                            {/* Counter-rotate to keep text upright */}
                            <motion.div
                                animate={{
                                    rotate: isReducedMotion ? 0 : -360,
                                }}
                                transition={
                                    isReducedMotion
                                        ? { duration: 0 }
                                        : {
                                            duration: 35,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }
                                }
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2.5 rounded-full cursor-pointer
                                    bg-white/5 border border-emerald-400/20 backdrop-blur 
                                    text-[12px] lg:text-sm text-white font-medium whitespace-nowrap
                                    hover:bg-white/10 hover:border-emerald-400/40 
                                    shadow-[0_0_15px_rgba(16,185,129,0.15)]
                                    hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]
                                    transition-colors duration-300"
                            >
                                <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-400" />
                                {item.label}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}
