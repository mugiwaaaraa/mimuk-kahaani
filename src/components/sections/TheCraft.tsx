'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mobileReveal, isTouchDevice } from '@/lib/mobileReveal'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    label: 'THE TANDOOR',
    heading: 'The Tandoor',
    text: 'Our clay oven burns at over 900\u00B0F \u2014 sealing in juices and creating that signature char that no conventional oven can replicate. Every tikka, every naan, every seekh kebab passes through this ancient fire.',
    image: '/images/hero-naan.jpg',
  },
  {
    label: 'THE SPICES',
    heading: 'The Spice Masala',
    text: 'We grind our own masalas in-house. No pre-packaged blends. Cumin, coriander, black cardamom, Kashmiri chili \u2014 each spice is toasted and ground fresh, because the difference between good and extraordinary lives in the details.',
    image: '/images/momos-tikka.jpg',
  },
  {
    label: 'THE WOK',
    heading: 'The Hakka Wok',
    text: 'Hakka cuisine is the art of the wok \u2014 high heat, fast hands, bold sauces. Our Hakka dishes honor the Chinese-Indian fusion tradition born from Kolkata\u2019s Chinatown, where two ancient food cultures became one.',
    image: '/images/spring-rolls.jpg',
  },
  {
    label: 'THE PLATE',
    heading: 'The Plate',
    text: 'Every dish is composed, not just cooked. Beet-radish tartare alongside black garlic tikka. Lemon masala gel with mint chutney. We plate with intention because the story begins before the first bite.',
    image: '/images/dessert.jpg',
  },
]

export default function TheCraft() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isTouch = isTouchDevice()

    // Mobile: use IntersectionObserver, no ScrollTrigger at all
    if (isTouch) {
      const contents = Array.from(section.querySelectorAll('.craft-content'))
      return mobileReveal([headingRef.current, ...contents], { stagger: 0.08 })
    }

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      const panels = section.querySelectorAll<HTMLElement>('.craft-panel')
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        })
      })

      panels.forEach((panel) => {
        const content = panel.querySelector('.craft-content')
        if (!content) return
        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 70%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="the-craft" ref={sectionRef} className="relative bg-charcoal">
      {/* Section heading */}
      <div className="relative z-10 px-6 pt-40 lg:px-16">
        <h2
          ref={headingRef}
          style={{ opacity: 0 }}
          className="mx-auto max-w-[1000px] text-center font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-tight text-gold will-change-transform"
        >
          The craft behind every{' '}
          <em className="italic">plate</em>.
        </h2>
      </div>

      {/* Desktop: Sticky image + scrolling text overlay */}
      <div className="relative mt-20 hidden lg:block">
        {/* Sticky background — crossfading images */}
        <div className="sticky top-0 z-0 h-dvh w-full overflow-hidden">
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className="absolute inset-0 transition-opacity duration-[1.2s] ease-out will-change-[opacity]"
              style={{ opacity: activeStep === i ? 1 : 0 }}
            >
              <img
                src={step.image}
                alt={step.heading}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-charcoal/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-charcoal/30" />
            </div>
          ))}
        </div>

        {/* Scrolling text panels over sticky image */}
        <div className="relative z-10 -mt-[100vh]">
          {STEPS.map((step, i) => (
            <div
              key={step.label}
              className="craft-panel flex h-dvh items-center px-16"
            >
              <div className="craft-content max-w-[400px]" style={{ opacity: 0 }}>
                <span className="font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.2em] text-cream/40">
                  {step.label}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] text-cream">
                  {step.heading}
                </h3>
                <p className="mt-5 font-[family-name:var(--font-dm-sans)] text-[13px] leading-[1.8] text-cream/50">
                  {step.text}
                </p>
                <div className="mt-8 flex items-center gap-2">
                  <span className="font-[family-name:var(--font-dm-sans)] text-[10px] tracking-[0.15em] text-gold/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 max-w-[60px] bg-gold/20" />
                  <span className="font-[family-name:var(--font-dm-sans)] text-[10px] tracking-[0.15em] text-cream/20">
                    {String(STEPS.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Simple stacked cards */}
      <div className="mt-12 space-y-0 px-4 pb-20 lg:hidden">
        {STEPS.map((step, i) => (
          <div key={step.label} className="craft-panel">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={step.image}
                alt={step.heading}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
            </div>
            <div className="craft-content px-2 pb-10 pt-6" style={{ opacity: 0 }}>
              <span className="font-[family-name:var(--font-dm-sans)] text-[10px] font-medium uppercase tracking-[0.2em] text-cream/40">
                {step.label}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-2xl font-light leading-[1.1] text-cream">
                {step.heading}
              </h3>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-[13px] leading-[1.8] text-cream/50">
                {step.text}
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="font-[family-name:var(--font-dm-sans)] text-[10px] tracking-[0.15em] text-gold/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 max-w-[60px] bg-gold/20" />
                <span className="font-[family-name:var(--font-dm-sans)] text-[10px] tracking-[0.15em] text-cream/20">
                  {String(STEPS.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
