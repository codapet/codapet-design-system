import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@codapet/design-system'
import { Stethoscope } from 'lucide-react'

export const VetPreview = () => (
  <HoverCard defaultOpen>
    <HoverCardTrigger asChild>
      <Button size="md" variant="ghost">
        Dr. Sarah Chen
      </Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-72">
      <div className="flex gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Stethoscope className="size-5" />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-semibold">Dr. Sarah Chen, DVM</p>
          <p className="text-sm text-muted-foreground">
            12 years in mobile veterinary care, specializing in geriatric pets
            and in-home euthanasia.
          </p>
          <p className="text-xs text-brand-text-vibrant">Serving Portland, OR</p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
)

export const PetSummary = () => (
  <HoverCard defaultOpen>
    <HoverCardTrigger asChild>
      <Button size="md" variant="ghost">
        Bella
      </Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-64">
      <div className="space-y-1">
        <p className="text-sm font-semibold">Bella</p>
        <p className="text-sm text-muted-foreground">
          9-year-old Labrador Retriever, 68 lbs.
        </p>
        <p className="text-sm text-muted-foreground">
          Last visit: Annual wellness exam, May 2026.
        </p>
      </div>
    </HoverCardContent>
  </HoverCard>
)
