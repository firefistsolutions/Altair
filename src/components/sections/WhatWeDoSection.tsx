'use client'

import { Building2, FlaskConical, HeartPulse, CheckCircle2 } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairCard, AltairCardContent, AltairCardHeader, AltairCardTitle } from '@/components/ui/altair-card'
import { useScrollReveal } from '@/lib/hooks/useIntersectionObserver'

const features = [
  {
    icon: Building2,
    title: 'Modular Operation Theatres',
    bullets: [
      'Rapid installation (5-7 days)',
      'Hygienic, seamless panels',
      'Fully configurable layouts',
      'Touchless sensor systems',
      'Premium lighting solutions',
    ],
  },
  {
    icon: FlaskConical,
    title: 'Medical Gas Pipeline Systems',
    bullets: [
      'DIN/BS/ISO compliant outlets',
      'Oxygen-cleaned pipelines',
      'Color-coded piping system',
      'Central alarm panels',
      'Zone valve boxes',
    ],
  },
  {
    icon: HeartPulse,
    title: 'Critical Care Products',
    bullets: [
      'Surgical pendants',
      'Bed-head units',
      'Medical gas manifolds',
      'AMC/CMC services',
      'HAZOP audits',
    ],
  },
]

export function WhatWeDoSection() {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-16 md:py-24 bg-clinical-white">
      <SectionContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            What We Do
          </h2>
          <p className="text-lg text-slate-gray max-w-2xl mx-auto">
            Comprehensive solutions for modern healthcare infrastructure
          </p>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-8 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <AltairCard
                key={index}
                className="transition-all duration-700"
                style={{ 
                  transitionDelay: isInView ? `${index * 0.1}s` : '0s',
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <AltairCardHeader>
                  <div className="w-12 h-12 bg-brand-bronze/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-bronze" aria-hidden="true" />
                  </div>
                  <AltairCardTitle>{feature.title}</AltairCardTitle>
                </AltairCardHeader>
                <AltairCardContent>
                  <ul className="space-y-3">
                    {feature.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-2 text-slate-gray">
                        <CheckCircle2 className="w-5 h-5 text-brand-bronze mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </AltairCardContent>
              </AltairCard>
            )
          })}
        </div>
      </SectionContainer>
    </section>
  )
}

