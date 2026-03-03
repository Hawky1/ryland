

## Partner Onboarding Calendar Page

### Overview
Create a new `/partner-onboarding` page where new partners can schedule a 1-on-1 onboarding call. This reuses the existing calendar booking infrastructure but points to a **separate GHL calendar** (the ID you just provided).

### What needs to happen

**1. Store the new calendar ID as a secret**
- Add `GHL_PARTNER_CALENDAR_ID` with value `GPBpfYbMuLoKyOaeQGdr` so the edge function can reference it separately from the consultation calendar.

**2. Update the `ghl-calendar` edge function**
- Accept an optional `calendarType` field in the request body (`"consultation"` or `"partner"`).
- Default to the existing `GHL_CALENDAR_ID` for consultation; use `GHL_PARTNER_CALENDAR_ID` when `calendarType === "partner"`.
- This keeps a single edge function handling both calendars cleanly.

**3. Create a reusable `PartnerOnboardingCalendar` component**
- Fork the existing `ConsultationCalendar` into a new component that:
  - Passes `calendarType: "partner"` in all edge function calls.
  - Uses partner-specific header copy ("Book Your Partner Onboarding Call", etc.).
  - Tags the GHL contact with `partner-onboarding` instead of consultation tags.
  - After booking, navigates to a partner-specific confirmation or shows inline confirmation.

**4. Create the `/partner-onboarding` page**
- Same visual structure as the `/consultation` page (hero with video background, two-column layout).
- Left column: partner-specific messaging — what the onboarding covers (portal walkthrough, referral link setup, commission structure, marketing assets).
- Right column: the `PartnerOnboardingCalendar` component.
- Includes Navbar and Footer.

**5. Add the route in `App.tsx`**
- `<Route path="/partner-onboarding" element={<PartnerOnboarding />} />`

### Technical detail

The edge function change is minimal — just one conditional to pick which calendar ID env var to use:

```text
const calendarId = (body.calendarType === "partner")
  ? Deno.env.get("GHL_PARTNER_CALENDAR_ID")
  : Deno.env.get("GHL_CALENDAR_ID");
```

Everything else (slot fetching, booking, contact creation) stays identical.

