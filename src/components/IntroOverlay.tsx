'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/* Petal path generator for mandala patterns */
function petalPath(
  angle: number,
  innerR: number,
  outerR: number,
  cx: number,
  cy: number,
  spread: number
) {
  const rad = (angle * Math.PI) / 180
  const rad1 = ((angle - spread) * Math.PI) / 180
  const rad2 = ((angle + spread) * Math.PI) / 180
  const ox = cx + outerR * Math.cos(rad)
  const oy = cy + outerR * Math.sin(rad)
  const c1x = cx + innerR * Math.cos(rad1)
  const c1y = cy + innerR * Math.sin(rad1)
  const c2x = cx + innerR * Math.cos(rad2)
  const c2y = cy + innerR * Math.sin(rad2)
  return `M${cx},${cy} Q${c1x},${c1y} ${ox},${oy} Q${c2x},${c2y} ${cx},${cy}`
}

const CX = 720
const CY = 450
const INNER_PETALS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
const OUTER_PETALS = [15, 75, 135, 195, 255, 315]

export default function IntroOverlay() {
  const [done, setDone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Remove CSS-only blocker now that React has hydrated
    document.getElementById('intro-blocker')?.remove()

    const overlay = overlayRef.current
    const logo = logoRef.current
    const svg = svgRef.current
    if (!overlay || !logo || !svg) return

    const paths = svg.querySelectorAll('.draw-path')

    // Set up stroke-dasharray for draw-on effect
    // All elements already start at opacity:0 via CSS
    paths.forEach((el) => {
      let length: number
      if (el.tagName === 'circle') {
        const r = parseFloat(el.getAttribute('r') || '0')
        length = 2 * Math.PI * r
      } else {
        length = (el as SVGPathElement).getTotalLength()
      }
      gsap.set(el, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
        // Dispatch event so Hero knows to start its entrance animation
        window.dispatchEvent(new CustomEvent('intro-complete'))
      },
    })

    // 0.3s delay — solid forest green screen, nothing visible
    tl.to({}, { duration: 0.3 })

    // SVG paths fade in AND draw simultaneously
    tl.to(paths, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.015,
    })
    tl.to(
      paths,
      {
        strokeDashoffset: 0,
        duration: 1.0,
        stagger: 0.03,
        ease: 'power2.inOut',
      },
      '<0.05'
    )

    // Logo: fade in + zoom over 1.2s
    tl.fromTo(
      logo,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
      '-=0.4'
    )

    // Hold for 0.5s
    tl.to({}, { duration: 0.5 })

    // Logo fades out first
    tl.to(logo, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    })

    // Then entire overlay fades out to reveal hero
    tl.to(overlay, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    }, '-=0.3')
  }, [])

  if (done) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: '#2C3E35' }}
    >
      {/* Animated SVG decorative patterns — all start at opacity:0 */}
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 1 }}
      >
        {/* ── Concentric mandala rings ── */}
        {[320, 280, 240, 200, 160, 120].map((r, i) => (
          <circle
            key={`ring-${r}`}
            className="draw-path"
            cx={CX}
            cy={CY}
            r={r}
            stroke="#B8935A"
            strokeWidth="0.5"
            strokeOpacity={0.4 - i * 0.04}
            fill="none"
            style={{ opacity: 0 }}
          />
        ))}

        {/* ── Inner petal / lotus pattern (12 petals) ── */}
        {INNER_PETALS.map((angle) => (
          <path
            key={`petal-${angle}`}
            className="draw-path"
            d={petalPath(angle, 90, 155, CX, CY, 12)}
            stroke="#B8935A"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            fill="none"
            style={{ opacity: 0 }}
          />
        ))}

        {/* ── Outer petal ring (6 petals, offset) ── */}
        {OUTER_PETALS.map((angle) => (
          <path
            key={`outer-${angle}`}
            className="draw-path"
            d={petalPath(angle, 190, 270, CX, CY, 7)}
            stroke="#B8935A"
            strokeWidth="0.5"
            strokeOpacity="0.2"
            fill="none"
            style={{ opacity: 0 }}
          />
        ))}

      </svg>

      {/* Kahaani logo — starts fully invisible */}
      <img
        ref={logoRef}
        src="/images/logo.png"
        alt="Kahaani"
        className="relative z-10 h-36 w-auto sm:h-44 lg:h-52"
        style={{ opacity: 0 }}
      />
    </div>
  )
}
