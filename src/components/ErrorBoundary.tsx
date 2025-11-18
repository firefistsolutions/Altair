'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { AltairButton } from './ui/altair-button'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
    // In production, you might want to log to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-brand-navy mb-2">Something went wrong</h2>
            <p className="text-slate-gray mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <AltairButton
              variant="bronze"
              onClick={() => {
                this.setState({ hasError: false, error: undefined })
                window.location.reload()
              }}
            >
              Refresh Page
            </AltairButton>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

