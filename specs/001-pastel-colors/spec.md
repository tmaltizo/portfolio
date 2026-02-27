# Feature Specification: Pastel Color Palette Redesign

**Feature Branch**: `001-pastel-colors`  
**Created**: February 26, 2026  
**Status**: Draft  
**Input**: User description: "Change the general color pallet of the website with natural pastel colors (linen cream background, coffee brown text and sage green elements, giving a cozy vibe like a coffee shop). Use color combinations that make sense. Since there is a light and dark mode, make to write in the specification file that all elements/text appears clearly."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitors view the portfolio with improved visual harmony (Priority: P1)

Visitors accessing the portfolio experience a cohesive, warm visual identity that evokes a cozy coffee shop atmosphere. The natural pastel color palette creates a welcoming and professional impression, enhancing the browsing experience without distraction from the content.

**Why this priority**: This is the core user experience. Every visitor immediately experiences the new color scheme, and visual consistency across all pages defines whether the redesign succeeds. A harmonious color palette directly impacts how visitors perceive professionalism and trustworthiness.

**Independent Test**: Can be fully tested by loading the homepage in a browser and verifying that all page sections use the new pastel color scheme consistently, creating the intended cozy coffee shop aesthetic while maintaining visual clarity.

**Acceptance Scenarios**:

1. **Given** a visitor loads the portfolio homepage, **When** they view the page, **Then** they see linen cream background, coffee brown text, and sage green accents throughout
2. **Given** a visitor views multiple sections (About, Projects, Contact), **When** they navigate between sections, **Then** color consistency is maintained across all pages
3. **Given** a visitor hovers over interactive elements (buttons, links), **When** they interact with them, **Then** the color transitions maintain the warm pastel aesthetic and remain visually distinct from the base colors

---

### User Story 2 - Visitors using light mode experience clear text contrast and readability (Priority: P1)

Users who prefer light mode can read all content clearly without eye strain. All text meets WCAG 2.1 AA contrast requirements, ensuring readability for users with varying visual capabilities.

**Why this priority**: Accessibility is mandatory per the Constitution. Light mode users represent a significant portion of visitors, and poor contrast creates barriers for users with color vision deficiency or low vision. This is a non-negotiable requirement.

**Independent Test**: Can be fully tested by opening the portfolio in light mode and verifying all text elements (body text, headings, links) meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text) when measured against their backgrounds.

**Acceptance Scenarios**:

1. **Given** the portfolio is in light mode, **When** viewing body text on the linen cream background, **Then** the coffee brown text meets WCAG AA contrast ratio (minimum 4.5:1)
2. **Given** the portfolio is in light mode, **When** viewing headings or large text, **Then** contrast ratio meets WCAG AA standard (minimum 3:1)
3. **Given** the portfolio is in light mode, **When** viewing interactive elements (links, buttons), **Then** all text is clearly readable and distinguishable from the background

---

### User Story 3 - Visitors using dark mode experience clear text contrast and readability (Priority: P1)

Users who prefer dark mode can read all content clearly. The dark mode color scheme complements the pastel aesthetic while maintaining strong contrast and readability for all text elements.

**Why this priority**: Dark mode is equally important as light mode. The portfolio currently supports dark mode, and removing this support or degrading its quality would negatively impact user experience. Accessibility standards apply equally to both modes.

**Independent Test**: Can be fully tested by toggling the portfolio to dark mode and verifying all text elements maintain WCAG 2.1 AA contrast ratios against their dark mode backgrounds.

**Acceptance Scenarios**:

1. **Given** the portfolio is in dark mode, **When** viewing body text, **Then** the text color meets WCAG AA contrast ratio (minimum 4.5:1) against the dark background
2. **Given** the portfolio is in dark mode, **When** viewing all interactive elements, **Then** they are clearly visible and distinguishable from the background
3. **Given** a user toggles between light and dark modes, **When** they switch, **Then** all text and interactive elements remain readable in both modes without loss of content or functionality

---

### User Story 4 - Visitors see sage green elements enhance key interactive components (Priority: P2)

Sage green accents draw attention to important interactive elements (buttons, links, call-to-action sections) without overwhelming the design. The sage green provides visual hierarchy while maintaining the warm, cohesive aesthetic.

**Why this priority**: Secondary priority because the core experience (readable text, color consistency) takes precedence. However, accent colors significantly improve user guidance and navigation clarity, making this important for overall UX.

**Independent Test**: Can be fully tested by viewing interactive components (buttons, form elements, link hover states) and verifying sage green accents are applied consistently and improve visual hierarchy without creating contrast issues.

**Acceptance Scenarios**:

1. **Given** a visitor views buttons or call-to-action elements, **When** they see sage green accent colors applied, **Then** the accents create visual hierarchy guiding them toward key actions
2. **Given** a visitor hovers over a link or button with sage green accent, **When** they interact with it, **Then** the interactive state (hover/focus) is visually distinct while maintaining contrast
3. **Given** a visitor views the portfolio on different sections, **When** sage green accents are applied to icons, badges, or decorative elements, **Then** they reinforce the coffee shop aesthetic without creating visual clutter

---

### Edge Cases

- What happens when text or elements need to meet contrast requirements that conflict with achieving a specific pastel shade? (Contrast takes priority; adjust tone if needed)
- How are accent colors applied to decorative elements that don't require interaction? (Sage green can be applied at reduced opacity for subtle design enhancement)
- What if certain UI components (form inputs, disabled states) need darker or lighter colors to indicate their state? (Maintain pastel philosophy but adjust lightness/saturation to clearly indicate state)

## Clarifications

### Session 2026-02-26

- Q: Should the Honeybun.js component be included in the color palette redesign scope? → A: No, exclude Honeybun.js and its /honeybun endpoint entirely from this feature. Only update Home.js and Contact.js components.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The portfolio MUST use linen cream (#FAF6F1 or nearest perceptually equivalent) as the primary background color in light mode
- **FR-002**: The portfolio MUST use coffee brown (#6F4E37 or nearest perceptually equivalent) as the primary text color (headings, body text) in light mode
- **FR-003**: The portfolio MUST use sage green (#9DC183 or nearest perceptually equivalent) as the accent color for interactive elements, icons, and visual hierarchy elements in light mode
- **FR-004**: The portfolio MUST provide a cohesive dark mode using muted dark brown background (#1E1818), warm beige text (#E9DCC9), and dusty sage accents (#8DAA91) while maintaining all WCAG 2.1 AA contrast requirements
- **FR-005**: All text in both light and dark modes MUST meet or exceed WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text) as measured against their immediate backgrounds
- **FR-006**: All interactive elements (buttons, links, form inputs) MUST maintain visual distinctiveness and remain clearly interactive in both light and dark modes
- **FR-007**: The portfolio MUST apply the pastel color scheme consistently across in-scope pages (homepage [index.js] and contact section in Home.js)
- **FR-008**: Hover and focus states MUST remain visually distinct and maintain contrast requirements while using the pastel color palette
- **FR-009**: The portfolio MUST preserve the existing light/dark mode toggle functionality and allow users to switch between modes seamlessly with color updates applied instantly
- **FR-010**: All icon colors (social media, technology stack icons) MUST be updated to harmonize with the pastel color scheme while remaining visually clear and recognizable

### Key Entities

- **Light Mode Palette**: Linen cream background, coffee brown text, sage green accents—the primary visual identity
- **Dark Mode Palette**: Complementary pastel tones that maintain readability and the coffee shop aesthetic
- **Contrast Pairs**: Specific color combinations (text + background) that have been verified to meet WCAG AA standards
- **Interactive Elements**: Buttons, links, form inputs, and hover/focus states that use sage green or modified pastels for visual feedback
- **Accent Applications**: Icons, badges, borders, and decorative elements that use sage green to enhance visual hierarchy

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All text elements across the portfolio meet WCAG 2.1 AA contrast ratio (4.5:1 for normal text, 3:1 for large text) when measured in both light and dark modes
- **SC-002**: 100% of in-scope pages (homepage, contact section) display the pastel color scheme consistently with no inconsistent colors carried over from the previous design
- **SC-003**: Visitors can toggle between light and dark modes and all color changes apply instantly without page reload or visual artifacts
- **SC-004**: All interactive elements (buttons, links) are visually distinguishable from static content and remain interactive using the pastel color palette
- **SC-005**: Automated accessibility testing (WCAG contrast checker) confirms all color combinations meet accessibility standards
- **SC-006**: No loss of functionality or content visibility as a result of the color palette change

## Functional Design Details

### Light Mode Color Specifications

| Element | Color | Purpose | Notes |
|---------|-------|---------|-------|
| Background | Linen Cream (#FAF6F1) | Primary surface | Warm, welcoming base |
| Text (Body) | Coffee Brown (#6F4E37) | Primary text | Readable, warm tone |
| Text (Headings) | Dark Coffee Brown (#4A3728) | Hierarchy | Darker shade for emphasis |
| Accents | Sage Green (#9DC183) | Interactive, icons | Creates visual hierarchy |
| Borders/Dividers | Muted Taupe (#D4C5B9) | Subtle separation | Light tone derived from palette |
| Links (Default) | Sage Green (#9DC183) | Navigation | Accent color for links |
| Links (Hover) | Deep Sage (#7A9B6E) | Feedback | Slightly darker for interactivity |

### Dark Mode Color Specifications

- **Background**: Muted dark brown (#1E1818) for comfortable dark viewing while maintaining warmth
- **Text (Primary)**: Warm beige (#E9DCC9) for readability against dark background while maintaining pastel aesthetic
- **Text (Secondary)**: Desaturated warm gray (derived from #E9DCC9 with reduced opacity) for secondary text and descriptions
- **Accents**: Dusty sage (#8DAA91) for interactive elements and visual hierarchy in dark mode
- **Interactive States**: Maintain visual distinctiveness with hover/focus states using lightened or deepened variations of dusty sage

### Contrast Verification Requirements

All color combinations must be validated using:
- Automated tools (WebAIM Contrast Checker, Axe DevTools, or similar)
- Manual verification of specific combinations (text on backgrounds, interactive elements)
- Testing with users who have color vision deficiency simulators

## Assumptions

1. **Hex color values provided** represent the intended pastel shades; final implementation may require fine-tuning based on actual WCAG testing results
2. **Existing component structure** will remain unchanged; only color values in CSS classes and Tailwind config will be modified
3. **Third-party icons** (React Icons library used in the project) will be re-colored via CSS without modifying the icon library itself
4. **Browser support** covers all modern evergreen browsers (Chrome, Firefox, Safari, Edge latest two versions)
5. **Dark mode detection** uses the existing `darkMode` state in the component; no new mode detection logic is required
6. **CSS variables or Tailwind configuration** will be used to maintain a single source of truth for the color palette
7. **All existing functionality** (navigation, links, form submissions, etc.) remains unchanged; only visual appearance is modified

## Dependencies & Constraints

- Must maintain compatibility with existing Next.js and Tailwind CSS setup
- Cannot introduce new dependencies or libraries for color management
- Dark mode toggle must continue to work seamlessly
- All changes must comply with the portfolio Constitution (Code Quality, Testing, UX Consistency, Accessibility)
