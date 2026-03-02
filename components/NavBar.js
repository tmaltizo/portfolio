import Link from 'next/link'
import { useRouter } from 'next/router'
import navLinks from './navLinks'

export default function NavBar() {
  const { pathname } = useRouter()

  return (
    <nav
      role="navigation"
      className="flex space-x-6 bg-gray-100 p-4 shadow-sm"
      aria-label="Main navigation"
    >
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
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
