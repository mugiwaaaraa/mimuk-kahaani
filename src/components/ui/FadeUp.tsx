'use client'

import { motion } from 'motion/react'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article'
}

export default function FadeUp({
  children,
  delay = 0,
  className,
  as = 'div',
}: FadeUpProps) {
  const Component = motion.create(as)

  return (
    <Component
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  )
}
