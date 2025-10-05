/**
 * 
https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/www/registry/default/ui/button.tsx
	*/
import * as React from 'react'

import { cn, cva, type VariantProps } from './utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-12 rounded-md text-4xl px-8',
        sm: 'h-9 rounded-md px-3',
      },
      variant: {
        default:
          'border border-input bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'border border-input bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'border border-input text-primary underline-offset-4 hover:underline',
        outline: 'border border-input bg-background',
        secondary:
          'border border-input bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success: 'border border-input bg-accent text-accent-foreground',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }, ref)=> {
    return (
      <button
        className={cn(
          buttonVariants({ className, size, variant }),
          'cursor-pointer',
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
