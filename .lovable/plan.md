

# Upload 42 PDF E-books to Storage

## Summary
I will create a script that downloads each PDF from the URLs you provided and uploads them to the private `ebooks` storage bucket, named to match their Shopify product handles exactly.

## Complete File Mapping

Here is the full mapping of your 42 PDFs to their required storage filenames:

| # | Product | Storage Filename | Source URL |
|---|---------|-----------------|------------|
| 1 | Ultimate Business Credit Blueprint | `ultimate-business-credit-blueprint.pdf` | 69b9fb97...b221b7.pdf |
| 2 | Ultimate Credit Card Lender List | `ultimate-credit-card-lender-list.pdf` | 69b9fb97...d4196c.pdf |
| 3 | The Financial Playbook | `the-financial-playbook-your-ultimate-money-resource-guide.pdf` | 69b9fb97...393dfc.pdf |
| 4 | Smart Credit Hacks | `smart-credit-hacks.pdf` | 69b9fb97...19636c.pdf |
| 5 | Credit Inquiry Phone Script | `credit-inquiry-phone-script-remove-inquiries-fast.pdf` | 69b9fb97...b221b6.pdf |
| 6 | AI-Powered Credit Prompts | `ai-powered-credit-dispute-letter-prompts.pdf` | 69b9fb97...19636b.pdf |
| 7 | Unlock Credit Potential | `unlock-credit-potential.pdf` | 69b9fbc1...196699.pdf |
| 8 | DIY Credit Master Guide | `diy-credit-master-guide.pdf` | 69b9fbc1...955193.pdf |
| 9 | DIY Credit Workbook | `diy-credit-repair-workbook.pdf` | 69b9fbc1...b224ba.pdf |
| 10 | 13 Ways to Pay Off Debt | `13-ways-to-pay-off-debt.pdf` | 69b9fbc1...394158.pdf |
| 11 | Frugal Living Success Workbook | `frugal-living-success-workbook.pdf` | 69b9fbc1...196699.pdf |
| 12 | Crush $100K Debt Worksheet | `crush-100k-debt-worksheet.pdf` | 69b9fbc1...b224b9.pdf |
| 13 | Stop Living Paycheck to Paycheck | `stop-living-paycheck-to-paycheck.pdf` | 69b9fbc1...d41c8b.pdf |
| 14 | Money Management Worksheet | `money-management-worksheet.pdf` | 69b9fbc1...38c52c.pdf |
| 15 | 23 Money-Wasting Habits to Break | `23-money-wasting-habits-to-break.pdf` | 69b9fbc1...d41c8a.pdf |
| 16 | Fundability Factor Scorecard | `the-fundability-factor-business-assessment-scorecard.pdf` | 69b9fdce...b2478f.pdf |
| 17 | Business Funding Checklist | `the-business-funding-application-success-checklist.pdf` | 69b9fdce...9c2144.pdf |
| 18 | Ultimate Business Credit Card Playbook | `the-ultimate-business-credit-card-playbook.pdf` | 69b9fdce...d43fee.pdf |
| 19 | How to Get $150K Funding | `how-to-get-up-to-150-000-in-funding-even-with-a-new-llc.pdf` | 69b9fdce...b2478e.pdf |
| 20 | Fast-Track Vendor Accounts | `fast-track-vendor-accounts-for-new-businesses.pdf` | 69b9fdce...9c2145.pdf |
| 21 | Vehicle Financing with EIN | `how-to-get-vehicle-financing-with-ein-only.pdf` | 69b9fdce...ec1e2b.pdf |
| 22 | Business Credit Basics 101 | `business-credit-basics-101.pdf` | 69b9fe58...68eb42.pdf |
| 23 | First Net-30 Account | `how-to-get-your-first-net-30-account.pdf` | 69b9febe...9c3e9c.pdf |
| 24 | Essential Business Credit Checklist | `essential-business-credit-checklist.pdf` | 69b9fe58...68eb43.pdf |
| 25 | Secret Lenders Database | `secret-lenders-database.pdf` | 69b9fb80...38bfee.pdf |
| 26 | Inquiry Removal Guide | `inquiry-removal-guide-step-by-step-directions-to-clean-up-your-credit.pdf` | 69b9fb80...5faf5d.pdf |
| 27 | Late Payment Removal Guide | `late-payment-removal-guide.pdf` | 69b9fb80...5faf5b.pdf |
| 28 | Bankruptcy Removal Blueprint | `bankruptcy-removal-blueprint-your-step-by-step-guide-to-clean-credit.pdf` | 69b9fb80...ebf427.pdf |
| 29 | Credit Repair Mistakes Guide | `credit-repair-mistakes-to-avoid-guide.pdf` | 69b9fb80...5faf59.pdf |
| 30 | Credit Success Mindset Guide | `credit-repair-success-mindset-guide.pdf` | 69b9fb80...5faf5c.pdf |
| 31 | 100 Dispute Letters Templates | `100-dispute-letters-templates.pdf` | 69b9fb80...6bea45.pdf |
| 32 | Credit Legal Rights Cheat Sheet | `credit-repair-legal-rights-cheat-sheet.pdf` | 69b9fb80...5faf5a.pdf |
| 33 | Credit Success Planner | `credit-repair-success-planner.pdf` | 69b9fb80...9bf8c5.pdf |
| 34 | Unlocking Business Credit | `unlocking-business-credit-step-by-step-success.pdf` | 69b9fb80...68b494.pdf |
| 35 | Credit Score Tracker | `credit-score-tracker-printable.pdf` | 69b9fb80...d417af.pdf |
| 36 | Credit Repair ChatGPT Prompts | `credit-repair-chatgpt-prompts.pdf` | 69b9fb80...ebf428.pdf |
| 37 | Credit Building Resource Library | `credit-building-resource-library.pdf` | 69b9fb80...d417b6.pdf |
| 38 | Repo Eraser | `repo-eraser-how-to-delete-repossessions-from-your-credit-fast.pdf` | 69b9fb80...5faf58.pdf |
| 39 | Ultimate Homebuyers Handbook | `the-ultimate-homebuyers-handbook.pdf` | 69b9fb80...b2200c.pdf |
| 40 | Credit Score Accelerator | `credit-score-accelerator-the-90-day-credit-comeback-plan.pdf` | 69b9fb80...6bea44.pdf |
| 41 | Manufactured Spending Techniques | `manufactured-spending-techniques.pdf` | 69b9fb80...5faf5e.pdf |
| 42 | Master Your Credit | `master-your-credit-a-practical-step-by-step-guide-to-boosting-your-score.pdf` | 69b9fb80...68b493.pdf |

## Note
I noticed that "Frugal Living Success Workbook" and "Unlock Credit Potential" share the same source URL (`69b9fbc1...196699`). Please confirm if that is correct or if one of them has a different file.

## Implementation Steps

1. **Write a script** that iterates through all 42 URL-to-filename mappings
2. **Download each PDF** from the provided CDN URLs
3. **Upload each PDF** to the `ebooks` storage bucket using the service role key
4. **Verify** all 42 files uploaded successfully and log any failures

No code changes needed -- this is purely a data upload task using the existing infrastructure.

