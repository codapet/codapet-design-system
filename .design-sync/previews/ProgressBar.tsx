import { ProgressBar } from '@codapet/design-system'

export const BookingSteps = () => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-medium">Step 3 of 7 &middot; Choose a time</span>
    <ProgressBar currentStep={3} totalSteps={7} />
  </div>
)

export const OnboardingPercent = () => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-medium">Vet onboarding &middot; 60% complete</span>
    <ProgressBar value={60} />
  </div>
)

export const MobileCheckout = () => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-medium">Almost done &middot; confirming visit</span>
    <ProgressBar device="mobile" currentStep={6} totalSteps={7} />
  </div>
)
