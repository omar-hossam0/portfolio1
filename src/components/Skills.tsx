import { useScrollAnimation } from "../hooks/useScrollAnimation";
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

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-12 h-72 w-72 rounded-full bg-white/5 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-white/5 blur-3xl animate-float-slower" />
      </div>

      <div ref={ref} className="section-container relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            My Tech Stack
          </h2>
          <p className="text-white/50 mt-3 max-w-2xl mx-auto">
            Tools and technologies I use to build modern web and mobile
            experiences.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-2 backdrop-blur-md transition-all duration-700 hover:border-white/20 hover:bg-white/10 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/20">
                <img
                  src={
                    skill.iconSrc
                      ? skill.iconSrc
                      : `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`
                  }
                  alt={`${skill.name} logo`}
                  className="h-6 w-6"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-sm font-medium text-white/80 whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
