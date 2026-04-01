'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const bottomLeftRef = useRef<HTMLParagraphElement>(null)
  const bottomRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    if (!section || !bg) return

    const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean) as HTMLDivElement[]
    const bottomEls = [bottomLeftRef.current, bottomRightRef.current].filter(Boolean) as HTMLElement[]
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const ctx = gsap.context(() => {
      // Background parallax — skip on touch devices to avoid scroll jank
      if (!isTouch) {
        gsap.fromTo(
          bg,
          { scale: 1.15 },
          {
            scale: 1.0,
            y: '15%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    })

    // ── Entrance animation: triggered after intro overlay finishes ──
    let scrollCtx: gsap.Context | null = null

    function playEntrance() {
      const totalDelay = lines.length * 0.2

      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out',
          }
        )
      })

      bottomEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: totalDelay + 0.1 + i * 0.1,
            ease: 'power3.out',
          }
        )
      })

      // Scroll-linked fade — only on non-touch devices
      if (!isTouch) {
        const entranceDuration = totalDelay + 0.8 + 0.2
        setTimeout(() => {
          scrollCtx = gsap.context(() => {
            lines.forEach((line) => {
              gsap.fromTo(
                line,
                { opacity: 1, y: 0 },
                {
                  opacity: 0,
                  y: -30,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom 60%',
                    scrub: true,
                  },
                }
              )
            })

            bottomEls.forEach((el) => {
              gsap.fromTo(
                el,
                { opacity: 1, y: 0 },
                {
                  opacity: 0,
                  y: -20,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom 60%',
                    scrub: true,
                  },
                }
              )
            })
          })
        }, entranceDuration * 1000)
      }
    }

    window.addEventListener('intro-complete', playEntrance)

    return () => {
      ctx.revert()
      scrollCtx?.revert()
      window.removeEventListener('intro-complete', playEntrance)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-dvh w-full overflow-hidden"
    >
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            'url(/images/hero-naan.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.15)',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* MASSIVE ASYMMETRIC TYPOGRAPHY — starts invisible, animated in after intro */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-[12vh] lg:px-16">
        <div className="overflow-hidden">
          <div
            ref={line1Ref}
            style={{ opacity: 0 }}
            className="font-[family-name:var(--font-cormorant)] text-[clamp(2.2rem,10vw,8rem)] font-light leading-[0.95] tracking-tight text-cream will-change-transform"
          >
            Every Dish
          </div>
        </div>

        <div className="overflow-hidden pl-[8vw] lg:pl-[15vw]">
          <div
            ref={line2Ref}
            style={{ opacity: 0 }}
            className="font-[family-name:var(--font-cormorant)] text-[clamp(2.2rem,10vw,8rem)] font-light leading-[0.95] tracking-tight text-cream will-change-transform"
          >
            Tells a{' '}
            <em className="italic text-gold">Story</em>
          </div>
        </div>

        <div className="mt-1 overflow-hidden pl-[25vw] lg:pl-[40vw]">
          <div
            ref={line3Ref}
            style={{ opacity: 0 }}
            className="font-[family-name:var(--font-cormorant)] text-[clamp(2.2rem,10vw,8rem)] font-light leading-[0.95] tracking-tight text-cream will-change-transform"
          >
            of <em className="italic text-gold">Flavor</em>.
          </div>
        </div>
      </div>

      {/* Bottom bar — starts invisible */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-6 pb-8 lg:px-16">
        <p
          ref={bottomLeftRef}
          style={{ opacity: 0 }}
          className="hidden max-w-[280px] font-[family-name:var(--font-dm-sans)] text-[11px] font-medium uppercase leading-relaxed tracking-[0.15em] text-cream/60 sm:block"
        >
          East Indian &amp; Hakka cuisine, where ancient recipes meet bold new
          flavors. Welcome to Kahaani.
        </p>

        <div
          ref={bottomRightRef}
          style={{ opacity: 0 }}
          className="flex flex-col items-end gap-2"
        >
          <span className="font-[family-name:var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.15em] text-cream/60">
            Discover our story
          </span>
          <div className="scroll-line h-8 w-px bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </div>
    </section>
  )
}
