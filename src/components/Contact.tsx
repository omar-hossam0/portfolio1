import { useState, FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const contactEmail = "amorhossam2005@gmail.com";
const formToken = "09cbf3bf5f904cab6667d0712aa5f233";
const formEndpoint = `https://formsubmit.co/ajax/${formToken}`;
const formAction = `https://formsubmit.co/${formToken}`;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "01555888126",
    href: "tel:01555888126",
  },
  { icon: MapPin, label: "Location", value: "portsaid", href: "#" },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/omar-hossam0",
    color: "hover:text-white",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/omar-hossam-435224321/",
    color: "hover:text-[#0A66C2]",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/omar.hossam.1048554/",
    color: "hover:text-[#1877F2]",
  },
];

export default function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      const response = await fetch(
        formEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _replyto: formData.email,
            message: formData.message,
            _subject: `New Contact Form Submission from ${formData.name}`,
            _template: "table",
            _captcha: "false",
          }),
          signal: AbortSignal.timeout(15000),
        },
      );

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrors({ form: "Something went wrong. Please try again later." });
    } finally {
      setSending(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
  };

  return (
    <section
      id="contact"
      className="relative bg-transparent py-24 md:py-32 contact-section scroll-offset"
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
          <p className="mb-4 font-body text-sm text-white/80">
            // Get in Touch
          </p>
          <h2 className="mb-4 font-heading text-[2.4rem] italic leading-none tracking-[-1.5px] text-white sm:text-5xl md:text-6xl">
            Let's Connect
          </h2>
          <p className="max-w-2xl font-body text-white/78">
            Have a project in mind or just want to chat? I'd love to hear from
            you.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left column — Contact info & socials */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-700 ${
              titleVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Contact details card */}
            <div className="contact-panel space-y-4 rounded-[1.25rem] p-6">
              <h3 className="mb-5 font-heading text-3xl italic leading-none text-white">
                Contact Information
              </h3>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 rounded-[1rem] p-3 transition-all duration-300 hover:bg-white/5"
                  aria-label={`${label}: ${value}`}
                >
                  <div className="liquid-glass rounded-[0.75rem] p-2.5 transition-all duration-300">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="mb-0.5 font-body text-xs text-white/60">
                      {label}
                    </p>
                    <p className="font-body text-sm text-white transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links card */}
            <div className="contact-panel rounded-[1.25rem] p-6">
              <h3 className="mb-4 font-heading text-3xl italic leading-none text-white">
                Find Me Online
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`liquid-glass rounded-[0.75rem] p-3 text-white transition-all duration-300 hover:bg-white/5 ${color}`}
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
              formVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="contact-panel rounded-[1.25rem] p-5 sm:p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
                  <div className="rounded-full border border-[rgba(247,241,232,0.3)] p-4 mb-4">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h3 className="mb-2 font-heading text-3xl italic text-white">
                    Message Sent!
                  </h3>
                  <p className="text-center font-body text-sm text-white/70">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form action={formAction} method="POST" onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* FormSubmit config fields */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://omar-hossam0.vercel.app/#contact" />
                  <input type="hidden" name="_template" value="table" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block font-body text-sm font-medium text-white/80"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={`contact-input w-full rounded-xl px-4 py-3 text-sm ${
                          errors.name
                            ? "border-red-300/50 focus:border-red-300/70"
                            : ""
                        }`}
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                          <p className="mt-1 text-xs text-red-100">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-body text-sm font-medium text-white/80"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`contact-input w-full rounded-xl px-4 py-3 text-sm ${
                          errors.email
                            ? "border-red-300/50 focus:border-red-300/70"
                            : ""
                        }`}
                        placeholder="your@email.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-100">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block font-body text-sm font-medium text-white/80"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={`contact-input w-full rounded-xl px-4 py-3 text-sm resize-none ${
                        errors.message
                          ? "border-red-300/50 focus:border-red-300/70"
                          : ""
                      }`}
                      placeholder="Tell me about your project..."
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-100">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {errors.form && (
                    <p className="text-center text-sm text-red-100">
                      {errors.form}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="liquid-glass-strong flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-body text-xs uppercase tracking-[0.25em] text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[rgba(247,241,232,0.3)] border-t-[var(--cream)] rounded-full animate-spin" />
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
