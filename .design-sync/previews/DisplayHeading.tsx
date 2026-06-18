import { DisplayHeading } from '@codapet/design-system'

export const Sizes = () => (
  <div className="flex flex-col gap-3">
    <DisplayHeading size="lg">Compassionate care</DisplayHeading>
    <DisplayHeading size="md">Compassionate care</DisplayHeading>
    <DisplayHeading size="sm">Compassionate care</DisplayHeading>
  </div>
)

export const InContext = () => (
  <div className="max-w-md">
    <DisplayHeading size="md">Every pet deserves a gentle goodbye</DisplayHeading>
    <p className="mt-3 text-base text-muted-foreground">
      CodaPet connects families with licensed veterinarians for peaceful,
      in-home end-of-life care — on your schedule, in a place your pet loves.
    </p>
  </div>
)
