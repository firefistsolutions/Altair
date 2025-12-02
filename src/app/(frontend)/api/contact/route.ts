import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate form data
    const validationResult = contactFormSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const data = validationResult.data
    const payload = await getPayload({ config: configPromise })

    // Save to Leads collection
    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: '', // Contact form doesn't have company field
        message: data.message,
        source: 'contact',
        status: 'new',
        metadata: {
          subject: data.subject || '',
          submittedAt: new Date().toISOString(),
        },
      },
    })

    // Send email notification (if Resend is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        const adminEmail = process.env.ADMIN_EMAIL || 'dspatil297@gmail.com'
        const fromEmail = process.env.FROM_EMAIL || 'noreply@altairmedical.com'

        await resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          subject: `New Contact Form Submission: ${data.subject || 'No Subject'}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Lead ID: ${lead.id}</small></p>
          `,
        })

        // Send confirmation email to user
        await resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject: 'Thank you for contacting Altair Medical System',
          html: `
            <h2>Thank you for contacting us!</h2>
            <p>Dear ${data.name},</p>
            <p>We have received your message and our team will get back to you within 1 business day.</p>
            <p>Your inquiry is important to us, and we appreciate you reaching out.</p>
            <hr>
            <p><strong>Altair Medical System Pvt. Ltd.</strong></p>
            <p>Plot No. B-437, Bhamashah Industrial Area<br>
            Kaladwas, Rajasthan 313002, India</p>
            <p>Email: marketing@altairmedical.com<br>
            Phone: +91 92518 59361</p>
          `,
        })
      } catch (emailError: unknown) {
        // Log email error but don't fail the request
        const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error'
        logger.error('Email notification failed:', errorMessage)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      leadId: lead.id,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    logger.error('Contact form submission error:', errorMessage)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit form. Please try again later.',
        message: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}

