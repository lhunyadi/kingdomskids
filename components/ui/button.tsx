import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps as Props} from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"


const Variants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "gap-2",
    "whitespace-nowrap select-none",
    "transition-colors duration-300",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0",
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "font-medium",
          "text-background hover:text-accent active:text-accent",
          "bg-text hover:bg-transparent active:bg-transparent",
          "border border-text hover:border-accent active:border-accent",
          "rounded-lg"
        ],
        secondary: [
          "font-medium",
          "text-text hover:text-background active:text-background",
          "bg-transparent hover:bg-accent active:bg-accent",
          "border border-text hover:border-accent active:border-accent",
          "rounded-lg"
        ],  
        tertiary: [
          "font-medium",
          "text-text hover:text-accent active:text-accent"
        ],
        quaternary:[
          "justify-start",
          "font-medium",
          "text-sm text-text",
          "bg-secondary hover:bg-background active:bg-background",
          "border border-transparent hover:border-background active:border-background",
          "rounded-lg"
        ],
        icon: [
          "text-text hover:text-accent active:text-accent"
        ],
        logo: [
          "font-bold",
          "text-xl text-text hover:text-accent active:text-accent",
          "border-y border-text hover:border-accent active:border-accent"
        ],
      },
      size: {
        primary: [
          "px-5 py-2.5"
        ],
        secondary: [
          "px-5 py-2.5"
        ],
        tertiary: [
          "px-5 py-2.5"
        ],
        quaternary: [
          "px-2.5 py-2.5"
        ],
        icon: [
          "p-2.5"
        ],
        logo: [
          "px-5 py-1.5"
        ],
      },
    },
    defaultVariants: {
      variant: "tertiary",
      size: "tertiary",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  Props<typeof Variants> & {
    asChild?: boolean
  }) {
  const Component = asChild ? Slot : "button"

  return (
    <Component
      data-slot="button"
      className={cn(Variants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, Variants }