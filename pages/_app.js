import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import NavBar from '@/components/NavBar'
import { DarkModeProvider, useDarkMode } from '@/contexts/DarkModeContext'

/** Inner wrapper — reads dark mode state from context and applies Tailwind's
 *  `dark` class at the top of the tree so every component (including NavBar)
 *  can use `dark:` variants. */
function AppShell({ Component, pageProps }) {
  const { isDark } = useDarkMode()
  return (
    <div className={isDark ? 'dark' : ''}>
      <NavBar />
      <Component {...pageProps} />
      <Analytics />
    </div>
  )
}

export default function App(props) {
  return (
    <DarkModeProvider>
      <AppShell {...props} />
    </DarkModeProvider>
  )
}
