'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wordmark: scale up from small
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { opacity: 0, scale: 0.8, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Footer content stagger
      if (contentRef.current) {
        const children = contentRef.current.querySelectorAll('.footer-item')
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer className="light-section bg-cream">
      {/* Logo + tagline */}
      <div ref={wordmarkRef} style={{ opacity: 0 }} className="flex flex-col items-center px-6 pt-24 lg:pt-32 will-change-transform">
        <img
          src="/images/logo.png"
          alt="Kahaani"
          className="h-24 w-auto lg:h-32"
        />
        <span className="mt-4 font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.3em] text-forest/30">
          Tales of Taste
        </span>
      </div>

      {/* Newsletter + socials */}
      <div ref={contentRef} className="mx-auto mt-16 max-w-[1000px] px-6 lg:mt-20 lg:px-16">
        <div className="grid gap-12 border-t border-forest/10 pt-10 lg:grid-cols-2 lg:gap-20">
          {/* Left — newsletter */}
          <div className="footer-item" style={{ opacity: 0 }}>
            <span className="font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.2em] text-forest/30">
              Stay in touch
            </span>
            <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-[12px] leading-relaxed text-forest/50">
              Sign up for new menu drops, events, and specials.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 border border-forest/15 bg-transparent px-4 py-3 font-[family-name:var(--font-dm-sans)] text-[12px] text-forest placeholder:text-forest/25 outline-none transition-colors focus:border-forest/30"
              />
              <button
                type="submit"
                className="border border-forest/15 border-l-0 bg-forest px-5 py-3 font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:bg-forest-light"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right — social links */}
          <div className="footer-item flex flex-col items-start lg:items-end" style={{ opacity: 0 }}>
            <span className="font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.2em] text-forest/30">
              Follow Us
            </span>
            <div className="mt-4 flex flex-col items-start gap-3 lg:items-end">
              <a
                href="https://instagram.com/kahaani_tales_of_taste"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[12px] text-forest/50 transition-colors hover:text-forest"
              >
                <InstagramIcon size={14} />
                Instagram
              </a>
              <a
                href="https://tiktok.com/@kahaani_tales_of_taste"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-dm-sans)] text-[12px] text-forest/50 transition-colors hover:text-forest"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-16 max-w-[1000px] px-6 pb-8 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-forest/5 pt-6 sm:flex-row">
          <p className="font-[family-name:var(--font-dm-sans)] text-[10px] text-forest/25">
            &copy; 2026 Kahaani — Tales of Taste. All Rights Reserved.
          </p>
          <p className="font-[family-name:var(--font-dm-sans)] text-[10px] text-forest/20">
            Website by{' '}
            <span className="text-forest/30 transition-colors hover:text-gold">
              Mimuk Studios
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
