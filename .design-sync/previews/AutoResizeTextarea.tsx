import { AutoResizeTextarea, Label } from '@codapet/design-system'

export const PetHistory = () => (
  <div className="flex w-80 flex-col gap-1.5">
    <Label htmlFor="history">Medical history</Label>
    <AutoResizeTextarea
      id="history"
      placeholder="Share past diagnoses, surgeries, or ongoing treatments..."
      defaultValue={
        'Max was diagnosed with hip dysplasia at age 7. He had a dental cleaning last spring and is currently on a joint supplement. No known drug allergies.\n\nHe has been slowing down on walks over the past month and seems stiff in the mornings.'
      }
      minHeight={120}
      maxHeight={260}
    />
  </div>
)

export const ShortNote = () => (
  <div className="flex w-80 flex-col gap-1.5">
    <Label htmlFor="gate-code">Access instructions</Label>
    <AutoResizeTextarea
      id="gate-code"
      placeholder="Gate code, parking, or where to meet"
      defaultValue="Gate code is 4821. Park in the driveway."
      minHeight={80}
    />
  </div>
)

export const Empty = () => (
  <div className="flex w-80 flex-col gap-1.5">
    <Label htmlFor="goodbye">A message about your pet</Label>
    <AutoResizeTextarea
      id="goodbye"
      placeholder="Tell us about your companion and what matters most to you"
      minHeight={120}
    />
  </div>
)
