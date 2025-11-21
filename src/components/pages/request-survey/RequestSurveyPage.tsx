'use client'

import { useState, FormEvent } from 'react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairCard } from '@/components/ui/altair-card'
import { AltairButton } from '@/components/ui/altair-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, AlertCircle, Loader2, Calendar, MapPin } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  organization?: string
  location?: string
  preferredDate?: string
  preferredTime?: string
  projectDetails?: string
}

export function RequestSurveyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    location: '',
    preferredDate: '',
    preferredTime: '',
    projectDetails: '',
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

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization name is required'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required'
    } else {
      // Validate date is not in the past
      const selectedDate = new Date(formData.preferredDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.preferredDate = 'Please select a future date'
      }
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required'
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Project details are required'
    } else if (formData.projectDetails.trim().length < 20) {
      newErrors.projectDetails = 'Project details must be at least 20 characters'
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
      // TODO: Replace with actual API endpoint in Phase 6
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        location: '',
        preferredDate: '',
        preferredTime: '',
        projectDetails: '',
      })
      setErrors({})

      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (_error) {
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

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Breadcrumbs */}
      <SectionContainer className="pt-6 pb-4">
        <Breadcrumbs items={[{ label: 'Request a Site Survey' }]} />
      </SectionContainer>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a Site Survey</h1>
            <p className="text-lg text-white/80">
              Schedule a site survey with our expert team. We&apos;ll visit your facility, assess your
              requirements, and provide detailed recommendations for your modular operation theatre or medical
              gas system project.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-clinical-white">
        <SectionContainer>
          <div className="max-w-3xl mx-auto">
            <AltairCard className="p-8 md:p-12">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3 text-green-700">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p>
                    Thank you! Your site survey request has been submitted. We&apos;ll contact you within 24
                    hours to confirm the schedule.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>Something went wrong. Please try again or contact us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-brand-navy mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your full name"
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
                    <label htmlFor="email" className="block text-sm font-medium text-brand-navy mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-navy mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 12345 67890"
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
                    <label htmlFor="organization" className="block text-sm font-medium text-brand-navy mb-2">
                      Organization <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="organization"
                      type="text"
                      name="organization"
                      placeholder="Hospital/Organization name"
                      value={formData.organization}
                      onChange={(e) => handleChange('organization', e.target.value)}
                      className={`${
                        errors.organization ? 'border-red-400 focus:border-red-400' : ''
                      }`}
                      aria-invalid={!!errors.organization}
                      aria-describedby={errors.organization ? 'organization-error' : undefined}
                    />
                    <div className="min-h-[1.5rem] mt-1">
                      {errors.organization && (
                        <p id="organization-error" className="text-sm text-red-600" role="alert">
                          {errors.organization}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="location" className="block text-sm font-medium text-brand-navy mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Facility Location <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="Full address of the facility"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className={`${
                      errors.location ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                    aria-invalid={!!errors.location}
                    aria-describedby={errors.location ? 'location-error' : undefined}
                  />
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.location && (
                      <p id="location-error" className="text-sm text-red-600" role="alert">
                        {errors.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-brand-navy mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="preferredDate"
                      type="date"
                      name="preferredDate"
                      min={today}
                      value={formData.preferredDate}
                      onChange={(e) => handleChange('preferredDate', e.target.value)}
                      className={`${
                        errors.preferredDate ? 'border-red-400 focus:border-red-400' : ''
                      }`}
                      aria-invalid={!!errors.preferredDate}
                      aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                    />
                    <div className="min-h-[1.5rem] mt-1">
                      {errors.preferredDate && (
                        <p id="preferredDate-error" className="text-sm text-red-600" role="alert">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-brand-navy mb-2">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => handleChange('preferredTime', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                        errors.preferredTime ? 'border-red-400' : 'border-border-gray'
                      }`}
                      aria-invalid={!!errors.preferredTime}
                      aria-describedby={errors.preferredTime ? 'preferredTime-error' : undefined}
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                    <div className="min-h-[1.5rem] mt-1">
                      {errors.preferredTime && (
                        <p id="preferredTime-error" className="text-sm text-red-600" role="alert">
                          {errors.preferredTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="projectDetails" className="block text-sm font-medium text-brand-navy mb-2">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="projectDetails"
                    name="projectDetails"
                    placeholder="Please provide details about your project, current facility status, and any specific requirements or concerns..."
                    rows={6}
                    value={formData.projectDetails}
                    onChange={(e) => handleChange('projectDetails', e.target.value)}
                    className={`resize-none ${
                      errors.projectDetails ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                    aria-invalid={!!errors.projectDetails}
                    aria-describedby={errors.projectDetails ? 'projectDetails-error' : undefined}
                  />
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.projectDetails && (
                      <p id="projectDetails-error" className="text-sm text-red-600" role="alert">
                        {errors.projectDetails}
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
                      Submitting...
                    </>
                  ) : (
                    'Submit Survey Request'
                  )}
                </AltairButton>
              </form>
            </AltairCard>
          </div>
        </SectionContainer>
      </section>
    </div>
  )
}

