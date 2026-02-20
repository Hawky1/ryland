
# Partner → GHL Affiliate Enrollment

## What's Working Today

When someone submits the partner form, two things happen:

1. Their data is saved to the `partner_submissions` database table
2. The `ghl-create-contact` edge function creates them as a **Contact** in GHL's CRM, tagged `partner-signup` and `referral-partner`

## The Gap

GHL has two separate systems that don't automatically talk to each other:

- **CRM Contacts** — what the current code creates. This is just a record in your database with tags. It does NOT give the person an affiliate link, commission tracking, or access to a referral dashboard.
- **Affiliate Manager** — a separate GHL module where you create Affiliate Campaigns, and each enrolled affiliate gets a unique referral link, commission percentage, and payout tracking.

Right now, partner signups are sitting in your CRM as tagged contacts, but your team would have to manually go into GHL Affiliates and enroll each one. This plan automates that step.

## How GHL Affiliates API Works

The GHL v2 API has an Affiliates endpoint. The flow is:

1. Create the contact (already done) — get back a `contactId`
2. Call `POST /affiliates/` with the `contactId` and your `campaignId` to enroll them as an affiliate
3. GHL generates a unique referral link for that contact and begins tracking commissions

You'll need one thing from your GHL account before this can be implemented: your **Affiliate Campaign ID**. This is found in GHL under:
`Marketing → Affiliate Manager → [Your Campaign] → Settings`

## Plan

### Step 1 — Store the Affiliate Campaign ID as a secret

Add a new secret `GHL_AFFILIATE_CAMPAIGN_ID` to the project so the edge function can access it securely.

### Step 2 — Update the `ghl-create-contact` edge function

After successfully creating the contact in GHL and getting back a `contactId`, make a second API call to enroll them as an affiliate:

```
POST https://services.leadconnectorhq.com/affiliates/
Authorization: Bearer {GHL_API_KEY}
Version: 2021-07-28

{
  "contactId": "<id from step 1>",
  "campaignId": "<GHL_AFFILIATE_CAMPAIGN_ID>",
  "locationId": "<GHL_LOCATION_ID>"
}
```

This enrollment is conditional — it only runs when the `source` passed to the function is `"Partner Signup Form"`, so other forms (contact page, assessment, etc.) are not affected.

### Step 3 — Return the affiliate link in the response

GHL returns a unique referral URL for the new affiliate. The edge function will pass this back to the frontend so it can be stored in the database alongside the partner submission.

### Step 4 — Store the affiliate link + GHL contact ID in the database

Add two new columns to the `partner_submissions` table:
- `ghl_contact_id` — for cross-referencing the GHL contact record
- `affiliate_link` — the unique referral URL GHL generates (so your team has it on hand without logging into GHL)

### Step 5 — Show the affiliate link in the success screen

After the form submits, the "You're In!" confirmation screen currently just says "Check your email." We can enhance it to display the affiliate's unique referral link directly, so they can start sharing immediately — no waiting for an email.

## Files That Will Change

| File | Change |
|------|--------|
| `supabase/functions/ghl-create-contact/index.ts` | Add affiliate enrollment API call after contact creation, conditional on source |
| `src/components/PartnerSignupForm.tsx` | Receive and display the affiliate link on the success screen |
| Database migration | Add `ghl_contact_id` and `affiliate_link` columns to `partner_submissions` |

## One Thing Needed From You

Before implementation, you'll need to provide:

**Your GHL Affiliate Campaign ID** — found in GHL under `Marketing → Affiliate Manager → [Your Campaign] → Settings`. It looks like a string ID (e.g., `abc123xyz`). This gets added as a secret and the edge function uses it to enroll each partner into the right campaign automatically.

Would you like to proceed? Once you confirm the Campaign ID is ready, the implementation can run fully automatically with no manual steps in GHL.
