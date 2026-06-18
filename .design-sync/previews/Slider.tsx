import { Slider, Label } from '@codapet/design-system'

export const TravelRadius = () => (
  <div className="flex w-80 flex-col gap-3">
    <div className="flex items-center justify-between">
      <Label htmlFor="radius">Vet travel radius</Label>
      <span className="text-sm text-muted-foreground">15 mi</span>
    </div>
    <Slider id="radius" defaultValue={[15]} min={5} max={50} step={5} />
    <p className="text-sm text-muted-foreground">
      How far our mobile vets will drive for your in-home visit.
    </p>
  </div>
)

export const BudgetRange = () => (
  <div className="flex w-80 flex-col gap-3">
    <div className="flex items-center justify-between">
      <Label htmlFor="budget">Estimated budget</Label>
      <span className="text-sm text-muted-foreground">$200 – $400</span>
    </div>
    <Slider
      id="budget"
      defaultValue={[200, 400]}
      min={100}
      max={600}
      step={50}
    />
  </div>
)
