'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StoryChapter {
  heading: React.ReactNode
  label: string
  body: string
  images: { src: string; alt: string; position: string; rotation: string }[]
}

const CHAPTERS: StoryChapter[] = [
  {
    heading: (
      <>
        Kahaani means{' '}
        <em className="italic text-gold">story</em>, only{' '}
        <em className="italic text-gold">real</em> flavors.
      </>
    ),
    label: 'NO SHORTCUTS. NO COMPROMISE.',
    body: 'Born from a love of East Indian tradition and the bold creativity of Hakka cuisine, Kahaani is where two culinary worlds collide. Every recipe carries a tale — of family kitchens, of spice routes, of flavors perfected across generations.',
    images: [
      {
        src: '/images/momos-tikka.jpg',
        alt: 'Kahaani momos and tikka',
        position: 'left-[5%] top-[15%]',
        rotation: '-rotate-6',
      },
      {
        src: '/images/exterior.jpg',
        alt: 'Kahaani restaurant exterior',
        position: 'right-[8%] top-[8%]',
        rotation: 'rotate-3',
      },
    ],
  },
  {
    heading: (
      <>
        Recipes passed through{' '}
        <em className="italic text-gold">generations</em>, reimagined for{' '}
        <em className="italic text-gold">today</em>.
      </>
    ),
    label: 'OUR FOUNDATION. OUR PROOF.',
    body: 'Our foundation is authenticity. From the tandoor clay oven to the wok, every technique is honored. We don\u2019t take shortcuts \u2014 we let time, heat, and the right spices do what they\u2019ve always done best.',
    images: [
      {
        src: '/images/spring-rolls.jpg',
        alt: 'Crispy spring rolls',
        position: 'left-[3%] top-[10%]',
        rotation: 'rotate-3',
      },
      {
        src: '/images/dessert.jpg',
        alt: 'Kahaani dessert',
        position: 'right-[5%] top-[20%]',
        rotation: '-rotate-4',
      },
    ],
  },
]

function ChapterSection({ chapter }: { chapter: StoryChapter }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const img1Ref = useRef<HTMLDivElement>(null)
  const img2Ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const ctx = gsap.context(() => {
      // Heading fade up from y:60
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Images: fade + scale + rotate in, then parallax
      const imgs = [img1Ref.current, img2Ref.current]
      imgs.forEach((img, i) => {
        if (!img) return
        gsap.fromTo(
          img,
          { opacity: 0, y: 80, scale: 0.85, rotation: i === 0 ? -12 : 8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: i === 0 ? -6 : 3,
            duration: 1.4,
            delay: 0.15 + i * 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
        // Parallax — skip on touch devices to avoid scroll jank
        if (!isTouch) {
          gsap.to(img, {
            y: i === 0 ? '-15%' : '-25%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      })

      // Body text fade up
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-32 lg:py-40"
    >
      {/* Floating images — invisible by default, animated in */}
      <div
        ref={img1Ref}
        style={{ opacity: 0 }}
        className={`absolute hidden lg:block ${chapter.images[0].position} ${chapter.images[0].rotation} z-0 will-change-transform`}
      >
        <div className="h-[220px] w-[170px] overflow-hidden rounded-lg shadow-2xl">
          <img
            src={chapter.images[0].src}
            alt={chapter.images[0].alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        ref={img2Ref}
        style={{ opacity: 0 }}
        className={`absolute hidden lg:block ${chapter.images[1].position} ${chapter.images[1].rotation} z-0 will-change-transform`}
      >
        <div className="h-[200px] w-[160px] overflow-hidden rounded-lg shadow-2xl">
          <img
            src={chapter.images[1].src}
            alt={chapter.images[1].alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Giant heading — hidden until scroll */}
      <div ref={headingRef} style={{ opacity: 0 }} className="relative z-10 mx-auto max-w-[900px] text-center will-change-transform">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6.5vw,5.5rem)] font-light leading-[1.05] tracking-tight text-forest">
          {chapter.heading}
        </h2>
      </div>

      {/* Small centered text — hidden until scroll */}
      <div ref={textRef} style={{ opacity: 0 }} className="relative z-10 mx-auto mt-16 max-w-[440px] text-center will-change-transform">
        <span className="font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.2em] text-forest/40">
          {chapter.label}
        </span>
        <p className="mt-5 font-[family-name:var(--font-dm-sans)] text-[13px] leading-[1.8] text-forest/60">
          {chapter.body}
        </p>
      </div>
    </div>
  )
}

export default function OurStory() {
  const labelRef = useRef<HTMLDivElement>(null)
  const triptychRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label fade in
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: labelRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Triptych images stagger in
      if (triptychRef.current) {
        const images = triptychRef.current.querySelectorAll('.triptych-img')
        gsap.fromTo(
          images,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: triptychRef.current,
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
    <section id="our-story" className="light-section relative bg-cream">
      {/* Topographic circle pattern */}
      <div className="topo-pattern" />

      {/* Section label */}
      <div ref={labelRef} style={{ opacity: 0 }} className="px-6 pt-32 text-center lg:px-16 lg:pt-40">
        <span className="font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
          Our Story
        </span>
      </div>

      {/* Story chapters */}
      {CHAPTERS.map((chapter, i) => (
        <ChapterSection key={i} chapter={chapter} />
      ))}

      {/* Three-image triptych strip */}
      <div ref={triptychRef} className="px-6 pb-32 lg:px-16 lg:pb-40">
        <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-3 lg:gap-5">
          {[
            {
              src: '/images/hero-naan.jpg',
              caption: 'Tradition in every flame.',
            },
            {
              src: '/images/momos-tikka.jpg',
              caption: 'Spices that speak for themselves.',
            },
            {
              src: '/images/spring-rolls.jpg',
              caption: 'Where East meets East.',
            },
          ].map((img) => (
            <div key={img.caption} className="triptych-img group relative aspect-[3/4] overflow-hidden" style={{ opacity: 0 }}>
              <img
                src={img.src}
                alt={img.caption}
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 font-[family-name:var(--font-cormorant)] text-lg italic text-cream/90">
                {img.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
