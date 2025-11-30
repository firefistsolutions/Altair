import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetailPage } from '@/components/pages/projects/ProjectDetailPage'
import { generateProjectSchema } from '@/utilities/seo'
import { getServerSideURL } from '@/utilities/getURL'

// This will be replaced with proper type from CMS in Phase 6
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Project = {
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


// Mock project data - will be replaced with CMS data in Phase 6
const projects = [
  {
    slug: 'gmch-jalgaon',
    title: 'Government Medical College & Hospital, Jalgaon',
    client: 'Government Medical College',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop&q=80',
    ],
    metrics: [
      { label: 'Operation Theaters', value: '5' },
      { label: 'Installation Time', value: '5 days' },
      { label: 'Bed Capacity', value: '500+' },
      { label: 'Completion Year', value: '2024' },
    ],
    hospitalType: 'Government Hospital',
    year: '2024',
    location: 'Jalgaon, Maharashtra',
    challenge: 'The hospital required rapid installation of 5 modular operation theatres without disrupting ongoing medical services. The project needed to meet strict HTM-02-01 compliance standards while maintaining the highest levels of hygiene and safety.',
    solution: 'We designed and installed 5 state-of-the-art modular operation theatres with seamless panels, touchless sensor systems, and premium LED lighting. The installation was completed in just 5 days using our rapid deployment methodology, ensuring minimal disruption to hospital operations. All systems were oxygen-cleaned and color-coded according to international standards.',
    products: [
      'Modular Operation Theaters',
      'Medical Gas Pipeline Systems',
      'Surgical Pendants',
      'Bed-Head Units',
      'Central Alarm Panels',
    ],
    testimonial: {
      quote: 'Kudos to Workspace Metal Solutions Pvt Ltd for their exceptional work at Government Medical College & Hospital, Jalgaon. In just 5 days, they constructed 5 modular operation theaters, revolutionizing our facilities.',
      author: 'Dr. Girish Thakur',
      designation: 'Dean',
      organization: 'Government Medical College & Hospital, Jalgaon',
    },
    outcomes: [
      '5 modular operation theatres operational within 5 days',
      '100% HTM-02-01 compliance achieved',
      'Zero disruption to ongoing medical services',
      'Enhanced surgical capabilities with modern infrastructure',
      'Improved patient safety with standardized medical gas systems',
    ],
  },
  {
    slug: 'max-patparganj',
    title: 'MAX Super Speciality Hospital, Patparganj',
    client: 'Tandem Healthcare Group',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop&q=80',
    ],
    metrics: [
      { label: 'Operation Theaters', value: '8' },
      { label: 'Completion', value: '2024' },
      { label: 'Bed Capacity', value: '300+' },
    ],
    hospitalType: 'Private Hospital',
    year: '2024',
    location: 'New Delhi',
    challenge: 'A large-scale installation requiring 8 operation theatres with advanced medical gas systems for a premier private healthcare facility.',
    solution: 'Comprehensive installation of 8 modular operation theatres with integrated medical gas pipeline systems, surgical pendants, and centralized monitoring systems.',
    products: [
      'Modular Operation Theaters',
      'Medical Gas Systems',
      'Surgical Pendants',
    ],
    testimonial: {
      quote: 'Workspace Metal Solutions Pvt Ltd at MAX Super Speciality Hospital, Patparganj, New Delhi. Their professionalism and attention to detail have resulted in the successful installation of modular operation theatre materials.',
      author: 'Tandem Healthcare Group',
      designation: 'Management',
      organization: 'MAX Super Speciality Hospital, Patparganj, New Delhi',
    },
    outcomes: [
      '8 operation theatres fully operational',
      'Enhanced surgical capacity',
      'Improved patient care infrastructure',
    ],
  },
  {
    slug: 'vdgmch-latur',
    title: 'Vilasrao Deshmukh Govt. Medical College, Latur',
    client: 'Government Medical College',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=800&fit=crop&q=80',
    ],
    metrics: [
      { label: 'Operation Theaters', value: '6' },
      { label: 'Installation Time', value: '7 days' },
      { label: 'Bed Capacity', value: '600+' },
    ],
    hospitalType: 'Government Hospital',
    year: '2023',
    location: 'Latur, Maharashtra',
    challenge: 'Installation of 6 modular operation theatres in a government medical college with strict budget constraints and timeline requirements.',
    solution: 'Cost-effective installation of 6 modular operation theatres with complete medical gas pipeline systems, completed within 7 days.',
    products: [
      'Modular Operation Theaters',
      'Medical Gas Pipeline Systems',
      'Bed-Head Units',
    ],
    testimonial: {
      quote: 'Their execution team is highly skilled, sincere towards safety norms & good coordinating skills. Their execution team is quite good technically sound about products.',
      author: 'Dr. Uday S. Mohite',
      designation: 'Dean',
      organization: 'Vilasrao Deshmukh Govt. Medical College & Hospital, Latur',
    },
    outcomes: [
      '6 operation theatres operational',
      'Budget-friendly solution delivered',
      'Timely completion within 7 days',
    ],
  },
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: 'Project Not Found | Altair Medical System',
    }
  }

  const baseUrl = getServerSideURL()
  const description = `Case study: ${project.title}. ${project.hospitalType} installation completed in ${project.year}. ${project.metrics[0]?.value} ${project.metrics[0]?.label}.`

  return {
    title: `${project.title} | Altair Medical System Projects`,
    description,
    keywords: [
      project.hospitalType,
      project.location,
      'modular operation theatre',
      'medical gas systems',
      'case study',
      'hospital installation',
    ],
    openGraph: {
      title: `${project.title} | Altair Medical System Projects`,
      description,
      images: [project.image],
      type: 'website',
      url: `${baseUrl}/projects/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Altair Medical System Projects`,
      description,
      images: [project.image],
    },
    alternates: {
      canonical: `${baseUrl}/projects/${project.slug}`,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const projectSchema = generateProjectSchema({
    title: project.title,
    description: `Installation of modular operation theatres and medical gas systems at ${project.title}`,
    image: project.image,
    slug: project.slug,
    client: project.client,
    location: project.location,
    year: project.year,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ProjectDetailPage project={project} />
    </>
  )
}

