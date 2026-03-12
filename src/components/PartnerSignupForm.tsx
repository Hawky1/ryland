import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const partnerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  business_name: z.string().trim().max(100).optional().or(z.literal("")),
  referral_source: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

interface PartnerSignupFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PartnerSignupForm({ open, onOpenChange }: PartnerSignupFormProps) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { name: "", email: "", phone: "", business_name: "", referral_source: "", message: "" },
  });

  const onSubmit = async (data: PartnerFormData) => {
    setSubmitting(true);
    try {
      // Call GHL first to get affiliate link before inserting
      let ghlContactId: string | null = null;

      try {
        const { data: ghlData, error: ghlError } = await supabase.functions.invoke("ghl-create-contact", {
          body: {
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            businessName: data.business_name || undefined,
            tags: ["partner-signup", "referral-partner"],
            source: "Partner Signup Form",
          },
        });

        if (!ghlError && ghlData) {
          ghlContactId = ghlData.contactId || null;
        }
      } catch {
        // GHL sync is non-critical — continue with insert
      }

      // Insert complete record with GHL data included
      const { error } = await supabase.from("partner_submissions").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        business_name: data.business_name || null,
        referral_source: data.referral_source || null,
        message: data.message || null,
        ghl_contact_id: ghlContactId,
      });

      if (error) throw error;

      setSubmitted(true);
      setSubmitted(true);
      // Close dialog and redirect to partner onboarding
      onOpenChange(false);
      navigate("/partner-onboarding");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setTimeout(() => {
        setSubmitted(false);
        setAffiliateLink(null);
        setCopied(false);
        form.reset();
      }, 300);
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-slate-950 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight font-manrope">
            {submitted ? "You're In! 🎉" : "Become A Partner"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {submitted
              ? "Welcome to the partner program — your referral link is ready below."
              : "Fill out the form below and our team will get you set up — it's 100% free."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center py-6 gap-5">
            <CheckCircle2 className="w-14 h-14 text-emerald-400" />

            {affiliateLink ? (
              <div className="w-full space-y-3">
                <p className="text-slate-300 text-sm text-center font-medium">
                  Your unique referral link is live — start sharing it now!
                </p>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3">
                  <span className="flex-1 text-xs text-blue-400 truncate font-mono">{affiliateLink}</span>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 p-1.5 rounded-md hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                    title="Copy link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 rounded-md hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-slate-500 text-xs text-center">
                  Check your email for a welcome message with full program details.
                </p>
              </div>
            ) : (
              <p className="text-slate-300 text-center text-sm max-w-xs">
                Check your email for a welcome message with your referral link and next steps. We're excited to have you on board.
              </p>
            )}

            <button onClick={() => handleClose(false)} className="shiny-cta !py-3 !px-8 !text-sm mt-1">
              <span>Close</span>
            </button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 text-xs uppercase tracking-widest">Full Name *</FormLabel>
                    <FormControl><Input {...field} placeholder="John Doe" className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 text-xs uppercase tracking-widest">Email *</FormLabel>
                    <FormControl><Input {...field} type="email" placeholder="john@example.com" className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 text-xs uppercase tracking-widest">Phone</FormLabel>
                    <FormControl><Input {...field} placeholder="(555) 123-4567" className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="business_name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 text-xs uppercase tracking-widest">Business Name</FormLabel>
                    <FormControl><Input {...field} placeholder="Your company" className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="referral_source" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 text-xs uppercase tracking-widest">How did you hear about us?</FormLabel>
                  <FormControl><Input {...field} placeholder="Social media, friend, etc." className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 text-xs uppercase tracking-widest">Anything else?</FormLabel>
                  <FormControl><Textarea {...field} placeholder="Tell us about your network..." rows={3} className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 resize-none" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <button type="submit" disabled={submitting} className="shiny-cta !py-3.5 !px-10 !text-base w-full mt-2">
                <span className="flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? "Submitting..." : "Join The Partner Program"}
                </span>
              </button>
              <p className="text-slate-500 text-xs text-center">100% free · No selling required · Uncapped earnings</p>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
