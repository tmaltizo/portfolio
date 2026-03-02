/**
 * DarkModeContext – site-wide dark mode state.
 *
 * Provides `isDark` (boolean) and `toggleDark` (function) to any component
 * in the tree. The context is initialised to `true` (dark on by default) to
 * match the original behaviour of the Home component.
 *
 * Usage:
 *   import { useDarkMode } from '@/contexts/DarkModeContext'
 *   const { isDark, toggleDark } = useDarkMode()
 */
import { createContext, useContext, useState } from 'react'

const DarkModeContext = createContext({ isDark: true, toggleDark: () => {} })

/**
 * Wrap the application (in _app.js) with DarkModeProvider so all pages and
 * components can read / mutate dark mode state through the context.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)
  const toggleDark = () => setIsDark((prev) => !prev)
  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  )
}

/**
 * Convenience hook for consuming the dark mode context.
 *
 * @returns {{ isDark: boolean, toggleDark: () => void }}
 */
export function useDarkMode() {
  return useContext(DarkModeContext)
}
