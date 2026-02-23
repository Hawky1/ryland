

# Update Store Hero Stats to High-Level Language

## What's Changing
The "10K+" stat in the Store Hero section currently claims a specific number of entrepreneurs served. We'll replace it with vaguer, aspirational language that avoids exact figures.

## Technical Details

**File:** `src/components/store/StoreHero.tsx` (line ~49)

Change the stat from:
- `{ value: "10K+", label: "Entrepreneurs Served" }`

To:
- `{ value: "Thousands", label: "of Entrepreneurs Helped" }`

This keeps the social proof impact without making a specific numerical claim. Single line change, no other files affected.

