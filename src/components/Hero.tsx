import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moraImg from "../../img/mora.jpeg";
import {
  Briefcase,
  Download,
  ExternalLink,
  MapPin,
  Play,
  Sparkles,
} from "lucide-react";
import BlurText from "./BlurText";

const phrases = ["omar hossam", "Full-Stack Developer", "Mobile Developer"];

const entrance = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
  visible: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export default function Hero() {
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
        () => setTypedText(fullText.slice(0, nextLength)),
        isDeleting ? 45 : 90,
      );
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 pb-10 pt-28 scroll-offset"
    >
      <div className="section-container relative z-10">
        <div className="hero-grid">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <motion.div
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="liquid-glass mx-auto inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 lg:mx-0"
            >
              <span className="rounded-full bg-white px-3 py-1 font-body text-xs font-semibold text-black">
                New
              </span>
              <span className="font-body text-sm text-white/90">
                Available for new projects
              </span>
            </motion.div>

            <BlurText
              text="Omar Hossam"
              className="mt-6 max-w-3xl justify-center font-heading text-[2.8rem] italic leading-[0.82] tracking-[-3px] text-white sm:text-6xl md:text-7xl lg:justify-start lg:text-[5.5rem]"
            />

            <motion.div
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 0.75, ease: "easeOut" }}
              className="mt-4 font-body text-lg font-semibold text-white sm:text-xl md:text-2xl"
            >
              <span>{typedText}</span>
              <span
                aria-hidden="true"
                className="ml-2 inline-block h-5 w-[2px] bg-white align-middle sm:h-6"
              />
            </motion.div>

            <motion.p
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
              className="mx-auto mt-4 max-w-2xl font-body text-[13px] font-light leading-relaxed text-white sm:text-sm md:text-base lg:mx-0"
            >
              I craft elegant digital experiences with modern technologies.
              Passionate about building performant, accessible, and beautifully
              designed applications that make a real impact.
            </motion.p>

            <motion.div
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
              className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            >
              <button className="liquid-glass-strong inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-body text-sm font-medium text-white sm:w-auto sm:py-2.5">
                <Download size={18} />
                Download CV
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-white"
              >
                View Projects
                <ExternalLink size={16} />
              </button>
            </motion.div>

            <motion.div
              variants={entrance}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 1.25, ease: "easeOut" }}
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
            >
              {[
                { icon: MapPin, text: "portsaid" },
                { icon: Briefcase, text: "Full-Stack Developer" },
                { icon: Sparkles, text: "Available for new projects" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="liquid-glass flex min-h-[72px] flex-row items-center gap-3 rounded-[1.25rem] p-4 sm:min-h-[92px] sm:flex-col sm:justify-center sm:text-center lg:items-start lg:text-left"
                >
                  <Icon size={20} className="shrink-0 text-white sm:size-[22px]" />
                  <span className="font-body text-xs font-light text-white">
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={entrance}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
            className="hero-portrait liquid-glass mx-auto p-2"
          >
            <img
              src={moraImg}
              alt="Omar Hossam portrait"
              className="h-full w-full rounded-[1rem] object-cover object-[50%_28%] contrast-[1.04] saturate-[1.06]"
              loading="eager"
              decoding="async"
              onError={(event) => {
                const element = event.currentTarget;
                const fallback = "/img/mora.jpeg";
                if (element.src !== fallback) element.src = fallback;
              }}
            />
          </motion.div>
        </div>

        <motion.div
          variants={entrance}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 1.35, ease: "easeOut" }}
          className="mt-8 grid gap-4 md:grid-cols-1 lg:grid-cols-[0.75fr,1.25fr]"
        >
          <div className="liquid-glass rounded-[1.25rem] p-5">
            <div className="flex items-center gap-2">
              <Play size={16} className="fill-white text-white" />
              <span className="font-body text-xs font-medium text-white">
                Mobile &amp; Full-Stack Web Developer
              </span>
            </div>
            <p className="mt-3 font-body text-[13px] font-light leading-relaxed text-white/85 sm:text-sm">
              Based in Port Said, building modern apps for web and mobile with
              a focus on performance, clarity, and tangible results.
            </p>
          </div>

          <div className="liquid-glass rounded-[1.25rem] p-5">
            <h3 className="font-heading text-2xl italic leading-none text-white sm:text-3xl">
              Why hire me for your project?
            </h3>
            <div className="mt-3 grid gap-3 font-body text-[13px] font-light leading-relaxed text-white/85 sm:text-sm md:grid-cols-2">
              <p>
                I am Omar Hossam, a dedicated Full-Stack and Mobile Developer
                with a passion for building robust, scalable applications.
              </p>
              <p>
                I focus on performance, clean aesthetics, and maintainable code.
                My goal is to add tangible value to every project I take on.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
