'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairCard } from '@/components/ui/altair-card'
import { AltairButton } from '@/components/ui/altair-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, AlertCircle, Loader2, Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setErrors({})

      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error: unknown) {
      // Error is already handled by the API response
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Get in touch with our team for consultations, site surveys, and project inquiries. We&apos;re
              here to help you with your healthcare infrastructure needs.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-16 md:py-24 bg-clinical-white">
        <SectionContainer>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form (Left) */}
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Send us a Message</h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3 text-green-700">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p>Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>Something went wrong. Please try again or contact us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`${
                      errors.name ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.name && (
                      <p id="name-error" className="text-sm text-red-600" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`${
                      errors.email ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`${
                      errors.phone ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.phone && (
                      <p id="phone-error" className="text-sm text-red-600" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={`${
                      errors.subject ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.subject && (
                      <p id="subject-error" className="text-sm text-red-600" role="alert">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`resize-none ${
                      errors.message ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.message && (
                      <p id="message-error" className="text-sm text-red-600" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <AltairButton
                  type="submit"
                  variant="bronze"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </AltairButton>
              </form>
            </div>

            {/* Contact Information Card (Right) */}
            <div className="space-y-6">
              <AltairCard className="p-6">
                <h2 className="text-3xl font-bold text-brand-navy mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-bronze/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-brand-bronze" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-navy mb-1">Address</h3>
                      <p className="text-slate-gray text-sm">
                        Plot No. B-437, Bhamashah Industrial Area
                        <br />
                        Kaladwas, Rajasthan 313002
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-bronze/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-brand-bronze" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-navy mb-1">Email</h3>
                      <a
                        href="mailto:marketing@altairmedical.com"
                        className="text-brand-bronze hover:underline text-sm"
                      >
                        marketing@altairmedical.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-bronze/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-brand-bronze" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-navy mb-1">Phone</h3>
                      <a href="tel:+919251859361" className="text-brand-bronze hover:underline text-sm">
                        +91 92518 59361
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-bronze/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-brand-bronze" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-navy mb-1">Business Hours</h3>
                      <p className="text-slate-gray text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 9:00 AM - 1:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </AltairCard>

              {/* WhatsApp Button */}
              <AltairButton
                variant="bronze"
                size="lg"
                className="w-full"
                asChild
              >
                <Link
                  href="https://wa.me/919251859361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Link>
              </AltairButton>

              {/* Office Map */}
              <AltairCard className="p-0 overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=450&fit=crop&q=80"
                    alt="Altair Medical System Office Location"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AltairCard>
            </div>
          </div>
        </SectionContainer>
      </section>
    </div>
  )
}

