import { BadgeInformative } from '@codapet/design-system'
import { Info } from 'lucide-react'

// Informative pills for the booking flow, one per color scheme.
export const ColorSchemes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <BadgeInformative colorScheme="blue" icon={<Info className="size-3.5" />}>
      Vet en route
    </BadgeInformative>
    <BadgeInformative colorScheme="yellow">
      Awaiting confirmation
    </BadgeInformative>
    <BadgeInformative
      colorScheme="gray"
      linkText="View visit details"
      linkHref="#"
    >
      Booked for Jun 24
    </BadgeInformative>
  </div>
)
