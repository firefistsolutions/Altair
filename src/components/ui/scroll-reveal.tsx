'use client'

import { ReactNode } from 'react'
import { useScrollReveal } from '@/lib/hooks/useIntersectionObserver'
import { cn } from '@/utilities/ui'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
}

export function ScrollReveal({ children, className, direction = 'up', delay = 0 }: ScrollRevealProps) {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '-50px',
    once: true,
  })

  const directionClasses = {
    up: 'scroll-reveal-up',
    down: 'scroll-reveal-down',
    left: 'scroll-reveal-left',
    right: 'scroll-reveal-right',
    fade: '',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'scroll-reveal',
        directionClasses[direction],
        isInView && 'revealed',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

