import gsap from 'gsap'

/**
 * On mobile, replaces ScrollTrigger with a single IntersectionObserver per component.
 * Fires a simple GSAP tween when elements enter the viewport, then disconnects.
 * Returns a cleanup function.
 */
export function mobileReveal(
  elements: (Element | null)[],
  options?: { stagger?: number; y?: number; duration?: number }
): () => void {
  const filtered = elements.filter(Boolean) as Element[]
  if (filtered.length === 0) return () => {}

  const stagger = options?.stagger ?? 0
  const y = options?.y ?? 0
  const duration = options?.duration ?? 0.8

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          const index = filtered.indexOf(el)
          gsap.to(el, {
            opacity: 1,
            y,
            duration,
            delay: stagger * Math.max(0, index),
            ease: 'power3.out',
          })
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.1 }
  )

  filtered.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}

export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
