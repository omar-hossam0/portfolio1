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
import moraImg from "../../img/mora.jpeg";
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

        {/* ── Two-Column Layout ────────────────── */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left Column — Profile Card */}
          <div
            className="glass-strong rounded-2xl p-6 glass-reflection card-stretch card-ambient animate-float-subtle w-full max-w-md mx-auto"
            style={{ transitionDelay: "120ms" }}
          >
            <div className="relative group mb-6">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/25 via-transparent to-accent/15 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative gradient-border rounded-2xl p-1 overflow-hidden">
                <img
                  src={moraImg}
                  alt="Omar Hossam portrait"
                  className="w-full aspect-square rounded-xl object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    const fallback = "/img/mora.jpeg";
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

          {/* Right Column — About Me */}
          <div
            className="card-stretch flex flex-col justify-center"
            style={{ transitionDelay: "220ms" }}
          >
            <div className="glass-strong rounded-2xl p-6 md:p-10 glass-reflection card-panel card-ambient relative overflow-hidden flex-1 flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-accent-light to-blue-400 mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Why hire me for your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-blue-300">
                    Project?
                  </span>
                </h3>

                <div className="space-y-4 text-white/70 leading-relaxed text-sm md:text-base">
                  <p>
                    I am Omar Hossam, a dedicated Full-Stack and Mobile
                    Developer with a passion for building robust, scalable
                    applications. With strong foundations in modern web
                    technologies and cross-platform mobile development, I bring
                    ideas to life—from the database architecture up to the user
                    interface.
                  </p>
                  <p>
                    I focus on performance, clean aesthetics, and maintainable
                    code. Over the years, I've tackled complex challenges, built
                    AI-integrated tools, and designed intuitive user
                    experiences. My goal is to add tangible value to every
                    project I take on, ensuring long-term success and user
                    satisfaction.
                  </p>
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="glass-btn-accent px-6 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 group w-max">
                    <Download
                      size={18}
                      className="group-hover:animate-bounce"
                    />
                    Download CV
                  </button>
                  <button
                    onClick={() =>
                      document
                        .querySelector("#projects")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="glass-btn px-6 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 group w-max"
                  >
                    View Projects
                    <ExternalLink
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator removed per request */}
      </div>
    </section>
  );
}
