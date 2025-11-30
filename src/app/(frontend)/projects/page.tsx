import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProjectsListingPage } from '@/components/pages/projects/ProjectsListingPage'
import { Loader2 } from 'lucide-react'
import { getServerSideURL } from '@/utilities/getURL'

// Schema.org ItemList for projects page
function generateProjectsListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Altair Medical System Projects',
    description: 'Successful installations of modular operation theatres and medical gas systems across India',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Government Medical College & Hospital, Jalgaon',
        url: 'https://altairmedical.com/projects/gmch-jalgaon',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'MAX Super Speciality Hospital, Patparganj',
        url: 'https://altairmedical.com/projects/max-patparganj',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Vilasrao Deshmukh Govt. Medical College, Latur',
        url: 'https://altairmedical.com/projects/vdgmch-latur',
      },
    ],
  }
}

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Projects | Altair Medical System',
  description: 'Explore our successful installations of modular operation theatres and medical gas systems across India. Government hospitals, private healthcare facilities, and medical colleges.',
  keywords: [
    'modular operation theatre projects',
    'medical gas system installations',
    'hospital projects India',
    'medical college installations',
    'operation theater case studies',
  ],
  openGraph: {
    title: 'Projects | Altair Medical System',
    description: 'Explore our successful installations of modular operation theatres and medical gas systems across India.',
    type: 'website',
    url: `${baseUrl}/projects`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Altair Medical System',
    description: 'Explore our successful installations of modular operation theatres and medical gas systems across India.',
  },
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
}

function ProjectsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-brand-bronze" />
    </div>
  )
}

export default function ProjectsPage() {
  const listSchema = generateProjectsListSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsListingPage />
      </Suspense>
    </>
  )
}

