import { useState, useEffect, useCallback } from "react";
import { format, startOfMonth, endOfMonth, addMonths, isBefore, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, CheckCircle2, Loader2, Clock, CalendarDays, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Step = "select-date" | "select-time" | "details" | "confirmed";

interface SlotMap {
  [date: string]: { slots: string[] };
}

export default function ConsultationCalendar() {
  const [step, setStep] = useState<Step>("select-date");
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [slots, setSlots] = useState<SlotMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [booking, setBooking] = useState(false);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const fetchSlots = useCallback(async (monthStart: Date) => {
    setLoading(true);
    setError(null);
    try {
      const start = startOfMonth(monthStart);
      const end = endOfMonth(monthStart);
      const { data, error: fnError } = await supabase.functions.invoke("ghl-calendar", {
        body: {
          action: "get-slots",
          startDate: start.getTime(),
          endDate: end.getTime(),
          timezone,
        },
      });
      if (fnError) throw fnError;
      // The GHL API nests slots inside a root key or returns them flat
      const slotData: SlotMap = data || {};
      setSlots(slotData);
    } catch (e: any) {
      console.error("Failed to fetch slots:", e);
      setError("Unable to load availability. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [timezone]);

  useEffect(() => {
    fetchSlots(month);
  }, [month, fetchSlots]);

  const availableDates = new Set(
    Object.entries(slots)
      .filter(([, v]) => v.slots && v.slots.length > 0)
      .map(([k]) => k)
  );

  const today = startOfDay(new Date());

  const isDayDisabled = (date: Date) => {
    if (isBefore(date, today)) return true;
    const key = format(date, "yyyy-MM-dd");
    return !availableDates.has(key);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedSlot(null);
    setStep("select-time");
  };

  const timeSlotsForDate = selectedDate
    ? slots[format(selectedDate, "yyyy-MM-dd")]?.slots || []
    : [];

  const formatSlotTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  const handleBook = async () => {
    if (!name.trim() || !email.trim() || !selectedSlot) return;
    setBooking(true);
    setError(null);

    try {
      // Assume 30-min slots
      const startTime = selectedSlot;
      const endDate = new Date(new Date(selectedSlot).getTime() + 30 * 60 * 1000);
      const endTime = endDate.toISOString();

      const { data, error: fnError } = await supabase.functions.invoke("ghl-calendar", {
        body: {
          action: "book",
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          notes: notes.trim() || undefined,
          startTime,
          endTime,
          timezone,
        },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setStep("confirmed");
    } catch (e: any) {
      console.error("Booking failed:", e);
      setError("Booking failed. Please try again or contact us directly.");
    } finally {
      setBooking(false);
    }
  };

  const stepIndicator = (
    <div className="flex items-center gap-2 px-6 pt-5 pb-2">
      {[
        { key: "select-date", icon: CalendarDays, label: "Date" },
        { key: "select-time", icon: Clock, label: "Time" },
        { key: "details", icon: User, label: "Details" },
      ].map((s, i) => {
        const steps: Step[] = ["select-date", "select-time", "details", "confirmed"];
        const currentIdx = steps.indexOf(step);
        const thisIdx = i;
        const isActive = thisIdx === currentIdx;
        const isDone = thisIdx < currentIdx;
        return (
          <div key={s.key} className="flex items-center gap-2">
            {i > 0 && <div className={cn("w-6 h-px", isDone ? "bg-emerald-400" : "bg-slate-200")} />}
            <div
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1 transition-colors",
                isActive && "bg-slate-900 text-white",
                isDone && "bg-emerald-50 text-emerald-600",
                !isActive && !isDone && "bg-slate-100 text-slate-400"
              )}
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
      {/* Header */}
      <div className="p-6 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 font-[Geist,sans-serif]">
          Book Your Free Strategy Session
        </h3>
        <p className="text-slate-500 text-sm mt-1">Choose a time that works for you</p>
      </div>

      {step !== "confirmed" && stepIndicator}

      <AnimatePresence mode="wait">
        {/* ── STEP 1: DATE ── */}
        {step === "select-date" && (
          <motion.div
            key="date"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4"
          >
            {loading ? (
              <div className="space-y-3 p-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <p className="text-red-500 text-sm mb-3">{error}</p>
                <Button variant="outline" size="sm" onClick={() => fetchSlots(month)}>
                  Retry
                </Button>
              </div>
            ) : (
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                month={month}
                onMonthChange={(m) => setMonth(startOfMonth(m))}
                disabled={isDayDisabled}
                fromDate={today}
                toDate={endOfMonth(addMonths(today, 2))}
                className="p-3 pointer-events-auto mx-auto"
              />
            )}
          </motion.div>
        )}

        {/* ── STEP 2: TIME ── */}
        {step === "select-time" && (
          <motion.div
            key="time"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6"
          >
            <button
              onClick={() => setStep("select-date")}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {selectedDate && format(selectedDate, "EEEE, MMMM d")}
            </button>

            {timeSlotsForDate.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">No slots available for this date.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
                {timeSlotsForDate.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedSlot === slot ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "text-sm",
                      selectedSlot === slot && "bg-slate-900 text-white hover:bg-slate-800"
                    )}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {formatSlotTime(slot)}
                  </Button>
                ))}
              </div>
            )}

            {selectedSlot && (
              <Button
                className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white"
                onClick={() => setStep("details")}
              >
                Continue
              </Button>
            )}
          </motion.div>
        )}

        {/* ── STEP 3: DETAILS ── */}
        {step === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-4"
          >
            <button
              onClick={() => setStep("select-time")}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {selectedDate && format(selectedDate, "MMM d")} at{" "}
              {selectedSlot && formatSlotTime(selectedSlot)}
            </button>

            <div className="space-y-3">
              <div>
                <Label htmlFor="cal-name" className="text-slate-700 text-sm">
                  Full Name *
                </Label>
                <Input
                  id="cal-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="mt-1"
                  maxLength={100}
                />
              </div>
              <div>
                <Label htmlFor="cal-email" className="text-slate-700 text-sm">
                  Email *
                </Label>
                <Input
                  id="cal-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="mt-1"
                  maxLength={255}
                />
              </div>
              <div>
                <Label htmlFor="cal-phone" className="text-slate-700 text-sm">
                  Phone
                </Label>
                <Input
                  id="cal-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="mt-1"
                  maxLength={20}
                />
              </div>
              <div>
                <Label htmlFor="cal-notes" className="text-slate-700 text-sm">
                  Anything we should know?
                </Label>
                <Textarea
                  id="cal-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Current credit score, funding goals, etc."
                  className="mt-1"
                  rows={3}
                  maxLength={500}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!name.trim() || !email.trim() || booking}
              onClick={handleBook}
            >
              {booking ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking…
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </motion.div>
        )}

        {/* ── STEP 4: CONFIRMED ── */}
        {step === "confirmed" && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            </motion.div>
            <h4 className="text-xl font-bold text-slate-900">You're Booked!</h4>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} at{" "}
              {selectedSlot && formatSlotTime(selectedSlot)}
            </p>
            <p className="text-slate-400 text-xs">
              Check your email for confirmation details. We look forward to speaking with you!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
