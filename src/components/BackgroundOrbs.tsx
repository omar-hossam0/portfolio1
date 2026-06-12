import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

export default function BackgroundOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const orbs: Orb[] = [];
    const orbColors = [
      "rgba(163, 86, 42, 0.25)",
      "rgba(125, 61, 28, 0.22)",
      "rgba(217, 162, 122, 0.25)",
    ];
    const orbCount = 10;

    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 180 + Math.random() * 260,
        opacity: 0.25 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        color: orbColors[i % orbColors.length],
      });
    }

    let animationId: number;
    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#f7efe4");
      gradient.addColorStop(0.5, "#f2e6d7");
      gradient.addColorStop(1, "#f7efe4");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        const glow = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius,
        );
        glow.addColorStop(0, orb.color);
        glow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.globalAlpha = orb.opacity;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
