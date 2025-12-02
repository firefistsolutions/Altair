import type { Product, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export interface TransformedProduct {
  id: string
  title: string
  slug: string
  description: string
  shortDescription?: string
  image: string
  images: string[]
  specs: string[] // For badges/quick view
  technicalSpecs?: Array<{ label: string; value: string }> // Full specs with labels
  category: string
  categorySlug?: string
  featured: boolean
  datasheetUrl?: string
  overview?: any // RichText
  features?: any // RichText
  metaTitle?: string
  metaDescription?: string
  metaImage?: string
}

export const transformProduct = (product: Product): TransformedProduct => {
  const defaultImage =
    typeof product.image === 'object' && product.image !== null
      ? getMediaUrl((product.image as Media).url)
      : '/assets/images/placeholder.jpg' // Fallback placeholder

  const galleryImages =
    product.images
      ?.map((item) => {
        if (typeof item.image === 'object' && item.image !== null) {
          return getMediaUrl((item.image as Media).url)
        }
        return null
      })
      .filter(Boolean) as string[] || []

  const allImages = [defaultImage, ...galleryImages].filter(Boolean) as string[]

  const category =
    typeof product.category === 'string' ? product.category : 'Uncategorized'

  const categorySlug = category.toLowerCase().replace(/\s+/g, '-')

  // Extract specs for badges (just values)
  const specs = product.specs?.map(spec => spec.value || spec.label || '').filter(Boolean) as string[] || []
  
  // Keep full specs with labels for technical specifications table
  const technicalSpecs = product.specs?.map(spec => ({
    label: spec.label || '',
    value: spec.value || ''
  })).filter(spec => spec.label && spec.value) || []

  const datasheetUrl =
    typeof product.datasheet === 'object' && product.datasheet !== null
      ? getMediaUrl((product.datasheet as Media).url)
      : undefined

  const metaImage =
    typeof product.meta?.image === 'object' && product.meta.image !== null
      ? getMediaUrl((product.meta.image as Media).url)
      : defaultImage

  // Extract plain text description from RichText for short descriptions
  let description = ''
  if (typeof product.description === 'string') {
    description = product.description
  } else if (typeof product.description === 'object' && product.description !== null) {
    // Extract plain text from RichText Lexical format
    const extractText = (node: any): string => {
      if (typeof node === 'string') return node
      if (node?.text) return node.text
      if (node?.children && Array.isArray(node.children)) {
        return node.children.map(extractText).join(' ')
      }
      return ''
    }
    description = extractText(product.description.root || product.description) || ''
  }

  return {
    id: String(product.id),
    title: product.title || 'Untitled Product',
    slug: product.slug || '',
    description: description || 'No description available',
    shortDescription: description.length > 150 ? description.substring(0, 150) + '...' : description,
    image: defaultImage,
    images: allImages,
    specs: specs,
    technicalSpecs: technicalSpecs.length > 0 ? technicalSpecs : undefined,
    category: category,
    categorySlug: categorySlug,
    featured: product.featured || false,
    datasheetUrl: datasheetUrl,
    overview: product.description || undefined,
    features: product.keyFeatures ? product.keyFeatures.map(f => f.feature).filter(Boolean) : undefined,
    metaTitle: product.meta?.title || product.title || 'Untitled Product',
    metaDescription: product.meta?.description || description || 'Learn more about our medical products.',
    metaImage: metaImage,
  }
}
