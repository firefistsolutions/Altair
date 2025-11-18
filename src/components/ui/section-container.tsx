import * as React from 'react'
import { cn } from '@/utilities/ui'

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-full',
}

const paddingClasses = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-24 md:py-32',
}

const SectionContainer = React.forwardRef<HTMLDivElement, SectionContainerProps>(
  (
    {
      className,
      as: Component = 'section',
      size = 'lg',
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
SectionContainer.displayName = 'SectionContainer'

export { SectionContainer }

