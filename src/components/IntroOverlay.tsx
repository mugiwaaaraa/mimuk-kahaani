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

        {/* ── Small diamond accents on the outer ring ── */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const cx = CX + 280 * Math.cos(rad)
          const cy = CY + 280 * Math.sin(rad)
          return (
            <path
              key={`diamond-${angle}`}
              className="draw-path"
              d={`M${cx},${cy - 6} L${cx + 4},${cy} L${cx},${cy + 6} L${cx - 4},${cy} Z`}
              stroke="#B8935A"
              strokeWidth="0.5"
              strokeOpacity="0.35"
              fill="none"
              style={{ opacity: 0 }}
            />
          )
        })}

        {/* ── Corner paisley / botanical elements ── */}
        <path className="draw-path" style={{ opacity: 0 }} d="M100,100 C150,40 220,60 195,140 C170,220 100,195 100,100Z" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.25" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M80,130 C55,70 140,35 175,110" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M120,80 C160,55 185,80 165,120" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />

        <path className="draw-path" style={{ opacity: 0 }} d="M1340,100 C1290,40 1220,60 1245,140 C1270,220 1340,195 1340,100Z" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.25" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M1360,130 C1385,70 1300,35 1265,110" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M1320,80 C1280,55 1255,80 1275,120" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />

        <path className="draw-path" style={{ opacity: 0 }} d="M100,800 C150,860 220,840 195,760 C170,680 100,705 100,800Z" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.25" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M80,770 C55,830 140,865 175,790" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />

        <path className="draw-path" style={{ opacity: 0 }} d="M1340,800 C1290,860 1220,840 1245,760 C1270,680 1340,705 1340,800Z" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.25" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M1360,770 C1385,830 1300,865 1265,790" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />

        {/* ── Vine flourishes connecting corners to center ── */}
        <path className="draw-path" style={{ opacity: 0 }} d="M200,200 C310,175 400,240 490,210 S610,320 700,340" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M1240,200 C1130,175 1040,240 950,210 S830,320 740,340" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M200,700 C310,725 400,660 490,690 S610,580 700,560" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M1240,700 C1130,725 1040,660 950,690 S830,580 740,560" stroke="#B8935A" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />

        {/* ── Diagonal leaf sprigs near corners ── */}
        <path className="draw-path" style={{ opacity: 0 }} d="M250,150 C270,130 290,140 280,160 C270,180 250,170 250,150Z" stroke="#B8935A" strokeWidth="0.4" strokeOpacity="0.18" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M1190,150 C1170,130 1150,140 1160,160 C1170,180 1190,170 1190,150Z" stroke="#B8935A" strokeWidth="0.4" strokeOpacity="0.18" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M250,750 C270,770 290,760 280,740 C270,720 250,730 250,750Z" stroke="#B8935A" strokeWidth="0.4" strokeOpacity="0.18" fill="none" />
        <path className="draw-path" style={{ opacity: 0 }} d="M1190,750 C1170,770 1150,760 1160,740 C1170,720 1190,730 1190,750Z" stroke="#B8935A" strokeWidth="0.4" strokeOpacity="0.18" fill="none" />
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
