"use client"

import * as React from "react"
import { Command as Primitive } from "cmdk"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent as Content,
  DialogDescription as Description,
  DialogHeader as Header,
  DialogTitle as Title,
} from "@/components/ui/dialog"

const Variants = cva(
  [
    "w-full",
    "rounded-lg",
    "transition-colors duration-300",
    "focus:outline-none focus-visible:outline-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "font-medium",
          "text-text placeholder:text-text",
          "caret-accent selection:bg-accent selection:text-white",
          "bg-primary",
          "border border-transparent",
        ],
      },
      size: {
        primary: [
          "px-5 py-2.5",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
    },
  }
)

function Command({
  className,
  ...props
}: React.ComponentProps<typeof Primitive>) {
  return (
    <Primitive
      data-slot="command"
      className={cn(
        "flex flex-col",
        className
      )}
      {...props}
    />
  )
}

function Spotlight({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <Header className="sr-only">
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Header>
      <Content
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </Content>
    </Dialog>
  )
}

function Input({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof Primitive.Input> &
  VariantProps<typeof Variants>) {
  return (
    <Primitive.Input
      data-slot="command-input"
      className={cn(Variants({ variant, className }))}
      {...props}
    />
  )
}

function List({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.List>) {
  return (
    <Primitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function Empty({
  ...props
}: React.ComponentProps<typeof Primitive.Empty>) {
  return (
    <Primitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function Group({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Group>) {
  return (
    <Primitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  )
}

function Separator({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Separator>) {
  return (
    <Primitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

function Item({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function Shortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  Spotlight,
  Input,
  List,
  Empty,
  Group,
  Item,
  Shortcut,
  Separator,
}
