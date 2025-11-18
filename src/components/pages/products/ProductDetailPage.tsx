'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, CheckCircle2, ArrowLeft, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairButton } from '@/components/ui/altair-button'
import { AltairBadge } from '@/components/ui/altair-badge'
import { AltairCard } from '@/components/ui/altair-card'
import { ProductCard } from '@/components/ui/product-card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

interface ProductDetailPageProps {
  product: {
    slug: string
    title: string
    description: string
    image: string
    images: string[]
    specs: string[]
    category: string
    featured: boolean
    datasheetUrl?: string
    overview?: string
    features?: string[]
  }
}

// Mock related products - will be replaced with CMS data in Phase 6
const relatedProducts = [
  {
    id: 2,
    title: 'Surgical Pendant',
    description: 'Advanced surgical pendant with medical gas outlets and electrical services.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    specs: ['CE Certified', 'Gas Outlets', 'Electrical'],
    slug: 'surgical-pendant',
    category: 'Critical Care',
    featured: false,
  },
  {
    id: 3,
    title: 'Bed-Head Unit',
    description: 'Comprehensive bed-head unit for critical care with integrated medical gas and electrical services.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    specs: ['Oxygen Cleaning', 'Color-Coded', 'ISO 13485'],
    slug: 'bed-head-unit',
    category: 'Critical Care',
    featured: false,
  },
  {
    id: 4,
    title: 'Medical Gas Manifold',
    description: 'Central medical gas manifold system with alarm panels and zone valve boxes.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80',
    specs: ['Central System', 'Alarm Panels', 'Zone Valves'],
    slug: 'medical-gas-manifold',
    category: 'Medical Gas Systems',
    featured: false,
  },
]

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Keyboard navigation for thumbnails
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSelectedImageIndex((prev) => (prev + 1) % product.images.length)
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, product.images.length])

  const features = product.features || [
    'Rapid installation (5-7 days)',
    'Hygienic, seamless panels',
    'Fully configurable layouts',
    'Touchless sensor systems',
    'Premium lighting solutions',
    'HTM-02-01 compliant',
  ]

  const technicalSpecs = [
    { label: 'Compliance', value: 'HTM-02-01, ASTM' },
    { label: 'Panel Type', value: 'Seamless, Anti-bacterial' },
    { label: 'Installation Time', value: '5-7 days' },
    { label: 'Warranty', value: '2 years' },
    { label: 'Customization', value: 'Fully configurable' },
    { label: 'Lighting', value: 'LED, Dimmable' },
  ]

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Breadcrumbs */}
      <SectionContainer className="pt-6">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products' },
            { label: product.title },
          ]}
          className="mb-4"
        />
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </SectionContainer>

      {/* Hero Section with Image Gallery */}
      <section className="py-8 md:py-12">
        <SectionContainer>
          <div className="grid md:grid-cols-5 gap-8">
            {/* Image Gallery (Left 60%) */}
            <div className="md:col-span-3 space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-light-gray group cursor-pointer">
                <Image
                  src={product.images[selectedImageIndex] || product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="View full size image"
                >
                  <ZoomIn className="w-8 h-8 text-white" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedImageIndex(index)
                        }
                      }}
                      className={`relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                        selectedImageIndex === index
                          ? 'border-brand-bronze ring-2 ring-brand-bronze/20'
                          : 'border-transparent hover:border-border-gray'
                      }`}
                      aria-label={`View image ${index + 1} of ${product.images.length}`}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Specs Card (Right 40%) */}
            <div className="md:col-span-2">
              <div className="sticky top-[88px]">
                <AltairCard className="p-6">
                  {/* Category & Featured Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <AltairBadge variant="outline">{product.category}</AltairBadge>
                    {product.featured && <AltairBadge variant="bronze">Featured</AltairBadge>}
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                    {product.title}
                  </h1>

                  {/* Description */}
                  <p className="text-slate-gray mb-6">{product.description}</p>

                  {/* Quick Specs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.specs.map((spec, index) => (
                      <AltairBadge key={index} variant="outline" size="sm">
                        {spec}
                      </AltairBadge>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <AltairButton variant="bronze" size="lg" className="w-full" asChild>
                      <Link href="/request-quote">Request Quote</Link>
                    </AltairButton>
                    <AltairButton
                      variant="outline"
                      size="lg"
                      className="w-full"
                      asChild
                      disabled={!product.datasheetUrl}
                    >
                      {product.datasheetUrl ? (
                        <Link href={product.datasheetUrl} target="_blank">
                          <Download className="w-4 h-4 mr-2" />
                          Download Datasheet
                        </Link>
                      ) : (
                        <span className="opacity-50 cursor-not-allowed">
                          <Download className="w-4 h-4 mr-2" />
                          Datasheet Coming Soon
                        </span>
                      )}
                    </AltairButton>
                  </div>
                </AltairCard>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Overview Section */}
      <section className="py-12 md:py-16 bg-light-gray">
        <SectionContainer>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-brand-navy mb-6">Overview</h2>
            <div className="prose prose-lg max-w-none">
              {product.overview ? (
                <div
                  className="text-slate-gray leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.overview }}
                />
              ) : (
                <>
                  <p className="text-slate-gray leading-relaxed mb-4">
                    Our {product.title} represents the pinnacle of healthcare infrastructure
                    design. Engineered with precision and built to the highest international standards,
                    it combines cutting-edge technology with practical functionality.
                  </p>
                  <p className="text-slate-gray leading-relaxed">
                    {product.description} With rapid installation capabilities and comprehensive
                    support services, our solutions minimize disruption to hospital operations while
                    delivering exceptional quality and compliance.
                  </p>
                </>
              )}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Key Features */}
      <section className="py-12 md:py-16">
        <SectionContainer>
          <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-brand-bronze flex-shrink-0 mt-0.5" />
                <p className="text-slate-gray">{feature}</p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Technical Specifications */}
      <section className="py-12 md:py-16 bg-light-gray">
        <SectionContainer>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-brand-navy mb-8">Technical Specifications</h2>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <AltairCard className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-brand-navy text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Specification</th>
                        <th className="px-6 py-4 text-left font-semibold">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technicalSpecs.map((spec, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? 'bg-white' : 'bg-light-gray'}
                        >
                          <td className="px-6 py-4 font-medium text-brand-navy">{spec.label}</td>
                          <td className="px-6 py-4 text-slate-gray">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AltairCard>
            </div>
            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {technicalSpecs.map((spec, index) => (
                <AltairCard key={index} className="p-4">
                  <div className="font-medium text-brand-navy mb-1">{spec.label}</div>
                  <div className="text-slate-gray">{spec.value}</div>
                </AltairCard>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Installation & AMC Tabs */}
      <section className="py-12 md:py-16">
        <SectionContainer>
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-brand-navy mb-8">Installation & Maintenance</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AltairCard>
                <h3 className="text-xl font-semibold text-brand-navy mb-4">Installation</h3>
                <ul className="space-y-2 text-slate-gray">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <span>Rapid installation in 5-7 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <span>Minimal disruption to hospital operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <span>Expert installation team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <span>Quality assurance and testing</span>
                  </li>
                </ul>
              </AltairCard>
              <AltairCard>
                <h3 className="text-xl font-semibold text-brand-navy mb-4">AMC/CMC Services</h3>
                <ul className="space-y-2 text-slate-gray">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <span>Annual Maintenance Contracts (AMC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <span>Comprehensive Maintenance Contracts (CMC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <span>24/7 support and emergency services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <span>HAZOP audits and compliance checks</span>
                  </li>
                </ul>
              </AltairCard>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Related Products */}
      <section className="py-12 md:py-16">
        <SectionContainer>
          <div className="max-w-7xl">
            <h2 className="text-3xl font-bold text-brand-navy mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} {...relatedProduct} />
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* CTA Strip */}
      <section className="py-12 md:py-16 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-white/80 mb-6">
              Contact our team for a consultation and customized quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AltairButton variant="bronze" size="lg" asChild>
                <Link href="/request-quote">Request a Quote</Link>
              </AltairButton>
              <AltairButton
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white hover:text-brand-navy"
              >
                <Link href="/contact">Contact Us</Link>
              </AltairButton>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Lightbox Modal with Navigation */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-brand-bronze transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          {product.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-bronze transition-colors z-10 p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-bronze"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Next Button */}
          {product.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-brand-bronze transition-colors z-10 p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-bronze"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image Counter */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm z-10">
              {selectedImageIndex + 1} / {product.images.length}
            </div>
          )}

          <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={product.images[selectedImageIndex] || product.image}
              alt={`${product.title} - Image ${selectedImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}

