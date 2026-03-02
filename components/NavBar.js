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
      className="flex space-x-6 bg-gray-100 p-4 shadow-sm"
      aria-label="Main navigation"
    >
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`text-gray-700 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              isActive ? 'font-semibold' : ''
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
