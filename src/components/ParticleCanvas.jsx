import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// BackgroundAnimation — reusable falling-stars canvas component.
//
// KEY FIX: All per-star random values (including `baseSize`) are computed ONCE
// inside the Star constructor and never regenerated on each animation frame.
// Previously, `Math.random()` was called inside the render loop every frame,
// causing visual inconsistency on page refresh and re-navigation.
// ─────────────────────────────────────────────────────────────────────────────
export default function BackgroundAnimation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        // SSR guard — canvas APIs are not available server-side
        if (typeof window === 'undefined') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let animId = null;

        const STAR_COUNT = 3000;
        const FOCAL_LENGTH = 3000;

        /** @type {Star[]} */
        let stars = [];
        const targetRotation = { x: 0, y: 0 };
        const currentRotation = { x: 0, y: 0 };

        // ── Event listeners ───────────────────────────────────────────────────
        const onMouseMove = (e) => {
            targetRotation.x = (e.clientX / width - 0.5) * 0.4;
            targetRotation.y = (e.clientY / height - 0.5) * 0.4;
        };

        const onResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initStars(); // re-seed on genuine resize
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        // ── Star class ────────────────────────────────────────────────────────
        class Star {
            constructor() {
                // All random values computed exactly ONCE per star lifecycle.
                // Do NOT call Math.random() anywhere in the animate() loop.
                this.x = (Math.random() - 0.5) * 3000;
                this.y = (Math.random() - 0.5) * 3000;
                this.z = Math.random() * 2000;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.vz = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random();
                this.twinkleSpeed = 0.01 + Math.random() * 0.03;
                this.baseOpacity = 2 + Math.random() * 0.6;
                this.isGreen = Math.random() > 0.8;
                // ✅ FIX: pre-compute base size once — no Math.random() in the loop
                this.baseSize = 1.2 + Math.random() * 0.5;

                // Projection outputs (overwritten each frame, no random involved)
                this.screenX = 0;
                this.screenY = 0;
                this.scale = 1;
                this.depthOpacity = 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;
                if (this.z < 1) this.z = 2000;
                if (this.z > 2000) this.z = 1;
                if (Math.abs(this.x) > 1500) this.x *= -0.99;
                if (Math.abs(this.y) > 1500) this.y *= -0.99;
                this.opacity += this.twinkleSpeed;
                if (this.opacity > 1 || this.opacity < 0) this.twinkleSpeed *= -1;
            }

            project(rx, ry) {
                const cosRy = Math.cos(ry);
                const sinRy = Math.sin(ry);
                const z1 = this.z * cosRy - this.x * sinRy;
                const x1 = this.z * sinRy + this.x * cosRy;
                const cosRx = Math.cos(rx);
                const sinRx = Math.sin(rx);
                const y2 = this.y * cosRx - z1 * sinRx;
                const z2 = this.y * sinRx + z1 * cosRx;
                const scale = FOCAL_LENGTH / (FOCAL_LENGTH + z2);
                this.screenX = x1 * scale + width / 2;
                this.screenY = y2 * scale + height / 2;
                this.scale = scale;
                this.depthOpacity = Math.max(0, (1 - z2 / 2000) * this.baseOpacity);
            }
        }

        // ── Initialisation ────────────────────────────────────────────────────
        function initStars() {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star());
            }
        }

        // ── Render loop ───────────────────────────────────────────────────────
        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.shadowBlur = 0; // keep shadowBlur off for performance

            currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
            currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

            for (const s of stars) {
                s.update();
                s.project(currentRotation.y, currentRotation.x);

                // ✅ FIX: use pre-computed baseSize — no Math.random() here
                const size = s.baseSize * s.scale;
                const alpha = s.depthOpacity * s.opacity;

                ctx.beginPath();
                ctx.arc(s.screenX, s.screenY, size, 0, Math.PI * 2);
                ctx.fillStyle = s.isGreen
                    ? `rgba(16, 185, 129, ${alpha})`
                    : `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(animate);
        }

        // ── Bootstrap ─────────────────────────────────────────────────────────
        initStars();
        animId = requestAnimationFrame(animate);

        // ── Cleanup (runs on unmount) ──────────────────────────────────────────
        return () => {
            if (animId !== null) cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []); // empty deps → runs once on mount, cleans up on unmount

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.9,
                mixBlendMode: 'screen',
            }}
        />
    );
}

