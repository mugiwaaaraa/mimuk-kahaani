'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    // Skip scrub-based progress on touch devices to avoid scroll jank
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) {
      // Use simple scroll event listener instead of scrub
      function onScroll() {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? scrollTop / docHeight : 0
        bar!.style.transform = `scaleX(${progress})`
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}
