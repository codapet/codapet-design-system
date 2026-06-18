import { AlertBanner } from '@codapet/design-system'
import { CircleCheck, Info, TriangleAlert } from 'lucide-react'

export const Types = () => (
  <div className="flex w-full max-w-md flex-col gap-4">
    <AlertBanner type="informative" icon={<Info />} heading="Vet running behind">
      Dr. Nguyen is about 15 minutes behind schedule. We&rsquo;ll text you when
      she&rsquo;s on the way to your home.
    </AlertBanner>
    <AlertBanner
      type="success"
      icon={<CircleCheck />}
      heading="Booking confirmed"
    >
      Milo&rsquo;s end-of-life care visit is scheduled for Saturday at 10 AM.
    </AlertBanner>
    <AlertBanner type="error" icon={<TriangleAlert />} heading="Visit unavailable">
      No vets are available in your area for that date. Please choose another
      time slot.
    </AlertBanner>
  </div>
)

export const Dismissible = () => (
  <div className="w-full max-w-md">
    <AlertBanner
      type="informative"
      icon={<Info />}
      heading="Complete your pet&rsquo;s profile"
      dismissible
    >
      Add weight and medication details so your vet can prepare for the home
      visit.
    </AlertBanner>
  </div>
)

export const Compact = () => (
  <div className="w-full max-w-md">
    <AlertBanner type="success" icon={<CircleCheck />}>
      Aftercare keepsake request received &mdash; we&rsquo;ll be in touch soon.
    </AlertBanner>
  </div>
)
