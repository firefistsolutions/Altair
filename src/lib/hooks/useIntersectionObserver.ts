'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  once?: boolean
  enabled?: boolean
}

/**
 * Custom hook for Intersection Observer API
 * Used for scroll-reveal animations and lazy loading
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T | null>, boolean] {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    once = true,
    enabled = true,
  } = options

  const elementRef = useRef<T | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!enabled || !elementRef.current) return

    const element = elementRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting && once) {
          observer.unobserve(element)
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, once, enabled])

  return [elementRef, isIntersecting]
}

/**
 * Hook specifically for scroll-reveal animations
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const [ref, isInView] = useIntersectionObserver<T>({
    threshold: 0.1,
    rootMargin: '-100px',
    once: true,
    ...options,
  })

  return { ref, isInView }
}

