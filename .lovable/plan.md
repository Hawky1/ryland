

# GoHighLevel Integration Plan

## What This Does

When someone fills out the funnel lead form (name + email), the system will:
1. Save the lead to your database (already working)
2. Create a new contact in GoHighLevel CRM
3. Trigger a GHL workflow/automation for that contact

## How It Works

The integration flows through a secure backend function so your API key is never exposed to the browser:

```text
User submits form
      |
      v
Save to database (existing)
      |
      v
Call backend function
      |
      +---> Create GHL Contact (POST /contacts)
      |
      +---> Trigger GHL Workflow (POST /contacts/{id}/workflow/{workflowId})
      |
      v
Redirect to /funnel/offer
```

## Setup Steps

### Step 1: Store your GoHighLevel API key securely
- You'll be prompted to paste your GHL API key
- It will be encrypted and stored as a backend secret

### Step 2: Create a backend function (`ghl-create-contact`)
- Receives name, email, and optional workflow ID
- Calls GoHighLevel API v2 to create a contact
- Optionally triggers a workflow on that contact
- Returns success/failure to the frontend

### Step 3: Update the funnel form
- After saving the lead to the database, call the new backend function
- The GHL sync happens in parallel — it won't block the user's redirect
- If GHL fails, the lead is still saved and the user still proceeds (no broken experience)

### Step 4: Workflow ID configuration
- The workflow ID will be passed from the frontend or set as a secret
- You can provide it now or add it later — the integration works either way (contact creation still happens)

## Technical Details

### New file: `supabase/functions/ghl-create-contact/index.ts`
- Edge function that calls GoHighLevel API v2 endpoints
- Uses `GHL_API_KEY` secret for authentication
- Optionally uses `GHL_WORKFLOW_ID` secret if set
- Endpoints used:
  - `POST https://rest.gohighlevel.com/v1/contacts/` — create contact
  - `POST https://rest.gohighlevel.com/v1/contacts/{contactId}/workflow/{workflowId}` — trigger workflow
- Includes full CORS headers for browser calls
- Graceful error handling with logging

### Modified file: `src/pages/funnel/FunnelLeadMagnet.tsx`
- After successful database insert, fire a non-blocking call to the edge function
- Uses `supabase.functions.invoke('ghl-create-contact', { body: { name, email } })`
- The call is fire-and-forget — user redirects immediately regardless of GHL response

### Modified file: `supabase/config.toml`
- Add `[functions.ghl-create-contact]` with `verify_jwt = false` (public funnel form, no auth needed)

### Secrets to add
- `GHL_API_KEY` — your GoHighLevel API key (required)
- `GHL_LOCATION_ID` — your GHL sub-account/location ID (required for contact creation)
- `GHL_WORKFLOW_ID` — the workflow to trigger (optional, can add later)

