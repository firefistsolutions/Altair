'use client'

import { useEffect } from 'react'
import { useScrollReveal } from '@/lib/hooks/useIntersectionObserver'
import { AltairCard } from '@/components/ui/altair-card'
import { AltairBadge } from '@/components/ui/altair-badge'
import { LucideIcon } from 'lucide-react'

interface JourneyMilestoneProps {
  year: string
  title: string
  event: string
  icon: LucideIcon
  highlight?: boolean
  isEven: boolean
  index: number
  onVisible: (index: number) => void
}

export function JourneyMilestone({
  year,
  title,
  event,
  icon: Icon,
  highlight = false,
  isEven,
  index,
  onVisible,
}: JourneyMilestoneProps) {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '-100px',
    once: true,
  })

  useEffect(() => {
    if (isInView) {
      onVisible(index)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, index])

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline Node */}
      <div
        className={`relative z-10 flex-shrink-0 ${
          isEven ? 'md:mr-auto md:order-1' : 'md:ml-auto md:order-3'
        }`}
      >
        <div
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-700 ${
            isInView
              ? 'bg-brand-bronze scale-100 shadow-lg shadow-brand-bronze/30'
              : 'bg-brand-bronze/30 scale-75'
          } ${highlight ? 'ring-4 ring-brand-bronze/20' : ''}`}
        >
          <Icon
            className={`w-8 h-8 md:w-10 md:h-10 text-white transition-all duration-500 ${
              isInView ? 'opacity-100 rotate-0' : 'opacity-50 rotate-180'
            }`}
            aria-hidden="true"
          />
        </div>
        {/* Pulse animation for highlight milestones */}
        {highlight && isInView && (
          <div className="absolute inset-0 rounded-full bg-brand-bronze animate-ping opacity-20" />
        )}
      </div>

      {/* Content Card */}
      <div
        className={`flex-1 md:max-w-[45%] ${
          isEven ? 'md:order-2 md:text-right' : 'md:order-2 md:text-left'
        }`}
      >
        <AltairCard
          className={`p-6 md:p-8 transition-all duration-700 ${
            isInView
              ? 'opacity-100 translate-y-0 shadow-lg'
              : 'opacity-0 translate-y-8'
          } ${
            highlight
              ? 'border-2 border-brand-bronze/30 bg-gradient-to-br from-white to-brand-bronze/5'
              : ''
          }`}
        >
          <div
            className={`flex items-center gap-3 mb-3 ${
              isEven ? 'md:justify-end' : 'md:justify-start'
            }`}
          >
            <span
              className={`text-3xl md:text-4xl font-bold text-brand-bronze transition-all duration-500 ${
                isInView ? 'scale-100' : 'scale-75'
              }`}
            >
              {year}
            </span>
            {highlight && (
              <AltairBadge variant="bronze" size="sm" className="animate-pulse">
                Key Milestone
              </AltairBadge>
            )}
          </div>
          <h3
            className={`text-xl md:text-2xl font-semibold text-brand-navy mb-3 transition-all duration-500 delay-100 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-slate-gray leading-relaxed transition-all duration-500 delay-200 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
          >
            {event}
          </p>
        </AltairCard>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block md:w-[45%] md:order-3" />
    </div>
  )
}

