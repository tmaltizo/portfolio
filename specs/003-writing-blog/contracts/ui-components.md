# Contract: UI Components for Writing Grid

This document outlines the props and expected behavior for components introduced by the feature.

## `PostCard` component

Props:

```ts
interface PostCardProps {
  title: string;
  date: string;           // formatted date string to display
  description: string;
  tags: string[];
  href: string;           // link to the individual post (e.g., `/writing/slug`)
}
```

Behavior:
- Renders the title, date, description, and a pill for each tag.
- Entire card is wrapped in a Next.js `<Link>` to `href`.
- Applies responsive Tailwind classes to maintain grid layout.
- Supports dark and light color schemes.

## `TagFilter` component (optional)

Props:

```ts
interface TagFilterProps {
  tags: string[];          // list of available tags
  activeTag?: string;      // currently selected tag
  onSelect: (tag?: string) => void; // callback when user selects or clears filter
}
```

Behavior:
- Renders a horizontal list of clickable tag pills plus an "All" button.
- Highlights `activeTag` if provided.
- Calls `onSelect` with the tag name when a pill is clicked, or `undefined` for All.


These contracts are intended for reference during implementation and testing. They ensure consistent prop names and behaviors.
