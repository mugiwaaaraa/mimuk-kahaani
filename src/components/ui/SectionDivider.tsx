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
    <div className="relative h-24 -mt-px -mb-px" style={{ zIndex: 2 }}>
      <svg
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 96V0h1440v96C1200 40 960 64 720 48 480 32 240 72 0 96Z"
          fill={from}
          style={{ transition: 'fill 0.3s ease' }}
        />
      </svg>
      <div
        className="absolute inset-0 -z-1"
        style={{ backgroundColor: to, transition: 'background-color 0.3s ease' }}
      />
      {/* Gold accent line */}
      <svg
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 96C240 72 480 32 720 48 960 64 1200 40 1440 96"
          stroke="#B8935A"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
        />
      </svg>
    </div>
  )
}
