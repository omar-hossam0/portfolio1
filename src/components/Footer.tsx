import { Heart, ArrowUp, Linkedin, Github, Twitter } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>Built with</span>
            <Heart size={14} className="text-red-400 fill-red-400" />
            <span>by Alex Chen</span>
            <span className="text-white/20">|</span>
            <span>2026</span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: '#' },
              { icon: Github, href: '#' },
              { icon: Twitter, href: '#' },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-lg p-2 text-white/40 hover:text-accent-light hover:shadow-glow transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="glass-btn rounded-lg p-2 text-white/40 hover:text-accent-light transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
