import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-4 left-0 right-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          <div
            className={`relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 px-6 py-2.5 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.45)] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-40 ${
              scrolled ? "shadow-[0_12px_36px_rgba(0,0,0,0.55)]" : ""
            }`}
          >
            <div className="relative z-10 flex items-center justify-between w-full">
              {/* Logo */}
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#hero");
                }}
                className="text-sm md:text-base font-semibold tracking-tight text-white hover:text-white/80 transition-colors duration-300"
                aria-label="Go to top"
              >
                omar
              </a>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden rounded-full border border-white/15 bg-white/5 p-2 text-white/80 hover:text-white hover:border-white/30 transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
              mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mx-4 mt-3 mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 space-y-1 backdrop-blur-xl">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
