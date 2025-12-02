import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'

// Validation schema for survey request form
const surveyFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  location: z.string().min(5, 'Location must be at least 5 characters'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().optional(),
  projectDetails: z.string().min(20, 'Project details must be at least 20 characters'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate form data
    const validationResult = surveyFormSchema.safeParse(body)
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

    // Parse preferred date
    let preferredDateObj: Date | null = null
    if (data.preferredDate) {
      preferredDateObj = new Date(data.preferredDate)
      if (isNaN(preferredDateObj.getTime())) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid date format',
          },
          { status: 400 }
        )
      }
    }

    // Save to Leads collection
    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.organization || '',
        message: data.projectDetails,
        source: 'survey',
        status: 'new',
        metadata: {
          location: data.location,
          preferredDate: preferredDateObj ? preferredDateObj.toISOString() : null,
          preferredTime: data.preferredTime || '',
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

        const formattedDate = preferredDateObj
          ? preferredDateObj.toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Not specified'

        await resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          subject: `New Site Survey Request: ${data.location}`,
          html: `
            <h2>New Site Survey Request</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            ${data.organization ? `<p><strong>Organization:</strong> ${data.organization}</p>` : ''}
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Preferred Date:</strong> ${formattedDate}</p>
            ${data.preferredTime ? `<p><strong>Preferred Time:</strong> ${data.preferredTime}</p>` : ''}
            <p><strong>Project Details:</strong></p>
            <p>${data.projectDetails.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Lead ID: ${lead.id}</small></p>
          `,
        })

        // Send confirmation email to user
        await resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject: 'Site Survey Request Received - Altair Medical System',
          html: `
            <h2>Thank you for your site survey request!</h2>
            <p>Dear ${data.name},</p>
            <p>We have received your request for a site survey at <strong>${data.location}</strong>.</p>
            <p><strong>Requested Date:</strong> ${formattedDate}${data.preferredTime ? ` at ${data.preferredTime}` : ''}</p>
            <p>Our team will review your request and contact you within 1-2 business days to confirm the survey schedule.</p>
            <p>If the requested date is not available, we will suggest alternative dates that work for both parties.</p>
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
      message: 'Survey request submitted successfully. We will contact you soon to schedule the survey.',
      leadId: lead.id,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    logger.error('Survey request submission error:', errorMessage)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit survey request. Please try again later.',
        message: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}

