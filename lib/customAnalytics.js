import { useEffect } from 'react'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'

// Custom analytics that filters out your own visits
export function CustomAnalytics() {
  useEffect(() => {
    // Filter out development environment
    if (process.env.NODE_ENV === 'development') {
      return
    }
    
    // Filter out your local IP/localhost
    if (typeof window !== 'undefined') {
      const isLocalhost = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1'
      if (isLocalhost) {
        return
      }
      
      // Optional: Filter out specific IP addresses
      // You'd need to get this from an API call
    }
    
    // Only track if not filtered out
    logCustomEvent('page_view')
  }, [])
  
  return <VercelAnalytics />
}

// Custom event logging
function logCustomEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}
