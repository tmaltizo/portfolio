# Contract: Blog Post Frontmatter

Each Markdown/MDX file representing a blog post must begin with a YAML frontmatter block conforming to this schema. Static typing is optional but recommended when authoring.

```yaml
---
title: string          # required: the post's title
date: string           # required: ISO-8601 date (e.g., "2026-03-15")
description: string    # required: short summary shown on the card
tags:                   # optional: list of tag strings
  - string
  - string
---
```

- Unknown fields are ignored but discouraged (will not be displayed).
- `slug` is not specified here; it is derived from the filename during build.
- `tags` values are case-insensitive and normalized to lowercase.

Example:

```markdown
---
title: "Robinhood Gold Card Review"
date: "2026-03-15"
description: "My thoughts on the new Robinhood Gold credit card."
tags:
  - Finance
  - Credit Cards
---

Content goes here...
```

Files failing to include the required fields will log a warning during build and may be omitted from the grid.
