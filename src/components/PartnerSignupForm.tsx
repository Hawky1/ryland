import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";

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
      const { error } = await supabase.from("partner_submissions").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        business_name: data.business_name || null,
        referral_source: data.referral_source || null,
        message: data.message || null,
      });

      if (error) throw error;

      // Sync to GHL
      try {
        await supabase.functions.invoke("ghl-create-contact", {
          body: {
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            businessName: data.business_name || undefined,
            tags: ["partner-signup", "referral-partner"],
            source: "Partner Signup Form",
          },
        });
      } catch {
        // GHL sync is non-critical
      }

      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setTimeout(() => { setSubmitted(false); form.reset(); }, 300);
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
              ? "We'll be in touch within 24 hours with your next steps."
              : "Fill out the form below and our team will get you set up — it's 100% free."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center py-8 gap-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400" />
            <p className="text-slate-300 text-center text-sm max-w-xs">
              Check your email for a welcome message. We're excited to have you on board.
            </p>
            <button onClick={() => handleClose(false)} className="shiny-cta !py-3 !px-8 !text-sm mt-2">
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
