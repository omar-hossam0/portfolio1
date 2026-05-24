import { Award, ExternalLink, Calendar, Building2, Shield } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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
    id: '1',
    title: 'AWS Solutions Architect - Professional',
    issuingOrganization: 'Amazon Web Services',
    issueDate: '2024-03',
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software.jpg?auto=compress&cs=tinysrgb&w=400',
    verificationUrl: '#',
    credentialId: 'AWS-SAP-2024-XXXXX',
  },
  {
    id: '2',
    title: 'Google Cloud Professional Developer',
    issuingOrganization: 'Google Cloud',
    issueDate: '2024-01',
    imageUrl: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=400',
    verificationUrl: '#',
    credentialId: 'GCP-PD-2024-XXXXX',
  },
  {
    id: '3',
    title: 'Meta Front-End Developer Certificate',
    issuingOrganization: 'Meta',
    issueDate: '2023-09',
    imageUrl: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=400',
    verificationUrl: '#',
    credentialId: 'META-FED-2023-XXXXX',
  },
  {
    id: '4',
    title: 'Certified Kubernetes Administrator',
    issuingOrganization: 'Cloud Native Computing Foundation',
    issueDate: '2023-06',
    imageUrl: 'https://images.pexels.com/photos/7788002/pexels-photo-7788002.jpeg?auto=compress&cs=tinysrgb&w=400',
    verificationUrl: '#',
    credentialId: 'CKA-2023-XXXXX',
  },
  {
    id: '5',
    title: 'MongoDB Certified Developer',
    issuingOrganization: 'MongoDB University',
    issueDate: '2023-03',
    imageUrl: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400',
    verificationUrl: '#',
    credentialId: 'MDB-DEV-2023-XXXXX',
  },
  {
    id: '6',
    title: 'HashiCorp Terraform Associate',
    issuingOrganization: 'HashiCorp',
    issueDate: '2023-01',
    imageUrl: 'https://images.pexels.com/photos/8294554/pexels-photo-8294554.jpeg?auto=compress&cs=tinysrgb&w=400',
    verificationUrl: '#',
    credentialId: 'HC-TA-2023-XXXXX',
  },
];

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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

        {/* Verify button */}
        <a
          href={cert.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-btn-accent mt-auto px-4 py-2 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2"
        >
          <Award size={14} />
          View Certificate
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

export default function Certifications() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);

  return (
    <section id="certifications" className="relative py-24 md:py-32">
      {/* Subtle background tint */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="glass-accent rounded-full px-4 py-1.5 text-xs font-semibold text-accent-light uppercase tracking-wider inline-block mb-4">
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Professional{' '}
            <span className="text-glow bg-gradient-to-r from-accent-light to-blue-300 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            Validated expertise across cloud platforms, development frameworks, and infrastructure technologies.
          </p>
        </div>

        {/* Certifications grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sampleCertifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
