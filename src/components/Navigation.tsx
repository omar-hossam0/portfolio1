import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

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
      className="fixed left-0 right-0 top-4 z-50 px-4 md:px-8 lg:px-16"
      role="navigation"
      aria-label="Main navigation"
    >
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: -16 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto flex max-w-6xl items-center justify-between"
      >
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#hero");
          }}
          className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full font-heading text-3xl italic leading-none text-white"
          aria-label="Go to top"
        >
          o
        </a>

        <div
          className={`hidden items-center gap-1 rounded-full px-1.5 py-1.5 md:flex ${
            scrolled ? "liquid-glass-strong" : "liquid-glass"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(link.href);
              }}
              className="rounded-full px-3 py-2 font-body text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              handleNavClick("#contact");
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-semibold text-black"
          >
            Hire Me
            <ArrowUpRight size={16} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      <div
        className={`mx-auto mt-3 max-w-sm overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="liquid-glass rounded-[1.25rem] p-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(link.href);
              }}
              className="block rounded-full px-4 py-3 font-body text-sm font-medium text-white/90"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
