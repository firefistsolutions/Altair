'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { SectionContainer } from '@/components/ui/section-container'
import { CheckCircle2 } from 'lucide-react'

const valueProps = [
  {
    title: 'Expert Engineering & Installation in India',
    description:
      'Our experienced team delivers precision-engineered modular operation theatres with rapid installation timelines. We understand the unique requirements of Indian healthcare facilities and provide localized support.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    reverse: false,
  },
  {
    title: 'Custom CE-Grade Components, Oxygen-Cleaned Pipelines',
    description:
      'All components meet European CE standards. Our medical gas pipelines undergo rigorous oxygen cleaning processes, ensuring patient safety and compliance with international standards.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    reverse: true,
  },
  {
    title: 'AMC/CMC & HAZOP Audits',
    description:
      'Comprehensive Annual Maintenance Contracts, Comprehensive Maintenance Contracts, and Hazard and Operability studies ensure your facility remains compliant, safe, and operational year-round.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80',
    reverse: false,
  },
]

export function WhyAltairSection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((element, index) => {
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]))
            observer.unobserve(element)
          }
        },
        {
          threshold: 0.1,
          rootMargin: '-100px',
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-dark-bg text-white">
      <SectionContainer>
        <div className="space-y-16">
          {valueProps.map((prop, index) => {
            const isInView = visibleItems.has(index)
            return (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  prop.reverse ? 'md:flex-row-reverse' : ''
                } ${isInView ? 'opacity-100 translate-x-0' : prop.reverse ? 'opacity-0 translate-x-10' : 'opacity-0 -translate-x-10'} transition-all duration-700`}
              >
                <div className={prop.reverse ? 'md:order-2' : ''}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={prop.reverse ? 'md:order-1' : ''}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-brand-bronze flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-2xl md:text-3xl font-bold">{prop.title}</h3>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </section>
  )
}

