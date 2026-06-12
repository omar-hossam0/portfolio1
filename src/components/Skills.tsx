import { type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Layers, Rocket, Sparkles } from "lucide-react";
import awsImg from "../assets/img/aws.svg";

const skills = [
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Express", slug: "express", color: "FFFFFF" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "AWS", slug: "amazonaws", color: "232F3E", iconSrc: awsImg },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "GitHub", slug: "github", color: "FFFFFF" },
  { name: "Dart", slug: "dart", color: "0175C2" },
  { name: "Flutter", slug: "flutter", color: "02569B" },
  { name: "UI/UX", slug: "figma", color: "F24E1E" },
];

const entrance = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 22 },
  visible: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export default function Skills() {
  const handleTilt = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -12;
    const rotateY = (x / rect.width - 0.5) * 12;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const handleTiltLeave = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <section
      id="skills"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-4 py-24 scroll-offset"
    >
      <div className="section-container relative z-10">
        <motion.div
          variants={entrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 max-w-3xl"
        >
          <p className="mb-6 font-body text-[13px] text-white/80 sm:text-sm">
            // Capabilities
          </p>
          <h2 className="font-heading text-[3rem] italic leading-[0.9] tracking-[-2px] text-white sm:text-6xl md:text-7xl lg:text-[6rem] lg:tracking-[-3px]">
            My Tech
            <br />
            Stack
          </h2>
          <p className="mt-5 max-w-2xl font-body text-[13px] font-light leading-relaxed text-white/85 sm:text-sm md:text-base">
            Tools and technologies I use to build modern web and mobile
            experiences.
          </p>
        </motion.div>

        <motion.div
          variants={entrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mb-6 grid gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {[
            {
              icon: Sparkles,
              title: "Frontend Systems",
              body: "Interfaces with crisp motion, responsive layouts, and a polished user experience.",
            },
            {
              icon: Layers,
              title: "Backend Logic",
              body: "APIs, data models, integrations, and reliable application foundations.",
            },
            {
              icon: Rocket,
              title: "Mobile Delivery",
              body: "Cross-platform app development with Flutter and product-minded execution.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="liquid-glass rounded-[1.25rem] p-5 md:min-h-[180px]"
            >
              <div className="liquid-glass mb-6 flex h-10 w-10 items-center justify-center rounded-[0.75rem] sm:h-11 sm:w-11 sm:mb-8">
                <Icon size={18} className="text-white sm:size-[22px]" />
              </div>
              <h3 className="font-heading text-2xl italic leading-none text-white sm:text-3xl">
                {title}
              </h3>
              <p className="mt-3 max-w-[32ch] font-body text-[13px] font-light leading-relaxed text-white/90 sm:text-sm">
                {body}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ filter: "blur(10px)", opacity: 0, y: 34, scale: 0.95 }}
              whileInView={{
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: index * 0.045,
                ease: "easeOut",
              }}
              className="skill-card group flex flex-col justify-between"
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltLeave}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="liquid-glass skill-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.75rem]">
                  <img
                    src={
                      skill.iconSrc
                        ? skill.iconSrc
                        : `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`
                    }
                    alt={`${skill.name} logo`}
                    className="h-7 w-7"
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      const element = event.currentTarget;
                      if (skill.name === "AWS") {
                        const fallback =
                          "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/aws.svg";
                        if (element.src !== fallback) element.src = fallback;
                      }
                    }}
                  />
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 font-body text-[10px] font-semibold text-black">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-3xl italic leading-none text-white">
                  {skill.name}
                </h3>
                <p className="mt-2 font-body text-xs font-light text-white/75">
                  Production-ready capability
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
