import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import NavBar from '@/components/NavBar'
import Sidebar from '@/components/Sidebar'
import { DarkModeProvider, useDarkMode } from '@/contexts/DarkModeContext'

function AppShell({ Component, pageProps }) {
  const { isDark } = useDarkMode()
  return (
    <div className={isDark ? 'dark' : ''}>
      <NavBar />
      <Sidebar />
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
