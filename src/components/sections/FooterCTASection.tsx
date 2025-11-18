'use client'

import { useState, FormEvent } from 'react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairButton } from '@/components/ui/altair-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  message?: string
}

export function FooterCTASection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
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
      // TODO: Replace with actual API endpoint in Phase 6
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In production, this would be:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })
      // if (!response.ok) throw new Error('Submission failed')

      setSubmitStatus('success')
      setFormData({ name: '', phone: '', email: '', message: '' })
      setErrors({})

      // Reset success message after 5 seconds
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
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section className="py-16 md:py-24 bg-brand-navy text-white">
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Get in touch with our team for a consultation and site survey
          </p>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3 text-green-200">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p>Thank you! Your request has been submitted successfully. We&apos;ll get back to you soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>Something went wrong. Please try again or contact us directly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`bg-white/20 border-white/40 text-white placeholder:text-white/80 focus:bg-white/25 focus:border-white/60 ${
                    errors.name ? 'border-red-400 focus:border-red-400' : ''
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                <div className="h-5 mt-1">
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-300" role="alert">
                      {errors.name}
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
                  className={`bg-white/20 border-white/40 text-white placeholder:text-white/80 focus:bg-white/25 focus:border-white/60 ${
                    errors.phone ? 'border-red-400 focus:border-red-400' : ''
                  }`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                <div className="h-5 mt-1">
                  {errors.phone && (
                    <p id="phone-error" className="text-sm text-red-300" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`bg-white/20 border-white/40 text-white placeholder:text-white/80 focus:bg-white/25 focus:border-white/60 ${
                  errors.email ? 'border-red-400 focus:border-red-400' : ''
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <div className="h-5 mt-1">
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-300" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <Textarea
                name="message"
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className={`bg-white/20 border-white/40 text-white placeholder:text-white/80 focus:bg-white/25 focus:border-white/60 resize-none ${
                  errors.message ? 'border-red-400 focus:border-red-400' : ''
                }`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              <div className="h-5 mt-1">
                {errors.message && (
                  <p id="message-error" className="text-sm text-red-300" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>
            <div className="text-center pt-2">
              <AltairButton
                type="submit"
                variant="bronze"
                size="lg"
                className="w-full md:w-auto min-w-[200px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </AltairButton>
            </div>
          </form>
        </div>
      </SectionContainer>
    </section>
  )
}

