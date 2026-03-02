# Contract: Navigation Links Data Structure

The navigation component consumes a JavaScript module exporting an array of
objects. This contract defines the expected shape of each entry.

```ts
interface NavLink {
  /**
   * Human-readable label shown in the navigation bar.
   * e.g. "About", "Projects".
   */
  label: string;

  /**
   * URL path for the link. Should correspond to a Next.js page under `pages/`.
   * Must begin with a leading slash `/`.
   */
  href: string;

  /**
   * Computed by the NavBar component; not required to be present in the data.
   * Indicates whether the link matches the current route. Boolean.
   */
  active?: boolean;
}
```

The component may import the array from `components/navLinks.js`.
Maintaining this contract ensures that adding, modifying, or removing links
will not break the rendering logic. Any code consuming the array should
perform basic validation (non-empty strings) if it manipulates the data.
