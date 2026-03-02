import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import NavBar from '@/components/NavBar'
import Sidebar from '@/components/Sidebar'
import { DarkModeProvider, useDarkMode } from '@/contexts/DarkModeContext'

import { useEffect } from 'react'

function AppShell({ Component, pageProps }) {
  const { isDark } = useDarkMode()

  useEffect(() => {
    const html = document.documentElement
    if (isDark) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [isDark])

  return (
    <> {/* no wrapper div needed for dark class now */}
      <NavBar />
      <Sidebar />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default function App(props) {
  return (
    <DarkModeProvider>
      <AppShell {...props} />
    </DarkModeProvider>
  )
}
