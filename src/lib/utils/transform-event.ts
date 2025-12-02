import type { Event, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
// Using native Date methods instead of date-fns

export interface TransformedEvent {
  id: string
  title: string
  slug: string
  dateRange: string
  startDate: string
  endDate: string
  location: string
  venue?: string
  venueAddress?: string
  description?: any // RichText
  image: string
  galleryImages: string[]
  eventType: string
  eventStatus: 'upcoming' | 'past' | 'cancelled'
  featured: boolean
  registrationLink?: string
  metaTitle?: string
  metaDescription?: string
  metaImage?: string
}

export const transformEvent = (event: Event): TransformedEvent => {
  const defaultImage =
    typeof event.featuredImage === 'object' && event.featuredImage !== null
      ? getMediaUrl((event.featuredImage as Media).url)
      : '/assets/images/placeholder.jpg' // Fallback placeholder

  const galleryImages =
    event.gallery
      ?.map((item) => {
        if (typeof item.image === 'object' && item.image !== null) {
          return getMediaUrl((item.image as Media).url)
        }
        return null
      })
      .filter(Boolean) as string[] || []

  const startDate = event.startDate ? (typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate) : null
  const endDate = event.endDate ? (typeof event.endDate === 'string' ? new Date(event.endDate) : event.endDate) : null

  let dateRange = 'N/A'
  if (startDate && endDate) {
    const startStr = startDate.toISOString().split('T')[0]
    const endStr = endDate.toISOString().split('T')[0]
    const startDay = startDate.getDate()
    const startMonth = startDate.toLocaleDateString('en-GB', { month: 'short' })
    const startYear = startDate.getFullYear()
    const endDay = endDate.getDate()
    const endMonth = endDate.toLocaleDateString('en-GB', { month: 'short' })
    const endYear = endDate.getFullYear()
    
    if (startStr === endStr) {
      dateRange = `${startDay} ${startMonth} ${startYear}`
    } else if (startMonth === endMonth && startYear === endYear) {
      dateRange = `${startDay}-${endDay} ${endMonth} ${endYear}`
    } else if (startYear === endYear) {
      dateRange = `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`
    } else {
      dateRange = `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`
    }
  } else if (startDate) {
    const day = startDate.getDate()
    const month = startDate.toLocaleDateString('en-GB', { month: 'short' })
    const year = startDate.getFullYear()
    dateRange = `${day} ${month} ${year}`
  }

  const metaImage =
    typeof event.meta?.image === 'object' && event.meta.image !== null
      ? getMediaUrl((event.meta.image as Media).url)
      : defaultImage

  return {
    id: String(event.id),
    title: event.title || 'Untitled Event',
    slug: event.slug || '',
    dateRange: dateRange,
    startDate: startDate ? startDate.toISOString() : '',
    endDate: endDate ? endDate.toISOString() : '',
    location: typeof event.location === 'string' ? event.location : 'N/A',
    venue: typeof event.venue === 'string' ? event.venue : undefined,
    venueAddress: typeof event.venueAddress === 'string' ? event.venueAddress : undefined,
    description: event.description || undefined,
    image: defaultImage,
    galleryImages: galleryImages,
    eventType: typeof event.eventType === 'string' ? event.eventType : 'Other',
    eventStatus: (event.eventStatus as 'upcoming' | 'past' | 'cancelled') || 'upcoming',
    featured: event.featured || false,
    registrationLink: typeof event.registrationLink === 'string' ? event.registrationLink : undefined,
    metaTitle: event.meta?.title || event.title || 'Untitled Event',
    metaDescription: event.meta?.description || (typeof event.description === 'string' ? event.description : 'Learn more about our upcoming and past events.'),
    metaImage: metaImage,
  }
}
