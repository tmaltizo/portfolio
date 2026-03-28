import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import NavBar from '@/components/NavBar'
import Sidebar from '@/components/Sidebar'
import { DarkModeProvider, useDarkMode } from '@/contexts/DarkModeContext'
import { useEffect } from 'react'
import Head from 'next/head'
import '@/lib/firebase'

// Custom analytics component that filters out development
function ConditionalAnalytics() {
  // Don't load analytics in development or localhost
  if (process.env.NODE_ENV === 'development' || 
      (typeof window !== 'undefined' && 
       (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1'))) {
    return null
  }
  
  return <Analytics />
}

function AppShell({ Component, pageProps }) {
  const { isDark } = useDarkMode()

  useEffect(() => {
    const html = document.documentElement
    if (isDark) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [isDark])

  return (
    <>
      <Head>
        {/* mobile viewport, prevents automatic zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <NavBar />
      <Sidebar />
      <Component {...pageProps} />
      <ConditionalAnalytics />
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
