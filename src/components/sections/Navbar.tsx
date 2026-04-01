'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '@/components/ThemeProvider'

gsap.registerPlugin(ScrollTrigger)

const LEFT_LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'The Craft', href: '#the-craft' },
  { label: 'Menu', href: '#menu' },
]

const NAV_LINKS = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
]

const ORDER_LINK = {
  label: 'Order Now',
  href: 'https://www.ubereats.com/ca/store/kahaani-east-indian-and-hakka-cuisine-11-801-regent-avenue-west/lOmiQJw-UeCINYBR4ianlQ',
  external: true,
}

const ALL_LINKS = [...LEFT_LINKS, ...NAV_LINKS, ORDER_LINK]

/* ── Sun icon ── */
function SunIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

/* ── Moon icon ── */
function MoonIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

/* ── Theme toggle pill ── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isNight = theme === 'night'

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-[26px] w-[50px] items-center rounded-full border border-cream/20 bg-cream/5 p-[3px] transition-all duration-300 hover:border-cream/40"
      aria-label={isNight ? 'Switch to day mode' : 'Switch to night mode'}
    >
      <div
        className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/80 text-forest transition-transform duration-300"
        style={{ transform: isNight ? 'translateX(24px)' : 'translateX(0)' }}
      >
        {isNight ? <MoonIcon /> : <SunIcon />}
      </div>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isTouch) {
      // On mobile, use a simple passive scroll listener instead of ScrollTrigger
      function onScroll() {
        setScrolled(window.scrollY > 100)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -100',
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      })
    })
    return () => ctx.revert()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('http')) return
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const linkClasses =
    'font-[family-name:var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300'

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out"
        style={{
          backgroundColor: scrolled ? 'rgba(44, 62, 53, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          padding: scrolled ? '16px 24px' : '28px 24px',
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between lg:px-8">
          {/* Left links — desktop */}
          <div className="hidden items-center gap-8 lg:flex">
            {LEFT_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`${linkClasses} text-cream/60 hover:text-cream`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img
              src="/images/logo.png"
              alt="Kahaani"
              className="h-12 w-auto transition-all duration-500 lg:h-14"
            />
          </a>

          {/* Right links + theme toggle — desktop */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`${linkClasses} text-cream/60 hover:text-cream`}
              >
                {link.label}
              </a>
            ))}

            {/* Day/Night toggle */}
            <ThemeToggle />

            {/* Order Now */}
            <a
              href={ORDER_LINK.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClasses} text-gold hover:text-gold-light`}
            >
              {ORDER_LINK.label}
            </a>
          </div>

          {/* Mobile: hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col justify-center gap-[5px] lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block h-[2px] w-6 bg-cream/80 transition-all duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-[2px] w-6 bg-cream/80 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] w-6 bg-cream/80 transition-all duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-forest"
          >
            {ALL_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                target={'external' in link ? '_blank' : undefined}
                rel={'external' in link ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-3 font-[family-name:var(--font-cormorant)] text-3xl font-light text-cream transition-colors hover:text-gold"
              >
                {link.label}
              </motion.a>
            ))}

            {/* Theme toggle in mobile overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ALL_LINKS.length * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
