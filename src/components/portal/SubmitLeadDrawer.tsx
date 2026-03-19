import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface SubmitLeadDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubmitLeadDrawer({ open, onClose, onSuccess }: SubmitLeadDrawerProps) {
  const { affiliate } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", company_name: "", notes: "" });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!affiliate) return;

    if (!form.full_name.trim() || !form.email.trim()) {
      toast({ title: "Error", description: "Name and email are required.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("affiliate_leads").insert({
      affiliate_id: affiliate.id,
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      company_name: form.company_name.trim() || null,
      notes: form.notes.trim() || null,
      status: "New Lead",
      pipeline_stage: "New Lead",
    });
    setLoading(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Lead submitted", description: `${form.full_name} has been added to your pipeline.` });
      setForm({ full_name: "", email: "", phone: "", company_name: "", notes: "" });
      onSuccess();
      onClose();
    }
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-white">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-lg font-bold text-slate-900">Submit New Lead</SheetTitle>
          <SheetDescription className="text-sm text-slate-500">Add a business owner you've referred.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600">Full Name *</Label>
            <Input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="John Smith" required className="border-slate-200" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600">Email *</Label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" required className="border-slate-200" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600">Phone</Label>
            <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(555) 555-5555" className="border-slate-200" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600">Company Name</Label>
            <Input value={form.company_name} onChange={(e) => update("company_name", e.target.value)} placeholder="Acme Corp" className="border-slate-200" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600">Notes</Label>
            <Textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any context about this lead..." rows={3} className="border-slate-200 resize-none" />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
            Submit Lead
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
