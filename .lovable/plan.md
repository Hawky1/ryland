

## Plan: Update Shopify Product Data (Titles, Descriptions, Tags)

This is a large batch operation across 47 Shopify products using the Shopify API tools. I will update titles, descriptions (body_html), and tags directly in your store.

---

### Critical Dependency: Tags + Frontend Sync

The `/store` page filters products by matching Shopify tags (e.g., `"Credit Authority Bundle"`). If we rename tags in Shopify, we **must also update** the `tag` field in the `BUNDLES` array in `src/pages/Store.tsx` — otherwise products will stop appearing in their sections.

**Tag rename mapping (Shopify + frontend):**

| Current Shopify Tag | New Shopify Tag |
|---|---|
| Credit Authority Bundle | Business Authority Bundle |
| Credit Business Accelerator | Entrepreneur Accelerator |
| Credit Business Funding | Business Funding Essentials |
| Credit Business Quickstart | Entrepreneur Quickstart |
| Ultimate Credit Business Bundle | Ultimate Business Education Bundle |

---

### Step 1: Update Product Titles (17 products)

| ID | Current Title | New Title |
|---|---|---|
| 14898867569003 | 100 Dispute Letters Templates | 100 Financial Strategy Templates |
| 14898863833451 | AI-Powered Credit Dispute Letter Prompts | AI-Powered Credit Education Prompts |
| 14898866946411 | Bankruptcy Removal Blueprint: Your Step-by-Step Guide to Clean Credit | Bankruptcy Education Blueprint: Understanding Credit Recovery |
| 14898868158827 | Credit Repair ChatGPT Prompts | Credit Education ChatGPT Prompts |
| 14898867700075 | Credit Repair Legal Rights Cheat Sheet | Credit Legal Rights Cheat Sheet |
| 14898867044715 | Credit Repair Mistakes to Avoid Guide | Credit Mistakes to Avoid Guide |
| 14898867208555 | Credit Repair Success Mindset Guide | Credit Success Mindset Guide |
| 14898867798379 | Credit Repair Success Planner | Credit Success Planner |
| 14898864193899 | DIY Credit Repair Workbook | DIY Credit Workbook |
| 14898863702379 | Credit Inquiry Phone Script – Remove Inquiries Fast | Credit Inquiry Phone Script – Understanding Inquiries |
| 14898866717035 | Inquiry Removal Guide: Step-by-Step Directions to Clean Up Your Credit | Inquiry Education Guide: Understanding Credit Inquiries |
| 14898866848107 | Late Payment Removal Guide | Late Payment Strategy Guide |
| 14898868388203 | Repo Eraser: How to Delete Repossessions from Your Credit Fast | Repo Strategy Guide: Understanding Repossessions on Your Credit |
| 14898868519275 | Credit Score Accelerator: The 90-Day Credit Comeback Plan | Credit Score Accelerator: The 90-Day Credit Education Plan |
| 14916577919339 | Credit Authority Bundle | Business Authority Bundle |
| 14916577886571 | Credit Business Accelerator Pack | Entrepreneur Accelerator Pack |
| 14916577952107 | Ultimate Credit Business Vault | Ultimate Business Education Vault |

### Step 2: Update Product Descriptions (5 bundles with body_html)

Rewrite descriptions for the 5 bundle products to use educational language. Remove "fix your credit," "help repair credit," "credit repair" — replace with "understand your credit," "credit education," "financial literacy."

### Step 3: Update Tags on All 47 Products

Replace bundle tag strings per the mapping above. Also remove any problematic tags like "credit repair", "credit restoration", "dispute", "credit fix", "score improvement" and add "business education", "financial literacy", "credit education" where appropriate.

### Step 4: Update Frontend Tag References

Update `src/pages/Store.tsx` BUNDLES array `tag` fields to match the new Shopify tags.

---

### Execution Order

1. Update all product titles + descriptions + tags via `shopify--update_product` (batched)
2. Update `src/pages/Store.tsx` to sync the `tag` fields with new Shopify tags

### Estimated API Calls

~47 `update_product` calls (one per product) + 1 code file edit.

