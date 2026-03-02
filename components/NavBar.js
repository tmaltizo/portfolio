import Link from 'next/link'
import { useRouter } from 'next/router'
import navLinks from './navLinks'

/**
 * NavBar – site-wide top navigation bar.
 *
 * Renders one anchor link per entry in `navLinks.js`. The active link
 * (matching `router.pathname`) receives `aria-current="page"` and a bold
 * weight so keyboard users, screen-reader users, and sighted users all get
 * an unambiguous indication of the current page.
 *
 * Focus styles use `focus-visible` so the ring appears only on keyboard
 * navigation and is suppressed for mouse/pointer interactions.
 *
 * @returns {JSX.Element} A `<nav>` landmark wrapping the link list.
 */
export default function NavBar() {
  const { pathname } = useRouter()

  return (
    <nav
      className="flex space-x-6 bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border px-6 py-3 shadow-sm"
      aria-label="Main navigation"
    >
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`text-sm transition-colors duration-150
              text-light-text dark:text-dark-text
              hover:text-light-accent dark:hover:text-dark-accent
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-accent dark:focus-visible:ring-dark-accent
              ${isActive
                ? 'font-semibold text-light-accent dark:text-dark-accent underline underline-offset-4'
                : ''
              }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
