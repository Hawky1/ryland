

## Create a Partners Page for Ryland Partners

Build a dedicated `/partners` page targeting credit repair business owners who want to earn commissions by referring clients to Ryland Partners for business funding. The page mirrors the Cardiff affiliate program model but is fully branded to Ryland Partners' premium dark aesthetic.

---

### Page Structure (Top to Bottom)

**1. Hero Section**
- Bold headline: "Get Paid To Help Business Owners Access The Capital They Need To Scale"
- Subline: "even if they don't take the funding"
- Same dark background with InfiniteGrid + video overlay treatment as the home page
- Two CTAs: "Become A Partner Now" (blue gradient button) and "Partner Login" (ghost/outline link)

**2. Three Value Pillars (icon cards row)**
- "Get Paid For Introductions" -- You refer, we close. Hands-off commissions.
- "$10M+ Funded And Counting" -- Backed by real results and proven infrastructure.
- "Strengthen Your Network" -- Position yourself as the go-to funding connector.
- Each card uses the same rounded-2xl, border-white/10, ring-white/5 card style from the home page with a lucide icon.

**3. How It Works / "Turn Your Connections Into Commissions"**
- Short persuasive copy block (adapted from Cardiff's model, rewritten for Ryland Partners)
- Explains the unique value: you get paid when a referral qualifies, not only when they fund
- Bullet list of pain points it solves (no hard selling, no funnels, no chasing commissions)

**4. 3-Step Process**
- Step 1: "Get Your Partner Link" -- Get your unique referral link after approval.
- Step 2: "Refer Business Owners" -- Follow our proven strategy with done-for-you marketing assets, live trainings, and support.
- Step 3: "Get Paid" -- Earn for every qualified referral, even if they don't take the funding.
- Numbered steps with icons, matching the premium card styling.

**5. "Perfect For" Grid**
- 8-item grid of partner personas: Credit Repair Business Owners, Marketing Agency Owners, Accountants, Consultants, Financial Advisors, Business Coaches, Community Builders, Real Estate Agents
- Each with a lucide icon and label, styled as compact icon+text cards
- Tagline below: "OR anyone who knows business owners!"
- Blue gradient CTA: "Become A Partner Now"

**6. Support & Resources Section (dark accent background)**
- 4-card grid:
  - "Done-For-You Marketing Assets"
  - "Live Monthly Trainings"
  - "Get Paid Fast & On Time"
  - "Community Support"
- Each with icon, title, and short description

**7. "Easiest Money You've Never Made" CTA Block**
- Persuasive closing copy: "You already know the business owners. They already trust you. You just need a partner link."
- Blue gradient CTA button

**8. How We Service Referrals (3-step process for the referred business)**
- Step 1: Get Approved (2-minute questionnaire)
- Step 2: Find Best Terms (tailored funding options)
- Step 3: Ready to Scale (access up to $250K)
- Reminder callout: "As long as they qualify, you get paid!"

**9. FAQ Accordion**
- 7-8 questions adapted for Ryland Partners:
  - Do I get paid even if the business owner doesn't take the funding?
  - How much can I earn per qualified referral?
  - How do I know if someone qualifies?
  - Is this program only for professional affiliates?
  - What tools and support do I get?
  - How and when do I get paid?
  - Is there any cost to join?
  - How do I contact the partner team?
- Uses the same FAQ accordion pattern from the home page

**10. Final CTA**
- "Click below. Become a partner. Get paid to be a connector."
- Blue gradient CTA: "Start Earning Now"

**11. Footer**
- Reuses the same footer from the home page

---

### Technical Details

**New Files:**
- `src/pages/Partners.tsx` -- The full partners page component

**Modified Files:**
- `src/App.tsx` -- Add route: `<Route path="/partners" element={<Partners />} />`
- `src/pages/Index.tsx` -- Update the "Partners" link in the footer (line 1172) to point to `/partners`; optionally add a "Partners" nav link

**Styling Approach:**
- Reuses the same InfiniteGrid background, gradient-blur header, shiny-cta, blue gradient buttons, card styles, and typography (font-geist, font-manrope) from the home page
- Same dark slate/zinc color palette with white/10 borders and ring-white/5
- The inline `<style>` block with animations (shiny-cta, fadeInUp, etc.) will be shared
- FAQ uses the same accordion pattern already on the home page
- All CTAs use the established blue gradient button style

**Navigation:**
- The partners page will have its own simplified nav header (logo + Home link + "Become A Partner" CTA) using the same sticky header pattern
- Mobile menu included

**No new dependencies required.** Everything is built with existing Tailwind classes, lucide-react icons, and the patterns already established on the home page.

