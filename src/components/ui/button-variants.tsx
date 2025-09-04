import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Devotional variants using design system
        divine: 
          "bg-gradient-saffron text-primary-foreground shadow-divine hover:shadow-glow transition-all duration-300 font-semibold",
        holy: 
          "glass border-2 border-primary/20 text-primary shadow-glass hover:shadow-divine backdrop-blur-glass transition-all duration-300",
        prasad:
          "bg-gradient-sunset text-primary-foreground shadow-divine hover:scale-105 transition-all duration-200 font-medium",
        mandal:
          "bg-gradient-divine text-primary-foreground shadow-glow hover:shadow-divine border-2 border-secondary/30 transition-all duration-300",
        vote:
          "glass border-2 border-accent/30 text-accent-foreground hover:bg-accent/10 hover:border-accent transition-all duration-200",
        floating:
          "glass shadow-divine animate-float border border-primary/20 backdrop-blur-glass hover:shadow-glow transition-all duration-300"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base font-semibold",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>