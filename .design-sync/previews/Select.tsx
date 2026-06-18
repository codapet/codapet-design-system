import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@codapet/design-system'

export const PetSpecies = () => (
  <div className="flex w-72 flex-col gap-1.5">
    <Label htmlFor="species">Pet species</Label>
    <Select defaultValue="dog" defaultOpen>
      <SelectTrigger id="species" className="w-full">
        <SelectValue placeholder="Select species" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dog">Dog</SelectItem>
        <SelectItem value="cat">Cat</SelectItem>
        <SelectItem value="rabbit">Rabbit</SelectItem>
        <SelectItem value="guinea-pig">Guinea pig</SelectItem>
        <SelectItem value="ferret">Ferret</SelectItem>
      </SelectContent>
    </Select>
  </div>
)

export const AppointmentType = () => (
  <div className="flex w-72 flex-col gap-1.5">
    <Label htmlFor="visit-type">Visit type</Label>
    <Select defaultValue="wellness" defaultOpen>
      <SelectTrigger id="visit-type" className="w-full">
        <SelectValue placeholder="Select a visit type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Routine care</SelectLabel>
          <SelectItem value="wellness">Wellness exam</SelectItem>
          <SelectItem value="vaccination">Vaccination</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>End-of-life</SelectLabel>
          <SelectItem value="quality-of-life">
            Quality-of-life assessment
          </SelectItem>
          <SelectItem value="euthanasia">In-home euthanasia</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
)

export const ClosedWithValue = () => (
  <div className="flex w-72 flex-col gap-1.5">
    <Label htmlFor="time-window">Preferred time window</Label>
    <Select defaultValue="morning">
      <SelectTrigger id="time-window" className="w-full">
        <SelectValue placeholder="Select a window" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="morning">Morning (8 AM – 12 PM)</SelectItem>
        <SelectItem value="afternoon">Afternoon (12 – 4 PM)</SelectItem>
        <SelectItem value="evening">Evening (4 – 7 PM)</SelectItem>
      </SelectContent>
    </Select>
  </div>
)
