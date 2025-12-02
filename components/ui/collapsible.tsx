"use client"

import * as Primitive from "@radix-ui/react-collapsible"

function Collapsible({
  ...props
}: React.ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root data-slot="collapsible" {...props} />
}

function Trigger({
  ...props
}: React.ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Trigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function Content({
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, Trigger, Content }
