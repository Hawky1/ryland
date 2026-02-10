

## Create Legal & Compliance Pages (CCPA + TSR)

Build a full suite of legal and compliance pages to make the Ryland Partners site compliant with the California Consumer Privacy Act (CCPA) and the FTC Telemarketing Sales Rule (TSR). All pages will use the same dark premium aesthetic as the existing site.

---

### Pages to Create

**1. Privacy Policy** (`/privacy-policy`)
- Data collection practices (personal info, cookies, analytics, GTM)
- How data is used, shared, and stored
- CCPA-specific disclosures: categories of personal information collected, right to know, right to delete, right to opt-out of sale, right to non-discrimination
- "Do Not Sell My Personal Information" section
- Cookie policy details
- Third-party services (Google Tag Manager, analytics)
- Data retention and security measures
- Contact information for privacy inquiries

**2. Terms of Service** (`/terms-of-service`)
- Acceptance of terms
- Description of services (funding referrals, credit restoration, partner program)
- User responsibilities and eligibility
- Intellectual property rights
- Limitation of liability and disclaimers
- TSR compliance disclosures for any telemarketing activities
- Dispute resolution and governing law
- Modification and termination clauses

**3. CCPA Notice / Do Not Sell** (`/ccpa`)
- Dedicated CCPA rights page
- Categories of personal information collected in the last 12 months
- Business purpose for collection
- Categories of third parties with whom data is shared
- "Do Not Sell My Personal Information" opt-out instructions
- How to submit a verifiable consumer request (know, delete, opt-out)
- Response timeframe (45 days per CCPA)
- Authorized agent instructions

**4. TSR Compliance / Telemarketing Disclosures** (`/tsr-compliance`)
- Seller and telemarketer identification
- Material terms of the offer disclosed before payment
- Refund/cancellation policy
- Calling time restrictions (8am-9pm local)
- Do Not Call list compliance
- Prohibition on deceptive and abusive practices
- Fee disclosures (no advance fees for credit repair per TSR)
- Recording and consent disclosures

**5. Disclaimers** (`/disclaimers`)
- Earnings disclaimer (partner/affiliate program -- no guaranteed income)
- Funding disclaimer (approval not guaranteed, terms vary)
- Credit restoration disclaimer (results vary, no guarantee of specific outcomes)
- Not legal/financial advice disclaimer
- Third-party links disclaimer
- Testimonials disclaimer (results not typical)

**6. Cookie Policy** (`/cookie-policy`)
- Types of cookies used (essential, analytics, marketing)
- Google Tag Manager / GA4 cookies
- How to manage cookie preferences
- Third-party cookies
- Cookie retention periods

---

### Technical Details

**New Files (6):**
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/TermsOfService.tsx`
- `src/pages/CCPA.tsx`
- `src/pages/TSRCompliance.tsx`
- `src/pages/Disclaimers.tsx`
- `src/pages/CookiePolicy.tsx`

**Modified Files (2):**
- `src/App.tsx` -- Add 6 new routes
- `src/pages/Index.tsx` -- Update footer links (Privacy Policy, Terms of Service) to point to real routes; add links for CCPA, TSR, Disclaimers, Cookie Policy in a new "Legal" footer column

**Page Template:**
Each legal page will follow the same structure:
- Same dark background with InfiniteGrid
- Simplified nav header (logo + Home link) matching the Partners page
- Clean, readable content area: max-w-4xl centered container with white text, proper heading hierarchy (h1, h2, h3), and comfortable line-height/spacing
- Prose-style layout optimized for long-form legal text
- "Last Updated" date at the top
- Footer matching the home page

**Styling:**
- Reuses the same InfiniteGrid background, gradient-blur header, fonts, and dark color palette
- Legal text uses `text-slate-300` for body, `text-white` for headings
- Sections separated by `border-white/10` dividers
- No new dependencies required

**Footer Update:**
The footer on the home page will be updated to include a "Legal" column with links to all 6 pages, replacing the current placeholder `#` links for Privacy Policy and Terms of Service.

---

### Important Note

These pages provide a strong compliance framework but should be reviewed by a qualified attorney before going live. The content will be written as accurately as possible for a business offering funding referrals, credit restoration services, and a partner/affiliate program, but legal counsel should verify everything matches the specific business practices.

