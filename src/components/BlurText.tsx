import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
}

export default function BlurText({ text, className }: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={`flex flex-wrap justify-center row-gap-tight ${className ?? ""}`}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          style={{ marginRight: "0.28em" }}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={
            visible
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : undefined
          }
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: (index * 100) / 1000,
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
