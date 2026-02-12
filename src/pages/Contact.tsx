import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoDark from "@/assets/logo-dark.png";
import logoWhite from "@/assets/logo-white.png";
import InfiniteGrid from "@/components/ui/infinite-grid";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import { Menu, X, Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone number too long").optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Please select a subject"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSending(true);
    // Simulate send delay
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animate-delay-300 { animation-delay: 0.3s; opacity: 0; }
        .font-geist { font-family: 'Geist', sans-serif !important; }
        .font-manrope { font-family: 'Manrope', sans-serif !important; }
        .mobile-menu { transform: translateX(100%); transition: transform 0.3s ease-out; }
        .mobile-menu.open { transform: translateX(0); }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
        @property --gradient-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @property --gradient-angle-offset { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @property --gradient-percent { syntax: "<percentage>"; initial-value: 20%; inherits: false; }
        @property --gradient-shine { syntax: "<color>"; initial-value: #8484ff; inherits: false; }

        .shiny-cta {
          --gradient-angle: 0deg; --gradient-angle-offset: 0deg; --gradient-percent: 20%; --gradient-shine: #8484ff; --shadow-size: 2px;
          position: relative; overflow: hidden; border-radius: 9999px; padding: 1.25rem 2.5rem; font-size: 1.125rem; line-height: 1.2; font-weight: 500; color: #ffffff;
          background: linear-gradient(#003A70, #0060A9) padding-box, conic-gradient(from calc(var(--gradient-angle) - var(--gradient-angle-offset)), transparent 0%, #3b82f6 5%, var(--gradient-shine) 15%, #3b82f6 30%, transparent 40%, transparent 100%) border-box;
          border: 2px solid transparent; box-shadow: inset 0 0 0 1px #1e293b; outline: none;
          transition: --gradient-angle-offset 800ms cubic-bezier(0.25,1,0.5,1), --gradient-percent 800ms cubic-bezier(0.25,1,0.5,1), --gradient-shine 800ms cubic-bezier(0.25,1,0.5,1), box-shadow 0.3s;
          cursor: pointer; isolation: isolate; outline-offset: 4px; font-family: 'Inter','Helvetica Neue',sans-serif; z-index: 0; animation: border-spin 2.5s linear infinite;
        }
        @keyframes border-spin { to { --gradient-angle: 360deg; } }
        .shiny-cta:active { transform: translateY(1px); }
        .shiny-cta::before {
          content:''; pointer-events:none; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:0;
          --size:calc(100% - 6px); --position:2px; --space:4px; width:var(--size); height:var(--size);
          background:radial-gradient(circle at var(--position) var(--position),white 0.5px,transparent 0) padding-box; background-size:var(--space) var(--space); background-repeat:space;
          mask-image:conic-gradient(from calc(var(--gradient-angle) + 45deg),black,transparent 10% 90%,black); border-radius:inherit; opacity:0.4;
        }
        .shiny-cta::after {
          content:''; pointer-events:none; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:1;
          width:100%; aspect-ratio:1; background:linear-gradient(-50deg,transparent,#3b82f6,transparent);
          mask-image:radial-gradient(circle at bottom,transparent 40%,black); opacity:0.6; animation:shimmer 4s linear infinite;
        }
        .shiny-cta span { position:relative; z-index:2; display:inline-block; }
        @keyframes shimmer { to { transform:translate(-50%,-50%) rotate(360deg); } }
      `}} />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#ffffff' }}>
        <InfiniteGrid baseGridColor="rgba(148, 163, 184, 0.20)" activeGridColor="rgba(59, 130, 246, 0.45)" />
      </div>

      {/* NAVBAR */}
      <header className="sticky z-20 top-0 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="flex max-w-7xl mx-auto pt-4 px-4 sm:px-6 pb-4 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoDark} alt="Ryland Partners" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
            <Link to="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">About</Link>
            <a href="/#services" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Services</a>
            <a href="/#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Community</a>
            <Link to="/store" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Store</Link>
            <Link to="/contact" className="text-sm text-slate-900 font-medium">Contact</Link>
          </nav>
          <button onClick={() => setMobileOpen(true)} className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <aside className={`mobile-menu fixed z-50 bg-white/95 w-[80%] max-w-sm border-slate-200 border-l p-6 top-0 right-0 bottom-0 backdrop-blur ${mobileOpen ? 'open' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900">Ryland Partners</span>
            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="mt-6 space-y-4">
            <li><Link to="/" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Home</Link></li>
            <li><Link to="/about" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">About</Link></li>
            <li><a href="/#services" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Services</a></li>
            <li><Link to="/store" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Store</Link></li>
            <li><Link to="/contact" onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-slate-900 font-medium hover:bg-slate-100 transition-colors">Contact</Link></li>
          </ul>
        </aside>
      </header>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto mt-4 sm:mt-8 pt-16 pb-20 px-8 lg:px-20 overflow-hidden rounded-2xl border border-[#004E8C]">
        <HlsVideoBackground overlay="bg-[#003A70]/90" className="rounded-2xl" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-[38px] leading-[0.95] sm:text-[52px] lg:text-[64px] font-medium tracking-tighter font-geist mt-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 animate-fade-in-up">
            Let's Build Your Empire Together
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            Have a question about funding, credit, or partnerships? Our team is ready to help you take the next step.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* LEFT - Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Get in touch</p>
              <h2 className="font-manrope text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">We'd Love To Hear From You</h2>
              <p className="mt-3 text-slate-500 leading-relaxed">Whether you're exploring funding options, interested in our partner program, or just have a quick question — reach out anytime.</p>
            </div>

            {[
              { icon: Mail, title: "Email Us", detail: "support@rylandpartners.com", sub: "We respond within 24 hours" },
              { icon: Phone, title: "Call Us", detail: "(888) 555-0199", sub: "Mon–Fri, 9am–6pm EST" },
              { icon: MapPin, title: "Visit Us", detail: "Atlanta, Georgia", sub: "By appointment only" },
              { icon: Clock, title: "Business Hours", detail: "Monday – Friday", sub: "9:00 AM – 6:00 PM EST" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#004E8C] overflow-hidden relative p-5">
                <HlsVideoBackground overlay="bg-[#003A70]/90" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20">
                    <item.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-white/90 mt-0.5">{item.detail}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[#004E8C] overflow-hidden relative">
              <HlsVideoBackground overlay="bg-[#003A70]/90" />
              <div className="relative z-10 p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-16 animate-fade-in-up">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/30">
                      <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Message Sent Successfully</h3>
                    <p className="text-zinc-400 max-w-sm mx-auto">Thank you for reaching out. A member of our team will get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-1 font-manrope">Send Us A Message</h3>
                    <p className="text-sm text-zinc-400 mb-8">Fill out the form below and we'll get back to you promptly.</p>
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-xs font-medium text-zinc-300 mb-1.5">Full Name *</label>
                          <input
                            id="name" name="name" type="text" value={form.name} onChange={handleChange} maxLength={100}
                            className={`w-full rounded-xl bg-white/5 border ${errors.name ? 'border-red-400/60' : 'border-white/10'} px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all`}
                            placeholder="John Smith"
                          />
                          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-medium text-zinc-300 mb-1.5">Email Address *</label>
                          <input
                            id="email" name="email" type="email" value={form.email} onChange={handleChange} maxLength={255}
                            className={`w-full rounded-xl bg-white/5 border ${errors.email ? 'border-red-400/60' : 'border-white/10'} px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all`}
                            placeholder="john@company.com"
                          />
                          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="phone" className="block text-xs font-medium text-zinc-300 mb-1.5">Phone Number</label>
                          <input
                            id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} maxLength={20}
                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-xs font-medium text-zinc-300 mb-1.5">Subject *</label>
                          <select
                            id="subject" name="subject" value={form.subject} onChange={handleChange}
                            className={`w-full rounded-xl bg-white/5 border ${errors.subject ? 'border-red-400/60' : 'border-white/10'} px-4 py-3 text-sm text-white outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all appearance-none`}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                          >
                            <option value="" className="bg-slate-900 text-zinc-400">Select a topic...</option>
                            <option value="funding" className="bg-slate-900">Business Funding</option>
                            <option value="credit" className="bg-slate-900">Credit Repair</option>
                            <option value="partner" className="bg-slate-900">Partner Program</option>
                            <option value="community" className="bg-slate-900">Community & Academy</option>
                            <option value="consultation" className="bg-slate-900">Schedule Consultation</option>
                            <option value="other" className="bg-slate-900">Other</option>
                          </select>
                          {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-medium text-zinc-300 mb-1.5">Message *</label>
                        <textarea
                          id="message" name="message" value={form.message} onChange={handleChange} maxLength={2000} rows={5}
                          className={`w-full rounded-xl bg-white/5 border ${errors.message ? 'border-red-400/60' : 'border-white/10'} px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all resize-none`}
                          placeholder="Tell us how we can help you..."
                        />
                        <div className="flex items-center justify-between mt-1">
                          {errors.message ? <p className="text-xs text-red-400">{errors.message}</p> : <span />}
                          <p className="text-xs text-zinc-500">{form.message.length}/2000</p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={sending}
                        className="shiny-cta !py-3.5 !px-8 !text-base w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <span className="inline-flex items-center gap-2">
                          {sending ? (
                            <>
                              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-slate-200 border-t pt-16 pb-10" style={{ maskImage: 'linear-gradient(100deg, transparent, black 25%, black 75%, transparent)', WebkitMaskImage: 'linear-gradient(100deg, transparent, black 25%, black 75%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={logoWhite} alt="Ryland Partners" className="h-8 w-auto" />
              </Link>
              <p className="text-sm text-slate-500 max-w-xs">Empowering entrepreneurs with capital, credit, and community.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Funding</Link></li>
                <li><Link to="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Credit</Link></li>
                <li><Link to="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Academy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">About</Link></li>
                <li><Link to="/partners" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Partners</Link></li>
                <li><Link to="/contact" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link to="/privacy-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</Link></li>
                <li><Link to="/ccpa" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">CCPA Notice</Link></li>
                <li><Link to="/disclaimers" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Disclaimers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Ryland Partners. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
