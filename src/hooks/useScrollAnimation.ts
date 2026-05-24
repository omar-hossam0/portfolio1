import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimation {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

export function useScrollAnimation(threshold = 0.1): UseScrollAnimation {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
