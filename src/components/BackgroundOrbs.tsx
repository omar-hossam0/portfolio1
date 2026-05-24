import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  opacity: number;
  opacityVelocity: number;
  vx: number;
  vy: number;
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

    // Create stars with depth (z-index)
    const stars: Star[] = [];
    const starCount = 300;

    for (let i = 0; i < starCount; i++) {
      const z = Math.random();
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z,
        radius: z * 2,
        opacity: Math.random() * 0.7 + 0.3,
        opacityVelocity: (Math.random() - 0.5) * 0.03,
        vx: (Math.random() - 0.5) * 0.3 * z,
        vy: (Math.random() - 0.5) * 0.3 * z,
      });
    }

    // Sort stars by depth (draw furthest first)
    stars.sort((a, b) => a.z - b.z);

    let animationId: number;
    let time = 0;

    const animate = () => {
      time++;

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(0.5, "#0a0a1a");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        // Update opacity with smooth twinkling
        star.opacity += star.opacityVelocity;
        if (star.opacity > 1) {
          star.opacity = 1;
          star.opacityVelocity *= -1;
        }
        if (star.opacity < 0.2) {
          star.opacity = 0.2;
          star.opacityVelocity *= -1;
        }

        // Subtle movement
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw star with glow effect
        const alpha = star.opacity * star.z;

        // Glow
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Brightest center
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
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
