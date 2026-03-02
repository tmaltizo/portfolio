# Research Notes: Navigation bar and new pages

This document captures decisions and trade-offs for the feature.

## Decision: Use Next.js `pages/_app.js` layout wrapper or a shared Layout component

**Rationale:** The navigation bar must appear on every page. Next.js supports a custom `<App>` component where we can wrap all pages in a common layout. Alternatively we could add the nav directly to each individual page, but that duplicates markup and violates DRY when future links change.

**Alternatives considered:**
- Adding nav to each page manually (rejected due to maintenance overhead).
- Using `getLayout` pattern per page (more flexible but overkill for a simple static site). Chances of needing page-specific layouts are low.

## Decision: Define navigation links in a data array imported by layout

**Rationale:** To satisfy the extensibility story (User Story 3), the nav component should generate links from a configurable list. A plain array of objects (`[{ label, href }]`) imported from a module is simplest and meets the requirement.

**Alternatives considered:**
- Hard-coding JSX anchors (rejected — fails extensibility).
- Reading links from a JSON file or from environment variables (unnecessary complexity for a static site).

## Decision: Implement active link highlighting using `useRouter` from `next/router`

**Rationale:** To visually indicate the current page, the component can compare `router.pathname` with each link's href. This is straightforward and compatible with client-side navigation.

**Alternatives considered:**
- Relying on CSS `:active` or `:visited` pseudo-classes (not reliable for single-page navigation). 
- Using Next.js `Link` `passHref` with `aria-current` attribute set via `router.asPath` (a variation similar to chosen approach; essentially same complexity).

## Decision: Create placeholder static pages for `/about`, `/writing`, `/projects`

**Rationale:** For initial implementation, static content with headings and descriptive text satisfies requirements and keeps complexity low.

**Alternatives considered:**
- Using dynamic routing or Markdown-based blog system (too heavy for MVP).

## Decision: Add responsive Tailwind styling for nav bar

**Rationale:** The constitution requires responsive design and WCAG compliance. Tailwind already present; styling the nav with utilities such as `flex`, `space-x-4`, `md:space-x-6`, etc., plus `focus:ring` handles these needs.

**Alternatives considered:**
- Add a third-party UI component library (overkill for simple nav).


No open questions or `NEEDS CLARIFICATION` remain; all technical context is determined.