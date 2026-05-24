import {
  ArrowDown,
  Download,
  ExternalLink,
  MapPin,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'AWS',
  'Docker', 'GraphQL', 'PostgreSQL', 'Figma', 'Tailwind CSS',
];

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation(0.1);

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
            'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%)',
        }}
      />

      <div ref={ref} className="section-container relative z-10 py-20">
        {/* ── Top Greeting Area ────────────────────── */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
              Alex Chen
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/60 mb-6">
            Full-Stack Developer &amp; UI Engineer
          </p>
          <p className="text-base text-white/50 leading-relaxed max-w-2xl mx-auto">
            I craft elegant digital experiences with modern technologies. Passionate
            about building performant, accessible, and beautifully designed
            applications that make a real impact.
          </p>
        </div>

        {/* ── Three-Stack Card Grid ────────────────── */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Stack 1 — Profile Card */}
          <div className="glass-strong rounded-2xl p-6 glass-reflection hover:shadow-glow hover:border-accent/15 transition-all duration-500">
            <div className="relative group mb-6">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/25 via-transparent to-accent/15 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative gradient-border rounded-2xl p-1 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Professional portrait"
                  className="w-full aspect-square rounded-xl object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-glow-pulse" />
              <span className="text-sm font-medium text-accent-light">Available for work</span>
            </div>

            {/* Quick stats */}
            <div className="space-y-3">
              {[
                { icon: MapPin, text: 'San Francisco, CA' },
                { icon: Briefcase, text: '5+ Years Experience' },
                { icon: Sparkles, text: '20+ Projects Delivered' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-white/60"
                >
                  <div className="glass-accent p-2 rounded-lg">
                    <Icon size={14} className="text-accent-light" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack 2 — Actions & Tech */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="glass-strong rounded-2xl p-6 glass-reflection hover:shadow-glow hover:border-accent/15 transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="glass-btn-accent w-full px-5 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 group">
                  <Download size={18} className="group-hover:animate-bounce" />
                  Download CV
                </button>
                <button
                  onClick={() =>
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="glass-btn w-full px-5 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 group"
                >
                  View Projects
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <button
                  onClick={() =>
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="glass-btn w-full px-5 py-3 rounded-xl font-medium text-white/80 hover:text-white flex items-center justify-center gap-2"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="glass-strong rounded-2xl p-6 glass-reflection hover:shadow-glow hover:border-accent/15 transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="glass rounded-lg px-3 py-1 text-sm text-white/70 hover:text-accent-light hover:bg-white/10 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stack 3 — Quote Card */}
          <div className="glass-strong rounded-2xl p-6 md:p-8 glass-reflection hover:shadow-glow hover:border-accent/15 transition-all duration-500 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-accent-light to-accent-dark mb-6" />
              <blockquote className="text-xl md:text-2xl font-light text-white/80 leading-relaxed mb-6">
                "The best interfaces feel like they were always there — natural, intuitive, and invisible."
              </blockquote>
              <p className="text-sm text-white/40">— Design Philosophy</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-sm text-white/30 leading-relaxed">
                I believe great software is born at the intersection of engineering
                rigor and creative vision. Every pixel, every interaction, every
                millisecond of load time matters.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-float">
          <span className="text-xs">Scroll</span>
          <ArrowDown size={16} />
        </div>
      </div>
    </section>
  );
}
