import { ExternalLink, ArrowUpRight, Star } from "lucide-react";
import elk2dImg from "../assets/img/elk2d.png";
import ocrImg from "../assets/img/ocr.png";
import parkingImg from "../assets/img/parking-2.png";
import flyImg from "../assets/img/fly.jpeg";
import movieImg from "../assets/img/movie.png";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const ELKA2D_URL = "https://elka2d.cloud/";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageFallback?: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  tags: string[];
  status: "live" | "in-progress" | "completed";
  featured: boolean;
}

const sampleProjects: Project[] = [
  {
    id: "elka2d",
    title: "elka2d",
    description:
      "Elka2D is an engaging educational platform that brings history to life through well-organized courses, live teacher-led sessions, and an always-available AI assistant. The site emphasizes interactive learning, measurable student progress, and trusted, expert-reviewed content — serving thousands of learners with a range of specialized history courses and real-time support.",
    // Image located in project img folder (elk2d.png)
    imageUrl: elk2dImg,
    imageFallback:
      "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/elk2d.png",
    demoUrl: ELKA2D_URL,
    githubUrl: "#",
    technologies: ["React", "Node.js", "SQL"],
    tags: ["Design", "Web"],
    status: "live",
    featured: true,
  },
  {
    id: "ocr-project-omega",
    title: "OCR Project Omega",
    description:
      "AI-powered document management platform with OCR extraction, camera capture, searchable archives, and full tracking for files, locations, and access history.",
    imageUrl: ocrImg,
    imageFallback:
      "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/ocr.png",
    demoUrl: "https://ocr-project-omega.vercel.app",
    githubUrl: "#",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    tags: ["OCR", "Document", "AI"],
    status: "in-progress",
    featured: false,
  },
  {
    id: "3",
    title: "Smart Parking System Dashboard",
    description:
      "Real-time smart parking dashboard for monitoring four slots, controlling the gate, viewing live activity, and tracking parking duration and history through MQTT and ESP integration.",
    imageUrl: parkingImg,
    imageFallback:
      "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/parking-2.png",
    demoUrl: "https://smart-parking-1.vercel.app",
    githubUrl: "#",
    technologies: ["React", "MQTT", "ESP32", "Node.js"],
    tags: ["IoT", "Dashboard", "Real-time"],
    status: "live",
    featured: false,
  },
  {
    id: "4",
    title: "Transit Tourism App",
    description:
      "A smart travel app for transit passengers that turns waiting time into short tourism experiences. It offers ground trips from Cairo International Airport, flying taxi tours, AI suggestions, maps, booking management, and digital payments for a smooth city-exploration journey.",
    imageUrl: flyImg,
    imageFallback:
      "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/fly.jpeg",
    demoUrl:
      "https://drive.google.com/file/d/1NG_5e5TzZzc9Dnd0XlBbhgyMv9iaWkwY/view?usp=sharing",
    githubUrl: "#",
    technologies: ["Flutter", "Dart", "Firebase"],
    tags: ["Travel", "Transit", "Booking"],
    status: "live",
    featured: false,
  },
  {
    id: "5",
    title: "QuickShow",
    description:
      "A modern movie discovery platform designed to browse films, theaters, releases, and favorites with a cinematic interface, fast search, and a smooth login-driven user experience.",
    imageUrl: movieImg,
    imageFallback:
      "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/movie.png",
    demoUrl: "https://quickshow.vercel.app",
    githubUrl: "#",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    tags: ["Movies", "Streaming", "UI"],
    status: "live",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const statusColors: Record<string, string> = {
    live: "bg-white text-black border-white",
    "in-progress": "bg-white/10 text-white border-white/20",
    completed: "bg-white/10 text-white/75 border-white/20",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="project-card group h-full flex flex-col rounded-[1.25rem]">
        <div className="relative overflow-hidden h-44 sm:h-48 md:h-52">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              if (project.imageFallback && el.src !== project.imageFallback) {
                el.src = project.imageFallback;
              }
            }}
          />
          {/* clickable overlay so clicking the image area opens the demo */}
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="absolute inset-0 z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

          {project.featured && (
            <div className="absolute top-3 right-3 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                <Star size={12} className="text-black" />
                Featured
              </span>
            </div>
          )}

          <div className="absolute top-3 left-3 pointer-events-none">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium border ${
                statusColors[project.status]
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  project.status === "live"
                    ? "bg-black"
                    : project.status === "in-progress"
                      ? "bg-white"
                      : "bg-white/70"
                }`}
              />
              {project.status === "in-progress"
                ? "In Progress"
                : project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading text-3xl italic leading-none text-white">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                aria-label={`Open ${project.title}`}
              >
                {project.title}
              </a>
            </h3>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="relative z-20 text-white"
            >
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <p className="mb-4 flex-1 font-body text-sm font-light leading-relaxed text-white/82">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="liquid-glass rounded-full px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/10 px-3 py-1 font-body text-[11px] font-medium text-white"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.demoUrl}
            className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-white"
            aria-label="Open project"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);

  return (
    <section id="projects" className="relative bg-transparent py-24 md:py-32 scroll-offset">
      <div className="section-container relative z-10">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`text-left mb-16 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow mb-3">// Portfolio</p>
          <h2 className="mb-4 font-heading text-[2.4rem] italic leading-none tracking-[-1.5px] text-white sm:text-5xl md:text-6xl">
            Featured <span className="scribble-underline">Projects</span>
          </h2>
          <p className="max-w-2xl font-body text-white/78">
            A selection of projects that showcase my expertise in full-stack
            development, design systems, and innovative problem-solving.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {sampleProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
