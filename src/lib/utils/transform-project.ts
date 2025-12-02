import type { Project, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export interface TransformedProject {
  id: string
  title: string
  slug: string
  client: string
  image: string
  images: string[]
  metrics: { label: string; value: string }[]
  hospitalType: string
  year: string
  location: string
  challenge?: any // RichText
  solution?: any // RichText
  productsUsed?: string[]
  testimonial?: {
    quote: string
    author: string
    designation: string
    organization: string
  }
  outcomes?: any // RichText
  metaTitle?: string
  metaDescription?: string
  metaImage?: string
}

export const transformProject = (project: Project): TransformedProject => {
  const defaultImage =
    typeof project.image === 'object' && project.image !== null
      ? getMediaUrl((project.image as Media).url)
      : '/assets/images/placeholder.jpg' // Fallback placeholder

  const galleryImages =
    project.images
      ?.map((item) => {
        if (typeof item.image === 'object' && item.image !== null) {
          return getMediaUrl((item.image as Media).url)
        }
        return null
      })
      .filter(Boolean) as string[] || []

  const allImages = [defaultImage, ...galleryImages].filter(Boolean) as string[]

  const metrics = project.metrics?.map(metric => ({
    label: metric.label || '',
    value: metric.value || '',
  })) || []

  const metaImage =
    typeof project.meta?.image === 'object' && project.meta.image !== null
      ? getMediaUrl((project.meta.image as Media).url)
      : defaultImage

  return {
    id: String(project.id),
    title: project.title || 'Untitled Project',
    slug: project.slug || '',
    client: typeof project.client === 'string' ? project.client : 'N/A',
    image: defaultImage,
    images: allImages,
    metrics: metrics,
    hospitalType: typeof project.hospitalType === 'string' ? project.hospitalType : 'N/A',
    year: project.year ? String(project.year) : 'N/A',
    location: typeof project.location === 'string' ? project.location : 'N/A',
    metaTitle: project.meta?.title || project.title || 'Untitled Project',
    metaDescription: project.meta?.description || `Case study: ${project.title}. ${typeof project.hospitalType === 'string' ? project.hospitalType : ''} installation completed in ${project.year}.` || 'Explore our successful healthcare projects.',
    metaImage: metaImage,
  }
}
