'use client'

import { SectionContainer } from '@/components/ui/section-container'
import { ProjectCard } from '@/components/ui/project-card'
import Link from 'next/link'
import { AltairButton } from '@/components/ui/altair-button'

// Mock projects data - will be replaced with CMS data in Phase 6
const projects = [
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

export function FeaturedProjectsSection() {
  return (
    <section className="py-16 md:py-24 bg-light-gray">
      <SectionContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Recent Projects
            </h2>
            <p className="text-lg text-slate-gray">
              Showcasing our successful installations across India
            </p>
          </div>
          <AltairButton variant="outline" asChild className="w-full md:w-auto">
            <Link href="/projects">View All Projects</Link>
          </AltairButton>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} priority={index === 0} />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}

