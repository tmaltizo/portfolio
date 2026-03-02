/**
 * Sidebar – persistent right-side icon bar.
 *
 * Always renders:
 *   • Dark-mode toggle at the top
 *
 * On the home page (/):
 *   • Smooth-scroll icons for every major section (Welcome, About, Toolkit, Connect)
 *
 * On every other page:
 *   • A button that smooth-scrolls to the top of the current page
 *   • Any additional icons passed via the `extraLinks` prop
 *
 * Extensibility – to add icons to a specific page, pass an array of
 * `{ icon, href, title }` objects as `extraLinks` from that page's component.
 * Example (in pages/writing.js):
 *   <Sidebar extraLinks={[{ icon: <FaPen />, href: '#top', title: 'Top' }]} />
 * … or control the Sidebar from _app.js using router.pathname.
 *
 * @param {{ extraLinks?: Array<{ icon: React.ReactNode, href: string, title: string }> }} props
 */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Link as ScrollLink, animateScroll } from 'react-scroll'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import {
  AiOutlineHome,
  AiOutlineMail,
} from 'react-icons/ai'
import { TbBrandReact } from 'react-icons/tb'
import { useDarkMode } from '@/contexts/DarkModeContext'

/** Offset (px) to clear the fixed NavBar when scrolling to a section anchor. */
const NAV_OFFSET = -52

/** Scroll-section definitions used on the home page only (excludes the top/home icon).
 *
 * Toolkit and Connect were moved to the About page; the home sidebar therefore
 * only needs the top icon now. */
const HOME_SECTION_LINKS = []

// when on the about page we still want the toolkit/connect shortcuts
const ABOUT_SECTION_LINKS = [
  { to: 'toolkit', icon: <TbBrandReact />,           title: 'Toolkit' },
  { to: 'connect', icon: <AiOutlineMail />,          title: 'Connect' },
]

const iconClass =
  'text-lg sm:text-xl text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent hover:scale-110 transition'

export default function Sidebar({ extraLinks = [] }) {
  const { isDark, toggleDark } = useDarkMode()
  const { pathname } = useRouter()
  const isHome = pathname === '/'
  const isAbout = pathname === '/about'

  return (
    <nav
      aria-label="Page utilities"
      className="fixed top-0 right-0 h-screen w-10 sm:w-12 flex flex-col items-center p-2
                 bg-light-bg bg-opacity-40 dark:bg-dark-bg dark:bg-opacity-40 backdrop-blur z-50"
    >
      {/* Dark-mode toggle – always visible */}
      {/* move closer to the very top so it no longer sits on top of the nav border */}
      <div className="relative group mt-1">
        <span className="absolute right-full top-1/2 -translate-y-1/2 translate-x-0 opacity-0 group-hover:-translate-x-3 group-hover:opacity-100 transition-all duration-300 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-3 py-1 rounded whitespace-nowrap text-xs z-10">
          {isDark ? 'Light mode' : 'Dark mode'}
        </span>
        <button
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleDark}
          className="p-2 text-lg sm:text-xl text-light-accent dark:text-dark-accent hover:scale-110 transition relative z-20"
        >
          <BsFillMoonStarsFill />
        </button>
      </div>

      {/* Centre-aligned icon links */}
      <div className="mt-auto mb-auto flex flex-col items-center space-y-0">
        {isHome || isAbout ? (
          /* Home page: top icon scrolls to absolute top; about page: same plus extra links */
          <>
            <div className="relative group h-10 flex items-center justify-center">
              <span className="absolute right-full top-1/2 -translate-y-1/2 translate-x-0 opacity-0 group-hover:-translate-x-3 group-hover:opacity-100 transition-all duration-300 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-3 py-1 rounded whitespace-nowrap text-xs z-10">
                Welcome
              </span>
              <button
                aria-label="Back to top"
                onClick={() => animateScroll.scrollToTop({ duration: 800, smooth: true })}
                className={`p-2 ${iconClass} relative z-20`}
              >
                <AiOutlineHome />
              </button>
            </div>
            {/* show section links on home and on about */}
            {(isHome ? HOME_SECTION_LINKS : ABOUT_SECTION_LINKS).map(({ to, icon, title }) => (
              <div key={to} className="relative group h-10 flex items-center justify-center">
                <span className="absolute right-full top-1/2 -translate-y-1/2 translate-x-0 opacity-0 group-hover:-translate-x-3 group-hover:opacity-100 transition-all duration-300 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-3 py-1 rounded whitespace-nowrap text-xs z-10">
                  {title}
                </span>
                <ScrollLink
                  to={to}
                  smooth
                  duration={800}
                  offset={NAV_OFFSET}
                  className={`p-2 ${iconClass} relative z-20`}
                >
                  {icon}
                  <span className="sr-only">{title}</span>
                </ScrollLink>
              </div>
            ))}
          </>
        ) : (
          /* Other pages: scroll to top of current page + any page-specific extras */
          <>
            <div className="relative group h-10 flex items-center justify-center">
              <span className="absolute right-full top-1/2 -translate-y-1/2 translate-x-0 opacity-0 group-hover:-translate-x-3 group-hover:opacity-100 transition-all duration-300 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-3 py-1 rounded whitespace-nowrap text-xs z-10">
                Back to top
              </span>
              <button
                aria-label="Back to top"
                onClick={() => animateScroll.scrollToTop({ duration: 800, smooth: true })}
                className={`p-2 ${iconClass} relative z-20`}
              >
                <AiOutlineHome />
              </button>
            </div>
            {extraLinks.map(({ icon, href, title }) => (
              <div key={href} className="relative group h-10 flex items-center justify-center">
                <span className="absolute right-full top-1/2 -translate-y-1/2 translate-x-0 opacity-0 group-hover:-translate-x-3 group-hover:opacity-100 transition-all duration-300 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-3 py-1 rounded whitespace-nowrap text-xs z-10">
                  {title}
                </span>
                <Link href={href} className={`p-2 ${iconClass} relative z-20`}>
                  {icon}
                  <span className="sr-only">{title}</span>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}
