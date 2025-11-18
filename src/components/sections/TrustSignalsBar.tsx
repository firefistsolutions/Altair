'use client'

import Image from 'next/image'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairBadge } from '@/components/ui/altair-badge'

export function TrustSignalsBar() {
  const complianceBadges = [
    'HTM-02-01 Compliant',
    'ASTM Certified',
    'ISO 13485',
    'CE Marked',
  ]

  // Placeholder client logos - in production, these would be actual client logos
  // Using placeholder images from Unsplash for healthcare/medical theme
  const clientLogos = [
    { name: 'Healthcare Partner 1', image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=100&fit=crop&q=80' },
    { name: 'Healthcare Partner 2', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=100&fit=crop&q=80' },
    { name: 'Healthcare Partner 3', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200&h=100&fit=crop&q=80' },
    { name: 'Healthcare Partner 4', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=100&fit=crop&q=80' },
    { name: 'Healthcare Partner 5', image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=100&fit=crop&q=80' },
  ]

  return (
    <section className="py-8 bg-light-gray border-y border-border-gray" aria-label="Trust signals">
      <SectionContainer size="xl" padding="none" className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Client Logos */}
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto scrollbar-hide w-full md:w-auto">
          <p className="text-sm text-slate-gray font-medium whitespace-nowrap">Trusted by:</p>
          <div className="flex items-center gap-4 md:gap-6">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center w-20 h-12 md:w-24 md:h-16 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
                title={client.name}
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-contain p-2 grayscale hover:grayscale-0 transition-all"
                  sizes="(max-width: 768px) 80px, 96px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {complianceBadges.map((badge, index) => (
            <AltairBadge
              key={index}
              variant="outline"
              className="border-brand-navy text-brand-navy"
            >
              {badge}
            </AltairBadge>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}

