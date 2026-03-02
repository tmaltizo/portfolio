// data module for navigation links
// exports an array of { label, href } objects that the NavBar component
// will iterate over. Keeping this in a separate file makes the UI
// data‑driven and easy to extend without editing the component itself.

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Writing', href: '/writing' },
  { label: 'Projects', href: '/projects' },
];

export default navLinks;
