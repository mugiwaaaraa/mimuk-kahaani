'use client'

import { useTheme } from '@/components/ThemeProvider'

interface SectionDividerProps {
  fromColor: string
  toColor: string
}

const CREAM = '#F5F0E8'
const CHARCOAL = '#1A1A1A'

function themeColor(color: string, theme: string): string {
  if (theme === 'night' && color.toUpperCase() === CREAM) {
    return CHARCOAL
  }
  return color
}

export default function SectionDivider({ fromColor, toColor }: SectionDividerProps) {
  const { theme } = useTheme()
  const from = themeColor(fromColor, theme)
  const to = themeColor(toColor, theme)

  return (
    <div className="relative -mt-px -mb-px" style={{ zIndex: 2 }}>
      {/* Bottom fill — next section color behind the curve */}
      <div
        className="absolute inset-0 -z-1"
        style={{ backgroundColor: to, transition: 'background-color 0.3s ease' }}
      />

      {/* Smooth sine-wave curve — filled with previous section color */}
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block w-full"
        preserveAspectRatio="none"
        style={{ height: '70px' }}
      >
        <path
          d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z"
          fill={from}
          style={{ transition: 'fill 0.3s ease' }}
        />
      </svg>
    </div>
  )
}
