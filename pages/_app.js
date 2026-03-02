import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import NavBar from '@/components/NavBar'

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
