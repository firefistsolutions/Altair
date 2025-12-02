import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProjectsListingPage } from '@/components/pages/projects/ProjectsListingPage'
import { Loader2 } from 'lucide-react'
import { getServerSideURL } from '@/utilities/getURL'
import { getProjects, getProjectYears } from '@/lib/api/projects'
import { generateItemListSchema } from '@/utilities/seo'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

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

export default async function ProjectsPage() {
  // Fetch projects and years for schema
  const [projectsResult, years] = await Promise.all([
    getProjects({ limit: 100 }), // Get all for schema
    getProjectYears(),
  ])

  const listSchema = generateItemListSchema(
    projectsResult.docs.map((p) => ({
      name: p.title || '',
      url: `/projects/${p.slug || ''}`,
    })),
    'Altair Medical System Projects'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsListingPage initialProjects={projectsResult.docs} initialYears={years} />
      </Suspense>
    </>
  )
}
