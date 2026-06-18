import { Separator } from '@codapet/design-system'

export const Horizontal = () => (
  <div className="w-80">
    <div className="space-y-1">
      <h4 className="text-sm font-medium">CodaPet home vet care</h4>
      <p className="text-sm text-muted-foreground">
        Compassionate veterinary visits in the comfort of your home.
      </p>
    </div>
    <Separator className="my-4" />
    <p className="text-sm text-muted-foreground">
      Wellness exams, vaccinations, and end-of-life care &mdash; all on your
      schedule.
    </p>
  </div>
)

export const Vertical = () => (
  <div className="flex h-6 items-center gap-3 text-sm">
    <span>Wellness</span>
    <Separator orientation="vertical" />
    <span>End-of-life</span>
    <Separator orientation="vertical" />
    <span>Memorial</span>
  </div>
)

export const VisitMeta = () => (
  <div className="w-80 rounded-lg border p-4">
    <p className="text-sm font-medium">Bella&rsquo;s appointment</p>
    <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
      <span>Thu, 2:00 PM</span>
      <Separator orientation="vertical" className="h-4" />
      <span>Dr. Patel</span>
      <Separator orientation="vertical" className="h-4" />
      <span>Wellness exam</span>
    </div>
  </div>
)
