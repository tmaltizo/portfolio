# CSS Class Contract: Pastel Color Palette

**Phase**: Phase 1 Design  
**Purpose**: Define the CSS class interface that components MUST implement to use the new pastel color palette.

---

## Contract Overview

Components consuming the pastel color palette MUST use Tailwind CSS classes following these patterns. This ensures consistency, maintainability, and makes color changes centralized in Tailwind config.

---

## Semantic Color Class Definitions

### Light Mode Base Classes

```
bg-light-bg          → Background color: #FAF6F1 (linen cream)
text-light-text      → Text color: #6F4E37 (coffee brown)
text-light-text-dark → Text color: #4A3728 (dark coffee brown) 
text-light-accent    → Accent color: #9DC183 (sage green)
border-light-border  → Border color: #D4C5B9 (muted taupe)
```

### Dark Mode Classes (with `dark:` prefix)

```
dark:bg-dark-bg            → Background color: #1E1818 (muted dark brown)
dark:text-dark-text        → Text color: #E9DCC9 (warm beige)
dark:text-dark-text-secondary → Text color: rgba(233, 220, 201, 0.7)
dark:text-dark-accent      → Accent color: #8DAA91 (dusty sage)
dark:border-dark-border    → Border color: rgba(212, 197, 185, 0.2)
```

---

## Component Class Contracts

### Contract 1: Page Container / Main Background

**Purpose**: Set the primary background color for the page or major sections  
**Required Classes**: 
- Light mode: `bg-light-bg text-light-text`
- Dark mode: `dark:bg-dark-bg dark:text-dark-text`

**Example Usage**:
```jsx
<main className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
  {/* Page content */}
</main>
```

**Validation**: Element must have both background AND text color classes for both light and dark modes.

---

### Contract 2: Primary Headings

**Purpose**: Headings that establish hierarchy and emphasis  
**Required Classes**:
- Light mode: `text-light-text-dark` (darker shade for emphasis)
- Dark mode: `dark:text-dark-text` (same as body text, size creates hierarchy)

**Example Usage**:
```jsx
<h1 className="text-light-text-dark dark:text-dark-text text-3xl font-bold">
  Main Heading
</h1>
```

**Validation**: Headings should use darker text color in light mode for clear hierarchy; same text color in dark mode (size provides hierarchy).

---

### Contract 3: Interactive Elements (Links, Buttons)

**Purpose**: Indicate interactivity with accent colors and hover states  
**Required Classes**:
- Unvisited link: `text-light-accent dark:text-dark-accent`
- Hover link: `hover:text-light-accent-hover dark:hover:text-dark-accent-hover`
- Button background: `bg-light-accent dark:bg-dark-accent`
- Button hover: `hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover`

**Example Usage** (Link):
```jsx
<a href="#" className="text-light-accent hover:text-light-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover">
  Interactive Link
</a>
```

**Example Usage** (Button):
```jsx
<button className="bg-light-accent hover:bg-light-accent-hover dark:bg-dark-accent dark:hover:bg-dark-accent-hover text-white px-4 py-2 rounded">
  Action Button
</button>
```

**Validation**: All interactive elements must have explicit hover states; must use accent colors; must support both light and dark modes.

---

### Contract 4: Icons (React Icons)

**Purpose**: Recolor icons to match the pastel palette  
**Required Classes**: Wrap icon or parent in `text-light-accent dark:text-dark-accent`

**Example Usage**:
```jsx
<div className="text-light-accent dark:text-dark-accent">
  <AiFillLinkedin className="text-2xl" />
</div>
```

OR apply classes directly if the icon element supports className:

```jsx
<AiFillLinkedin className="text-light-accent dark:text-dark-accent text-2xl" />
```

**Validation**: Icon color must be visible and distinct from background in both modes; hover color can be accent-hover if interactive.

---

### Contract 5: Borders and Dividers

**Purpose**: Subtle visual separation using palette-derived border color  
**Required Classes**: `border-light-border dark:border-dark-border`

**Example Usage**:
```jsx
<div className="border-b border-light-border dark:border-dark-border py-4">
  Section content
</div>
```

**Validation**: Borders should be subtle; visible but not prominent against background.

---

### Contract 6: Cards and Contained Elements

**Purpose**: Contained sections nested within main background  
**Usage Pattern**: 
- If card background differs from page: define `bg-light-bg-secondary` (lighter shade of linen)
- If card inherits page background: use same background class as parent

**Example Usage**:
```jsx
<div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-6 rounded">
  Card content with inherited page colors
</div>
```

**Validation**: Cards should maintain readability; if nested, text color might need adjustment (darker for light backgrounds, lighter for dark).

---

## Testing Contract Compliance

### Automated Tests (Jest)

```javascript
// Verify all main sections use correct background and text classes
test('Main section uses light-bg and dark-bg classes', () => {
  const { container } = render(<Home />);
  const main = container.querySelector('main');
  
  // For light mode
  expect(main).toHaveClass('bg-light-bg', 'text-light-text');
  
  // Dark mode would be verified separately with dark prop/state
});

// Verify interactive elements have hover classes
test('Links include hover state classes', () => {
  const { container } = render(<Contact />);
  const links = container.querySelectorAll('a');
  
  links.forEach(link => {
    expect(link).toHaveClass('text-light-accent', 'hover:text-light-accent-hover');
    expect(link).toHaveClass('dark:text-dark-accent', 'dark:hover:text-dark-accent-hover');
  });
});
```

### Manual Verification

- [ ] Load page in light mode; all text is readable with coffee brown color
- [ ] Load page in dark mode; all text is readable with warm beige color
- [ ] Hover over links; color changes to accent-hover shade
- [ ] Icons are colored in accent color; visible on background
- [ ] Borders are subtle but visible; separate sections
- [ ] Toggle dark mode; all classes apply correctly instantly

---

## Breaking Changes and Migration

**None**: This is a new color system applied to existing components. Components currently using hardcoded color class names (e.g., `text-purple-800`, `bg-white`) will be updated to use the new semantic classes.

**Migration Path**:
1. Define new color palette in tailwind.config.js
2. Update each component's className to use new semantic classes
3. Run tests to verify classes apply correctly
4. Manual QA in light and dark modes
5. Merge to main

---

## Class Naming Conventions

**Rationale for Semantic Names**: Using `light-` and `dark-` prefixes makes the intent clear ("use light mode accent color") rather than relying on descriptive names like `sage-green` which might become outdated if palette changes.

**Alternative Approach Rejected**: Using descriptive names (`sage-green`, `coffee-brown`) without mode prefix would require manual dark mode logic and is less maintainable.

**Consistency Rule**: All new color classes MUST follow the `[mode]-[role]` pattern.
