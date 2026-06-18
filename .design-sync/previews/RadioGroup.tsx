import { RadioGroup, RadioGroupItem, Label } from '@codapet/design-system'

export const VisitType = () => (
  <RadioGroup defaultValue="wellness" className="flex w-80 flex-col gap-3">
    <div className="flex items-center gap-3">
      <RadioGroupItem value="wellness" id="visit-wellness" />
      <Label htmlFor="visit-wellness">Wellness exam</Label>
    </div>
    <div className="flex items-center gap-3">
      <RadioGroupItem value="vaccines" id="visit-vaccines" />
      <Label htmlFor="visit-vaccines">Vaccines &amp; boosters</Label>
    </div>
    <div className="flex items-center gap-3">
      <RadioGroupItem value="hospice" id="visit-hospice" />
      <Label htmlFor="visit-hospice">Hospice &amp; quality-of-life</Label>
    </div>
    <div className="flex items-center gap-3">
      <RadioGroupItem value="euthanasia" id="visit-euthanasia" />
      <Label htmlFor="visit-euthanasia">In-home euthanasia</Label>
    </div>
  </RadioGroup>
)

export const PreferredTime = () => (
  <RadioGroup defaultValue="afternoon" className="flex w-72 flex-col gap-3">
    <div className="flex items-center gap-3">
      <RadioGroupItem value="morning" id="time-morning" />
      <Label htmlFor="time-morning">Morning (8am – 12pm)</Label>
    </div>
    <div className="flex items-center gap-3">
      <RadioGroupItem value="afternoon" id="time-afternoon" />
      <Label htmlFor="time-afternoon">Afternoon (12pm – 5pm)</Label>
    </div>
    <div className="flex items-center gap-3">
      <RadioGroupItem value="evening" id="time-evening" />
      <Label htmlFor="time-evening">Evening (5pm – 8pm)</Label>
    </div>
  </RadioGroup>
)
