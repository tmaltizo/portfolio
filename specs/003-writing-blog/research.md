# Research Notes: Writing Blog Section

## Decision: Content source and format
We will store posts as Markdown/MDX files in a `posts/` directory at the repository root. This keeps authoring simple (new file = new post) and allows full control over content via Git. MDX support is desirable to give flexibility for embedded JSX (e.g., YouTube components) and video.

## Decision: Parsing and rendering
Use `gray-matter` to extract frontmatter metadata (title, date, tags, description). For rendering, `next-mdx-remote` or the official `@next/mdx` plugin can convert the body to React nodes at build time. This keeps the output as static HTML and works well with Next.js static props.

## Decision: Tag handling
Tags are free-form strings stored in frontmatter. During build, aggregate all unique tags case-insensitively. Provide a simple filter UI on the Writing page that updates state in React; no external database required.

## Decision: Year grouping
Compute the year by parsing the `date` frontmatter (ISO string) and grouping posts accordingly. Sorting is done by date descending. Rendering uses year heading `<h2>` elements followed by grid of `PostCard` components.

## Decision: Media support
Allow images via standard Markdown `![alt](url)` syntax. For embedded video or animations, rely on MDX/HTML within the body; for example, an `<iframe>` or custom React component can be used. Media files themselves should be referenced via external URLs or placed in `public/` to avoid bundling large assets.

## Alternatives considered
- Using a headless CMS (e.g., Contentful): rejected because it complicates the "add new post via file" requirement and introduces network dependencies.
- Storing posts in JSON or JS modules: rejected in favor of Markdown for author familiarity and built-in tooling support.
- Using full MDX for everything: opted for Markdown with optional MDX to minimize build-time complexity, but prepare tooling to handle `.mdx` as well.

## Rationale
The chosen approach aligns with existing Next.js static file handling patterns, keeps dependency weight low, and meets the "easily editable" requirement while enabling media and tag features. It also fits with the portfolio's constitution constraints (minimal new runtime dependencies, performance goals).
