# Feature Specification: Navigation bar and new pages

**Feature Branch**: `002-add-navigation-pages`  
**Created**: 2026-03-01  
**Status**: Draft  
**Input**: User description: "Build a new feature for my existing website that would help me navigate to any future endpoints on my website. I would first like to make an easily navigatable and visually appealing navigation tool to navigate to and from my home page and the other endpoints. 2nd, I would like to initally add a few new endpoints: about (more information about me), writing (a blog section where I can easily make new posts about things), and projects (where I can add any number of future projects)"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Site navigation bar and utility sidebar (Priority: P1)

As a visitor, I need a consistent navigation component visible on every page so I can move quickly between the home page and any other section of the site. The control area should also allow me to toggle light/dark mode regardless of which page I'm on.

The navigation is implemented as a horizontal bar at the top along with a persistent right‑side utility sidebar that contains the theme toggle and, on the home page, icons for scrolling to major in‑page sections. On other pages the sidebar shows a "back to top" button (smooth scrolling) and may be extended with additional icons.

**Why this priority**: Navigation is fundamental; without it users cannot reach the new endpoints or discover content, making the rest of the feature useless.

**Independent Test**: On a fresh deployment the home page and all subsequent pages should render the bar with the same links; clicking each link should load the corresponding page.

**Acceptance Scenarios**:

1. **Given** I am on any route of the site, **When** I look at the top of the page, **Then** I see a horizontal navigation bar containing links named "Home", "About", "Writing", and "Projects".
2. **Given** I click the "About" link from the nav bar, **When** the navigation completes, **Then** the browser is on `/about` and the "About" link is visually highlighted or indicated as active.

---

### User Story 2 - Create initial and reorganised content pages (Priority: P2)

As a visitor, I want to arrive at meaningful content when I select a navigation link so I can learn about the site owner, read posts, or browse projects. Initially the "About" content lived on the home page; to avoid duplication we will migrate it to its own `/about` page and remove it from the home page.

**Why this priority**: The new endpoints are required for the navigation bar to resolve somewhere; blank or missing pages would frustrate visitors.

**Independent Test**: Each of the `/about`, `/writing`, and `/projects` routes must return a valid HTML page with a heading indicating the section name.

**Acceptance Scenarios**:

1. **Given** I navigate to `/about`, **When** the page loads, **Then** I see a heading such as "About" and some placeholder text describing the site owner.
2. **Given** I navigate to `/writing`, **When** the page loads, **Then** I see a heading "Writing" and a message explaining that blog posts will appear here.
3. **Given** I navigate to `/projects`, **When** the page loads, **Then** I see a heading "Projects" and an area ready to list items.

---

### User Story 3 - Ease of future extension (Priority: P3)

As the site owner, I want the new pages and navigation component to be built so that additional links or sections can be added without rewriting layout code.

**Why this priority**: Future growth (more posts, portfolio items, sections) should require minimal changes; this supports maintainability.

**Independent Test**: A developer can add a new entry to the nav configuration data and a corresponding page file and see the link appear automatically.

**Acceptance Scenarios**:

1. **Given** a new item is added to the nav data array and a matching page component created under `pages/`, **When** the site is rebuilt, **Then** the navigation bar includes the new link without manual markup changes.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- What happens when the user resizes the browser to a very small width (mobile)? Navigation links should collapse or wrap gracefully without overlapping content.
- How does system handle visiting a non‑existent route? The existing 404 page should still display with the navbar present.
- What if the site owner adds a nav link but forgets to create the corresponding page? Clicking the link should show the standard Next.js 404 rather than breaking the layout.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The application MUST render a navigation bar component at the top of every page that includes links to Home, About, Writing, and Projects.
- **FR-002**: Each link in the navigation bar MUST update the browser URL and load the corresponding page when clicked.
- **FR-003**: The navigation bar MUST indicate the active page (e.g. via bold text or underline) so users know their current location.
- **FR-009**: The right‑side utility sidebar MUST include a dark/light mode toggle that affects every page and preserve state while browsing.
- **FR-010**: On the home page the utility sidebar MUST provide smooth-scrolling icons for each section; the "home" icon MUST scroll to the absolute top (zero) so the top navigation bar is not obscured. Section links must compensate for the fixed nav-bar height with an offset.
- **FR-011**: On non-home pages the utility sidebar MUST display a "back to top" button that uses the same smooth intensity/easing as the home-page scroll.
- **FR-013**: Each sidebar icon MUST display a tooltip label with the icon's function when the user hovers over it, positioned to the left of the icon and initially invisible.
- **FR-014**: Sidebar icon tooltips MUST animate smoothly into view (fade in and slide out from the icon) over 300ms when the user hovers; the animation MUST NOT cause the tooltip to overlap the icon itself.
- **FR-015**: The hover activation area for sidebar icons MUST be larger than the visual icon (via padding) to improve ease of interaction on normal and small viewports.
- **FR-012**: All navigation components MUST use the site's pastel color palette (as defined in tailwind.config.js) to ensure visual consistency with existing pages.
- **FR-004**: The `/about`, `/writing`, and `/projects` routes MUST exist and return a valid HTML page with a semantic heading.
- **FR-005**: The navigation bar component MUST accept a data structure (array or object) defining links so new pages can be added by editing data alone.
- **FR-006**: The layout containing the navigation bar and page body MUST be responsive across viewport sizes from 320px to 2560px.
- **FR-007**: The navigation links MUST be keyboard-focusable and have visible focus styles for accessibility.
- **FR-008**: The navigation bar must be included on the 404 page and any future custom error pages.

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*

- **NavLink**: Represents a single entry in the navigation bar with attributes `label` (display text) and `href` (URL path). The component may also compute an `active` boolean based on current route. The underlying data is exported from `components/navLinks.js` and can be extended without editing layout code.
- **DarkModeContext**: A React context that holds `isDark` and `toggleDark`. Provided at the app root (`_app.js`) so all pages and the sidebar can consume it.
- **SidebarLink**: Utility icon used in the right sidebar; may be either a `react-scroll` scroll target (home page sections) or a normal Next.js `Link` for page navigation. Can also be a simple button (back-to-top). Each sidebar link includes a descriptive `title` attribute, which appears as a smooth-animated tooltip label positioned to the left of the icon on hover. The tooltip fades in and slides outward over 300ms without overlapping the icon. The interactive hit zone around each icon is expanded via padding to improve ease of interaction.
## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: The navigation bar renders on at least 99% of requests (i.e. every page visit) in manual testing.
- **SC-002**: Users are able to reach the home, about, writing, and projects pages within two clicks from any starting page.
- **SC-003**: On mobile viewports (320–480px wide) the navigation links remain readable and tappable; no horizontal scrollbar appears.
- **SC-004**: A developer can add a new nav entry and page in fewer than five minutes, demonstrating the extensibility requirement.
- **SC-005**: All sidebar icon tooltips display consistently when hovering over the icon area; tooltips appear within 300ms and do not visibly overlap the icon.
- **SC-006**: Users can trigger sidebar icon tooltips by hovering within a 32px (approximately) radius of the icon center, confirming the expanded hit target improves usability.

