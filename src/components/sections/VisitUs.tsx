'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mobileReveal, isTouchDevice } from '@/lib/mobileReveal'

gsap.registerPlugin(ScrollTrigger)

const UBER_EATS_URL =
  'https://www.ubereats.com/ca/store/kahaani-east-indian-and-hakka-cuisine-11-801-regent-avenue-west/lOmiQJw-UeCINYBR4ianlQ'

const HOURS = [
  { day: 'Sunday', hours: '11:00 AM \u2013 12:00 AM' },
  { day: 'Mon \u2013 Thu', hours: '11:00 AM \u2013 11:00 PM' },
  { day: 'Fri \u2013 Sat', hours: '11:00 AM \u2013 12:00 AM' },
]

export default function VisitUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const isTouch = isTouchDevice()

    if (isTouch) {
      const details = detailsRef.current
        ? Array.from(detailsRef.current.querySelectorAll('.visit-detail'))
        : []
      // For heading clipPath, just reveal it directly
      if (headingRef.current) {
        headingRef.current.style.clipPath = 'none'
      }
      return mobileReveal([subtitleRef.current, ...details], { stagger: 0.1 })
    }

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (detailsRef.current) {
        const children = detailsRef.current.querySelectorAll('.visit-detail')
        gsap.fromTo(
          children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: detailsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="visit" ref={sectionRef} className="relative bg-forest">
      {/* Low-opacity background image for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'url(/images/exterior.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-forest/60" />

      {/* Massive pre-footer heading with clipPath reveal */}
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-32 lg:py-40">
        <div ref={headingRef} style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
          <h2 className="text-center font-[family-name:var(--font-cormorant)] text-[clamp(3rem,10vw,8rem)] font-light leading-[0.95] tracking-tight text-cream">
            Come
            <br />
            <em className="italic text-gold">Taste</em> the
            <br />
            Story.
          </h2>
        </div>

        <p
          ref={subtitleRef}
          style={{ opacity: 0 }}
          className="mx-auto mt-10 max-w-[380px] text-center font-[family-name:var(--font-dm-sans)] text-[12px] font-medium uppercase leading-[2] tracking-[0.15em] text-cream/40 will-change-transform"
        >
          Our commitment extends beyond the plate. It&apos;s about creating a space
          where every guest becomes part of the story we&apos;re telling.
        </p>
      </div>

      {/* Visit details — staggered fade in */}
      <div ref={detailsRef} className="border-t border-cream/10">
        <div className="mx-auto grid max-w-[1200px] gap-16 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-28">
          {/* Left — Location & Hours */}
          <div className="visit-detail" style={{ opacity: 0 }}>
            <span className="font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.2em] text-cream/30">
              Find Us
            </span>

            <div className="mt-8 space-y-6">
              <div>
                <p className="font-[family-name:var(--font-cormorant)] text-2xl text-cream">
                  11-801 Regent Ave W
                </p>
                <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-[13px] text-cream/40">
                  Winnipeg, MB R2C 3A7
                </p>
              </div>

              <div className="space-y-2">
                {HOURS.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between font-[family-name:var(--font-dm-sans)] text-[13px]"
                  >
                    <span className="text-cream/40">{h.day}</span>
                    <span className="text-cream/70">{h.hours}</span>
                  </div>
                ))}
              </div>

              <p className="font-[family-name:var(--font-dm-sans)] text-[13px] text-cream/40">
                (204) 222-2888
              </p>
            </div>
          </div>

          {/* Right — CTAs */}
          <div className="visit-detail flex flex-col justify-center gap-4" style={{ opacity: 0 }}>
            <a
              href={UBER_EATS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-cream/20 bg-cream/5 px-8 py-5 text-center font-[family-name:var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.2em] text-cream transition-all duration-500 hover:bg-gold hover:text-forest hover:border-gold"
            >
              Order Now
            </a>
            <a
              href="#"
              className="block w-full border border-cream/10 px-8 py-5 text-center font-[family-name:var(--font-dm-sans)] text-[11px] font-medium uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 hover:border-gold/40 hover:text-cream"
            >
              Reserve a Table
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
