import { useEffect, useState } from "react";

function TextAnimator({ text, speed = 40 }: { text: string; speed?: number }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      idx += 1;
      setTyped(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <p className="text-sm md:text-base text-white/40 leading-relaxed min-h-[5rem]">
      {typed}
      <span className="inline-block w-1 ml-1 h-5 bg-white/80 align-middle animate-pulse" />
    </p>
  );
}
import omarImg from "../assets/img/omar.jpeg";
import {
  ArrowDown,
  Download,
  ExternalLink,
  MapPin,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const phrases = ["omar hossam", "Full-Stack Developer", "Mobile Developer"];

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = phrases[phraseIndex];
    let timeoutId: number | undefined;

    if (!isDeleting && typedText === fullText) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 900);
    } else if (isDeleting && typedText === "") {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 300);
    } else {
      const nextLength = typedText.length + (isDeleting ? -1 : 1);
      timeoutId = window.setTimeout(
        () => {
          setTypedText(fullText.slice(0, nextLength));
        },
        isDeleting ? 45 : 90,
      );
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background accent */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="section-container relative z-10 py-20">
        {/* ── Top Greeting Area ────────────────────── */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="glass-accent rounded-full px-5 py-2 mb-6 inline-flex items-center gap-2 animate-fade-in">
            <Sparkles size={14} className="text-accent-light" />
            <span className="text-sm font-medium text-accent-light">
              Welcome to my portfolio
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">
            <span className="text-white">Hi, I'm </span>
            <span className="text-glow bg-gradient-to-r from-accent-light to-blue-300 bg-clip-text text-transparent">
              {typedText}
            </span>
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-6 w-[2px] bg-white/80 align-middle animate-pulse"
            />
          </h1>
          <p className="text-base text-white/50 leading-relaxed max-w-2xl mx-auto">
            I craft elegant digital experiences with modern technologies.
            Passionate about building performant, accessible, and beautifully
            designed applications that make a real impact.
          </p>
        </div>

        {/* ── Three-Stack Card Grid ────────────────── */}
        <div
          className={`hero-grid transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Stack 1 — Profile Card */}
          <div
            className="glass-strong rounded-2xl p-6 glass-reflection card-stretch card-ambient animate-float-subtle"
            style={{ transitionDelay: "120ms" }}
          >
            <div className="relative group mb-6">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/25 via-transparent to-accent/15 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative gradient-border rounded-2xl p-1 overflow-hidden">
                <img
                  src={omarImg}
                  alt="Omar Hossam portrait"
                  className="w-full aspect-square rounded-xl object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    const fallback =
                      "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/omar.jpeg";
                    if (el.src !== fallback) el.src = fallback;
                  }}
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-glow-pulse" />
              <span className="text-sm font-medium text-accent-light">
                Available for work
              </span>
            </div>

            {/* Short roles line (Mobile + Full-Stack) */}
            <div className="mb-4">
              <span className="inline-block text-sm text-white/80">
                Mobile &amp; Full-Stack Web Developer
              </span>
            </div>

            {/* Quick stats — arranged horizontally and wrap on small screens */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 mt-auto">
              {[
                { icon: MapPin, text: "portsaid" },
                { icon: Briefcase, text: "Full-Stack Developer" },
                { icon: Sparkles, text: "Available for new projects" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="glass-accent p-2 rounded-lg">
                    <Icon size={14} className="text-accent-light" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack 2 — Actions */}
          <div className="card-stretch" style={{ transitionDelay: "220ms" }}>
            <div className="glass-strong rounded-2xl p-6 glass-reflection card-panel card-ambient">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="glass-btn-accent w-full px-5 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 group">
                  <Download size={18} className="group-hover:animate-bounce" />
                  Download CV
                </button>
                <button
                  onClick={() =>
                    document
                      .querySelector("#projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="glass-btn w-full px-5 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 group"
                >
                  View Projects
                  <ExternalLink
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>
                <button
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="glass-btn w-full px-5 py-3 rounded-xl font-medium text-white/80 hover:text-white flex items-center justify-center gap-2"
                >
                  Contact Me
                </button>
              </div>
            </div>

            <div className="mt-4 glass rounded-2xl p-5 card-panel card-ambient">
              <h4 className="text-sm font-semibold text-accent-light mb-3">
                Featured
              </h4>
              <p className="text-sm text-white/60">
                Quick highlight or featured project summary can sit here. It
                keeps the center column feeling substantial and connected to
                actions.
              </p>
            </div>
          </div>

          {/* Stack 3 — Quote Card */}
          <div
            className="glass-strong rounded-2xl p-6 md:p-8 glass-reflection card-stretch card-ambient"
            style={{ transitionDelay: "320ms" }}
          >
            <div>
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-accent-light to-accent-dark mb-6" />
              <h3 className="text-xl md:text-2xl font-semibold text-white/80 leading-relaxed mb-4">
                Design Philosophy
              </h3>
            </div>

            <div className="mt-6 pt-4 card-panel">
              <TextAnimator
                text={
                  "I design and build high-quality mobile and web applications focused on performance, usability, and polished visuals. From prototyping to production, I prioritize clean, maintainable code, accessibility, and fast load times. I collaborate closely with designers and teams to turn ideas into reliable, scalable products that delight users and solve real problems."
                }
                speed={18}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator removed per request */}
      </div>
    </section>
  );
}
