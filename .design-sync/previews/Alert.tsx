import { Alert, AlertTitle, AlertDescription } from '@codapet/design-system'
import { CalendarCheck, CircleAlert, Stethoscope } from 'lucide-react'

export const Variants = () => (
  <div className="flex w-full max-w-md flex-col gap-4">
    <Alert>
      <CalendarCheck />
      <AlertTitle>Home visit confirmed</AlertTitle>
      <AlertDescription>
        Dr. Patel will arrive Thursday between 2&ndash;4 PM for Bella&rsquo;s
        wellness exam.
      </AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <CircleAlert />
      <AlertTitle>Payment could not be processed</AlertTitle>
      <AlertDescription>
        Your card on file was declined. Update billing to keep your appointment.
      </AlertDescription>
    </Alert>
  </div>
)

export const WithGuidance = () => (
  <div className="w-full max-w-md">
    <Alert>
      <Stethoscope />
      <AlertTitle>Before your vet arrives</AlertTitle>
      <AlertDescription>
        <p>Have your pet&rsquo;s records and current medications ready.</p>
        <p>Keep a calm, quiet room available for the exam.</p>
      </AlertDescription>
    </Alert>
  </div>
)

export const TitleOnly = () => (
  <div className="w-full max-w-md">
    <Alert>
      <CalendarCheck />
      <AlertTitle>Your appointment reminder has been sent.</AlertTitle>
    </Alert>
  </div>
)
