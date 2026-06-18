import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@codapet/design-system'
import { Info } from 'lucide-react'

export const VetAvailability = () => (
  <Popover defaultOpen>
    <PopoverTrigger asChild>
      <Button size="md" variant="ghost">
        Availability
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-72">
      <div className="space-y-2">
        <p className="text-sm font-semibold">Dr. Sarah Chen</p>
        <p className="text-sm text-muted-foreground">
          Next in-home visits available this week:
        </p>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>Tue, Jul 14 · 10:30 AM</li>
          <li>Thu, Jul 16 · 2:00 PM</li>
          <li>Fri, Jul 17 · 9:00 AM</li>
        </ul>
        <Button size="md" className="w-full">
          Book a slot
        </Button>
      </div>
    </PopoverContent>
  </Popover>
)

export const CareTip = () => (
  <Popover defaultOpen>
    <PopoverTrigger asChild>
      <Button size="md" variant="ghost" aria-label="More info">
        <Info className="size-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-72">
      <div className="space-y-1">
        <p className="text-sm font-semibold">What is a quality-of-life score?</p>
        <p className="text-sm text-muted-foreground">
          A vet-guided assessment of your pet's comfort, mobility, and
          happiness that helps inform end-of-life care decisions.
        </p>
      </div>
    </PopoverContent>
  </Popover>
)
