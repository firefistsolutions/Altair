import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetailPage } from '@/components/pages/projects/ProjectDetailPage'
import { generateProjectSchema } from '@/utilities/seo'
import { getServerSideURL } from '@/utilities/getURL'
import { getProjectBySlug, getProjects } from '@/lib/api/projects'
import { transformProject } from '@/lib/utils/transform-project'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const projects = await getProjects({ limit: 1000 })
  return projects.docs.map((project) => ({
    slug: project.slug || '',
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Altair Medical System',
    }
  }

  const baseUrl = getServerSideURL()
  const transformed = transformProject(project)
  const description = `Case study: ${project.title}. ${typeof project.hospitalType === 'string' ? project.hospitalType : ''} installation${project.year ? ` completed in ${project.year}` : ''}.`

  return {
    title: `${project.title} | Altair Medical System Projects`,
    description,
    keywords: [
      typeof project.hospitalType === 'string' ? project.hospitalType : '',
      project.location || '',
      'modular operation theatre',
      'medical gas systems',
      'case study',
      'hospital installation',
    ],
    openGraph: {
      title: `${project.title} | Altair Medical System Projects`,
      description,
      images: [transformed.image],
      type: 'website',
      url: `${baseUrl}/projects/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Altair Medical System Projects`,
      description,
      images: [transformed.image],
    },
    alternates: {
      canonical: `${baseUrl}/projects/${project.slug}`,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const transformed = transformProject(project)

  // Get related projects (same hospital type, excluding current)
  const relatedProjectsResult = await getProjects({
    hospitalType: typeof project.hospitalType === 'string' ? project.hospitalType : undefined,
    limit: 4,
  })
  const relatedProjects = relatedProjectsResult.docs
    .filter((p) => p.id !== project.id)
    .slice(0, 3)
    .map(transformProject)

  const projectSchema = generateProjectSchema({
    title: transformed.title,
    description: `Installation of modular operation theatres and medical gas systems at ${transformed.title}`,
    image: transformed.image,
    slug: transformed.slug,
    client: transformed.client,
    location: transformed.location,
    year: transformed.year?.toString() || '',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ProjectDetailPage project={transformed} relatedProjects={relatedProjects} />
    </>
  )
}
