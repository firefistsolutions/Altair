import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'

const altairButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-brand-navy text-white hover:bg-brand-navy/90 focus-visible:ring-brand-navy',
        bronze:
          'bg-brand-bronze text-white hover:bg-brand-bronze/90 focus-visible:ring-brand-bronze shadow-sm hover:shadow-md',
        gold: 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90 focus-visible:ring-brand-gold',
        outline:
          'border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white',
        'outline-bronze':
          'border-2 border-brand-bronze text-brand-bronze hover:bg-brand-bronze hover:text-white',
        ghost: 'text-brand-navy hover:bg-light-gray',
        link: 'text-brand-navy underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface AltairButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof altairButtonVariants> {
  asChild?: boolean
}

const AltairButton = React.forwardRef<HTMLButtonElement, AltairButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(altairButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
AltairButton.displayName = 'AltairButton'

export { AltairButton, altairButtonVariants }

