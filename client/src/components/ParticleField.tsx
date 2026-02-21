import { useEffect, useRef, memo } from "react";
import type { MousePosition } from "@/hooks/use-mouse-position";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface ParticleFieldProps {
  mousePosition: MousePosition;
}

const DESKTOP_COUNT = 60;
const MOBILE_COUNT = 35;
const DESKTOP_CONNECT_DIST = 150;
const MOBILE_CONNECT_DIST = 100;
const MOUSE_ATTRACT_RADIUS = 200;
const DAMPING = 0.98;
const LINE_COLOR = "hsla(173,80%,40%,0.15)";

function createParticles(count: number, w: number, h: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const isTeal = Math.random() > 0.2;
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 1.5 + 1,
      color: isTeal
        ? "hsla(173,80%,40%,0.6)"
        : "hsla(38,92%,50%,0.4)",
    });
  }
  return particles;
}

export const ParticleField = memo(function ParticleField({
  mousePosition,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef(mousePosition);
  const sizeRef = useRef({ w: 0, h: 0 });

  // Keep mouse ref in sync without re-renders
  mouseRef.current = mousePosition;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const particleCount = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
    const connectDist = isMobile ? MOBILE_CONNECT_DIST : DESKTOP_CONNECT_DIST;
    const connectDistSq = connectDist * connectDist;

    // Size canvas to full viewport with devicePixelRatio
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      // Reinitialize particles on resize
      particlesRef.current = createParticles(particleCount, w, h);
    };

    window.addEventListener("resize", resize);
    resize();

    // Animation loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse attraction (desktop only)
        if (!isMobile) {
          const mouse = mouseRef.current;
          const dx = mouse.clientX - p.x;
          const dy = mouse.clientY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_ATTRACT_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_ATTRACT_RADIUS) * 0.02;
            p.vx += dx * force;
            p.vy += dy * force;
          }
        }

        // Apply velocity with damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap at edges
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connection lines (desktop only)
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const cdx = p.x - q.x;
            const cdy = p.y - q.y;
            const distSq = cdx * cdx + cdy * cdy;
            if (distSq < connectDistSq) {
              const alpha = 0.15 * (1 - distSq / connectDistSq);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = LINE_COLOR.replace("0.15", alpha.toFixed(3));
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      aria-hidden="true"
    />
  );
});
