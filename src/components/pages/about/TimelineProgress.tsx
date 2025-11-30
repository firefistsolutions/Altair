'use client'

import { useEffect, useRef, useState } from 'react'

interface TimelineProgressProps {
  totalItems: number
  activeIndex: number
}

export function TimelineProgress({ totalItems, activeIndex }: TimelineProgressProps) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const percentage = ((activeIndex + 1) / totalItems) * 100
      setProgress(percentage)
    }
  }, [activeIndex, totalItems])

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute top-0 left-0 w-full bg-brand-bronze transition-all duration-1000 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  )
}

