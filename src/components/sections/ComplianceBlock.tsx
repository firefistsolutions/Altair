'use client'

import { CheckCircle2 } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import Link from 'next/link'
import { AltairButton } from '@/components/ui/altair-button'

const complianceItems = [
  { name: 'HTM-02-01', description: 'Healthcare Technical Memorandum compliance' },
  { name: 'ASTM', description: 'American Society for Testing and Materials standards' },
  { name: 'Oxygen Cleaning', description: 'Rigorous oxygen cleaning processes' },
  { name: 'Color-Coded Piping', description: 'International color-coding standards' },
]

export function ComplianceBlock() {
  return (
    <section className="py-16 md:py-24 bg-clinical-white">
      <SectionContainer>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Compliance Icons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {complianceItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 md:p-6 bg-light-gray rounded-lg hover:bg-light-gray/80 transition-colors"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-bronze/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-brand-bronze" aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-brand-navy mb-2 text-sm md:text-base">{item.name}</h4>
                <p className="text-xs text-slate-gray">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Compliance & Safety First
            </h2>
            <p className="text-lg text-slate-gray mb-6 leading-relaxed">
              All our installations meet international standards including HTM-02-01,
              ASTM, and ISO 13485. We ensure rigorous oxygen cleaning processes and
              proper color-coding of medical gas pipelines for maximum safety and
              compliance.
            </p>
            <AltairButton variant="outline" asChild>
              <Link href="/resources">
                View Compliance Documents
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </AltairButton>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

