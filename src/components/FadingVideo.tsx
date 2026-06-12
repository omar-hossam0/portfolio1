import { useEffect, useRef, type CSSProperties } from "react";

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: CSSProperties;
}

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number>();
  const timeoutRef = useRef<number>();
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fadeTo = (target: number, duration: number) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      const start = Number.parseFloat(video.style.opacity || "0") || 0;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        video.style.opacity = String(start + (target - start) * eased);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    };

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => undefined);
    };

    const handleLoadedData = () => {
      video.style.opacity = "0";
      playVideo();
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (
        !fadingOutRef.current &&
        video.duration &&
        video.duration - video.currentTime <= FADE_OUT_LEAD &&
        video.duration - video.currentTime > 0
      ) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      timeoutRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        playVideo();
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ ...style, opacity: 0 }}
    />
  );
}
