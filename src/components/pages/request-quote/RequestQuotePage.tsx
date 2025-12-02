'use client'

import { useState, FormEvent, useRef } from 'react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairCard } from '@/components/ui/altair-card'
import { AltairButton } from '@/components/ui/altair-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, AlertCircle, Loader2, Upload, X } from 'lucide-react'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  organization?: string
  projectType?: string
  description?: string
  floorPlan?: string
}

const projectTypes = [
  'Modular Operation Theatre',
  'Medical Gas Pipeline System',
  'Surgical Pendant Installation',
  'Bed-Head Unit Installation',
  'Complete Hospital Infrastructure',
  'Other',
]

export function RequestQuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    projectType: '',
    description: '',
  })
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

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

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required'
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters'
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
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('organization', formData.organization)
      formDataToSend.append('projectType', formData.projectType)
      formDataToSend.append('description', formData.description)
      
      if (floorPlanFile) {
        formDataToSend.append('floorPlan', floorPlanFile)
      }

      const response = await fetch('/api/quote', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote request')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        projectType: '',
        description: '',
      })
      setFloorPlanFile(null)
      setErrors({})

      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error: any) {
      console.error('Form submission error:', error)
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          floorPlan: 'Please upload a PDF, JPG, or PNG file',
        }))
        return
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          floorPlan: 'File size must be less than 10MB',
        }))
        return
      }
      setFloorPlanFile(file)
      setErrors((prev) => ({ ...prev, floorPlan: undefined }))
    }
  }

  const removeFile = () => {
    setFloorPlanFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a Quote</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Get a customized quote for your modular operation theatre or medical gas system project. Fill
              out the form below and our team will get back to you with detailed pricing and specifications.
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
                    Thank you! Your quote request has been submitted successfully. We&apos;ll get back to you
                    within 24 hours.
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
                  <label htmlFor="projectType" className="block text-sm font-medium text-brand-navy mb-2">
                    Project Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                      errors.projectType ? 'border-red-400' : 'border-border-gray'
                    }`}
                    aria-invalid={!!errors.projectType}
                    aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.projectType && (
                      <p id="projectType-error" className="text-sm text-red-600" role="alert">
                        {errors.projectType}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="description" className="block text-sm font-medium text-brand-navy mb-2">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please provide details about your project requirements, specifications, and any special considerations..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className={`resize-none ${
                      errors.description ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                  />
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.description && (
                      <p id="description-error" className="text-sm text-red-600" role="alert">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="floorPlan" className="block text-sm font-medium text-brand-navy mb-2">
                    Floor Plan (Optional)
                  </label>
                  <div className="border-2 border-dashed border-border-gray rounded-lg p-6 text-center">
                    <input
                      ref={fileInputRef}
                      id="floorPlan"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      aria-describedby="floorPlan-help"
                    />
                    {floorPlanFile ? (
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Upload className="w-5 h-5 text-brand-bronze flex-shrink-0" />
                          <span className="text-sm text-slate-gray truncate">{floorPlanFile.name}</span>
                          <span className="text-xs text-slate-gray/60">
                            ({(floorPlanFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 rounded hover:bg-light-gray transition-colors"
                          aria-label="Remove file"
                        >
                          <X className="w-4 h-4 text-slate-gray" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center gap-2 text-slate-gray hover:text-brand-bronze transition-colors"
                        >
                          <Upload className="w-8 h-8" />
                          <span className="text-sm">Click to upload or drag and drop</span>
                          <span className="text-xs">PDF, JPG, or PNG (max 10MB)</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="min-h-[1.5rem] mt-1">
                    {errors.floorPlan && (
                      <p id="floorPlan-error" className="text-sm text-red-600" role="alert">
                        {errors.floorPlan}
                      </p>
                    )}
                    <p id="floorPlan-help" className="text-xs text-slate-gray mt-1">
                      Upload your floor plan or project layout to help us provide a more accurate quote
                    </p>
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
                    'Submit Quote Request'
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

