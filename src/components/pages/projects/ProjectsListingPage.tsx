'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Filter, X, Loader2, ChevronLeft, ChevronRight, Calendar, Building2 } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { ProjectCard } from '@/components/ui/project-card'
import { AltairButton } from '@/components/ui/altair-button'
import { Input } from '@/components/ui/input'
import { AltairBadge } from '@/components/ui/altair-badge'
import type { Project } from '@/payload-types'
import { transformProject } from '@/lib/utils/transform-project'

interface ProjectsListingPageProps {
  initialProjects?: Project[]
  initialYears?: number[]
}

const mockProjects = [
  {
    id: 1,
    title: 'Government Medical College & Hospital, Jalgaon',
    client: 'Government Medical College',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    metrics: [
      { label: 'Operation Theaters', value: '5' },
      { label: 'Installation Time', value: '5 days' },
    ],
    slug: 'gmch-jalgaon',
    hospitalType: 'Government Hospital',
    year: '2024',
    location: 'Jalgaon, Maharashtra',
  },
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
    hospitalType: 'Private Hospital',
    year: '2024',
    location: 'New Delhi',
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
    hospitalType: 'Government Hospital',
    year: '2023',
    location: 'Latur, Maharashtra',
  },
  {
    id: 4,
    title: 'Apollo Hospitals, Chennai',
    client: 'Apollo Hospitals Group',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80',
    metrics: [
      { label: 'Operation Theaters', value: '12' },
      { label: 'Completion', value: '2023' },
    ],
    slug: 'apollo-chennai',
    hospitalType: 'Private Hospital',
    year: '2023',
    location: 'Chennai, Tamil Nadu',
  },
  {
    id: 5,
    title: 'AIIMS Delhi - Medical Gas Pipeline',
    client: 'All India Institute of Medical Sciences',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    metrics: [
      { label: 'Bed Capacity', value: '2000+' },
      { label: 'Completion', value: '2022' },
    ],
    slug: 'aiims-delhi',
    hospitalType: 'Government Hospital',
    year: '2022',
    location: 'New Delhi',
  },
  {
    id: 6,
    title: 'Fortis Memorial Research Institute, Gurgaon',
    client: 'Fortis Healthcare',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    metrics: [
      { label: 'Operation Theaters', value: '10' },
      { label: 'Completion', value: '2022' },
    ],
    slug: 'fortis-gurgaon',
    hospitalType: 'Private Hospital',
    year: '2022',
    location: 'Gurgaon, Haryana',
  },
]

const hospitalTypes = ['All', 'Government', 'Private', 'Medical College', 'Research Facility']
// Years will be populated from CMS data
const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'type', label: 'Hospital Type' },
]

export function ProjectsListingPage({ 
  initialProjects = [], 
  initialYears = [] 
}: ProjectsListingPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedHospitalType, setSelectedHospitalType] = useState(searchParams.get('type') || 'All')
  const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || 'All')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recent')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

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
    if (selectedHospitalType !== 'All') params.set('type', selectedHospitalType)
    if (selectedYear !== 'All') params.set('year', selectedYear)
    if (sortBy !== 'recent') params.set('sort', sortBy)

    const newUrl = params.toString() ? `?${params.toString()}` : '/projects'
    router.replace(newUrl, { scroll: false })
  }, [debouncedSearch, selectedHospitalType, selectedYear, sortBy, router])

  // Transform CMS projects to component format
  const transformedProjects = useMemo(() => {
    if (initialProjects.length > 0) {
      return initialProjects.map(transformProject)
    }
    // Fallback to mock data if no CMS data
    return mockProjects
  }, [initialProjects])

  // Build years list
  const availableYears = useMemo(() => {
    const years = ['All', ...initialYears.map(String)]
    return years.length > 1 ? years : ['All', '2024', '2023', '2022']
  }, [initialYears])

  const filteredProjects = useMemo(() => {
    let filtered = [...transformedProjects]

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          project.client.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          project.location.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // Hospital type filter
    if (selectedHospitalType !== 'All') {
      filtered = filtered.filter((project) => project.hospitalType === selectedHospitalType)
    }

    // Year filter
    if (selectedYear !== 'All') {
      filtered = filtered.filter((project) => project.year?.toString() === selectedYear)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'recent':
          const yearA = typeof a.year === 'string' ? parseInt(a.year) : (typeof a.year === 'number' ? a.year : 0)
          const yearB = typeof b.year === 'string' ? parseInt(b.year) : (typeof b.year === 'number' ? b.year : 0)
          return yearB - yearA || a.title.localeCompare(b.title)
        case 'type':
          return a.hospitalType.localeCompare(b.hospitalType)
        default:
          return 0
      }
    })

    return filtered
  }, [debouncedSearch, selectedHospitalType, selectedYear, sortBy, transformedProjects])

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, selectedHospitalType, selectedYear, sortBy])

  // Loading state for search debounce
  useEffect(() => {
    if (searchQuery !== debouncedSearch) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [searchQuery, debouncedSearch])

  const activeFiltersCount =
    (debouncedSearch ? 1 : 0) + (selectedHospitalType !== 'All' ? 1 : 0) + (selectedYear !== 'All' ? 1 : 0)

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedHospitalType('All')
    setSelectedYear('All')
    setSortBy('recent')
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-12 md:py-16">
        <SectionContainer>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Showcasing successful installations of modular operation theatres and medical gas systems
              across India. From government hospitals to private healthcare facilities.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Filters and Search Bar */}
      <section className="border-b border-border-gray bg-white relative">
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
                placeholder="Search projects by name, client, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            {/* Filters (Desktop) */}
            <div className="hidden md:flex flex-wrap items-center gap-4">
              {/* Hospital Type Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Building2 className="w-4 h-4 text-slate-gray" />
                <span className="text-sm font-medium text-slate-gray whitespace-nowrap">Type:</span>
                <div className="flex gap-2 flex-wrap">
                  {hospitalTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedHospitalType(type)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                        selectedHospitalType === type
                          ? 'bg-brand-bronze text-white'
                          : 'bg-light-gray text-brand-navy hover:bg-border-gray'
                      }`}
                      aria-pressed={selectedHospitalType === type}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Calendar className="w-4 h-4 text-slate-gray" />
                <span className="text-sm font-medium text-slate-gray whitespace-nowrap">Year:</span>
                <div className="flex gap-2 flex-wrap">
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                        selectedYear === year
                          ? 'bg-brand-bronze text-white'
                          : 'bg-light-gray text-brand-navy hover:bg-border-gray'
                      }`}
                      aria-pressed={selectedYear === year}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium text-slate-gray whitespace-nowrap">Sort:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 pr-8 border border-border-gray rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-bronze appearance-none"
                    aria-label="Sort projects"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
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
                  <label className="block text-sm font-medium text-slate-gray mb-2">Hospital Type</label>
                  <div className="flex flex-wrap gap-2">
                    {hospitalTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedHospitalType(type)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          selectedHospitalType === type
                            ? 'bg-brand-bronze text-white'
                            : 'bg-light-gray text-brand-navy'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">Year</label>
                  <div className="flex flex-wrap gap-2">
                    {availableYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          selectedYear === year
                            ? 'bg-brand-bronze text-white'
                            : 'bg-light-gray text-brand-navy'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-border-gray rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-bronze"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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

      {/* Projects Grid */}
      <section className="py-12 md:py-16 bg-clinical-white">
        <SectionContainer>
          {isLoading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-brand-bronze mx-auto mb-4" />
              <p className="text-slate-gray">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 text-slate-gray/40">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl text-slate-gray mb-4">No projects found</p>
              <p className="text-slate-gray mb-2">Try adjusting your filters or search query</p>
              <p className="text-sm text-slate-gray/80 mb-6">
                Suggestions: Try different keywords, clear filters, or browse all projects
              </p>
              {activeFiltersCount > 0 && (
                <AltairButton variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </AltairButton>
              )}
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="text-base font-medium text-brand-navy">
                    Showing <span className="text-brand-bronze">
                      {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProjects.length)}
                    </span> of <span className="text-brand-bronze">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
                  </p>
                  {totalPages > 1 && (
                    <p className="text-sm text-slate-gray mt-1">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <AltairButton variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Clear Filters
                  </AltairButton>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project, index) => (
                  <ProjectCard key={project.id} {...project} priority={index === 0} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <AltairButton
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </AltairButton>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${
                              currentPage === page
                                ? 'bg-brand-bronze text-white'
                                : 'bg-light-gray text-brand-navy hover:bg-border-gray'
                            }`}
                            aria-label={`Go to page ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                          >
                            {page}
                          </button>
                        )
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 text-slate-gray" title={`Pages ${currentPage - 1 > 2 ? `${currentPage - 1}` : ''} to ${currentPage + 1 < totalPages - 1 ? `${currentPage + 1}` : ''}`}>
                            ...
                          </span>
                        )
                      }
                      return null
                    })}
                  </div>

                  <AltairButton
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </AltairButton>
                </div>
              )}
            </>
          )}
        </SectionContainer>
      </section>
    </div>
  )
}

