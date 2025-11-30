'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AltairButton } from '@/components/ui/altair-button'
import { SectionContainer } from '@/components/ui/section-container'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Background Image from Unsplash - Medical/Healthcare theme */}
      <Image
        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=1080&fit=crop&q=80"
        alt=""
        fill
        className="object-cover"
        priority
        quality={90}
        sizes="100vw"
        role="presentation"
        aria-hidden="true"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/40" aria-hidden="true" />
      
      {/* Content */}
      <SectionContainer className="relative z-10 text-center text-white">
        <div className={`max-w-4xl mx-auto space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Modular Operation Theatres & Medical Gas Systems
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
            Designed to Perform. Built to Last.
          </p>
          <p className="text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            Turnkey design • Manufacturing • Installation • AMC / CMC • HTM & ASTM compliant
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <AltairButton
              variant="bronze"
              size="lg"
              asChild
            >
              <Link href="/request-survey">Request a Site Survey</Link>
            </AltairButton>
            <AltairButton
              variant="outline"
              size="lg"
              asChild
              className="border-white text-white hover:bg-white hover:text-brand-navy"
            >
              <Link href="/resources">Download Product Catalog</Link>
            </AltairButton>
          </div>
        </div>
      </SectionContainer>
      
      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-2"
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center items-start pt-2">
          <ChevronDown className="w-4 h-4 text-white/70" aria-hidden="true" />
        </div>
      </button>
    </section>
  )
}

