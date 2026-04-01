import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import ThemeProvider from '@/components/ThemeProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Kahaani — Tales of Taste | East Indian & Hakka Cuisine, Winnipeg',
  description:
    'Where every dish tells a story. Authentic East Indian and Hakka cuisine at 11-801 Regent Ave W, Winnipeg. Tandoor-fired, wok-kissed, spice-perfected.',
  openGraph: {
    title: 'Kahaani — Tales of Taste | East Indian & Hakka Cuisine, Winnipeg',
    description:
      'Where every dish tells a story. Authentic East Indian and Hakka cuisine at 11-801 Regent Ave W, Winnipeg.',
    type: 'website',
    url: 'https://kahaani.ca',
    siteName: 'Kahaani',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kahaani — Tales of Taste',
    description:
      'East Indian & Hakka cuisine, where ancient recipes meet bold new flavors.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
