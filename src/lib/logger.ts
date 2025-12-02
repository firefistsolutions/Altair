/**
 * Logger utility for consistent logging across the application
 * In production, this should integrate with a proper logging service
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private log(level: LogLevel, message: string, context?: LogContext) {
    if (!this.isDevelopment && level === 'debug') {
      return // Don't log debug messages in production
    }

    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

    if (context && Object.keys(context).length > 0) {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        logMessage,
        context
      )
    } else {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](logMessage)
    }

    // In production, send to logging service (e.g., Sentry, LogRocket, etc.)
    if (!this.isDevelopment && level === 'error') {
      // TODO: Integrate with error tracking service
      // Example: Sentry.captureException(new Error(message), { extra: context })
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context)
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context)
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    if (error instanceof Error) {
      this.log('error', message, {
        ...context,
        error: {
          name: error.name,
          message: error.message,
          stack: this.isDevelopment ? error.stack : undefined,
        },
      })
    } else {
      this.log('error', message, { ...context, error })
    }
  }

  debug(message: string, context?: LogContext) {
    this.log('debug', message, context)
  }
}

export const logger = new Logger()
