import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for quote request form
const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  projectType: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    // Extract form fields
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string | null
    const organization = formData.get('organization') as string | null
    const projectType = formData.get('projectType') as string | null
    const description = formData.get('description') as string
    const floorPlanFile = formData.get('floorPlan') as File | null

    // Validate form data
    const validationResult = quoteFormSchema.safeParse({
      name,
      email,
      phone: phone || undefined,
      organization: organization || undefined,
      projectType: projectType || undefined,
      description,
    })

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

    // Handle file upload if provided
    let floorPlanMediaId: string | number | null = null
    if (floorPlanFile && floorPlanFile.size > 0) {
      try {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
        if (!validTypes.includes(floorPlanFile.type)) {
          return NextResponse.json(
            {
              success: false,
              error: 'Invalid file type. Please upload PDF, JPG, or PNG',
            },
            { status: 400 }
          )
        }

        // Validate file size (max 10MB)
        if (floorPlanFile.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            {
              success: false,
              error: 'File size must be less than 10MB',
            },
            { status: 400 }
          )
        }

        // Convert File to Buffer
        const arrayBuffer = await floorPlanFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Upload to Payload Media collection
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: `Floor plan for ${data.name}'s quote request`,
          },
          file: {
            data: buffer,
            mimetype: floorPlanFile.type,
            name: floorPlanFile.name,
            size: floorPlanFile.size,
          },
        })

        floorPlanMediaId = media.id
      } catch (fileError: any) {
        console.error('File upload error:', fileError)
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to upload file. Please try again.',
            message: fileError.message,
          },
          { status: 500 }
        )
      }
    }

    // Save to Leads collection
    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: data.name,
        email: data.email,
        phone: phone || '',
        company: organization || '',
        message: description,
        source: 'quote',
        status: 'new',
        metadata: {
          projectType: projectType || '',
          floorPlanMediaId: floorPlanMediaId,
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
          subject: `New Quote Request: ${projectType || 'General Inquiry'}`,
          html: `
            <h2>New Quote Request</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
            ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
            <p><strong>Description:</strong></p>
            <p>${data.description.replace(/\n/g, '<br>')}</p>
            ${floorPlanMediaId ? `<p><strong>Floor Plan:</strong> Uploaded (Media ID: ${floorPlanMediaId})</p>` : ''}
            <hr>
            <p><small>Lead ID: ${lead.id}</small></p>
          `,
        })

        // Send confirmation email to user
        await resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject: 'Quote Request Received - Altair Medical System',
          html: `
            <h2>Thank you for your quote request!</h2>
            <p>Dear ${data.name},</p>
            <p>We have received your quote request for <strong>${projectType || 'your project'}</strong>.</p>
            <p>Our technical team will review your requirements and get back to you within 1-2 business days with a detailed quote.</p>
            ${floorPlanMediaId ? '<p>✓ Your floor plan has been received and will be reviewed by our team.</p>' : ''}
            <hr>
            <p><strong>Altair Medical System Pvt. Ltd.</strong></p>
            <p>Plot No. B-437, Bhamashah Industrial Area<br>
            Kaladwas, Rajasthan 313002, India</p>
            <p>Email: marketing@altairmedical.com<br>
            Phone: +91 92518 59361</p>
          `,
        })
      } catch (emailError: any) {
        // Log email error but don't fail the request
        console.error('Email notification failed:', emailError.message)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully. We will get back to you soon.',
      leadId: lead.id,
      floorPlanUploaded: !!floorPlanMediaId,
    })
  } catch (error: any) {
    console.error('Quote request submission error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit quote request. Please try again later.',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

