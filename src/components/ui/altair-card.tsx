import * as React from 'react'

import { cn } from '@/utilities/ui'

const AltairCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hover?: boolean
  }
>(({ className, hover = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-border-gray bg-clinical-white p-6 shadow-sm',
      hover && 'hover-lift transition-smooth',
      className
    )}
    {...props}
  />
))
AltairCard.displayName = 'AltairCard'

const AltairCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
))
AltairCardHeader.displayName = 'AltairCardHeader'

const AltairCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-semibold leading-none tracking-tight text-brand-navy', className)}
    {...props}
  />
))
AltairCardTitle.displayName = 'AltairCardTitle'

const AltairCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-gray', className)}
    {...props}
  />
))
AltairCardDescription.displayName = 'AltairCardDescription'

const AltairCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-6', className)} {...props} />
))
AltairCardContent.displayName = 'AltairCardContent'

const AltairCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6', className)}
    {...props}
  />
))
AltairCardFooter.displayName = 'AltairCardFooter'

export {
  AltairCard,
  AltairCardHeader,
  AltairCardFooter,
  AltairCardTitle,
  AltairCardDescription,
  AltairCardContent,
}

