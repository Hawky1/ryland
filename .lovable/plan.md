

# Add 44 Digital Products to Shopify & Redesign Store Page

## Overview
Create all 44 digital products in Shopify with strategic pricing ($17-$27), then rebuild the `/store` page with a premium bundle-organized layout matching the site's design system.

## Pricing Strategy

Products are priced on a tiered basis: basic resources at $17, mid-tier guides at $22, and premium business credit/funding content at $27.

### Bundle 1: CREDIT AUTHORITY BUNDLE (6 products)
| Product | Price |
|---------|-------|
| Ultimate Business Credit Blueprint | $27 |
| Ultimate Credit Card Lender List | $27 |
| The Financial Playbook: Your Ultimate Money Resource Guide | $22 |
| Smart Credit Hacks | $22 |
| Credit Inquiry Phone Script -- Remove Inquiries Fast | $17 |
| AI-Powered Credit Dispute Letter Prompts | $17 |

### Bundle 2: CREDIT BUSINESS ACCELERATOR (9 products -- Basic tier)
| Product | Price |
|---------|-------|
| Unlock Credit Potential | $17 |
| DIY Credit Master Guide | $17 |
| DIY Credit Repair Workbook | $17 |
| 13 Ways to Pay Off Debt | $17 |
| Frugal Living Success Workbook | $17 |
| Crush $100K Debt Worksheet | $17 |
| Stop Living Paycheck to Paycheck | $17 |
| Money Management Worksheet | $17 |
| 23 Money-Wasting Habits to Break | $17 |

### Bundle 3: CREDIT BUSINESS FUNDING (6 products -- Premium tier)
| Product | Price |
|---------|-------|
| The "Fundability Factor" Business Assessment & Scorecard | $27 |
| The Business Funding Application Success Checklist | $27 |
| The Ultimate Business Credit Card Playbook | $27 |
| How to Get Up to $150,000 in Funding -- Even with a New LLC | $27 |
| Fast-Track Vendor Accounts for New Businesses | $27 |
| How to Get Vehicle Financing with EIN Only | $27 |

### Bundle 4: CREDIT BUSINESS QUICKSTART (3 products)
| Product | Price |
|---------|-------|
| Business Credit Basics 101 | $17 |
| How to Get Your First Net-30 Account | $17 |
| Essential Business Credit Checklist | $17 |

### Bundle 5: ULTIMATE CREDIT BUSINESS BUNDLE (16 products)
| Product | Price |
|---------|-------|
| Secret Lenders Database | $27 |
| Inquiry Removal Guide | $22 |
| Late Payment Removal Guide | $22 |
| Bankruptcy Removal Blueprint | $22 |
| Credit Repair Mistakes to Avoid Guide | $17 |
| Credit Repair Success Mindset Guide | $17 |
| 100 Dispute Letters Templates | $27 |
| Credit Repair Legal Rights Cheat Sheet | $17 |
| Credit Repair Success Planner | $17 |
| Unlocking Business Credit: Step-by-Step Success | $27 |
| Credit Score Tracker -- Printable | $17 |
| Credit Repair ChatGPT Prompts | $17 |
| Credit Building Resource Library | $22 |
| Repo Eraser: How to Delete Repossessions from Your Credit Fast | $22 |
| Credit Score Accelerator: The 90-Day Credit Comeback Plan | $27 |
| Manufactured Spending Techniques | $27 |

### Standalone Products
| Product | Price |
|---------|-------|
| The Ultimate Homebuyers Handbook | $27 |
| Master Your Credit: A Practical, Step-by-Step Guide | $22 |

## Step 1: Create All 44 Products in Shopify

Each product will be created using the Shopify create product tool with:
- Title as provided
- Price as listed above
- Cover image from the provided URLs
- Tags for bundle categorization (e.g., "Credit Authority Bundle", "Credit Business Accelerator")
- Product type: "Digital Product"

## Step 2: Redesign the Store Page

Replace the current generic grid with a premium, bundle-organized layout.

### Page Structure

**Hero Section**
- InfiniteGrid animated background
- Same sticky navbar as homepage
- Headline: "Digital Products & Resources"
- Sub-headline: "Expert guides and actionable playbooks to master credit, funding, and business growth"

**Bundle Navigation**
- Horizontal pill/tab navigation to jump between bundles
- Sticky below the hero for easy browsing

**5 Bundle Sections**
Each bundle gets its own section with:
- Large bundle name header with a short tagline
- Responsive product card grid (3 columns desktop, 2 tablet, 1 mobile)
- Framer Motion staggered entrance animations

**Product Cards (New Design)**
- Clean white card with rounded-2xl and subtle shadow (matching Wealth Ecosystem cards)
- Book cover image at top (aspect-[3/4])
- Title in bold dark text (font-manrope)
- Price badge in blue
- "Add to Cart" button with the signature blue gradient
- Hover: translateY(-4px) lift + shadow-xl via Framer Motion
- Click-through to `/product/:handle` detail page

**Footer**
- Same full footer as homepage

### Technical Details

**Files to Modify:**
- `src/pages/Store.tsx` -- Complete redesign with bundle sections, matching homepage design DNA (navbar, footer, InfiniteGrid, Framer Motion animations, Manrope/Geist typography)

**No new files or dependencies needed** -- reuses existing CartDrawer, InfiniteGrid, and shopify lib.

**Products loaded from Shopify API**, filtered client-side by tags into bundle groups.

