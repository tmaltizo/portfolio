/**
 * Custom hook for managing sidebar configuration and scroll spy functionality.
 * This hook encapsulates the logic for determining which sections to track
 * and provides the current active section based on scroll position.
 */

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getSidebarConfig, getSectionIds } from '@/config/sidebarConfig'

/**
 * Custom hook to track active section based on scroll position
 * @param {Array} sectionIds - Array of section IDs to track
 * @returns {string} Currently active section ID
 */
function useScrollSpy(sectionIds = []) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (sectionIds.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for better UX

      // Find the section that's currently in view
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section) {
          const { offsetTop } = section
          if (scrollPosition >= offsetTop) {
            setActiveSection(sectionIds[i])
            break
          }
        }
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds])

  return activeSection
}

/**
 * Main hook for sidebar configuration and scroll spy
 * @returns {Object} Sidebar configuration and active section
 */
export function useSidebarConfig() {
  const router = useRouter()
  const { pathname, asPath } = router
  
  // Get configuration for current path
  const config = getSidebarConfig(asPath)
  
  // Get section IDs for scroll spy
  const sectionIds = getSectionIds(config)
  
  // Always call useScrollSpy, but pass empty array if scroll spy is disabled
  const activeSection = useScrollSpy(config.scrollSpy ? sectionIds : [])
  
  return {
    config,
    activeSection: config.scrollSpy ? activeSection : '',
    sectionIds,
  }
}
