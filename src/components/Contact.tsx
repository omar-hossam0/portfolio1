import { useState, FormEvent } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'amorhossam2005@gmail.com', href: 'mailto:amorhossam2005@gmail.com' },
  { icon: Phone, label: 'Phone', value: '01555888126', href: 'tel:01555888126' },
  { icon: MapPin, label: 'Location', value: '19 marwa street', href: '#' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/omar-hossam0', color: 'hover:text-white' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/omar-hossam-435224321/', color: 'hover:text-[#0A66C2]' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/omar.hossam.1048554/', color: 'hover:text-[#1877F2]' },
];

export default function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.1);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/amorhossam2005@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrors({ form: 'Something went wrong. Please try again later.' });
    } finally {
      setSending(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      {/* Subtle radial accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }}
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
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's{' '}
            <span className="text-glow bg-gradient-to-r from-accent-light to-blue-300 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
          {/* Left column — Contact info & socials */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Contact details card */}
            <div className="glass-strong rounded-2xl p-6 glass-reflection space-y-4">
              <h3 className="text-lg font-semibold text-white mb-5">Contact Information</h3>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  aria-label={`${label}: ${value}`}
                >
                  <div className="glass-accent p-2.5 rounded-xl group-hover:shadow-glow transition-all duration-300">
                    <Icon size={18} className="text-accent-light" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">{label}</p>
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links card */}
            <div className="glass-strong rounded-2xl p-6 glass-reflection">
              <h3 className="text-lg font-semibold text-white mb-4">Find Me Online</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass rounded-xl p-3 text-white/50 transition-all duration-300 hover:shadow-glow hover:bg-white/10 ${color}`}
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Contact form */}
          <div
            ref={formRef}
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="glass-strong rounded-2xl p-6 md:p-8 glass-reflection">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
                  <div className="glass-accent rounded-full p-4 mb-4 animate-glow-pulse">
                    <CheckCircle size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-sm text-white/50 text-center">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`glass-input w-full rounded-xl px-4 py-3 text-sm ${
                          errors.name ? 'border-red-500/50 focus:border-red-500/70' : ''
                        }`}
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`glass-input w-full rounded-xl px-4 py-3 text-sm ${
                          errors.email ? 'border-red-500/50 focus:border-red-500/70' : ''
                        }`}
                        placeholder="your@email.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={`glass-input w-full rounded-xl px-4 py-3 text-sm resize-none ${
                        errors.message ? 'border-red-500/50 focus:border-red-500/70' : ''
                      }`}
                      placeholder="Tell me about your project..."
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                  </div>

                  {errors.form && <p className="text-center text-sm text-red-400">{errors.form}</p>}

                  <button
                    type="submit"
                    disabled={sending}
                    className="glass-btn-accent w-full py-3.5 rounded-xl font-medium text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
