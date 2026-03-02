# Task Breakdown: Writing Blog Section

**Feature**: `003-writing-blog`  
**Branch**: `003-writing-blog`  
**Spec**: [specs/003-writing-blog/spec.md](specs/003-writing-blog/spec.md)  
**Plan**: [specs/003-writing-blog/plan.md](specs/003-writing-blog/plan.md)

---

## Phase 0 – Setup

### SETUP-001 — Install dependencies
Install `gray-matter` (frontmatter parsing) and `next-mdx-remote` (MDX rendering).

**Files affected**: `package.json`, `package-lock.json`  
**Commands**: `npm install gray-matter next-mdx-remote`  
**Verification**: Both packages appear under `dependencies` in `package.json` and can be imported without error.

- [X] SETUP-001

---

### SETUP-002 — Create `posts/` directory with first sample post
Create the `posts/` directory at the repository root and add the first Markdown file `robinhood-gold-card.md` with valid frontmatter (title, date, description, tags: ["Finance", "Credit Cards"]) and placeholder body.

**Files affected**: `posts/robinhood-gold-card.md` (new)  
**Verification**: File exists, readable, contains all required frontmatter fields.

- [X] SETUP-002

---

## Phase 1 – Utilities & Data Access

### UTIL-001 — Create `lib/posts.js` — post loading utilities
Create `lib/posts.js` with three exported functions:
- `getAllPosts()` — reads all `.md`/`.mdx` files from `posts/`, parses frontmatter via `gray-matter`, returns array of post metadata objects `{ slug, title, date, description, tags }` sorted by date descending.
- `getPostBySlug(slug)` — returns full post: metadata + raw `content` string.
- `getAllTags()` — returns alphabetically-sorted unique tags (case-insensitive) from all posts.

**Files affected**: `lib/posts.js` (new)  
**Dependencies**: SETUP-001  
**Verification**: Module exports the three functions; calling `getAllPosts()` returns an array including the Robinhood Gold card post.

- [X] UTIL-001

---

## Phase 2 – Tests (write tests before components per TDD)

### TEST-001 [P] — Unit tests for `lib/posts.js` utilities
Create `tests/lib/posts.test.js`. Test that:
- `getAllPosts()` returns correct metadata for a known fixture post.
- `getAllPosts()` sorts by date descending when multiple posts exist.
- `getPostBySlug('robinhood-gold-card')` returns the full metadata + content string.
- `getAllTags()` returns deduplicated, case-insensitive, sorted tag list.

**Files affected**: `tests/lib/posts.test.js` (new)  
**Dependencies**: UTIL-001  
**Verification**: `npm test tests/lib/posts.test.js` passes.

- [X] TEST-001

### TEST-002 [P] — Unit tests for `PostCard` component
Create `components/__tests__/PostCard.test.js`. Test that:
- PostCard renders title, date, description.
- PostCard renders each tag as a pill.
- PostCard wraps content in an anchor linking to `href`.

**Files affected**: `components/__tests__/PostCard.test.js` (new)  
**Dependencies**: None yet (write against the contract, component follows)  
**Verification**: `npm test components/__tests__/PostCard.test.js` passes once CORE-001 is done.

- [X] TEST-002

### TEST-003 [P] — Unit tests for `TagFilter` component
Create `components/__tests__/TagFilter.test.js`. Test that:
- TagFilter renders an "All" button and one button per tag.
- Clicking a tag calls `onSelect` with that tag.
- Clicking "All" calls `onSelect` with `undefined`.
- Active tag pill receives a highlighted class.

**Files affected**: `components/__tests__/TagFilter.test.js` (new)  
**Dependencies**: None (write against the contract)  
**Verification**: Passes once CORE-002 is done.

- [X] TEST-003

---

## Phase 3 – Core Components

### CORE-001 — Build `PostCard` component
Create `components/PostCard.js` conforming to the contract in `contracts/ui-components.md`.
- Accepts `{ title, date, description, tags, href }` props.
- Wraps the card in a Next.js `<Link>` to `href`.
- Renders a pill for each tag.
- Applies existing Tailwind color tokens (light/dark mode; bg-light-bg, text-light-text, etc.).
- Follows imports → constants → component → export structure.

**Files affected**: `components/PostCard.js` (new)  
**Dependencies**: TEST-002  
**Verification**: TEST-002 passes; visual inspection in Storybook or dev server.

- [X] CORE-001

### CORE-002 — Build `TagFilter` component
Create `components/TagFilter.js` conforming to `contracts/ui-components.md`.
- Renders "All" pill and one pill per tag from the `tags` prop.
- Highlights `activeTag` pill with distinct styling.
- Calls `onSelect(tag)` or `onSelect(undefined)` on click.
- Keyboard accessible (focus indicators, button elements).

**Files affected**: `components/TagFilter.js` (new)  
**Dependencies**: TEST-003  
**Verification**: TEST-003 passes; tag pills visually toggle in dev server.

- [X] CORE-002

---

## Phase 4 – Page: Writing listing (`/writing`)

### TEST-004 — Integration tests for Writing page
Update/add `tests/pages/writing.test.js`:
- Test page renders a heading "Writing".
- Test page shows year-group headings when given mocked post data.
- Test filtering: selecting a tag hides non-matching cards.
- Test "All" restores all cards.
- Test empty-state message when no posts match a filter.

**Files affected**: `tests/pages/writing.test.js` (may already exist as a stub)  
**Dependencies**: CORE-001, CORE-002  
**Verification**: `npm test tests/pages/writing.test.js` passes.

- [X] TEST-004

### CORE-003 — Rewrite `pages/writing.js` with grid + year groups + tag filter
Update `pages/writing.js` to:
- Use `getStaticProps` to call `getAllPosts()` and `getAllTags()` from `lib/posts.js`.
- Group posts by year (descending).
- Render `<TagFilter>` at the top with controlled `activeTag` state.
- Render year-heading + `<PostCard>` grid for each year group, filtered by `activeTag`.
- Show "No posts found" message when filter yields 0 results.
- Keep existing pastel/dark-mode Tailwind classes.

**Files affected**: `pages/writing.js`  
**Dependencies**: CORE-001, CORE-002, UTIL-001, TEST-004  
**Verification**: TEST-004 passes; dev server shows Robinhood Gold card card under 2026 heading.

- [X] CORE-003

---

## Phase 5 – Page: Individual post (`/writing/[slug]`)

### TEST-005 — Tests for individual post page
Create `tests/pages/writing/[slug].test.js`:
- Test that the page renders the post title, date, and description from props.
- Test that post body HTML is rendered.
- Test that 404 behavior is triggered when `notFound: true` is returned by `getStaticProps`.

**Files affected**: `tests/pages/writing/slug.test.js` (new, using a descriptive filename safe for Windows)  
**Dependencies**: UTIL-001  
**Verification**: `npm test` with this file passes once CORE-004 is done.

- [X] TEST-005

### CORE-004 — Create `pages/writing/[slug].js` individual post page
Create the dynamic route:
- `getStaticPaths`: calls `getAllPosts()` and returns all slugs.
- `getStaticProps({ params })`: calls `getPostBySlug(slug)`, parses content via `next-mdx-remote/serialize`, returns as prop. Returns `{ notFound: true }` if slug does not match.
- Component: renders title, formatted date, tags (linked to writing page with filter), and the MDX content via `<MDXRemote>`.
- Applies light/dark mode via existing color tokens; follows constitution layout structure.

**Files affected**: `pages/writing/[slug].js` (new)  
**Dependencies**: TEST-005, UTIL-001, SETUP-001  
**Verification**: TEST-005 passes; navigating to `/writing/robinhood-gold-card` shows full post.

- [X] CORE-004

---

## Phase 6 – First Real Post Content

### CONTENT-001 — Write first blog post: Robinhood Gold Card
Flesh out `posts/robinhood-gold-card.md` with genuine content about the Robinhood Gold card, replacing the placeholder body. Include images or embeds if desired (following the media guidelines in the spec/quickstart).

**Files affected**: `posts/robinhood-gold-card.md`  
**Dependencies**: CORE-003, CORE-004  
**Verification**: Post reads well at `/writing/robinhood-gold-card`; card shows on `/writing`.

- [X] CONTENT-001

---

### CONTENT-002 — Add header image to recent post
Insert a suitably sized image asset for the Robinhood Gold Card under the post title. Place the file at `public/images/robinhood-gold-card.png` and reference it from `posts/robinhood-gold-card.md` using a centered, max‑width Tailwind class. Update slug tests to assert the MDX output contains the image tag.

**Files affected**: `posts/robinhood-gold-card.md`, `public/images/robinhood-gold-card.png`, `tests/pages/writing/slug.test.js`  
**Dependencies**: CONTENT-001  
**Verification**: Navigating to `/writing/robinhood-gold-card` shows the image; slug page test checks for the image string.

- [X] CONTENT-002

---

---

## Phase 7 – Polish & Validation

### POLISH-001 [P] — Lint and fix any warnings
Run `npm run lint` and address any warnings introduced by new files. Zero warnings required per constitution.

**Files affected**: Any newly created files.  
**Verification**: `npm run lint` exits 0.

- [X] POLISH-001

### POLISH-002 [P] — Build verification
Run `npm run build` and confirm it succeeds with no type/compilation errors.

**Files affected**: N/A  
**Verification**: `npm run build` exits 0.

- [X] POLISH-002

### POLISH-003 — Smoke test on localhost
Run `npm run dev` and manually verify:
- `/writing` loads with the Robinhood card as the first card under the 2026 heading.
- Tag "Finance" pill is visible and filters correctly.
- Clicking the card navigates to `/writing/robinhood-gold-card`.
- Light/dark mode switching looks correct on both pages.
- No visible layout shifts on resize from 320px to 1280px+.

**Dependencies**: POLISH-001, POLISH-002  
**Verification**: All above points pass manual inspection.

- [ ] POLISH-003

---

## Task Summary

| Phase | Tasks | Notes |
|-------|-------|-------|
| 0 – Setup | SETUP-001, SETUP-002 | Install deps, create posts dir |
| 1 – Utilities | UTIL-001 | `lib/posts.js` data loading |
| 2 – Tests | TEST-001/002/003 | Write tests first (TDD) |
| 3 – Core components | CORE-001, CORE-002 | PostCard, TagFilter |
| 4 – Listing page | TEST-004, CORE-003 | `/writing` route |
| 5 – Post page | TEST-005, CORE-004 | `/writing/[slug]` route |
| 6 – Content | CONTENT-001, CONTENT-002 | First real post + header image |
| 7 – Polish | POLISH-001/002/003 | Lint, build, smoke test |
