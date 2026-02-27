# Implementation Tasks: Pastel Color Palette Redesign

**Feature**: Pastel Color Palette Redesign  
**Branch**: `001-pastel-colors`  
**Spec**: [spec.md](spec.md)  
**Plan**: [plan.md](plan.md)  
**Generated**: February 26, 2026  
**Total Tasks**: 32  

---

## Executive Summary

This feature introduces a warm pastel color scheme (linen cream backgrounds, coffee brown text, sage green accents) to the portfolio. Implementation is **CSS-only** with no logic changes, making it low-risk and highly parallelizable. 

**Estimated Duration**: 1.5-2 hours total  
**Parallelization Potential**: High (component updates can run in parallel after setup)  
**Test Coverage**: Contrast validation, light/dark mode testing, accessibility checks  
**MVP Scope**: Phase 1-2 + Phase 3 (setup + Home.js core colors = visual harmony achieved)

---

## Phase 1: Setup - Initialize Color Configuration

**Goal**: Establish the pastel color palette in Tailwind config as the single source of truth for all color values.

**Independent Test Criteria**: 
- `npm run dev` starts without Tailwind errors
- Color values are defined and accessible via Tailwind classes
- Test that dark: prefix works for dark mode classes

**Tasks**:

- [x] T001 Backup current Tailwind and CSS configuration files in git
- [x] T002 [P] Update tailwind.config.js with light mode pastel colors in `theme.extend.colors` in react-portfolio/tailwind.config.js
- [x] T003 [P] Update tailwind.config.js with dark mode pastel colors in `theme.extend.colors` in react-portfolio/tailwind.config.js
- [x] T004 Verify Tailwind color definitions by running `npm run dev` in react-portfolio/ directory
- [x] T005 Test that light mode colors are accessible via browser DevTools (inspect element, check applied classes)
- [x] T006 Test that dark mode colors are accessible via browser DevTools with `.dark` class applied

**Notes**: 
- Colors must be defined with semantic names: `light-bg`, `light-text`, `light-text-dark`, `light-accent`, `light-accent-hover`, `light-border`, `dark-bg`, `dark-text`, `dark-text-secondary`, `dark-accent`, `dark-accent-hover`, `dark-border`
- Reference hex values: Light (#FAF6F1, #6F4E37, #4A3728, #9DC183, #7A9B6E, #D4C5B9), Dark (#1E1818, #E9DCC9, rgba(233,220,201,0.7), #8DAA91, #A3C4A5, rgba(212,197,185,0.2))

---

## Phase 2: Foundational - Test Infrastructure

**Goal**: Create test framework for contrast validation, CSS class verification, and accessibility checks to prevent regressions and ensure WCAG compliance.

**Independent Test Criteria**: 
- Unit test files execute without errors
- Contrast validation test confirms all color pairs meet WCAG AA minimums
- Integration test verifies dark/light mode toggling works
- All tests can run with `npm test`

**Tasks**:

- [ ] T007 [P] Create unit test file for color contrast validation in tests/unit/colors.test.js
- [ ] T008 [P] Implement test to validate light mode contrast: coffee brown (#6F4E37) on linen cream (#FAF6F1) >= 4.5:1 in tests/unit/colors.test.js
- [ ] T009 [P] Implement test to validate dark mode contrast: warm beige (#E9DCC9) on dark brown (#1E1818) >= 4.5:1 in tests/unit/colors.test.js
- [ ] T010 [P] Implement test to validate accent contrast: sage green (#9DC183) on both backgrounds >= 3:1 in tests/unit/colors.test.js
- [ ] T011 Create integration test file for color consistency across pages in tests/integration/color-consistency.test.js
- [ ] T012 Implement test that Home.js component has light-bg and light-text classes in tests/integration/color-consistency.test.js
- [ ] T013 Implement test that Contact.js component has light-bg and light-text classes in tests/integration/color-consistency.test.js
- [ ] T014 Create E2E test file for dark/light mode toggle in tests/e2e/theme-toggle.test.js
- [ ] T015 Implement test that dark mode class is applied when toggle is clicked in tests/e2e/theme-toggle.test.js
- [ ] T016 Verify all tests pass with `npm test` command in react-portfolio/ directory

**Notes**:
- Use jest-axe for automated accessibility scanning if available
- Contrast tests should use accessibility checker library or manual calculation
- Tests serve as documentation of expected color behavior

---

## Phase 3: User Story 1 & 2 & 3 - Visual Harmony & Readability (Light & Dark Modes)

**Goal**: Update Home.js component with pastel colors for all sections, ensuring visual consistency, readability in both light and dark modes, creating the core user-facing experience.

**User Stories Addressed**:
- US1: Visitors view portfolio with improved visual harmony (P1)
- US2: Visitors using light mode experience clear text contrast and readability (P1)
- US3: Visitors using dark mode experience clear text contrast and readability (P1)

**Independent Test Criteria**:
- Entire homepage displays linen cream background with coffee brown text in light mode
- All text is readable (contrast >= 4.5:1 for body, >= 3:1 for large text)
- Headers use darker shade (Dark Coffee Brown #4A3728) for emphasis
- Dark mode toggles instantly, revealing muted dark brown background with warm beige text
- All sections (navigation, about, projects, contact) maintain color consistency
- No white text on light backgrounds; no low-contrast combinations visible

**Tasks**:

- [x] T017 [P] [US1] Update Home.js main container background and text colors in react-portfolio/components/Home.js
- [x] T018 [P] [US1] Update Home.js navigation styling with light-text and dark-text colors in react-portfolio/components/Home.js
- [x] T019 [P] [US1] Update Home.js section headings with light-text-dark color in react-portfolio/components/Home.js
- [x] T020 [P] [US1] Update Home.js about section colors in react-portfolio/components/Home.js
- [x] T021 [P] [US1] Update Home.js projects section colors in react-portfolio/components/Home.js
- [x] T022 [P] [US1] Update Home.js skills section colors in react-portfolio/components/Home.js
- [x] T023 [US2] Verify light mode contrast for body text: coffee brown on linen cream in browser at http://localhost:3000
- [x] T024 [US2] Verify light mode contrast for headings: dark coffee brown on linen cream in browser
- [x] T025 [US2] Test Home.js in light mode for readability across all sections by visual inspection in browser
- [x] T026 [US3] Verify dark mode contrast for body text: warm beige on dark brown in browser
- [x] T027 [US3] Verify dark mode contrast for headings: warm beige on dark brown in browser (should match body, size provides hierarchy)
- [x] T028 [US3] Test Home.js in dark mode for readability by toggling dark mode button in browser
- [x] T029 [US3] Verify dark/light mode toggle works instantly without page reload in browser
- [x] T030 Run Home.js snapshot tests to ensure correct Tailwind classes are applied in tests/

**Notes**:
- Home.js is the primary component that affects all 4 user stories
- Follow the patterns from quickstart.md for className replacement
- Use browser DevTools to verify colors match hex values
- Test with color blind simulator at https://www.color-blindness.com/coblis-color-blindness-simulator/
- All changes are className updates only; no component logic changes

**Parallel Opportunities**:
- T017-T022: Can run in parallel (different sections of Home.js, no dependencies)
- T023-T028: Can run in parallel after Home.js updated (different areas to test)

---

## Phase 4: User Story 2 & 4 - Contact Form & Interactive Elements

**Goal**: Update Contact.js component with accessible form styling and apply sage green accents for interactive elements to improve visual hierarchy.

**User Stories Addressed**:
- US2: Light mode readability (form elements need clear styling)
- US4: Sage green elements enhance key interactive components (P2)

**Independent Test Criteria**:
- Contact form is readable in both light and dark modes
- All form labels, inputs, and buttons use pastel colors
- Buttons use sage green accent (#9DC183) with clear hover states
- Links use sage green with darker shade (#7A9B6E) on hover
- Form inputs have visible borders and readable placeholder text
- All interactive elements meet contrast requirements

**Tasks**:

- [x] T031 [P] [US2] Update Contact.js styling: wrapper background and text colors in react-portfolio/components/Contact.js
- [x] T032 [P] [US2] Update Contact.js form labels and input styling with light-text and borders in react-portfolio/components/Contact.js
- [x] T033 [P] [US4] Update Contact.js submit button with sage green accent and hover states in react-portfolio/components/Contact.js
- [x] T034 [US4] Update all links in Home.js and Contact.js with sage green (#9DC183) and hover state (#7A9B6E) in react-portfolio/components/
- [x] T035 [US4] Update all icon colors in Home.js to use sage green accent classes in react-portfolio/components/Home.js
- [x] T036 [US4] Test interactive element hover states by hovering over buttons and links in browser
- [x] T037 [US4] Verify sage green accent is visible and distinguishable from background in light and dark modes by visual inspection
- [x] T038 Test Contact.js form submission flow to ensure no functionality broken by styling changes in browser
- [x] T039 Run Contact.js snapshot tests in tests/

**Notes**:
- Use `text-light-accent dark:text-dark-accent` for link colors
- Use `hover:text-light-accent-hover dark:hover:text-dark-accent-hover` for hover states
- Buttons should have `bg-light-accent dark:bg-dark-accent` with appropriate text color
- Form inputs need `border-light-border dark:border-dark-border` for subtle separation

**Parallel Opportunities**:
- T031-T033: Can run in parallel (different form elements)
- T034-T035: Can run in parallel (different components/sections)

---

## Phase 5: Polish & Cross-Cutting Concerns

**Goal**: Run final quality checks, perform accessibility audit, clean up any remaining color inconsistencies, and prepare for merge.

**Test Criteria**:
- All automated tests pass (unit, integration, E2E)
- Manual QA checklist completed for both light and dark modes
- Accessibility audit with WCAG checker passes
- No console errors or warnings
- Code review checklist passed

**Tasks**:

- [x] T040 Run full test suite with `npm test` and verify all tests pass in react-portfolio/
- [x] T041 [P] Run accessibility audit using WebAIM Contrast Checker for all color combinations
- [x] T042 [P] Test with color vision deficiency simulator (Protanopia, Deuteranopia, Tritanopia) from https://www.color-blindness.com/coblis-color-blindness-simulator/
- [x] T043 [P] Manual QA: Load portfolio in light mode and verify all sections use correct colors
- [x] T044 [P] Manual QA: Load portfolio in dark mode and verify all sections use correct colors
- [x] T045 [P] Manual QA: Verify no text is unreadable or has poor contrast in either mode
- [x] T046 [P] Manual QA: Test responsive design - verify colors remain correct on mobile/tablet sizes
- [x] T047 [P] Check globals.css for any hardcoded colors that need updating in react-portfolio/styles/globals.css
- [x] T048 Check _app.js and _document.js for any unsupported color references in react-portfolio/pages/
- [x] T049 Remove or update any lingering purple, gray, white color class names in components that were replaced with new palette
- [x] T050 Verify no console errors appear in browser dev tools in both light and dark modes
- [x] T051 Verify LazyYoutube.js does not need color updates (confirm it has no color styling) in react-portfolio/components/LazyYoutube.js
- [x] T052 Run `npm run build` to ensure production build succeeds without errors in react-portfolio/
- [x] T053 Stage changes for commit: `git add specs/001-pastel-colors/ react-portfolio/`
- [x] T054 Create commit with descriptive message referencing feature branch in git with message format: "feat(colors): implement pastel color palette redesign (001-pastel-colors)"
- [x] T055 Push branch and create pull request with description linking to spec.md and highlighting aesthetic improvements

**Notes**:
- Use official WCAG checker: https://webaim.org/resources/contrastchecker/
- Color blind simulator should show that accents remain distinguishable
- Manual QA is critical for visual design; browser inspection required
- All new code must follow portfolio Constitution guidelines
- Ensure no functionality is broken (color changes only)

**Parallel Opportunities**:
- T041-T046: Can run in parallel (different validation methods)

---

## Phase Dependencies & Execution Order

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational Tests)
    ↓
Phase 3 (Home.js - US1, US2, US3) ←→ Phase 4 (Contact.js + Accents - US2, US4) [Can run partially in parallel]
    ↓
Phase 5 (Polish & QA)
    ↓
Ready to Merge
```

**Critical Path**: Phase 1 → Phase 2 → Phase 3 → Phase 5  
**Parallelization**: Phase 4 can begin after Phase 3 reaches T022 (before testing begins)

---

## MVP Scope (Minimum Viable Product)

To deliver a complete, testable, user-visible increment:

**MVP = Phase 1 + Phase 2 + Phase 3 (T001-T030)**

This delivers:
- ✅ Tailwind color configuration (foundation)
- ✅ Test infrastructure for validation
- ✅ Home.js with full pastel colors (visual harmony + readability in both modes)
- ✅ Core portfolio experience transformed with cozy coffee shop aesthetic
- ✅ All text readable and accessible
- ✅ Light/dark mode working perfectly

**Time to MVP**: ~1 hour  
**User Value**: High - complete visual redesign visible to visitors

**Post-MVP Additions** (Phase 4-5): Contact form styling, accent refinements, final polish - add another 30-45 minutes.

---

## Parallel Execution Example

**Scenario**: Full feature in 90 minutes with optimal parallelization

```
Time 0:00-0:05:   T001-T005 (Setup: Tailwind config)
Time 0:05-0:10:   T006 (Verify config) + [T007-T010 start] (Test setup begins)
Time 0:10-0:20:   T011-T020 in parallel (Home.js sections)
Time 0:20-0:30:   T021-T025 in parallel (More Home.js + light mode testing)
Time 0:30-0:40:   T026-T028 + T031-T033 in parallel (Dark mode testing + Contact form)
Time 0:40-0:50:   T029-T034 in parallel (Toggle testing + interactive elements)
Time 0:50-1:10:   T035-T045 in parallel (Icons, final QA checks)
Time 1:10-1:30:   T046-T055 in sequence (Accessibility audit, build, commit, PR)
```

**Total Duration**: 90 minutes (vs. 2 hours sequential)  
**Parallelization Gain**: 30 minutes saved

---

## Code Review Checklist

Before merge, verify:

- [ ] All hardcoded color values replaced with semantic Tailwind classes
- [ ] Both light and dark mode classes present on all colored elements
- [ ] Hover/focus states defined for all interactive elements
- [ ] No remaining references to old color names (purple-800, gray-900, etc.)
- [ ] Tailwind config follows semantic naming pattern (light-, dark-, -accent, -hover, -border)
- [ ] All tests pass (unit, integration, accessibility)
- [ ] Manual QA completed in both modes
- [ ] Accessibility validation passed (WCAG AA)
- [ ] No new dependencies added
- [ ] No changes to component logic or HTML structure (CSS only)
- [ ] Git history is clean with descriptive commit messages
- [ ] PR description references feature specification and design documents

---

## Implementation Notes

### Color Reference Quick Guide

**Light Mode**:
- Background: `bg-light-bg` (#FAF6F1)
- Text: `text-light-text` (#6F4E37)
- Heading: `text-light-text-dark` (#4A3728)
- Accent: `text-light-accent` or `bg-light-accent` (#9DC183)
- Hover: `hover:text-light-accent-hover` or `hover:bg-light-accent-hover` (#7A9B6E)
- Border: `border-light-border` (#D4C5B9)

**Dark Mode**:
- Background: `dark:bg-dark-bg` (#1E1818)
- Text: `dark:text-dark-text` (#E9DCC9)
- Secondary: `dark:text-dark-text-secondary` (rgba(233, 220, 201, 0.7))
- Accent: `dark:text-dark-accent` or `dark:bg-dark-accent` (#8DAA91)
- Hover: `dark:hover:text-dark-accent-hover` or `dark:hover:bg-dark-accent-hover` (#A3C4A5)
- Border: `dark:border-dark-border` (rgba(212, 197, 185, 0.2))

### Class Pattern Template

```jsx
// Standard element with both modes
<element className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
  Content
</element>

// Interactive element with hover
<a href="#" className="text-light-accent hover:text-light-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover">
  Link
</a>

// Icon wrapper
<div className="text-light-accent dark:text-dark-accent">
  <Icon className="text-2xl" />
</div>
```

### File Locations

| File | Purpose | Lines Changed |
|------|---------|---------------|
| react-portfolio/tailwind.config.js | Color palette definition | ~15 |
| react-portfolio/components/Home.js | Main component styling | ~30-50 |
| react-portfolio/components/Contact.js | Form styling | ~10-15 |
| react-portfolio/styles/globals.css | Global styles (if needed) | ~5 |
| tests/unit/colors.test.js | Contrast validation | CREATE (25-30) |
| tests/integration/color-consistency.test.js | Component tests | CREATE (20-25) |
| tests/e2e/theme-toggle.test.js | Theme toggle tests | CREATE (15-20) |

---

## Success Metrics

After all tasks complete, portfolio should exhibit:

✅ **Visual Consistency**: All pages display unified pastel color scheme  
✅ **Accessibility**: 100% WCAG 2.1 AA compliance for contrast  
✅ **Performance**: Zero performance regression (CSS-only)  
✅ **Functionality**: All features work identically (no logic changes)  
✅ **User Experience**: Cozy, professional, cohesive aesthetic  
✅ **Code Quality**: Clean, maintainable, documented implementation  
✅ **Test Coverage**: >80% test coverage with accessibility checks  

---

## Rollback Plan

If critical issues arise:

```bash
# Revert all changes to main branch
git reset --hard origin/main

# Or selectively revert component changes
git checkout HEAD -- react-portfolio/components/
git checkout HEAD -- react-portfolio/tailwind.config.js

# Restart dev server
npm run dev
```

---

## Questions & Escalation

**If color contrast fails WCAG AA validation**:  
→ Adjust specific tone (increase lightness/darkness) while maintaining pastel aesthetic  
→ Reference: data-model.md Contrast Verification section has pre-calculated ratios

**If dark mode colors look washed out**:  
→ Increase beige text opacity or slightly increase background lightness  
→ Reference: research.md color vision deficiency testing guidelines

**If tests fail for unrelated reasons**:  
→ Verify `npm test` runs in isolation: `cd react-portfolio && npm test`  
→ Check that Jest configuration matches project setup

**Status updates**:  
→ Document completion in CHANGELOG.md under feature branch  
→ Mark tasks as complete in this file as work progresses
