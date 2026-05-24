import { ExternalLink, Github, ArrowUpRight, Star } from "lucide-react";
import elk2dImg from "../assets/img/elk2d.png";
import ocrImg from "../assets/img/ocr.png";
import parkingImg from "../assets/img/parking-2.png";
import flyImg from "../assets/img/fly.jpeg";
import movieImg from "../assets/img/movie.png";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
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
    demoUrl: "https://elka2d.cloud/",
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
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    "in-progress": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    completed: "bg-white/10 text-white/60 border-white/20",
  };

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="glass-strong rounded-2xl overflow-hidden glass-reflection hover:border-accent/20 transition-all duration-500 hover:shadow-glow h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden h-48 md:h-52">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="glass-accent rounded-full px-3 py-1 text-xs font-semibold text-accent-light flex items-center gap-1.5">
                <Star
                  size={12}
                  className="text-accent-light fill-accent-light"
                />
                Featured
              </span>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border backdrop-blur-sm ${
                statusColors[project.status]
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.status === "live"
                    ? "bg-green-400 animate-glow-pulse"
                    : project.status === "in-progress"
                      ? "bg-amber-400"
                      : "bg-white/40"
                }`}
              />
              {project.status === "in-progress"
                ? "In Progress"
                : project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
            </span>
          </div>

          {/* Hover overlay with single Visit button (project link) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.demoUrl}
              className="glass-btn-accent flex items-center gap-2 px-4 py-2 rounded-xl text-white hover:scale-105 transition-transform"
              aria-label="Open project"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={18} />
              <span className="font-semibold">Visit</span>
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-accent-light transition-colors duration-300">
              {project.title}
            </h3>
            <ArrowUpRight
              size={18}
              className="text-white/30 group-hover:text-accent-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
            />
          </div>

          <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="glass rounded-md px-2 py-0.5 text-[10px] font-medium text-white/50 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md px-2 py-0.5 text-[11px] font-medium text-accent-light/80 bg-accent/10 border border-accent/15"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="section-container relative z-10">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="glass-accent rounded-full px-4 py-1.5 text-xs font-semibold text-accent-light uppercase tracking-wider inline-block mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured{" "}
            <span className="text-glow bg-gradient-to-r from-accent-light to-blue-300 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            A selection of projects that showcase my expertise in full-stack
            development, design systems, and innovative problem-solving.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sampleProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
