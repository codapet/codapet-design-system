import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@codapet/design-system'
import { CalendarClock } from 'lucide-react'

export const RescheduleVisit = () => (
  <Dialog defaultOpen>
    <DialogTrigger asChild>
      <Button size="md" variant="ghost">
        Reschedule visit
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Reschedule Bella's home visit</DialogTitle>
        <DialogDescription>
          Your current appointment is Tuesday, July 14 at 10:30 AM with Dr.
          Sarah Chen. Pick a new time that works for you.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-2 rounded-xl border border-border-default p-3 text-sm text-muted-foreground">
        <CalendarClock className="size-4 text-brand-text-vibrant" />
        Next availability: Thursday, July 16 at 2:00 PM
      </div>
      <DialogFooter className="flex justify-end gap-2">
        <Button size="md" variant="ghost">
          Keep current
        </Button>
        <Button size="md">Confirm new time</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export const AddPetProfile = () => (
  <Dialog defaultOpen>
    <DialogTrigger asChild>
      <Button size="md">Add a pet</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add a new pet</DialogTitle>
        <DialogDescription>
          Tell us about your companion so we can prepare for the home visit.
        </DialogDescription>
      </DialogHeader>
      <p className="text-sm text-muted-foreground">
        We'll use this profile across wellness checks, follow-ups, and
        end-of-life care planning.
      </p>
      <DialogFooter className="flex justify-end gap-2">
        <Button size="md" variant="ghost">
          Cancel
        </Button>
        <Button size="md">Save pet</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
