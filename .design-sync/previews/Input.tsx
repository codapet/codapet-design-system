import { Input, Label } from '@codapet/design-system'
import { Mail, Search } from 'lucide-react'

export const Default = () => (
  <div className="flex w-72 flex-col gap-1.5">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@codapet.com" />
  </div>
)

export const WithIcons = () => (
  <div className="flex w-72 flex-col gap-3">
    <Input leftIcon={<Search className="size-4" />} placeholder="Search pets" />
    <Input
      leftIcon={<Mail className="size-4" />}
      placeholder="you@codapet.com"
      defaultValue="sarah@codapet.com"
    />
  </div>
)

export const Sizes = () => (
  <div className="flex w-72 flex-col gap-3">
    <Input size="sm" placeholder="Small" />
    <Input size="md" placeholder="Medium (default)" />
    <Input size="lg" placeholder="Large" />
  </div>
)

export const States = () => (
  <div className="flex w-72 flex-col gap-3">
    <Input placeholder="Default" />
    <Input error defaultValue="not-an-email" placeholder="Invalid email" />
    <Input disabled placeholder="Disabled" />
  </div>
)
