'use client'

import { useState, useEffect } from 'react'
import { Quote } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairCard } from '@/components/ui/altair-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AltairButton } from '@/components/ui/altair-button'

// Mock testimonials data - will be replaced with CMS data in Phase 6
const testimonials = [
  {
    id: 1,
    quote:
      'Kudos to Workspace Metal Solutions Pvt Ltd for their exceptional work at Government Medical College & Hospital, Jalgaon. In just 5 days, they constructed 5 modular operation theaters, revolutionizing our facilities.',
    author: 'Dr. Girish Thakur',
    designation: 'Dean',
    organization: 'Government Medical College & Hospital, Jalgaon',
  },
  {
    id: 2,
    quote:
      'Their execution team is highly skilled, sincere towards safety norms & good coordinating skills. Their execution team is quite good technically sound about products.',
    author: 'Dr. Uday S. Mohite',
    designation: 'Dean',
    organization: 'Vilasrao Deshmukh Govt. Medical College & Hospital, Latur',
  },
  {
    id: 3,
    quote:
      'Workspace Metal Solutions Pvt Ltd at MAX Super Speciality Hospital, Patparganj, New Delhi. Their professionalism and attention to detail have resulted in the successful installation of modular operation theatre materials.',
    author: 'Tandem Healthcare Group',
    designation: 'Management',
    organization: 'MAX Super Speciality Hospital, Patparganj, New Delhi',
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-play with pause on hover
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 md:py-24 bg-soft-aqua/10">
      <SectionContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <AltairCard className="relative p-8 md:p-12">
            <Quote className="absolute top-4 left-4 text-soft-aqua opacity-40 w-12 h-12" aria-hidden="true" />
            
            <blockquote className="text-lg md:text-xl italic mb-6 text-brand-navy relative z-10 leading-relaxed">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </blockquote>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-brand-navy">{currentTestimonial.author}</p>
                <p className="text-sm text-slate-gray">{currentTestimonial.designation}</p>
                <p className="text-sm text-slate-gray">{currentTestimonial.organization}</p>
              </div>

              <div className="flex items-center gap-4" role="group" aria-label="Testimonial navigation">
                <AltairButton
                  variant="ghost"
                  size="icon"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </AltairButton>
                
                <div className="flex gap-2" role="tablist" aria-label="Testimonial indicators">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      role="tab"
                      aria-selected={index === currentIndex}
                      aria-label={`Go to testimonial ${index + 1}`}
                      className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2 ${
                        index === currentIndex
                          ? 'bg-brand-bronze w-8'
                          : 'bg-slate-gray/30 hover:bg-slate-gray/50'
                      }`}
                    />
                  ))}
                </div>

                <AltairButton
                  variant="ghost"
                  size="icon"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </AltairButton>
              </div>
            </div>
          </AltairCard>
        </div>
      </SectionContainer>
    </section>
  )
}

