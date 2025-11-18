import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'

const altairBadgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-brand-navy text-white hover:bg-brand-navy/80',
        bronze:
          'border-transparent bg-brand-bronze text-white hover:bg-brand-bronze/80',
        gold: 'border-transparent bg-brand-gold text-brand-navy hover:bg-brand-gold/80',
        outline: 'border-brand-navy text-brand-navy',
        'outline-bronze': 'border-brand-bronze text-brand-bronze',
        secondary:
          'border-transparent bg-light-gray text-brand-navy hover:bg-light-gray/80',
        success: 'border-transparent bg-soft-aqua text-white',
        warning: 'border-transparent bg-signal-orange text-white',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface AltairBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof altairBadgeVariants> {}

function AltairBadge({ className, variant, size, ...props }: AltairBadgeProps) {
  return (
    <div
      className={cn(altairBadgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { AltairBadge, altairBadgeVariants }

