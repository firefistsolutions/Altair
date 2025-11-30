'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Filter, X, Download, FileText, File, Image as ImageIcon, FileCheck } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairCard } from '@/components/ui/altair-card'
import { AltairButton } from '@/components/ui/altair-button'
import { AltairBadge } from '@/components/ui/altair-badge'
import { Input } from '@/components/ui/input'

// Mock resources data - will be replaced with CMS data in Phase 6
const allResources = [
  {
    id: 1,
    title: 'Modular OT Installation Guide',
    description: 'Comprehensive installation guide for modular operation theatres including safety protocols and best practices.',
    category: 'Installation Guides',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    downloadUrl: '/resources/modular-ot-installation-guide.pdf',
    featured: true,
  },
  {
    id: 2,
    title: 'HTM-02-01 Compliance Certificate',
    description: 'Official HTM-02-01 compliance certificate for our modular operation theatre systems.',
    category: 'Certificates',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    downloadUrl: '/resources/htm-compliance-certificate.pdf',
    featured: false,
  },
  {
    id: 3,
    title: 'Medical Gas Pipeline Technical Specifications',
    description: 'Detailed technical specifications for medical gas pipeline systems including DIN/BS/ISO standards.',
    category: 'Technical Specs',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    downloadUrl: '/resources/medical-gas-specifications.pdf',
    featured: false,
  },
  {
    id: 4,
    title: 'ASTM Certification Document',
    description: 'ASTM certification documentation for all medical gas system components.',
    category: 'Certificates',
    fileType: 'PDF',
    fileSize: '0.9 MB',
    downloadUrl: '/resources/astm-certification.pdf',
    featured: false,
  },
  {
    id: 5,
    title: 'Oxygen Cleaning Process Guide',
    description: 'Step-by-step guide for oxygen cleaning processes in medical gas pipelines.',
    category: 'Installation Guides',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadUrl: '/resources/oxygen-cleaning-guide.pdf',
    featured: false,
  },
  {
    id: 6,
    title: 'Product Catalog 2024',
    description: 'Complete product catalog featuring all modular OT and medical gas system solutions.',
    category: 'Catalogs',
    fileType: 'PDF',
    fileSize: '15.2 MB',
    downloadUrl: '/resources/product-catalog-2024.pdf',
    featured: true,
  },
  {
    id: 7,
    title: 'AMC/CMC Service Agreement Template',
    description: 'Template for Annual Maintenance Contracts and Comprehensive Maintenance Contracts.',
    category: 'Service Documents',
    fileType: 'PDF',
    fileSize: '0.5 MB',
    downloadUrl: '/resources/amc-template.pdf',
    featured: false,
  },
  {
    id: 8,
    title: 'HAZOP Audit Checklist',
    description: 'Hazard and Operability study checklist for medical gas systems.',
    category: 'Service Documents',
    fileType: 'PDF',
    fileSize: '1.1 MB',
    downloadUrl: '/resources/hazop-checklist.pdf',
    featured: false,
  },
  {
    id: 9,
    title: 'Color-Coding Standards Reference',
    description: 'International color-coding standards reference for medical gas pipelines.',
    category: 'Technical Specs',
    fileType: 'PDF',
    fileSize: '0.7 MB',
    downloadUrl: '/resources/color-coding-standards.pdf',
    featured: false,
  },
]

const categories = ['All', 'Installation Guides', 'Certificates', 'Technical Specs', 'Catalogs', 'Service Documents']

const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return FileText
    case 'doc':
    case 'docx':
      return File
    case 'jpg':
    case 'jpeg':
    case 'png':
      return ImageIcon
    default:
      return FileCheck
  }
}

export function ResourcesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [showFilters, setShowFilters] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (selectedCategory !== 'All') params.set('category', selectedCategory)

    const newUrl = params.toString() ? `?${params.toString()}` : '/resources'
    router.replace(newUrl, { scroll: false })
  }, [debouncedSearch, selectedCategory, router])

  const filteredResources = useMemo(() => {
    let filtered = [...allResources]

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          resource.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          resource.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((resource) => resource.category === selectedCategory)
    }

    // Sort: featured first, then alphabetically
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.title.localeCompare(b.title)
    })

    return filtered
  }, [debouncedSearch, selectedCategory])

  const activeFiltersCount = (debouncedSearch ? 1 : 0) + (selectedCategory !== 'All' ? 1 : 0)

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Download technical documents, compliance certificates, installation guides, and other resources
              for our modular operation theatre and medical gas system solutions.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Filters and Search Bar */}
      <section className="border-b border-border-gray bg-white sticky top-[73px] md:top-24 z-30">
        <SectionContainer>
          <div className="py-4">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center gap-4 mb-4 md:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-border-gray rounded-md hover:bg-light-gray transition-colors"
                aria-label="Toggle filters"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <AltairBadge variant="bronze" size="sm">
                    {activeFiltersCount}
                  </AltairBadge>
                )}
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            {/* Filters (Desktop) */}
            <div className="hidden md:flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-slate-gray whitespace-nowrap">Category:</span>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                        selectedCategory === category
                          ? 'bg-brand-bronze text-white'
                          : 'bg-light-gray text-brand-navy hover:bg-border-gray'
                      }`}
                      aria-pressed={selectedCategory === category}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <AltairButton variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </AltairButton>
              )}
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden space-y-4 pt-4 border-t border-border-gray">
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-brand-bronze text-white'
                            : 'bg-light-gray text-brand-navy'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <AltairButton variant="outline" size="sm" onClick={clearFilters} className="w-full">
                    <X className="w-4 h-4 mr-1" />
                    Clear Filters
                  </AltairButton>
                )}
              </div>
            )}
          </div>
        </SectionContainer>
      </section>

      {/* Resources Grid */}
      <section className="py-12 md:py-16 bg-clinical-white">
        <SectionContainer>
          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 text-slate-gray/40">
                <FileText className="w-16 h-16" aria-hidden="true" />
              </div>
              <p className="text-xl text-slate-gray mb-4">No resources found</p>
              <p className="text-slate-gray mb-2">Try adjusting your filters or search query</p>
              {activeFiltersCount > 0 && (
                <AltairButton variant="outline" onClick={clearFilters} className="mt-4">
                  Clear All Filters
                </AltairButton>
              )}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-base font-medium text-brand-navy">
                  Showing <span className="text-brand-bronze">{filteredResources.length}</span> resource
                  {filteredResources.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => {
                  const FileIcon = getFileIcon(resource.fileType)
                  return (
                    <AltairCard key={resource.id} className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-brand-bronze/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileIcon className="w-6 h-6 text-brand-bronze" aria-hidden="true" />
                          </div>
                          <div className="flex gap-2">
                            {resource.featured && <AltairBadge variant="bronze" size="sm">Featured</AltairBadge>}
                            <AltairBadge variant="outline" size="sm">
                              {resource.fileType}
                            </AltairBadge>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-2 text-brand-navy">{resource.title}</h3>
                        <p className="text-sm text-slate-gray mb-4 leading-relaxed">{resource.description}</p>

                        <div className="flex items-center gap-4 text-xs text-slate-gray mb-4">
                          <span className="flex items-center gap-1">
                            <FileCheck className="w-3 h-3" />
                            {resource.fileSize}
                          </span>
                          <AltairBadge variant="outline" size="sm">
                            {resource.category}
                          </AltairBadge>
                        </div>
                      </div>

                      <AltairButton variant="bronze" size="sm" className="w-full" asChild>
                        <a href={resource.downloadUrl} download>
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      </AltairButton>
                    </AltairCard>
                  )
                })}
              </div>
            </>
          )}
        </SectionContainer>
      </section>
    </div>
  )
}

