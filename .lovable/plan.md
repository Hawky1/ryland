
## Replace Wealth Ecosystem Card Buttons with Blue Gradient Style

### What Changes
Replace all five `shiny-cta` buttons in the "Complete Wealth Ecosystem" section with the blue gradient rounded-full button style you provided.

### Technical Details

**File:** `src/pages/Index.tsx`

Replace each of the 5 card buttons (lines 704, 728, 752, 776, 800) from:
```html
<a href="#cta" className="shiny-cta !py-2.5 !px-5 !text-sm focus:outline-none text-center w-full block">
  <span>Button Text</span>
</a>
```

To:
```html
<a href="#cta" className="inline-flex w-full transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,123,255,0.8)] hover:scale-[1.02] hover:bg-gradient-to-tr hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 active:shadow-inner active:shadow-blue-900/50 active:scale-[0.98] active:duration-75 text-sm font-semibold text-white bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 rounded-full py-3.5 px-8 shadow-[0_4px_15px_rgba(0,123,255,0.4)] items-center justify-center">
  Button Text
</a>
```

The five buttons and their text:
1. "Optimize Your Credit" (The Vault)
2. "Access The Network" (The Network)
3. "Join The Academy" (The Academy)
4. "Get The Tools" (Digital Assets)
5. "Talk To An Expert" (Expert Support)

No other sections or buttons are affected.
