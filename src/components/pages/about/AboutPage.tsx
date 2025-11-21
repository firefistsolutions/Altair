'use client'

import Image from 'next/image'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairCard } from '@/components/ui/altair-card'
import { AltairBadge } from '@/components/ui/altair-badge'
import { CheckCircle2, Award, Calendar, MapPin, Target, Users, Shield } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'Commitment to delivering the highest quality solutions that exceed industry standards.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Prioritizing patient safety through rigorous compliance with HTM-02-01 and ASTM standards.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Understanding and meeting the unique needs of healthcare facilities across India.',
  },
]

const certifications = [
  { name: 'HTM-02-01 Compliant', description: 'Healthcare Technical Memorandum compliance' },
  { name: 'ASTM Certified', description: 'American Society for Testing and Materials standards' },
  { name: 'ISO 13485', description: 'Medical devices quality management systems' },
  { name: 'CE Marked', description: 'European Conformity marking for medical devices' },
]

const milestones = [
  { year: '2024', event: 'Expanded operations across 5 states in India' },
  { year: '2023', event: 'Completed 50+ successful installations' },
  { year: '2022', event: 'Achieved ISO 13485 certification' },
  { year: '2021', event: 'Launched comprehensive AMC/CMC services' },
  { year: '2020', event: 'Established as leading modular OT manufacturer' },
]

export function AboutPage() {
  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Breadcrumbs */}
      <SectionContainer className="pt-6 pb-4">
        <Breadcrumbs items={[{ label: 'About Us' }]} />
      </SectionContainer>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Altair Medical System</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Design to Perform. Build to Last. We are a leading manufacturer and installer of modular
              operation theatres and medical gas pipeline systems across India.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-24 bg-clinical-white">
        <SectionContainer>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-gray leading-relaxed">
                <p>
                  Altair Medical System Pvt. Ltd. was founded with a vision to revolutionize healthcare
                  infrastructure in India. We specialize in the design, manufacturing, and installation of
                  modular operation theatres and medical gas pipeline systems that meet the highest
                  international standards.
                </p>
                <p>
                  With years of experience and a team of expert engineers, we have successfully completed
                  installations across government hospitals, private healthcare facilities, and medical
                  colleges throughout India. Our commitment to quality, safety, and rapid deployment has
                  made us a trusted partner in the healthcare industry.
                </p>
                <p>
                  We understand the critical nature of healthcare infrastructure and ensure that every
                  installation meets strict HTM-02-01 and ASTM compliance standards, providing healthcare
                  facilities with reliable, safe, and efficient operation theatres and medical gas systems.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80"
                alt="Altair Medical System - Manufacturing Facility"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-light-gray">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">Our Mission</h2>
            <p className="text-lg text-slate-gray leading-relaxed">
              To provide world-class modular operation theatre and medical gas system solutions that enhance
              healthcare delivery across India, ensuring patient safety, operational efficiency, and
              compliance with international standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <AltairCard key={index} className="text-center p-6 h-full">
                  <div className="w-16 h-16 bg-brand-bronze/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-brand-bronze" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-navy mb-3">{value.title}</h3>
                  <p className="text-slate-gray">{value.description}</p>
                </AltairCard>
              )
            })}
          </div>
        </SectionContainer>
      </section>

      {/* Certifications & Compliance */}
      <section className="py-16 md:py-24 bg-clinical-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-8 text-center">
              Certifications & Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <AltairCard key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-bronze/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-brand-bronze" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-navy mb-2">{cert.name}</h4>
                      <p className="text-sm text-slate-gray">{cert.description}</p>
                    </div>
                  </div>
                </AltairCard>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-16 md:py-24 bg-light-gray">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-12 text-center">
              Our Journey
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-bronze/20 hidden md:block" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    <div className="w-16 h-16 bg-brand-bronze rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <Calendar className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-brand-bronze">{milestone.year}</span>
                      </div>
                      <p className="text-slate-gray">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Office Locations */}
      <section className="py-16 md:py-24 bg-clinical-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-12 text-center">
              Our Location
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <AltairCard className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-bronze/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-brand-bronze" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-navy mb-2">Head Office</h3>
                    <p className="text-slate-gray text-sm">
                      Plot No. B-437, Bhamashah Industrial Area
                      <br />
                      Kaladwas, Rajasthan 313002
                      <br />
                      India
                    </p>
                  </div>
                </div>
                {/* Placeholder for map - will be replaced with actual map integration */}
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-light-gray">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=450&fit=crop&q=80"
                    alt="Altair Medical System Office Location"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AltairCard>

              <AltairCard className="p-6">
                <h3 className="font-semibold text-brand-navy mb-4">Contact Information</h3>
                <div className="space-y-4 text-slate-gray">
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a
                      href="mailto:marketing@altairmedical.com"
                      className="text-brand-bronze hover:underline"
                    >
                      marketing@altairmedical.com
                    </a>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a href="tel:+919251859361" className="text-brand-bronze hover:underline">
                      +91 92518 59361
                    </a>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Business Hours</p>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </AltairCard>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  )
}

