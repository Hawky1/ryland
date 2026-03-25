

# Client Intake Form for Scorexer (via Zapier)

## Summary

Build a new **Client Intake** page where existing GHL clients fill out their personal details (name, DOB, SSN, address, credit monitoring selection). On submit, the data is sent to a **Zapier webhook** which pushes it into Scorexer. The form also syncs back to GHL as a contact update.

## How It Works

```text
Client visits /credit-intake
  → Fills out multi-step intake form
  → On submit:
      1. POST to Zapier webhook → Scorexer creates client profile
      2. POST to ghl-create-contact → Updates/creates GHL contact with intake tags
      3. Show success confirmation
```

## What Gets Built

### 1. New page: `/credit-intake`

A branded, multi-step intake form matching the existing site design (similar stepped UI to the Assessment page). Fields based on the Scorexer form:

- **Step 1 — Personal Info**: First name, middle name, last name, email, cell phone, date of birth
- **Step 2 — Sensitive Info**: SSN (last 4 or full, with masking), credit monitoring service selection (IdentityIQ, SmartCredit, Privacy Guard, etc.)
- **Step 3 — Address**: Street, city, state, zip

All fields validated with Zod.

### 2. New edge function: `scorexer-intake`

Receives the validated form data and:
- Sends it to a **Zapier webhook URL** (stored as a secret `SCOREXER_ZAPIER_WEBHOOK_URL`)
- Calls the existing `ghl-create-contact` logic to tag the client in GHL (tag: `credit-intake-complete`)
- SSN is only sent to Zapier, never stored in the database

### 3. Route + navigation

- Add `/credit-intake` route in `App.tsx`
- Link from the Credit Repair page CTA or share as a standalone URL

## Security

- SSN is transmitted to the edge function over HTTPS, forwarded to Zapier, and **never persisted** in the database
- Edge function validates all inputs server-side
- Form uses input masking for SSN field

## Secret Needed

- `SCOREXER_ZAPIER_WEBHOOK_URL` — the Zapier webhook URL that triggers the Scorexer zap

## Technical Details

- Page component: `src/pages/CreditIntake.tsx`
- Edge function: `supabase/functions/scorexer-intake/index.ts`
- Reuses existing design patterns from Assessment page (stepped form, animations, Zod validation)
- Credit monitoring options: IdentityIQ, SmartCredit, Privacy Guard, My Score IQ (matching Scorexer's list)

