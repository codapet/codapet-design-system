import { Label, OptionCard } from '@codapet/design-system'
import { Cat, Dog, Rabbit } from 'lucide-react'

export const PickSpecies = () => (
  <div className="flex w-72 flex-col gap-2">
    <Label size="sm">What kind of pet do you have?</Label>
    <OptionCard weight="resizable" icon={<Dog />} selected>
      Dog
    </OptionCard>
    <OptionCard weight="resizable" icon={<Cat />}>
      Cat
    </OptionCard>
    <OptionCard weight="resizable" icon={<Rabbit />}>
      Rabbit
    </OptionCard>
  </div>
)

export const MultiSelectServices = () => (
  <div className="flex w-72 flex-col gap-2">
    <Label size="sm">Which services are you interested in?</Label>
    <OptionCard
      weight="resizable"
      selectionType="multiple"
      selectorPosition="left"
      selected
    >
      Wellness exam
    </OptionCard>
    <OptionCard
      weight="resizable"
      selectionType="multiple"
      selectorPosition="left"
      selected
    >
      Vaccinations
    </OptionCard>
    <OptionCard
      weight="resizable"
      selectionType="multiple"
      selectorPosition="left"
    >
      Bloodwork
    </OptionCard>
  </div>
)

export const States = () => (
  <div className="flex w-72 flex-col gap-2">
    <OptionCard weight="resizable" selected>
      In-home euthanasia
    </OptionCard>
    <OptionCard weight="resizable">Quality-of-life assessment</OptionCard>
    <OptionCard weight="resizable" disabled>
      Cremation (coming soon)
    </OptionCard>
  </div>
)
