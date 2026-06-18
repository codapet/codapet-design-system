import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@codapet/design-system'
import { MoreHorizontal } from 'lucide-react'

export const Basic = () => (
  <Card className="w-80">
    <CardHeader>
      <CardTitle>Annual checkup</CardTitle>
      <CardDescription>Wellness visit for Bella</CardDescription>
      <CardAction>
        <Button variant="ghost" size="icon" aria-label="More">
          <MoreHorizontal className="size-4" />
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        Tuesday, July 14 · 10:30 AM with Dr. Sarah Chen. Includes a full
        physical exam and vaccination review.
      </p>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
      <Button variant="ghost" size="md">
        Reschedule
      </Button>
      <Button size="md">Confirm</Button>
    </CardFooter>
  </Card>
)

export const Stat = () => (
  <Card className="w-64">
    <CardHeader>
      <CardDescription>Appointments this week</CardDescription>
      <CardTitle className="text-3xl">128</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-brand-text-vibrant">+12% from last week</p>
    </CardContent>
  </Card>
)
