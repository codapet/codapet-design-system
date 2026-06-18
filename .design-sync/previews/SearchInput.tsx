import { SearchInput } from '@codapet/design-system'
import { MapPin, Stethoscope } from 'lucide-react'

export const FindVet = () => (
  <div className="w-80">
    <SearchInput
      label="Find a home-visit vet"
      placeholder="Search by name or city"
      icon={<MapPin />}
      defaultValue="Dr. Sarah Chen"
      helperText="We serve 40+ cities across the US"
    />
  </div>
)

export const ButtonVariant = () => (
  <div className="w-80">
    <SearchInput
      variant="button"
      label="Search appointments"
      placeholder="Search by pet name or date"
      defaultValue="Bella"
    />
  </div>
)

export const ErrorState = () => (
  <div className="w-80">
    <SearchInput
      label="ZIP code"
      placeholder="Enter your ZIP code"
      icon={<MapPin />}
      error
      defaultValue="0000"
      errorMessage="We don't serve this area yet"
    />
  </div>
)

export const Disabled = () => (
  <div className="w-80">
    <SearchInput
      label="Assigned clinic"
      icon={<Stethoscope />}
      disabled
      defaultValue="CodaPet Mobile Care"
    />
  </div>
)
