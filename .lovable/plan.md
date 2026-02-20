
# Launch Checklist: Main Site & Shopify Store

This is a comprehensive breakdown of everything needed to take both the main marketing site (rylandpartners.com) and the Shopify digital products store live.

---

## MAIN SITE (ryland.lovable.app → custom domain)

### 1. Custom Domain Setup
- Connect your real domain (e.g. rylandpartners.com) in Project Settings → Domains
- Add two A records pointing to 185.158.133.1: one for @ (root) and one for www
- Add the TXT verification record Lovable provides
- Set one as primary (root redirects to www or vice versa)
- DNS propagation can take up to 72 hours
- Update sitemap.xml to use the real domain (currently hardcoded to ryland.lovable.app)
- Update robots.txt to reference the real domain sitemap URL

### 2. Partner Login Link
- The Partners page hero has a "Partner Login →" anchor tag linking to `href="#"` — this is a dead link
- Either connect it to a real GHL affiliate portal URL or remove it until ready

### 3. GHL Affiliate Enrollment (In Progress)
- The `POST /affiliates/` API route does not exist in GHL's public API, so affiliate links cannot be auto-generated via code
- The GHL Workflow automation (triggered by the `partner-signup` tag) must be set up manually inside GoHighLevel
- Until that workflow is live, new partner signups will see "Check your email for your referral link" — which is correct, but the email needs to actually be configured in GHL to send the affiliate link

### 4. Assessment → GHL Sync
- Confirm the `ghl-create-contact` edge function is being called when an assessment is submitted (not just on partner signups)
- Verify the assessment lead tags (e.g. `assessment-lead`) are showing up correctly in GHL

### 5. Consultation Calendar
- The `/funnel/consultation` page renders the `ConsultationCalendar` component via the `ghl-calendar` edge function
- Verify the calendar loads real available slots and that bookings appear in GHL

### 6. Contact Form
- The `/contact` page submits to Supabase (`contact_submissions` table) and invokes `ghl-create-contact`
- Confirm contacts created from the Contact page are tagged and routed correctly in GHL

### 7. Funnel Pages
- The 4-step funnel (/funnel, /funnel/offer, /funnel/founders, /funnel/consultation) needs to be tested end-to-end as a real user flow
- Confirm the lead magnet opt-in on `/funnel` triggers GHL contact creation

### 8. Legal Pages Review
- All legal pages exist: Privacy Policy, Terms, CCPA, TSR Compliance, Disclaimers, Cookie Policy
- Review copy on each for accuracy before going live — especially the CROA/TSR disclosures in the footer

### 9. Meta Tags & SEO
- `PageMeta` is implemented on all major pages
- Confirm Open Graph image (og:image) is set for social sharing previews
- Verify the canonical URL will be the real domain after publishing

### 10. Mobile QA
- Test the Navbar mobile drawer across all pages
- Test all forms (Contact, Partner Signup, Assessment) on mobile
- Test the video backgrounds (hero + About section) on mobile — autoplay is muted, verify iOS behavior

### 11. Publish
- Click Publish in Lovable to deploy the latest build to the live domain
- Frontend changes require clicking "Update" in the publish dialog — backend (edge functions) deploys automatically

---

## SHOPIFY STORE (/store + /product/:handle)

### 1. Claim Your Store (REQUIRED to go live)
- The Shopify store is currently a sandbox/development store
- To accept real payments, you must **claim the store** by typing "Claim Store" in the chat — this starts your 30-day free trial
- After the trial, a paid Shopify plan is required to keep selling

### 2. Verify Products Are Live in Shopify Admin
- All products must be set to "Active" status in the Shopify admin dashboard
- Confirm product images, prices, titles, tags, and descriptions are correct
- The store page groups products by these tags: "Credit Authority Bundle", "Credit Business Accelerator", "Credit Business Funding", "Credit Business Quickstart", "Ultimate Credit Business Bundle", "Standalone" — confirm all products have the correct tag assigned

### 3. Test the Full Purchase Flow
- Add a product to cart → verify CartDrawer opens with correct item
- Verify the checkout URL opens in a new tab with `?channel=online_store` in the URL
- Complete a real test purchase to confirm Shopify processes payment and delivers the digital product

### 4. Digital Product Delivery
- Confirm Shopify is configured to send the digital download link to customers after purchase
- This is typically done via a Shopify app (e.g. Digital Downloads, SendOwl, or Sky Pilot) — verify one is installed and the files are attached

### 5. Cart Drawer Only Shows on /store
- Currently the CartDrawer icon only appears in the sticky nav of `/store` when items are in the cart, and on `/product/:handle`
- Confirm this behavior is correct — if you want the cart icon in the main Navbar across all pages, that would need to be added

### 6. Product Detail Page (/product/:handle)
- Confirm the product detail page loads correctly for all products
- Verify the "Add to Cart" button and variant selector work
- The page currently has no footer — confirm this is intentional

### 7. Shopify Payments / Billing Setup
- After claiming the store, set up your payment gateway in the Shopify admin (Shopify Payments, Stripe, PayPal, etc.)
- Configure payout bank account for receiving funds
- Set shipping settings to "No shipping" (digital products only)

### 8. Post-Purchase GHL Sync (Optional but Recommended)
- Consider setting up a Shopify → GHL webhook or Zapier automation so that customers who purchase are automatically added as contacts in GHL with a "customer" tag
- This would enable post-purchase email sequences, upsells, and community onboarding

### 9. Sitemap Update for Products
- After going live, consider adding `/store` and individual product handles to `sitemap.xml` for SEO
- Shopify also generates its own sitemap at `yourstore.myshopify.com/sitemap.xml`

### 10. Store Domain Decision
- Currently the store is embedded within the main Lovable site at `/store`
- The Shopify checkout happens on Shopify's domain (not yours)
- If you want a fully custom checkout URL, that requires a Shopify Plus plan

---

## PRIORITY ORDER SUMMARY

**Do first (blockers):**
1. Claim Shopify store
2. Connect real custom domain
3. Set up digital product delivery in Shopify
4. Configure GHL affiliate enrollment workflow for partner-signup tag
5. Update sitemap.xml with real domain

**Do before launch (important):**
6. Test full purchase flow end-to-end with a real card
7. Test all forms on mobile
8. Verify GHL contact creation from all form touchpoints (Assessment, Contact, Partner, Funnel)
9. Fix the "Partner Login →" dead link
10. Review all legal page copy

**Can do post-launch (nice to have):**
11. Shopify → GHL post-purchase automation
12. Add og:image for social sharing previews
13. Add product pages to sitemap
14. Partner dashboard page for affiliates to log in and view stats
