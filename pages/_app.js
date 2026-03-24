import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import NavBar from '@/components/NavBar'
import Sidebar from '@/components/Sidebar'
import { DarkModeProvider, useDarkMode } from '@/contexts/DarkModeContext'
import { useEffect } from 'react'
import Head from 'next/head'
import '@/lib/firebase'

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
