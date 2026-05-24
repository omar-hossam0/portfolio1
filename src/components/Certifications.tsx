import { useState } from "react";
import { Award, ExternalLink, Calendar, Building2, Shield } from "lucide-react";
import c1Img from "../assets/img/c1.png";
import c2Img from "../assets/img/c2.png";
import c3Img from "../assets/img/c3.png";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Certification {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  imageUrl: string;
  verificationUrl: string;
  credentialId: string;
}

const sampleCertifications: Certification[] = [
  {
    id: "1",
    title: "MEAN Stack Web Development",
    issuingOrganization: "ITIDA / NTI",
    issueDate: "2025-09",
    imageUrl: c1Img,
    imageFallback:
      "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/c1.png",
    verificationUrl: "#",
    credentialId: "ITIDA-NTI-2025-01",
  },
  {
    id: "2",
    title: "Sprints x Microsoft Summer Camp - Web Development",
    issuingOrganization: "Sprints / Microsoft",
    issueDate: "2025-07",
    imageUrl: c2Img,
    imageFallback:
      "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/c2.png",
    verificationUrl: "#",
    credentialId: "SPR-MSFT-2025-02",
  },
  {
    id: "3",
    title: "Artificial Intelligence Ambassadors Program",
    issuingOrganization: "NTI / Ministry of Communications",
    issueDate: "2025-06",
    imageUrl: c3Img,
    imageFallback:
      "https://raw.githubusercontent.com/omar-hossam0/portfolio1/main/src/assets/img/c3.png",
    verificationUrl: "#",
    credentialId: "AI-AMB-2025-03",
  },
];

function CertCard({
  cert,
  index,
  onZoom,
}: {
  cert: Certification;
  index: number;
  onZoom: (imageUrl: string) => void;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="glass-strong rounded-2xl p-5 md:p-6 glass-reflection hover:border-accent/20 transition-all duration-500 hover:shadow-glow h-full flex flex-col">
        {/* Certificate icon/image */}
        <div className="relative overflow-hidden rounded-xl mb-4 h-40">
          <img
            src={cert.imageUrl}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              if ((cert as any).imageFallback && el.src !== (cert as any).imageFallback) {
                el.src = (cert as any).imageFallback;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="glass rounded-full px-2.5 py-1 text-xs font-medium text-accent-light flex items-center gap-1.5">
              <Shield size={12} />
              Verified
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold text-white mb-2 group-hover:text-accent-light transition-colors duration-300">
          {cert.title}
        </h3>

        {/* Organization */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
          <Building2 size={14} className="text-accent-light/60" />
          <span>{cert.issuingOrganization}</span>
        </div>

        {/* Date & credential */}
        <div className="flex items-center justify-between text-xs text-white/40 mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {cert.issueDate}
          </span>
          <span className="font-mono">{cert.credentialId}</span>
        </div>

        {/* Zoom button */}
        <button
          type="button"
          onClick={() => onZoom(cert.imageUrl)}
          className="glass-btn-accent mt-auto px-4 py-2 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2"
        >
          <Award size={14} />
          View Certificate
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}

export default function Certifications() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section id="certifications" className="relative py-24 md:py-32">
      {/* Subtle background tint */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)",
        }}
      />

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
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Professional{" "}
            <span className="text-glow bg-gradient-to-r from-accent-light to-blue-300 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            Validated expertise across cloud platforms, development frameworks,
            and infrastructure technologies.
          </p>
        </div>

        {/* Certifications grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sampleCertifications.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              onZoom={setActiveImage}
            />
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-xl px-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1 text-sm text-white/80 backdrop-blur-sm hover:text-white"
            >
              Close
            </button>
            <img
              src={activeImage}
              alt="Certificate preview"
              className="block max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
