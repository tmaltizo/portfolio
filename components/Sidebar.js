/**
 * Sidebar – persistent right-side icon bar.
 *
 * Always renders:
 *   • Dark-mode toggle at the top
 *
 * On the home page (/):
 *   • Smooth-scroll icons for every major section (Back to top, About, Toolkit, Connect)
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
import { Link as ScrollLink, animateScroll } from 'react-scroll'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useSidebarConfig } from '@/hooks/useSidebarConfig'

/** Offset (px) to clear the fixed NavBar when scrolling to a section anchor. */
const NAV_OFFSET = -52

const iconClass =
  'text-lg sm:text-xl text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent hover:scale-110 transition'

const activeIconClass =
  'text-lg sm:text-xl text-light-accent dark:text-dark-accent hover:scale-110 transition'

export default function Sidebar({ extraLinks = [] }) {
  const { isDark, toggleDark } = useDarkMode()
  const { config, activeSection } = useSidebarConfig()

  // Helper function to render section links
  const renderSectionLinks = (sections) => {
    if (!sections || !Array.isArray(sections)) return null
    
    return sections.map((section) => {
      const to = typeof section === 'string' ? section : section.to
      const icon = typeof section === 'string' ? null : section.icon
      const title = typeof section === 'string' ? to : section.title
      
      return (
        <div key={to} className="relative group h-10 flex items-center justify-center">
          <span className="absolute right-full top-1/2 -translate-y-1/2 translate-x-0 opacity-0 group-hover:-translate-x-3 group-hover:opacity-100 transition-all duration-300 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-3 py-1 rounded whitespace-nowrap text-xs z-10">
            {title}
          </span>
          <ScrollLink
            to={to}
            smooth="easeInOutQuart"
            duration={700}
            offset={NAV_OFFSET}
            className={`p-2 ${activeSection === to ? activeIconClass : iconClass} relative z-20 cursor-pointer`}
          >
            {icon}
            <span className="sr-only">{title}</span>
          </ScrollLink>
        </div>
      )
    })
  }

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

      {/* Top-aligned icon links (placed just below the dark-mode toggle) */}
      <div className="mt-2 flex flex-col items-center space-y-0">
        {/* Always show "Back to top" button */}
        <div className="relative group h-10 flex items-center justify-center">
          <span className="absolute right-full top-1/2 -translate-y-1/2 translate-x-0 opacity-0 group-hover:-translate-x-3 group-hover:opacity-100 transition-all duration-300 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-3 py-1 rounded whitespace-nowrap text-xs z-10">
            Back to top
          </span>
          <button
            aria-label="Back to top"
            onClick={() => animateScroll.scrollToTop({ duration: 700, smooth: 'easeInOutQuart' })}
            className={`p-2 ${activeSection === 'home' ? activeIconClass : iconClass} relative z-20`}
          >
            <AiOutlineHome />
          </button>
        </div>

        {/* Render section links based on configuration */}
        {renderSectionLinks(config.sections)}

        {/* Render extra links for other pages */}
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
      </div>
    </nav>
  )
}
