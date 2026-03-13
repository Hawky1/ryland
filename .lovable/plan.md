

## Plan: Reposition Store & Funnel Language from "Credit Repair" to "Business Education"

### Scope

Update product/store/funnel copy only. Leave alone: `/credit-repair`, `/assessment`, `/about`, legal pages, footer CROA notice, navbar service links, homepage service descriptions, partner page, contact page, and `FundingJourney.tsx`.

---

### Files to Edit

#### 1. `src/pages/Store.tsx`
- **BUNDLES array (lines 22-28):** Rename `name` fields per the mapping table. **Keep `tag` values unchanged** — these must match Shopify product tags exactly.
  - `"Credit Authority Bundle"` → name: `"Business Authority Bundle"`
  - `"Credit Business Accelerator"` → name: `"Entrepreneur Accelerator"`
  - `"Credit Business Funding"` → name: `"Business Funding Essentials"`
  - `"Credit Business Quickstart"` → name: `"Entrepreneur Quickstart"`
  - `"Ultimate Credit Business Bundle"` → name: `"Ultimate Business Education Bundle"`
- Update taglines: replace "credit mastery" → "financial mastery", "total credit transformation" → "total business transformation"
- **PageMeta (line 85):** Replace "credit repair" with "business education" in description

#### 2. `src/components/FeaturedBundles.tsx`
- Rename display titles (lines 16, 35, 44):
  - `"Ultimate Credit Business Vault"` → `"Ultimate Business Education Vault"`
  - `"Credit Authority Bundle"` → `"Business Authority Bundle"`
  - `"Credit Business Accelerator Pack"` → `"Entrepreneur Accelerator Pack"`
- Update subtitles: "Total Credit Transformation" → "Total Business Transformation", "Credit Mastery" → "Financial Mastery"

#### 3. `src/data/productContent.ts` (~40 changes across the file)
- **Category labels** in `details.category`: Update all instances:
  - `"Credit Authority Bundle"` → `"Business Authority Bundle"`
  - `"Credit Business Accelerator Pack"` → `"Entrepreneur Accelerator Pack"`
  - `"Ultimate Credit Business Bundle"` → `"Ultimate Business Education Bundle"`
  - `"Ultimate Credit Business Vault"` → `"Ultimate Business Education Vault"`
- **Product descriptions & benefits** containing "credit repair" language — reframe to educational language:
  - "credit repair guides" → "credit education guides"
  - "credit repair progress" → "credit improvement progress"
  - "credit repair journey" → "credit improvement journey"
  - "credit repair system" → "credit education system"
  - "credit repair mistakes" → "credit mistakes"
  - "credit repair action guide" → "credit education guide"
  - "help repair credit" → "help improve credit"
  - "credit restoration" → "credit education"
  - "credit transformation" → "financial transformation"
- **Bundle headlines/descriptions** (lines 810-904): Reframe from repair to education framing
- **Bundle includes titles** remain unchanged (these are actual product names in Shopify)

#### 4. `src/pages/funnel/FunnelCoreOffer.tsx`
- **EBOOKS array (lines 24-27):** These are actual product titles displayed as cover labels — rename the ones with "Credit Repair" in the title:
  - `"Credit Repair ChatGPT Prompts"` → `"Credit Education ChatGPT Prompts"`
  - `"Credit Repair Legal Rights Guide"` → `"Credit Legal Rights Guide"`
  - `"DIY Credit Repair Workbook"` → `"DIY Credit Workbook"`
- **FAQ answer (line 47):** Replace "dispute letters, removal guides, and credit-building strategies" — reframe from repair to education
- **Page copy (line 146):** "every dispute template" → soften to educational framing

#### 5. `src/pages/funnel/FunnelDownsell.tsx`
- **Alt text (line 78):** `"Master Your Credit — Complete Bundle"` — fine as-is (no "repair" language)
- Scan confirms no "credit repair" language on this page. No changes needed.

#### 6. `src/components/store/StoreHero.tsx`
- Already uses "Premium Digital Resources" and "Financial Freedom" — no "credit repair" language. No changes needed.

---

### Important Notes

- **Shopify tags are NOT changed** — the `tag` field in the BUNDLES array must remain as-is because they match Shopify product tags used for filtering. Only the `name` (display) field changes.
- **Product handles are NOT changed** — these are Shopify URL slugs and must stay synchronized.
- **Individual product titles in bundleIncludes** (e.g., "Credit Repair ChatGPT Prompts") — these match Shopify product names. Changing display titles here without changing them in Shopify will cause mismatches. I will update the display copy but keep `handle` values intact.
- **File names** (cover images like `credit-repair-chatgpt-prompts.png`) stay unchanged — only display text is updated.

### Summary of Touch Points

| File | Changes |
|------|---------|
| `src/pages/Store.tsx` | Bundle names, taglines, PageMeta |
| `src/components/FeaturedBundles.tsx` | Bundle titles, subtitles |
| `src/data/productContent.ts` | ~40 category labels + description rewrites |
| `src/pages/funnel/FunnelCoreOffer.tsx` | Ebook display titles, FAQ copy |

