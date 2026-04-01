'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'day' | 'night'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({
  theme: 'day',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

/*
  Night mode CSS injected via JS to bypass Tailwind v4's processing
  pipeline (which strips rules containing utility class selectors).
  All values are static/hardcoded — no user input involved.
*/
const NIGHT_STYLES_ID = 'kahaani-night-mode'

function injectNightCSS() {
  if (document.getElementById(NIGHT_STYLES_ID)) return
  const style = document.createElement('style')
  style.id = NIGHT_STYLES_ID
  style.textContent = [
    /* Background swap: cream → charcoal */
    '[data-theme="night"] .light-section.bg-cream,',
    '[data-theme="night"] .light-section { background-color: #1A1A1A !important; }',

    /* Text-forest → cream (all opacity variants) */
    '[data-theme="night"] .light-section .text-forest { color: rgb(245,240,232) !important; }',
    '[data-theme="night"] .light-section .text-forest\\/70 { color: rgba(245,240,232,0.7) !important; }',
    '[data-theme="night"] .light-section .text-forest\\/60 { color: rgba(245,240,232,0.6) !important; }',
    '[data-theme="night"] .light-section .text-forest\\/50 { color: rgba(245,240,232,0.5) !important; }',
    '[data-theme="night"] .light-section .text-forest\\/40 { color: rgba(245,240,232,0.4) !important; }',
    '[data-theme="night"] .light-section .text-forest\\/30 { color: rgba(245,240,232,0.3) !important; }',
    '[data-theme="night"] .light-section .text-forest\\/25 { color: rgba(245,240,232,0.25) !important; }',
    '[data-theme="night"] .light-section .text-forest\\/20 { color: rgba(245,240,232,0.2) !important; }',

    /* Hover text overrides */
    '[data-theme="night"] .light-section .hover\\:text-forest:hover { color: rgb(245,240,232) !important; }',

    /* Placeholder */
    '[data-theme="night"] .light-section .placeholder\\:text-forest\\/25::placeholder { color: rgba(245,240,232,0.25) !important; }',

    /* Border overrides: forest → cream */
    '[data-theme="night"] .light-section .border-forest\\/5 { border-color: rgba(245,240,232,0.05) !important; }',
    '[data-theme="night"] .light-section .border-forest\\/10 { border-color: rgba(245,240,232,0.1) !important; }',
    '[data-theme="night"] .light-section .border-forest\\/15 { border-color: rgba(245,240,232,0.15) !important; }',

    /* Menu card hover */
    '[data-theme="night"] .light-section .hover\\:bg-forest\\/\\[0\\.02\\]:hover { background-color: rgba(245,240,232,0.02) !important; }',

    /* Invert topographic SVG pattern on dark bg */
    '[data-theme="night"] .light-section .topo-pattern { filter: invert(1); }',

    /* Smooth theme transition */
    '.light-section { transition: background-color 0.3s ease; }',
  ].join('\n')
  document.head.appendChild(style)
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('day')

  useEffect(() => {
    // Inject night mode CSS on mount
    injectNightCSS()

    const stored = localStorage.getItem('kahaani-theme') as Theme | null
    if (stored === 'night') {
      setTheme('night')
      document.documentElement.setAttribute('data-theme', 'night')
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'day' ? 'night' : 'day'
    setTheme(next)
    if (next === 'night') {
      document.documentElement.setAttribute('data-theme', 'night')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('kahaani-theme', next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
