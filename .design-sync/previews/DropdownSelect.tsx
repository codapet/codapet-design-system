import {
  DropdownSelect,
  DropdownSelectContent,
  DropdownSelectLabel,
  DropdownSelectOption,
  DropdownSelectTrigger
} from '@codapet/design-system'
import { Stethoscope } from 'lucide-react'

export const SelectVet = () => (
  <div className="w-72">
    <DropdownSelect defaultValue="chen" defaultOpen icon={<Stethoscope />}>
      <DropdownSelectLabel className="mb-2" mandatory>
        Preferred veterinarian
      </DropdownSelectLabel>
      <DropdownSelectTrigger />
      <DropdownSelectContent>
        <DropdownSelectOption value="chen" label="Dr. Sarah Chen" />
        <DropdownSelectOption value="patel" label="Dr. Anil Patel" />
        <DropdownSelectOption value="okafor" label="Dr. Grace Okafor" />
        <DropdownSelectOption value="reyes" label="Dr. Miguel Reyes" />
        <DropdownSelectOption value="no-pref" label="No preference" />
      </DropdownSelectContent>
    </DropdownSelect>
  </div>
)

export const PetWeightRange = () => (
  <div className="w-72">
    <DropdownSelect placeholder="Select weight range">
      <DropdownSelectLabel className="mb-2">
        Pet weight range
      </DropdownSelectLabel>
      <DropdownSelectTrigger />
      <DropdownSelectContent>
        <DropdownSelectOption value="toy" label="Under 10 lbs" />
        <DropdownSelectOption value="small" label="10 – 25 lbs" />
        <DropdownSelectOption value="medium" label="25 – 50 lbs" />
        <DropdownSelectOption value="large" label="50 – 90 lbs" />
        <DropdownSelectOption value="giant" label="Over 90 lbs" />
      </DropdownSelectContent>
    </DropdownSelect>
  </div>
)

export const ErrorState = () => (
  <div className="w-72">
    <DropdownSelect error placeholder="Select a relationship">
      <DropdownSelectLabel className="mb-2" mandatory>
        Relationship to pet
      </DropdownSelectLabel>
      <DropdownSelectTrigger />
      <DropdownSelectContent>
        <DropdownSelectOption value="owner" label="Owner" />
        <DropdownSelectOption value="family" label="Family member" />
        <DropdownSelectOption value="caretaker" label="Caretaker" />
      </DropdownSelectContent>
    </DropdownSelect>
  </div>
)
