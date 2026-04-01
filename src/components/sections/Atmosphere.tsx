'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  {
    src: '/images/exterior.jpg',
    alt: 'Kahaani restaurant',
    className: 'absolute left-[2%] top-[5%] h-[200px] w-[150px] lg:h-[280px] lg:w-[210px]',
    startRotation: -20,
    endRotation: -3,
    speed: -30,
  },
  {
    src: '/images/momos-tikka.jpg',
    alt: 'Momos and tikka',
    className: 'absolute right-[3%] top-[2%] h-[180px] w-[140px] lg:h-[240px] lg:w-[180px]',
    startRotation: 18,
    endRotation: 4,
    speed: -50,
  },
  {
    src: '/images/hero-naan.jpg',
    alt: 'Naan and curry',
    className: 'absolute left-[8%] bottom-[10%] h-[160px] w-[130px] lg:h-[220px] lg:w-[170px]',
    startRotation: 15,
    endRotation: 2,
    speed: -20,
  },
  {
    src: '/images/dessert.jpg',
    alt: 'Kahaani dessert',
    className: 'absolute right-[5%] bottom-[8%] h-[190px] w-[150px] lg:h-[260px] lg:w-[200px]',
    startRotation: -16,
    endRotation: -2,
    speed: -40,
  },
]

export default function Atmosphere() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Heading: split into words and reveal each one
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        gsap.fromTo(
          words,
          { opacity: 0, y: 40, rotateX: 45 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Body text fade
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Images: rotate in from exaggerated angle, scale up, then parallax
      imageRefs.current.forEach((img, i) => {
        if (!img) return
        gsap.fromTo(
          img,
          {
            opacity: 0,
            scale: 0.6,
            rotation: IMAGES[i].startRotation,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: IMAGES[i].endRotation,
            y: 0,
            duration: 1.4,
            delay: i * 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        )
        // Parallax at different speeds
        gsap.to(img, {
          y: IMAGES[i].speed,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // Mobile images stagger in
      const mobileImgs = section.querySelectorAll('.mobile-gallery-img')
      gsap.fromTo(
        mobileImgs,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mobileImgs[0]?.parentElement,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="light-section relative min-h-dvh overflow-hidden bg-cream py-40 lg:py-52"
    >
      {/* Topographic circle pattern */}
      <div className="topo-pattern" />

      {/* Floating images — hidden by default, rotate/scale in on scroll */}
      {IMAGES.map((img, i) => (
        <div
          key={img.alt}
          ref={(el) => { imageRefs.current[i] = el }}
          style={{ opacity: 0 }}
          className={`${img.className} z-0 hidden overflow-hidden shadow-2xl lg:block will-change-transform`}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* MASSIVE heading — word-by-word reveal */}
      <div ref={headingRef} className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6" style={{ perspective: '600px' }}>
        <h2 className="text-center font-[family-name:var(--font-cormorant)] text-[clamp(3.5rem,12vw,10rem)] font-light leading-[0.95] tracking-tight text-forest">
          <span className="word inline-block" style={{ opacity: 0 }}>In</span>{' '}
          <span className="word inline-block" style={{ opacity: 0 }}>Good</span>
          <br />
          <em className="word inline-block italic text-gold" style={{ opacity: 0 }}>Company</em>
        </h2>
        <p
          ref={bodyRef}
          style={{ opacity: 0 }}
          className="mx-auto mt-10 max-w-[380px] text-center font-[family-name:var(--font-dm-sans)] text-[13px] leading-[1.8] text-forest/50 will-change-transform"
        >
          A <em className="font-[family-name:var(--font-cormorant)] text-[15px] italic text-forest/70">place</em> where
          friends gather, families celebrate, and every table becomes part of the{' '}
          <em className="font-[family-name:var(--font-cormorant)] text-[15px] italic text-forest/70">story</em>.
        </p>
      </div>

      {/* Mobile image grid */}
      <div className="mt-16 grid grid-cols-2 gap-3 px-6 lg:hidden">
        {IMAGES.map((img) => (
          <div key={img.alt} className="mobile-gallery-img aspect-[3/4] overflow-hidden" style={{ opacity: 0 }}>
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}
