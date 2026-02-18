

# Custom GHL Calendar for Consultation Page

Replace the iframe-based GoHighLevel booking widget with a fully custom, branded calendar UI that fetches real availability from the GHL API and books appointments directly.

## What Changes

### 1. New Edge Function: `ghl-calendar`
A backend function that proxies two GHL Calendar API v2 endpoints, keeping the API key secure on the server:

- **GET free slots** -- Calls `GET /calendars/:calendarId/free-slots` with `startDate`, `endDate`, and `timezone` query params. Returns an availability map like `{ "2026-02-20": { "slots": ["2026-02-20T10:00:00-05:00", ...] } }`.
- **Book appointment** -- First creates/upserts a GHL contact (reuses existing logic), then calls `POST /calendars/events/appointments` with `calendarId`, `locationId`, `contactId`, `startTime`, and `endTime`.

Uses the existing `GHL_API_KEY`, `GHL_LOCATION_ID`, and `GHL_CALENDAR_ID` secrets (all already configured).

### 2. New Component: `ConsultationCalendar.tsx`
A multi-step booking widget replacing the iframe:

- **Step 1 -- Pick a Date**: Uses the existing shadcn `Calendar` component. On mount, fetches the current month's free slots from the edge function. Days with no availability are disabled. Navigating months fetches the next month's slots.
- **Step 2 -- Pick a Time**: Shows available time slots for the selected date as a scrollable grid of buttons (e.g., "10:00 AM", "11:00 AM").
- **Step 3 -- Enter Details**: A compact form collecting name, email, phone, and an optional note.
- **Step 4 -- Confirmation**: Success state with a checkmark animation and booking summary.

The component is styled with a white card aesthetic matching the current design (white background, rounded corners, shadow).

### 3. Updated `FunnelConsultation.tsx`
- Remove the iframe and `GHL_CALENDAR_URL` constant
- Import and render `ConsultationCalendar` in its place
- No changes to the left-side hero copy or trust badges

### 4. Register Edge Function
Add `ghl-calendar` to `supabase/config.toml` with `verify_jwt = false`.

---

## Technical Details

### Edge Function: `supabase/functions/ghl-calendar/index.ts`

Handles two actions via a POST body `{ action: "get-slots" | "book" }`:

**get-slots action:**
```text
POST /ghl-calendar
{ action: "get-slots", startDate: 1740000000000, endDate: 1742000000000, timezone: "America/New_York" }

--> Proxies to: GET https://services.leadconnectorhq.com/calendars/{GHL_CALENDAR_ID}/free-slots
    ?startDate={startDate}&endDate={endDate}&timezone={timezone}
    Headers: Authorization: Bearer {GHL_API_KEY}, Version: 2021-04-15

Returns: { "2026-02-20": { "slots": [...] }, ... }
```

**book action:**
```text
POST /ghl-calendar
{ action: "book", name, email, phone, notes, startTime, endTime, timezone }

Step 1: Create/upsert contact via existing GHL contacts API
Step 2: POST https://services.leadconnectorhq.com/calendars/events/appointments
        Body: { calendarId, locationId, contactId, startTime, endTime, title, appointmentStatus: "new" }
        Headers: Authorization: Bearer {GHL_API_KEY}, Version: 2021-04-15

Returns: { success: true, appointmentId: "..." }
```

### Component: `src/components/funnel/ConsultationCalendar.tsx`

```text
State machine: "select-date" -> "select-time" -> "details" -> "confirmed"

- Fetches slots on mount and on month navigation
- Disables past dates and dates with no slots
- Time slots rendered as pill buttons
- Form validated with basic required field checks
- Loading and error states handled throughout
- Uses supabase.functions.invoke("ghl-calendar", { body: {...} })
```

### Files Created
- `supabase/functions/ghl-calendar/index.ts`
- `src/components/funnel/ConsultationCalendar.tsx`

### Files Modified
- `supabase/config.toml` (add `[functions.ghl-calendar]`)
- `src/pages/funnel/FunnelConsultation.tsx` (swap iframe for new component)
