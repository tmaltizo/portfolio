# Quickstart: Pastel Color Palette Implementation

**Time Estimate**: 2-3 hours for complete implementation  
**Files Affected**: 7 (1 config, 4 components, 2 test/style files)  
**Difficulty**: Low - CSS-only changes, no logic modifications

---

## 5-Minute Overview

Replace the current generic color scheme with a warm pastel palette:
- **Light mode**: Linen cream backgrounds, coffee brown text, sage green accents
- **Dark mode**: Muted dark brown backgrounds, warm beige text, dusty sage accents

All changes go into Tailwind config + component className updates. Zero breaking changes.

---

## Before You Start

1. Ensure you're on branch: `001-pastel-colors`
2. Review [data-model.md](data-model.md) for color definitions and hex values
3. Review [contracts/css-classes.md](contracts/css-classes.md) for class patterns
4. Have [spec.md](spec.md) open for reference (success criteria, accessibility requirements)

---

## Step 1: Update Tailwind Configuration (5 minutes)

**File**: `react-portfolio/tailwind.config.js`

Add the new color palette to the theme.extend.colors section:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode palette
        'light-bg': '#FAF6F1',
        'light-text': '#6F4E37',
        'light-text-dark': '#4A3728',
        'light-accent': '#9DC183',
        'light-accent-hover': '#7A9B6E',
        'light-border': '#D4C5B9',
        
        // Dark mode palette
        'dark-bg': '#1E1818',
        'dark-text': '#E9DCC9',
        'dark-text-secondary': 'rgba(233, 220, 201, 0.7)',
        'dark-accent': '#8DAA91',
        'dark-accent-hover': '#A3C4A5',
        'dark-border': 'rgba(212, 197, 185, 0.2)',
      }
    }
  }
  // ... rest of config
}
```

**Verify**: Run `npm run dev` and check that no Tailwind errors appear in the console.

---

## Step 2: Update Home Component (30 minutes)

**File**: `react-portfolio/components/Home.js`

This is the main page component. Replace color class names following the pattern:

### Find and Replace Pattern

**Background & Text** (main container):
```jsx
// BEFORE:
<main className="bg-white px-10 dark:bg-gray-900">
  <div className="min-h-screen 2xl:mx-60">

// AFTER:
<main className="bg-light-bg dark:bg-dark-bg px-10 text-light-text dark:text-dark-text">
  <div className="min-h-screen 2xl:mx-60">
```

**Navigation text**:
```jsx
// BEFORE:
<nav className="pt-10 pr-10 pl-10 flex justify-between dark:text-white">
  <h1 className="text-xl font-mono">trizothethird</h1>

// AFTER:
<nav className="pt-10 pr-10 pl-10 flex justify-between text-light-text dark:text-dark-text">
  <h1 className="text-xl font-mono text-light-text dark:text-dark-text">trizothethird</h1>
```

**Interactive Elements** (buttons, links):
```jsx
// BEFORE:
<a href="..." className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400">
  Button

// AFTER:
<a href="..." className="bg-light-accent dark:bg-dark-accent text-white px-4 py-2 rounded-md hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover">
  Button
```

**Icons** (React Icons):
```jsx
// BEFORE:
<AiFillLinkedin className="text-2xl hover:text-purple-500" />

// AFTER:
<div className="text-light-accent dark:text-dark-accent hover:text-light-accent-hover dark:hover:text-dark-accent-hover">
  <AiFillLinkedin className="text-2xl" />
</div>
```

**Headings**:
```jsx
// BEFORE:
<h2 className="text-3xl py-1 dark:text-white">About Me</h2>

// AFTER:
<h2 className="text-3xl py-1 text-light-text-dark dark:text-dark-text">About Me</h2>
```

**Key sections to update**:
- Navigation bar
- Hero/intro section
- About section
- Skills section
- Projects section
- All interactive buttons and links
- All headings (h1-h6)
- All paragraphs (ensure text-light-text class is on parent)

---

## Step 3: Update Contact Component (20 minutes)

**File**: `react-portfolio/components/Contact.js`

Apply the same pattern:
- Contact form styling: use `dark:text-dark-text` for labels, inputs
- Button: use `bg-light-accent dark:bg-dark-accent` with hover states
- Form input borders: use `border-light-border dark:border-dark-border`
- Success/error messages: maintain accent color for consistency

---

## Step 4: Update Global Styles (5 minutes)

**File**: `react-portfolio/styles/globals.css` (if it has default colors)

Check for any CSS rules that hardcode colors (not using Tailwind classes). Update them:

```css
/* BEFORE: */
body {
  color: #000;
  background: #fff;
}

/* AFTER: */
body {
  @apply text-light-text dark:text-dark-text;
  @apply bg-light-bg dark:bg-dark-bg;
}
```

---

## Step 5: Test Light Mode (10 minutes)

1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Load the portfolio in light mode
4. **Verification Checklist**:
   - [ ] Background is linen cream (#FAF6F1)
   - [ ] All text is readable (coffee brown, not too dark or light)
   - [ ] Headings are darker for emphasis
   - [ ] Links and buttons are sage green (#9DC183)
   - [ ] Hover over links → color changes to deep sage (#7A9B6E)
   - [ ] All icons are sage green
   - [ ] No white text on light backgrounds
   - [ ] Borders are visible but subtle (muted taupe)

---

## Step 6: Test Dark Mode (10 minutes)

1. Click the dark mode toggle on the portfolio
2. **Verification Checklist**:
   - [ ] Background is muted dark brown (#1E1818)
   - [ ] All text is readable (warm beige, not washed out)
   - [ ] Headings are same color as body text (size provides hierarchy)
   - [ ] Links and buttons are dusty sage (#8DAA91)
   - [ ] Hover over links → color changes to lighter dusty sage
   - [ ] All icons are dusty sage
   - [ ] No harsh contrast or eye strain
   - [ ] Borders are visible with opacity

3. **Toggle between modes**: Click dark mode off/on - colors should change instantly without page reload

---

## Step 7: Run Tests (15 minutes)

```bash
# Run all tests
npm test

# Expected results:
# - Snapshot tests pass (or update snapshots if this is first run)
# - Contrast validation tests pass
# - Accessibility tests pass
# - No new errors in linting
```

**If tests fail**:
- Check that all component classes follow the pattern in [contracts/css-classes.md](contracts/css-classes.md)
- Ensure Tailwind config has been saved and reloaded
- Verify no hardcoded color names remain (e.g., `text-red-500`, `bg-blue-200`)

---

## Step 8: Accessibility Validation (10 minutes)

Before submitting:

1. **Use WebAIM Contrast Checker**:
   - Test coffee brown (#6F4E37) on linen cream (#FAF6F1): Should be ≥4.5:1
   - Test warm beige (#E9DCC9) on dark brown (#1E1818): Should be ≥4.5:1
   - Test sage green (#9DC183) on backgrounds: Should be ≥3:1

2. **Test with color vision deficiency simulator**:
   - Visit https://www.color-blindness.com/coblis-color-blindness-simulator/
   - Upload a screenshot
   - Simulate Deuteranopia, Protanopia, Tritanopia
   - Verify accents remain distinguishable

3. **Screen reader spot check**:
   - Open in browser
   - Enable screen reader (NVDA on Windows, VoiceOver on Mac)
   - Navigate to confirm no content is missing

---

## Step 9: Code Review Checklist

Before merging:

- [ ] All hardcoded color values replaced with semantic Tailwind classes
- [ ] Both light and dark mode classes present on all colored elements
- [ ] Hover/focus states defined for all interactive elements
- [ ] No remaining references to old color names (purple-800, gray-900, etc.)
- [ ] Tailwind config follows the semantic naming pattern
- [ ] Tests pass (unit, integration, accessibility)
- [ ] Manual QA passed in both modes
- [ ] Accessibility validation completed
- [ ] No new dependencies added
- [ ] No changes to component logic or HTML structure (CSS only)

---

## Rollback Plan

If issues arise:

```bash
# Revert all component changes:
git checkout HEAD -- react-portfolio/components/

# Revert tailwind config:
git checkout HEAD -- react-portfolio/tailwind.config.js

# Restart:
npm run dev
```

---

## Common Issues & Solutions

### Issue: Colors look different in DevTools than in browser
**Solution**: Tailwind requires a build step. If dev server is running, styles should update automatically. Try:
```bash
# Force rebuild
npm run dev
```

### Issue: Dark mode doesn't toggle
**Solution**: Verify the Home component still has `className={darkMode ? "dark" : ""}` on the main element.

### Issue: Icons not colored
**Solution**: React Icons use `currentColor` by default. Wrap icon in a div with the text color class:
```jsx
<div className="text-light-accent dark:text-dark-accent">
  <AiFillLinkedin className="text-2xl" />
</div>
```

### Issue: Borders invisible
**Solution**: Check that border-color class is on the same element as border-width class:
```jsx
// Correct:
<div className="border-b border-light-border dark:border-dark-border">

// Wrong:
<div className="border-b">
  <span className="border-light-border">...</span>
</div>
```

### Issue: Text unreadable on background
**Solution**: Verify both background AND text color classes are present:
```jsx
// Correct:
<div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">

// Wrong (missing text color):
<div className="bg-light-bg dark:bg-dark-bg">
```

---

## Estimated Timeline

| Task | Time |
|------|------|
| Update Tailwind config | 5 min |
| Update Home component | 30 min |
| Update Contact component | 20 min |
| Update globals.css | 5 min |
| Test light mode | 10 min |
| Test dark mode | 10 min |
| Run automated tests | 15 min |
| Accessibility validation | 10 min |
| **Total** | **1.5-2 hours** |

---

## Success Criteria

When complete, the portfolio should:
- ✅ Display linen cream backgrounds in light mode
- ✅ Display warm beige text and coffee brown headings in light mode
- ✅ Display sage green links and buttons in light mode
- ✅ Display dark brown backgrounds in dark mode
- ✅ Display warm beige text in dark mode
- ✅ Display dusty sage accents in dark mode
- ✅ All text meets WCAG 2.1 AA contrast in both modes
- ✅ Dark mode toggle works instantly
- ✅ All tests pass
- ✅ No loss of functionality
