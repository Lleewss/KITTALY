# Calvin Klein Design Implementation

## Overview
Redesigned product cards across the site to match Calvin Klein's minimal, luxury aesthetic.

## Design Principles Applied

### Color Palette
- **Primary Black**: `#1D2022` (CK's exact black color)
- **Background**: `bg-neutral-50` for image placeholders
- Previously used: Generic `black` and `white`

### Typography
- **Font Weight**: `font-normal` (lighter, more minimal)
- **Font Size**: `text-sm` (clean, not overpowering)
- **Line Height**: `leading-tight` for compact text
- **Line Clamp**: `line-clamp-2` for consistent heights
- Previously used: `font-medium` with `text-base`

### Spacing
- **Minimal Approach**: `mt-2 space-y-1` (tighter spacing)
- **Generous Whitespace**: Removed extra padding
- Previously used: `pt-3` with `gap-2`

### Interactions
- **Subtle Hover**: `group-hover:opacity-90` (barely noticeable)
- **Transition**: `duration-200` (quick, refined)
- Previously used: `opacity-75` (too dramatic)

### Layout
- **No Buttons**: Removed "View Product" button (whole card is clickable)
- **Image First**: `aspect-[3/4]` ratio maintained
- **Clean Structure**: Minimal decorative elements
- Previously used: Button with border hover effects

## Files Changed

### 1. `components/layout/product-grid-items.tsx`
Main product grid component used on collection pages.

**Changes:**
- Removed `h-10`, `h-5`, `h-10` fixed heights
- Changed hover from `opacity-75` to `opacity-90`
- Removed "View Product" button entirely
- Changed `font-medium` to `font-normal`
- Changed `pt-3` to `mt-2`
- Added CK black color `#1D2022`
- Simplified price format: `{currencyCode} {amount}`

### 2. `components/product/related-products.tsx`
"You May Also Like" section on product detail pages.

**Changes:**
- Applied same minimal design as main grid
- Removed all fixed heights
- Simplified to clean text display
- Matching CK black color and typography
- Same subtle hover effect

## Before vs After

### Before:
```tsx
// Fixed heights, button, medium font
<div className="flex flex-col pt-3">
  <h3 className="text-sm font-medium h-10">Title</h3>
  <p className="text-sm h-5">Price</p>
  <button className="h-10 border">View Product</button>
</div>
```

### After:
```tsx
// Minimal spacing, normal font, no button
<div className="mt-2 space-y-1">
  <h3 className="text-sm font-normal text-[#1D2022] line-clamp-2">Title</h3>
  <p className="text-sm font-normal text-[#1D2022]">Price</p>
</div>
```

## Key Improvements

1. **Cleaner Visual Hierarchy**: Less visual noise, focus on products
2. **Luxury Feel**: Minimal typography and subtle interactions
3. **Better UX**: Whole card clickable instead of just button
4. **Consistency**: Matches high-end brand aesthetic
5. **Performance**: Fewer DOM elements (removed buttons)

## Brand Integrity

While adopting CK's layout principles, KITTALY's brand identity is maintained through:
- Using existing fonts (not Klein Web font)
- Keeping KITTALY logo and hero sections
- Maintaining site structure and navigation
- Adapting style, not copying directly

## Testing Checklist

- [ ] Verify product grids display correctly on desktop
- [ ] Test responsive behavior on tablet (3 columns)
- [ ] Test mobile view (2 columns)
- [ ] Check hover effects are subtle but visible
- [ ] Verify prices display correctly
- [ ] Test line-clamp works for long titles
- [ ] Check related products section on product pages
- [ ] Verify all links work (whole card is clickable)
