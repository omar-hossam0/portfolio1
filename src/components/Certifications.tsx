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
  imageFallback?: string;
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
      <div className="paper-card flex h-full flex-col rounded-[1.25rem] p-4 hover-lift sm:p-5 md:p-6">
        {/* Certificate icon/image */}
        <div className="relative overflow-hidden rounded-xl mb-4 h-40">
          <img
            src={cert.imageUrl}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              if (cert.imageFallback && el.src !== cert.imageFallback) {
                el.src = cert.imageFallback;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-body text-xs font-semibold text-black">
              <Shield size={12} />
              Verified
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-heading text-3xl italic leading-none text-white">
          {cert.title}
        </h3>

        {/* Organization */}
        <div className="mb-3 flex items-center gap-2 font-body text-sm text-white/75">
          <Building2 size={14} className="text-white" />
          <span>{cert.issuingOrganization}</span>
        </div>

        {/* Date & credential */}
        <div className="mb-4 flex items-center justify-between gap-3 font-body text-xs text-white/68">
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
          className="liquid-glass-strong mt-auto flex items-center justify-center gap-2 rounded-full px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-white"
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
    <section
      id="certifications"
      className="relative bg-transparent py-24 md:py-32 scroll-offset"
    >
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
          <p className="eyebrow mb-3">// Credentials</p>
          <h2 className="mb-4 font-heading text-[2.4rem] italic leading-none tracking-[-1.5px] text-white sm:text-5xl md:text-6xl">
            Professional{" "}
            <span className="scribble-underline">Certifications</span>
          </h2>
          <p className="max-w-2xl font-body text-white/78">
            Validated expertise across cloud platforms, development frameworks,
            and infrastructure technologies.
          </p>
        </div>

        {/* Certifications grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-xl"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="liquid-glass relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[1.25rem] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white px-3 py-1 font-body text-sm font-semibold text-black"
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
