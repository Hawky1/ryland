import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Building2, CreditCard } from "lucide-react";
import HlsVideoBackground from "@/components/HlsVideoBackground";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import BookMockup3D from "@/components/funnel/BookMockup3D";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
});

const FEATURES = [
  { icon: FileText, title: "The 'Lender-Ready' Checklist", desc: "Exactly what banks want to see before they approve your business for credit lines." },
  { icon: Building2, title: "The Net-30 Vendor List", desc: "12 starter vendors that report to Dun & Bradstreet, Experian Business, and Equifax Business." },
  { icon: CreditCard, title: "The 0% APR Bank Sequence", desc: "The exact order to apply for business credit cards to maximize approvals at 0% intro APR." },
];

export default function FunnelLeadMagnet() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("funnel_leads" as any).insert({
        name: result.data.name,
        email: result.data.email,
        source: "blueprint",
      });
      if (error) throw error;

      // Fire-and-forget: sync lead to GoHighLevel CRM
      supabase.functions
        .invoke("ghl-create-contact", {
          body: { name: result.data.name, email: result.data.email },
        })
        .then(({ error: ghlErr }) => {
          if (ghlErr) console.error("GHL sync failed:", ghlErr);
        });

      navigate("/funnel/offer");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FunnelLayout step={1} label="Free Blueprint">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <HlsVideoBackground overlay="bg-[#001F3F]/92" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 rounded-full px-4 py-1.5 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-6 font-[Inter,sans-serif]">
              Free Download — Limited Time
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 font-[Geist,sans-serif] tracking-tight">
              GET THE BLUEPRINT: How to Build a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                $250,000
              </span>{" "}
              Business Credit Profile from Scratch.
            </h1>
            <p className="text-blue-100/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Stop using your personal social security number to fund your business. Download the exact roadmap we've used for 10,000+ entrepreneurs to secure 0% APR capital.
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <div>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 font-[Inter,sans-serif]"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your best email"
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 font-[Inter,sans-serif]"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="shiny-cta w-full !text-base sm:!text-lg !py-4 disabled:opacity-50"
              >
                <span>{submitting ? "Sending..." : "Download For Free"}</span>
              </button>
              <p className="text-blue-300/40 text-xs text-center font-[Inter,sans-serif]">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>

          {/* Book mockup side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <BookMockup3D
              variant="single"
              src="/covers/ultimate-business-credit-blueprint.png"
              alt="The Ultimate Business Credit Blueprint"
            />
          </motion.div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="relative bg-[#00152B] py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-12 font-[Geist,sans-serif]"
          >
            What's Inside Your Free Blueprint
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[Geist,sans-serif]">{f.title}</h3>
                <p className="text-blue-200/60 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FunnelLayout>
  );
}
