import { Button } from '@codapet/design-system'
import { ArrowRight, Plus, Trash2 } from 'lucide-react'

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="destructive">Delete account</Button>
    <Button variant="destructive-secondary">Remove</Button>
  </div>
)

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="icon" aria-label="Add">
      <Plus className="size-4" />
    </Button>
  </div>
)

export const WithIcons = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="md">
      <Plus className="size-4" /> New booking
    </Button>
    <Button size="md" variant="secondary">
      Continue <ArrowRight className="size-4" />
    </Button>
    <Button size="md" variant="ghost-destructive">
      <Trash2 className="size-4" /> Delete
    </Button>
  </div>
)

export const States = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="md">Default</Button>
    <Button size="md" disabled>
      Disabled
    </Button>
    <Button size="md" variant="outline" disabled>
      Disabled outline
    </Button>
  </div>
)
