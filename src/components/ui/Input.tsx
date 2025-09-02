import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search'
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    variant = 'default',
    error,
    leftIcon,
    rightIcon,
    label,
    helperText,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    const baseStyles = 'flex h-10 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'
    
    const variants = {
      default: '',
      search: 'pl-10'
    }

    const errorStyles = error ? 'border-red-500 focus-visible:ring-red-500' : ''

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              baseStyles,
              variants[variant],
              errorStyles,
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            id={inputId}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
