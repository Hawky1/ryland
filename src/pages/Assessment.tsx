import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { captureReferral, getReferralAffiliateId } from "@/lib/referralTracking";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Building2,
  Target,
  Clock,
  AlertCircle,
  User,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import CreditRepairResult from "@/components/assessment/CreditRepairResult";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoDark from "@/assets/logo-dark.png";
import PageMeta from "@/components/PageMeta";

/* ── Quiz Data ─────────────────────────────────────────────── */
const STEPS = [
  {
    id: "credit_score",
    icon: CreditCard,
    title: "What is your current credit score range?",
    subtitle: "This helps us determine the best path for you.",
    options: [
      { value: "below_580", label: "Below 580", desc: "Needs significant improvement" },
      { value: "580_679", label: "580 – 679", desc: "Fair — room for growth" },
      { value: "680_719", label: "680 – 719", desc: "Good — funding eligible" },
      { value: "720_plus", label: "720+", desc: "Excellent — premium options" },
    ],
  },
  {
    id: "primary_goal",
    icon: Target,
    title: "What is your primary goal?",
    subtitle: "Select what matters most to you right now.",
    options: [
      { value: "credit_repair", label: "Repair My Credit", desc: "Fix negative items & boost score" },
      { value: "business_funding", label: "Get Business Funding", desc: "Secure 0% APR credit lines" },
      { value: "both", label: "Both", desc: "Credit repair + funding" },
    ],
  },
  {
    id: "business_status",
    icon: Building2,
    title: "What is your current business status?",
    subtitle: "This helps us tailor your funding strategy.",
    options: [
      { value: "llc_corp", label: "LLC or Corporation", desc: "Registered business entity" },
      { value: "sole_proprietor", label: "Sole Proprietor", desc: "Operating under personal name" },
      { value: "not_yet", label: "Not Yet Started", desc: "Planning to launch" },
    ],
  },
  {
    id: "funding_timeline",
    icon: Clock,
    title: "How soon do you need funding?",
    subtitle: "We'll prioritize based on urgency.",
    options: [
      { value: "asap", label: "As Soon As Possible", desc: "Immediate need" },
      { value: "1_3_months", label: "1 – 3 Months", desc: "Near-term planning" },
      { value: "3_6_months", label: "3 – 6 Months", desc: "Building foundation" },
      { value: "exploring", label: "Just Exploring", desc: "Research phase" },
    ],
  },
  {
    id: "denied_recently",
    icon: AlertCircle,
    title: "Have you been denied credit in the last 12 months?",
    subtitle: "This doesn't affect your eligibility — it helps us advise you better.",
    options: [
      { value: "yes", label: "Yes", desc: "Denied for credit or a loan" },
      { value: "no", label: "No", desc: "No recent denials" },
    ],
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  business_name: z.string().trim().max(150).optional(),
});

type Answers = Record<string, string>;

/* ── Component ─────────────────────────────────────────────── */
export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "", business_name: "" });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"credit_repair" | "business_funding" | null>(null);

  // Capture referral attribution on mount
  useEffect(() => { captureReferral(); }, []);

  const totalSteps = STEPS.length + 1; // quiz steps + contact step
  const progress = result ? 100 : ((step + 1) / (totalSteps + 1)) * 100;

  const isScoreEligible = ["680_719", "720_plus"].includes(answers.credit_score || "");

  const selectOption = (stepId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
    // Auto-advance after short delay
    setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length)), 350);
  };

  const determineQualification = (): "credit_repair" | "business_funding" => {
    if (!isScoreEligible) return "credit_repair";
    if (answers.primary_goal === "credit_repair") return "credit_repair";
    return "business_funding";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactErrors({});

    const parsed = contactSchema.safeParse(contact);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) errs[err.path[0] as string] = err.message;
      });
      setContactErrors(errs);
      return;
    }

    setSubmitting(true);
    const qualification = determineQualification();

    // Show result immediately for snappy UX
    setResult(qualification);

    // Fire DB insert + GHL sync in background — don't block UI
    try {
      const insertPromise = supabase.from("assessment_leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        business_name: parsed.data.business_name || null,
        credit_score_range: answers.credit_score,
        primary_goal: answers.primary_goal,
        business_status: answers.business_status,
        funding_timeline: answers.funding_timeline,
        denied_recently: answers.denied_recently === "yes",
        qualification,
      });

      // Fire-and-forget: sync to GHL with affiliate attribution
      const refId = getReferralAffiliateId();
      const tags = ["assessment-lead", qualification];
      if (refId) {
        tags.push("Affiliate", `Affiliate - ${refId}`);
      }

      const ghlPromise = supabase.functions
        .invoke("ghl-create-contact", {
          body: {
            name: parsed.data.name,
            email: parsed.data.email,
            phone: parsed.data.phone,
            businessName: parsed.data.business_name,
            tags,
            source: refId ? `Affiliate Referral - ${refId}` : "Funding Assessment",
            customFields: {
              credit_score_range: answers.credit_score,
              primary_goal: answers.primary_goal,
              business_status: answers.business_status,
              funding_timeline: answers.funding_timeline,
              denied_recently: answers.denied_recently,
              qualification,
              ...(refId ? { affiliate_id: refId } : {}),
            },
          },
        })
        .then(({ error: ghlErr }) => {
          if (ghlErr) console.error("GHL sync failed:", ghlErr);

          // If affiliate referral, also record the lead in the portal
          if (refId) {
            supabase.functions
              .invoke("ghl-affiliate-webhook", {
                body: {
                  type: "lead_referred",
                  affiliate_id: refId,
                  full_name: parsed.data.name,
                  email: parsed.data.email,
                  phone: parsed.data.phone,
                },
              })
              .then(({ error: webhookErr }) => {
                if (webhookErr) console.error("Affiliate lead sync failed:", webhookErr);
              });
          }
        });

      // Run both in parallel, don't block
      Promise.allSettled([insertPromise, ghlPromise]).catch(() => {});
    } catch {
      // Result is already shown — log silently
      console.error("Assessment background save failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Slide Animations ──────────────────────────────────────── */
  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] font-[Inter,sans-serif]">
      <PageMeta title="Funding Assessment | Ryland Partners" description="Take our free 2-minute assessment to discover your business funding eligibility." />
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logoDark} alt="Ryland Partners" className="h-7 w-auto" />
          </a>
          <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">
            Funding Assessment
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        {!result && (
          <p className="text-xs text-slate-400 mt-2 text-right font-medium">
            Step {step + 1} of {totalSteps}
          </p>
        )}
      </div>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
        <h1 className="sr-only">Funding Assessment</h1>
        <AnimatePresence mode="wait">
          {/* ── Quiz Steps ──────────────────────────────────── */}
          {result === null && step < STEPS.length && (
            <motion.div
              key={STEPS[step].id}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  {(() => {
                    const Icon = STEPS[step].icon;
                    return <Icon className="w-7 h-7 text-blue-600" />;
                  })()}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-[Geist,sans-serif] tracking-tight">
                  {STEPS[step].title}
                </h2>
                <p className="text-slate-500 mt-2 text-sm sm:text-base">
                  {STEPS[step].subtitle}
                </p>
              </div>

              <div className="space-y-3">
                {STEPS[step].options.map((opt) => {
                  const selected = answers[STEPS[step].id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => selectOption(STEPS[step].id, opt.value)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 group ${
                        selected
                          ? "border-blue-500 bg-blue-50/60 shadow-sm"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-semibold text-sm sm:text-base ${selected ? "text-blue-700" : "text-slate-800"}`}>
                            {opt.label}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{opt.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            selected ? "border-blue-500 bg-blue-500" : "border-slate-300"
                          }`}
                        >
                          {selected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-white"
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back button */}
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-6 flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors mx-auto"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
            </motion.div>
          )}

          {/* ── Contact Step ────────────────────────────────── */}
          {result === null && step === STEPS.length && (
            <motion.div
              key="contact"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <User className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-[Geist,sans-serif] tracking-tight">
                  Almost There!
                </h2>
                <p className="text-slate-500 mt-2 text-sm sm:text-base">
                  Enter your details to receive your personalized assessment results.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Gene Ryland", required: true },
                  { key: "email", label: "Email Address", type: "email", placeholder: "you@email.com", required: true },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "(555) 123-4567", required: true },
                  { key: "business_name", label: "Business Name (optional)", type: "text", placeholder: "Your Business LLC", required: false },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={contact[field.key as keyof typeof contact]}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, [field.key]: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
                    />
                    {contactErrors[field.key] && (
                      <p className="text-red-500 text-xs mt-1">{contactErrors[field.key]}</p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={submitting}
                  className="shiny-cta w-full !text-base !py-4 mt-2 disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2">
                    {submitting ? "Analyzing..." : "Get My Results"}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </span>
                </button>

                <p className="text-xs text-slate-400 text-center mt-2">
                  Your information is secure and will never be shared.
                </p>
              </form>

              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-6 flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors mx-auto"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            </motion.div>
          )}

          {/* ── Results ─────────────────────────────────────── */}
          {result === "credit_repair" && (
            <motion.div
              key="results-cr"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <CreditRepairResult />
            </motion.div>
          )}

          {result === "business_funding" && (
            <motion.div
              key="results-bf"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-[Geist,sans-serif] tracking-tight mb-3">
                Your Assessment is Complete
              </h2>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6 sm:p-8 mt-6 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 font-[Geist,sans-serif]">
                      You Qualify for Business Funding
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">Score range: Eligible</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Based on your credit profile, you're eligible for <strong>$50K – $250K</strong> in 0% APR business credit lines. Our team will create a custom funding strategy tailored to your business goals.
                </p>
                <ul className="space-y-2 mb-6">
                  {["0% APR business credit lines", "No personal collateral required", "Funding in as little as 30 days"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/consultation")}
                  className="shiny-cta w-full !text-base !py-4"
                >
                  <span className="flex items-center justify-center gap-2">
                    Book Your Funding Strategy Session <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-6">
                A member of our team may reach out to discuss your results.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
