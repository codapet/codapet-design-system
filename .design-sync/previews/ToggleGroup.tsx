import { ToggleGroup, ToggleGroupItem } from '@codapet/design-system'
import { Cat, Dog, Rabbit } from 'lucide-react'

export const PetType = () => (
  <ToggleGroup type="single" defaultValue="dog" variant="outline">
    <ToggleGroupItem value="dog" aria-label="Dog">
      <Dog className="size-4" />
      Dog
    </ToggleGroupItem>
    <ToggleGroupItem value="cat" aria-label="Cat">
      <Cat className="size-4" />
      Cat
    </ToggleGroupItem>
    <ToggleGroupItem value="other" aria-label="Other">
      <Rabbit className="size-4" />
      Other
    </ToggleGroupItem>
  </ToggleGroup>
)

export const VisitDays = () => (
  <ToggleGroup type="multiple" defaultValue={['mon', 'wed', 'fri']} size="sm">
    <ToggleGroupItem value="mon" aria-label="Monday">
      Mon
    </ToggleGroupItem>
    <ToggleGroupItem value="tue" aria-label="Tuesday">
      Tue
    </ToggleGroupItem>
    <ToggleGroupItem value="wed" aria-label="Wednesday">
      Wed
    </ToggleGroupItem>
    <ToggleGroupItem value="thu" aria-label="Thursday">
      Thu
    </ToggleGroupItem>
    <ToggleGroupItem value="fri" aria-label="Friday">
      Fri
    </ToggleGroupItem>
  </ToggleGroup>
)
