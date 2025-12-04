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
          "text-white hover:text-orange active:text-orange",
          "bg-black hover:bg-transparent active:bg-transparent",
          "border border-black hover:border-orange active:border-orange",
          "rounded-lg"
        ],
        secondary: [
          "font-medium",
          "text-black hover:text-white active:text-white",
          "bg-transparent hover:bg-orange active:bg-orange",
          "border border-black hover:border-orange active:border-orange",
          "rounded-lg"
        ],  
        tertiary: [
          "font-medium",
          "text-black hover:text-orange active:text-orange"
        ],
        quaternary:[
          "justify-start",
          "font-medium",
          "text-sm text-black",
          "bg-gray-dark hover:bg-white active:bg-white",
          "border border-transparent hover:border-white active:border-white",
          "rounded-lg"
        ],
        icon: [
          "text-black hover:text-orange active:text-orange"
        ],
        logo: [
          "font-bold",
          "text-xl text-black hover:text-orange active:text-orange",
          "border-y border-black hover:border-orange active:border-orange"
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