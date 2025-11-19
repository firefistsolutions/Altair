'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ZoomIn, X, ChevronLeft, ChevronRight, CheckCircle2, Building2, Calendar, MapPin, Quote } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairButton } from '@/components/ui/altair-button'
import { AltairBadge } from '@/components/ui/altair-badge'
import { AltairCard } from '@/components/ui/altair-card'
import { ProjectCard } from '@/components/ui/project-card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

interface ProjectDetailPageProps {
  project: {
    slug: string
    title: string
    client: string
    image: string
    images: string[]
    metrics: { label: string; value: string }[]
    hospitalType: string
    year: string
    location: string
    challenge?: string
    solution?: string
    products?: string[]
    testimonial?: {
      quote: string
      author: string
      designation: string
      organization: string
    }
    outcomes?: string[]
  }
}

// Mock related projects - will be replaced with CMS data in Phase 6
const relatedProjects = [
  {
    id: 2,
    title: 'MAX Super Speciality Hospital, Patparganj',
    client: 'Tandem Healthcare Group',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    metrics: [
      { label: 'Operation Theaters', value: '8' },
      { label: 'Completion', value: '2024' },
    ],
    slug: 'max-patparganj',
  },
  {
    id: 3,
    title: 'Vilasrao Deshmukh Govt. Medical College, Latur',
    client: 'Government Medical College',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    metrics: [
      { label: 'Operation Theaters', value: '6' },
      { label: 'Installation Time', value: '7 days' },
    ],
    slug: 'vdgmch-latur',
  },
]

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelectedImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSelectedImageIndex((prev) => (prev + 1) % project.images.length)
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, project.images.length])

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Breadcrumbs */}
      <SectionContainer className="pt-6">
        <Breadcrumbs
          items={[
            { label: 'Projects', href: '/projects' },
            { label: project.title },
          ]}
          className="mb-4"
        />
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </SectionContainer>

      {/* Hero Section with Image and Title Overlay */}
      <section className="relative h-[60vh] min-h-[400px] md:h-[70vh] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <SectionContainer className="relative h-full flex items-end pb-12 md:pb-16">
          <div className="max-w-4xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <AltairBadge variant="bronze" className="bg-brand-bronze/90 text-white">
                {project.hospitalType}
              </AltairBadge>
              <AltairBadge variant="outline" className="bg-white/20 border-white/40 text-white">
                {project.year}
              </AltairBadge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Completed {project.year}</span>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Metrics Bar */}
      <section className="py-8 md:py-12 bg-brand-navy text-white">
        <SectionContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {project.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-brand-bronze mb-2">{metric.value}</p>
                <p className="text-sm md:text-base text-white/80">{metric.label}</p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Challenge Section */}
      {project.challenge && (
        <section className="py-12 md:py-16 bg-clinical-white">
          <SectionContainer>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-brand-navy mb-6">The Challenge</h2>
              <p className="text-lg text-slate-gray leading-relaxed">{project.challenge}</p>
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Solution Section */}
      {project.solution && (
        <section className="py-12 md:py-16 bg-light-gray">
          <SectionContainer>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Our Solution</h2>
              <p className="text-lg text-slate-gray leading-relaxed">{project.solution}</p>
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Products Used Section */}
      {project.products && project.products.length > 0 && (
        <section className="py-12 md:py-16 bg-clinical-white">
          <SectionContainer>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-brand-navy mb-8">Products & Solutions Used</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.products.map((product, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <p className="text-slate-gray">{product}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Testimonial Block */}
      {project.testimonial && (
        <section className="py-12 md:py-16 bg-soft-aqua/10">
          <SectionContainer>
            <div className="max-w-4xl mx-auto">
              <AltairCard className="relative p-8 md:p-12">
                <Quote className="absolute top-4 left-4 text-soft-aqua opacity-40 w-12 h-12" aria-hidden="true" />
                <blockquote className="text-lg md:text-xl italic mb-6 text-brand-navy relative z-10 leading-relaxed">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-brand-navy">{project.testimonial.author}</p>
                  <p className="text-sm text-slate-gray">{project.testimonial.designation}</p>
                  <p className="text-sm text-slate-gray">{project.testimonial.organization}</p>
                </div>
              </AltairCard>
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Image Gallery */}
      {project.images && project.images.length > 1 && (
        <section className="py-12 md:py-16 bg-clinical-white">
          <SectionContainer>
            <div className="max-w-6xl">
              <h2 className="text-3xl font-bold text-brand-navy mb-8">Project Gallery</h2>
              
              {/* Main Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-light-gray group cursor-pointer mb-4">
                <Image
                  src={project.images[selectedImageIndex] || project.image}
                  alt={`${project.title} - Image ${selectedImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
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
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelectedImageIndex(index)
                      }
                    }}
                    className={`relative w-16 h-16 md:w-24 md:h-24 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                      selectedImageIndex === index
                        ? 'border-brand-bronze ring-2 ring-brand-bronze/20'
                        : 'border-transparent hover:border-border-gray'
                    }`}
                    aria-label={`View image ${index + 1} of ${project.images.length}`}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Outcomes Section */}
      {project.outcomes && project.outcomes.length > 0 && (
        <section className="py-12 md:py-16 bg-light-gray">
          <SectionContainer>
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-brand-navy mb-8">Project Outcomes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-brand-bronze flex-shrink-0 mt-0.5" />
                    <p className="text-slate-gray">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Related Projects */}
      <section className="py-12 md:py-16 bg-clinical-white">
        <SectionContainer>
          <div className="max-w-7xl">
            <h2 className="text-3xl font-bold text-brand-navy mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.slice(0, 3).map((relatedProject, index) => (
                <ProjectCard key={relatedProject.id} {...relatedProject} priority={index === 0} />
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* CTA Strip */}
      <section className="py-12 md:py-16 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg text-white/80 mb-6">
              Contact our team for a consultation and site survey
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

      {/* Lightbox Modal */}
      {isLightboxOpen && project.images && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-brand-bronze transition-colors z-10 p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-bronze"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          {project.images.length > 1 && (
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
          {project.images.length > 1 && (
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
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm z-10">
              {selectedImageIndex + 1} / {project.images.length}
            </div>
          )}

          <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={project.images[selectedImageIndex] || project.image}
              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
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

