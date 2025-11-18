'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { SectionContainer } from '@/components/ui/section-container'
import { ProductCard } from '@/components/ui/product-card'
import { AltairButton } from '@/components/ui/altair-button'

// Mock products data - will be replaced with CMS data in Phase 6
const products = [
  {
    id: 1,
    title: 'Modular Operation Theater',
    description: 'Precision-engineered modular OT with seamless panels, touchless systems, and premium lighting.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    specs: ['HTM-02-01', 'Seamless Panels', 'Touchless Systems'],
    slug: 'modular-operation-theater',
    category: 'Operation Theatres',
    featured: true,
  },
  {
    id: 2,
    title: 'Surgical Pendant',
    description: 'Advanced surgical pendant with medical gas outlets and electrical services.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    specs: ['CE Certified', 'Gas Outlets', 'Electrical'],
    slug: 'surgical-pendant',
    category: 'Critical Care',
  },
  {
    id: 3,
    title: 'Bed-Head Unit',
    description: 'Comprehensive bed-head unit for critical care with integrated medical gas and electrical services.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    specs: ['Oxygen Cleaning', 'Color-Coded', 'ISO 13485'],
    slug: 'bed-head-unit',
    category: 'Critical Care',
  },
  {
    id: 4,
    title: 'Medical Gas Manifold',
    description: 'Central medical gas manifold system with alarm panels and zone valve boxes.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80',
    specs: ['Central System', 'Alarm Panels', 'Zone Valves'],
    slug: 'medical-gas-manifold',
    category: 'Medical Gas Systems',
  },
]

export function ProductsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const updateScrollButtons = () => {
    if (!containerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    updateScrollButtons()
    container.addEventListener('scroll', updateScrollButtons)
    window.addEventListener('resize', updateScrollButtons)

    return () => {
      container.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return

    const scrollAmount = 400
    const currentScroll = containerRef.current.scrollLeft
    const newPosition =
      direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount

    containerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    })
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !containerRef.current) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      scroll('right')
    }
    if (isRightSwipe) {
      scroll('left')
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current
      if (!container) return

      // Only handle if carousel is in focus or user is on the page
      if (e.key === 'ArrowLeft' && canScrollLeft) {
        e.preventDefault()
        scroll('left')
      } else if (e.key === 'ArrowRight' && canScrollRight) {
        e.preventDefault()
        scroll('right')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canScrollLeft, canScrollRight])

  return (
    <section className="py-16 md:py-24 bg-clinical-white">
      <SectionContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Our Product Range
          </h2>
          <p className="text-lg text-slate-gray max-w-2xl mx-auto">
            Comprehensive solutions for modern healthcare infrastructure
          </p>
        </div>

        <div className="relative px-12 md:px-16">
          {/* Navigation Buttons */}
          <AltairButton
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll products left"
          >
            <ChevronLeft className="w-5 h-5" />
          </AltairButton>
          <AltairButton
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll products right"
          >
            <ChevronRight className="w-5 h-5" />
          </AltairButton>

          {/* Carousel Container */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 items-stretch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Product carousel"
            tabIndex={0}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-full sm:w-80">
                <ProductCard {...product} category={product.category} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Products Link */}
        <div className="text-center mt-8">
          <AltairButton variant="outline" size="lg" asChild>
            <Link href="/products">View All Products</Link>
          </AltairButton>
        </div>
      </SectionContainer>
    </section>
  )
}

