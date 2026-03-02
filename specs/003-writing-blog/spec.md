# Feature Specification: Writing Blog Section

**Feature Branch**: `003-writing-blog`  
**Created**: 2026-03-02  
**Status**: Draft  
**Input**: User description: "I want to build a writing blog section for my website. What should the specification include to make sure its easily modifiable (can add new posts easily), and be able to visually sort each post in a grid like format default sorted by year but I can add my own tags to it. For example for my first post I want to add a Finance tag to a blog post I want to write about the Robinhood Gold card"

## Clarifications

### Session 2026-03-02

- Q: What types of media should be allowed in blog posts, considering the markdown/MDX approach? → A: Images and embedded video/animations via MDX or HTML.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Posts in Year-Grouped Grid (Priority: P1)

As a visitor to the writing page, I want to see all blog posts displayed in a grid layout automatically grouped by publication year — with the most recent year first — so I can get an immediate chronological overview of available content without any extra interaction.

**Why this priority**: This is the default landing experience for the Writing page and the foundational feature everything else builds on. A visitor landing on `/writing` with no posts displayed delivers zero value.

**Independent Test**: Navigate to `/writing` with at least two posts having different publication years. Verify posts appear in a grid, grouped under year headings, newest year first.

**Acceptance Scenarios**:

1. **Given** two or more posts exist with different publication years, **When** a visitor navigates to `/writing`, **Then** posts are rendered in a grid grouped under year headings, ordered newest-year-first, newest-post-first within each group.
2. **Given** multiple posts share the same publication year, **When** rendered, **Then** they appear under a single year heading sorted by date descending.
3. **Given** a post has a title, date, description, and tags in its metadata, **When** rendered as a card, **Then** all four pieces of information are visible on the card.

---

### User Story 2 - Filter Posts by Tag (Priority: P2)

As a visitor, I want to click a tag (e.g., "Finance") to filter the grid so only posts with that tag are displayed, and click again (or click a reset) to return to the full list.

**Why this priority**: Tags are the primary way posts will be categorized (starting with "Finance" for the Robinhood Gold card post). Without filtering, tags are decorative rather than functional.

**Independent Test**: With posts carrying different tags, click a single tag pill. Verify only posts bearing that tag appear in the grid. Click the same tag or a "Show all" control to restore the full list.

**Acceptance Scenarios**:

1. **Given** posts with varying tags exist, **When** a visitor clicks the "Finance" tag, **Then** only posts tagged "Finance" are shown and all others are hidden.
2. **Given** a tag filter is active, **When** the visitor clicks "All" or the active tag again, **Then** all posts are restored to the grid.
3. **Given** a tag filter is active, **When** no posts match the selected tag, **Then** a friendly "No posts found" message is displayed instead of an empty grid.
4. **Given** the grid is filtered, **When** viewed, **Then** the active tag filter is visually highlighted so the visitor knows a filter is applied.

---

### User Story 3 - Read an Individual Post (Priority: P3)

As a visitor, I want to click a post card to navigate to the full post content page so I can read the complete article.

**Why this priority**: A grid of cards is only useful if they link to readable content. This unlocks the core publishing loop — author writes a Markdown file, visitor reads the post.

**Independent Test**: Click any post card. Verify the browser navigates to a unique URL for that post and the full post body is rendered correctly, including any headings, paragraphs, and inline formatting.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Writing page, **When** they click a post card, **Then** they are navigated to a unique URL for that post (e.g., `/writing/robinhood-gold-card`).
2. **Given** a visitor is on a post page, **When** the page loads, **Then** the full post body, title, publication date, and tags are displayed.
3. **Given** a visitor navigates directly to a valid post URL, **When** the page loads, **Then** the correct post content is displayed.
4. **Given** a visitor navigates to a URL for a post that does not exist, **When** the page loads, **Then** a 404 page is shown.

---

### User Story 4 - Author Adds a New Post by Adding a File (Priority: P1)

As the site author, I want to add a new blog post simply by creating a new Markdown file with metadata (title, date, tags, description) in a designated `posts/` directory, so the post automatically appears on the Writing page without modifying any React components.

**Why this priority**: This is the core authoring requirement. If adding a new post requires code changes beyond creating a Markdown file, the system fails its "easily modifiable" goal.

**Independent Test**: Create a new `.md` file in the `posts/` directory containing valid frontmatter. Rebuild or reload the site. Verify the new post card appears on `/writing` in the correct year group.

**Acceptance Scenarios**:

1. **Given** the author creates a new Markdown file in the `posts/` directory with valid frontmatter, **When** the site is built or hot-reloaded, **Then** the new post card appears automatically in the correct year group on the Writing page.
2. **Given** a new post file has one or more tags in its frontmatter, **When** the Writing page loads, **Then** those tags appear in the tag filter list and on the post card.
3. **Given** a new post file has a filename that serves as its URL slug, **When** the Writing page builds, **Then** a navigable individual post URL is generated automatically from the filename.

---

### Edge Cases

- What happens when a post file has missing or malformed frontmatter fields (e.g., no date, empty tags array)?
- How does the grid handle a very large number of posts in a single year — does the layout degrade gracefully?
- What happens when two post files have identical filenames (slug collision)?
- How does the tag filter behave when the same tag appears with inconsistent casing (e.g., "Finance" vs "finance")?
- What limitations exist for media embedded in markdown (file size, supported formats, storage location)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST read all blog post metadata from Markdown files in a designated `posts/` folder at build time, requiring no code changes to publish a new post.
- **FR-002**: Each Markdown post file MUST support a frontmatter block containing at minimum: `title` (string), `date` (ISO-8601 date string), `description` (string), and `tags` (array of strings).
- **FR-003**: The Writing page MUST render all posts as cards in a responsive grid layout, grouped under year headings, with the most recent year displayed first.
- **FR-004**: Within each year group, posts MUST be ordered by date descending (newest first).
- **FR-005**: The Writing page MUST display a list of all unique tags derived from all published posts, allowing visitors to select a tag to filter the grid.
- **FR-006**: Selecting a tag MUST filter the post grid to show only posts that include that tag; selecting "All" or deselecting the tag MUST restore the full grid.
- **FR-007**: The system MUST generate a unique, bookmarkable URL for each post derived from the post's filename (slug), enabling direct navigation to individual post content.
- **FR-008**: Each post card MUST display: the post title, publication date, a short description, and its associated tags.
- **FR-009**: Post cards MUST link to the individual post page where the full post body is rendered.
- **FR-010**: The Writing page and individual post pages MUST support both light and dark mode using the existing color system from `001-pastel-colors`.
- **FR-011**: When no posts match an active tag filter, the system MUST display a user-friendly "No posts found" message rather than an empty grid.
- **FR-012**: Tag matching MUST be case-insensitive to prevent duplicate tags from inconsistent capitalization.
- **FR-013**: Blog post content MAY include media: images via standard Markdown syntax and embedded video or animations using MDX/HTML. Media references must be external URLs or stored under a public asset directory; large files should be avoided.

### Key Entities

- **BlogPost**: Represents a single written article. Key attributes: `title`, `date`, `description`, `tags[]`, `slug`, `body` (rendered content). Derived entirely from a single Markdown file. One BlogPost corresponds to one file and one URL.
- **Tag**: A free-form string label attached to one or more BlogPosts. Tags are not pre-defined — they come entirely from post frontmatter. A Tag has no identity beyond its string value.
- **PostCard**: The visual representation of a BlogPost on the Writing page grid. Displays `title`, `date`, `description`, and `tags[]`. Links to the individual post page.
- **YearGroup**: A visual grouping of PostCards on the Writing page. Defined by the four-digit year parsed from a BlogPost's `date`. Contains one or more PostCards.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new blog post is published and visible on the Writing page within 5 minutes of the author creating and saving a new Markdown file — with no React component changes required.
- **SC-002**: Visitors can locate a post by tag in 2 or fewer interactions (select tag → view filtered grid).
- **SC-003**: The Writing page renders all post cards correctly with zero layout breakage across mobile (320px+), tablet (768px+), and desktop (1280px+) viewport widths.
- **SC-004**: Tag filtering updates the displayed grid instantly with no perceptible delay.
- **SC-005**: Every post card links to a unique, bookmarkable post URL that loads the complete post content.
- **SC-006**: The Writing page remains fully functional with 0 posts (empty state) and with 50+ posts (large collection) without layout degradation.

## Assumptions

- Posts are authored by the site owner only; there is no user-submitted content or CMS.
- The `posts/` directory will live at the root of the project (e.g., `posts/robinhood-gold-card.md`).
- Filenames are treated as URL slugs and must be URL-safe (lowercase, hyphens only, no spaces).
- The initial tag set is minimal (e.g., "Finance") and will grow organically over time; no tag taxonomy management UI is needed.
- The Robinhood Gold card article will be the first post and will carry a "Finance" tag — this will serve as the initial end-to-end test case.
- Blog posts may contain images and embedded video/animation; media should be referenced via URLs or placed in the public asset directory and kept reasonably sized.
- Dark/light mode theming will reuse the existing visual design tokens established in `001-pastel-colors` without introducing new color values.
