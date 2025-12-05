"use client"

import { useCallback as Callback, useState as State, useRef as Ref, useEffect as Effect } from "react"
import { useTheme } from "next-themes"
import * as Primitive from "@radix-ui/react-switch"
import { cva, type VariantProps as Props } from "class-variance-authority"
import { Moon, Sun } from "@/components/icons"

import { cn } from "@/lib/utils"

const Variants = cva(
  [],
  {
    variants: {
      variant: {
        icon: [
          "inline-flex items-center justify-center",
          "text-black hover:text-orange",
          "outline-none",
          "relative w-5 h-5",
          "[perspective:1000px]",
        ],
      },
      size: {
        icon: [
          "w-5 h-5",
        ],
      },
    },
    defaultVariants: {
      variant: undefined,
      size: undefined,
    },
  }
)

type Phase = 'idle' | 'hovering' | 'animating' | 'clicked'

function Switch({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Primitive.Root> & Props<typeof Variants>) {
  const { theme, setTheme } = useTheme()
  const [checked, $checked] = State(theme === 'dark')
  const [phase, $phase] = State<Phase>('idle')
  const timeout = Ref<NodeJS.Timeout | null>(null)

  Effect(() => {
    $checked(theme === 'dark')
  }, [theme])

  const change = Callback((newChecked: boolean) => {
    if (phase !== 'animating') return
    
    $phase('clicked')
    $checked(newChecked)
    setTheme(newChecked ? 'dark' : 'light')
  }, [phase, setTheme])

  if (variant !== 'icon') {
    return (
      <Primitive.Root
        data-slot="switch"
        checked={checked}
        onCheckedChange={change}
        className={cn(Variants({ variant, size, className }))}
        {...props}
      >
        <Primitive.Thumb data-slot="switch-thumb" />
      </Primitive.Root>
    )
  }

  return (
    <Primitive.Root
      data-slot="switch"
      checked={checked}
      onCheckedChange={change}
      onMouseEnter={() => {
        if (phase === 'idle') {
          $phase('hovering')
          timeout.current = setTimeout(() => $phase('animating'), 300)
        }
      }}
      onMouseLeave={() => {
        if (timeout.current) {
          clearTimeout(timeout.current)
          timeout.current = null
        }
        $phase('idle')
      }}
      className={cn(Variants({ variant, size, className }))}
      {...props}
    >
      <div 
        className={cn(
          "relative w-5 h-5 transition-transform ease-in-out [transform-style:preserve-3d]",
          (phase === 'hovering' || phase === 'animating') ? (checked ? '[transform:rotateY(-180deg)]' : '[transform:rotateY(180deg)]') : '',
          phase === 'clicked' ? 'duration-0' : 'duration-500'
        )}
        style={{ 
          WebkitFontSmoothing: 'antialiased',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        {!checked ? (
          <>
            <Sun 
              variant="solid"
              className="absolute inset-0 w-5 h-5 [backface-visibility:hidden]"
            />
            <Moon 
              variant="solid"
              className="absolute inset-0 w-5 h-5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
            />
          </>
        ) : (
          <>
            <Moon 
              variant="outline"
              className="absolute inset-0 w-5 h-5 [backface-visibility:hidden]"
            />
            <Sun 
              variant="outline"
              className="absolute inset-0 w-5 h-5 [backface-visibility:hidden] [transform:rotateY(-180deg)]"
            />
          </>
        )}
      </div>
    </Primitive.Root>
  )
}

export { Switch, Variants }