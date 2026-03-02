# Data Model: Writing Blog Section

This feature has a minimal data model driven entirely by Markdown/MDX files. There is no database; all entities are derived at build time.

## BlogPost
- **Description**: Represents a single published article.
- **Source**: One `.md` or `.mdx` file in the `posts/` directory.
- **Attributes**:
  - `title` (string) – required; frontmatter field
  - `date` (string, ISO-8601) – required; frontmatter field used for sorting and grouping
  - `description` (string) – required; frontmatter field used for card summary
  - `tags` (string[]) – optional array; frontmatter field; case-insensitive
  - `slug` (string) – derived from filename (e.g., `robinhood-gold-card`); used for URL `/writing/[slug]`
  - `body` (string/ReactNode) – the rendered Markdown/MDX content
  - `media` (implicit) – any image or embedded video referenced in body

## Tag
- **Description**: A free-form label attached to one or more posts.
- **Attributes**:
  - `name` (string) – the tag text normalized to lower-case for matching
- **Relationships**: Many-to-many with BlogPost (each post may have multiple tags; each tag may appear on multiple posts).

## YearGroup
- **Description**: A grouping of posts that share the same publication year.
- **Attributes**:
  - `year` (number) – extracted from BlogPost `date`
  - `posts` (BlogPost[]) – list of posts sorted by date descending
- **Usage**: Used purely by the UI for rendering; not persisted beyond build.

## PostCard (UI model)
- **Description**: Visual representation of a BlogPost for the grid.
- **Attributes**:
  - `title`, `date`, `description`, `tags` (same as BlogPost)
  - `href` – generated link to the individual post page

Note: All metadata is validated at build time; missing or malformed fields should cause a build-time warning or error (edge case handling described in spec).