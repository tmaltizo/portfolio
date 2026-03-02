/**
 * Navigation link definitions.
 *
 * This is the single source of truth for the top-level navigation links.
 * To add a new page to the nav:
 *   1. Append a new `{ label, href }` object to this array.
 *   2. Create the corresponding page file at `pages/<href>.js`.
 *
 * The NavBar component iterates over this array automatically, so no
 * changes to the component itself are required.
 *
 * @typedef {{ label: string, href: string }} NavLink
 * @type {NavLink[]}
 */
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Writing', href: '/writing' },
  { label: 'Projects', href: '/projects' },
];

export default navLinks;
