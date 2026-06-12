import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  drift: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / 4200);
      stars = Array.from({ length: Math.max(120, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.45 + 0.25,
        alpha: Math.random() * 0.65 + 0.2,
        speed: Math.random() * 0.18 + 0.04,
        drift: Math.random() * 0.12 - 0.06,
      }));
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.16,
        0,
        width * 0.5,
        height * 0.16,
        Math.max(width, height) * 0.76,
      );
      glow.addColorStop(0, "rgba(255,255,255,0.08)");
      glow.addColorStop(0.35, "rgba(120,150,255,0.04)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.y += star.speed;
        star.x += star.drift;
        star.alpha += Math.sin(performance.now() * 0.001 + star.x) * 0.0015;

        if (star.y > height + 8) star.y = -8;
        if (star.x > width + 8) star.x = -8;
        if (star.x < -8) star.x = width + 8;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.18, Math.min(star.alpha, 0.92))})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
