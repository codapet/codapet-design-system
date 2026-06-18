import {
  Button,
  SmartDialog,
  SmartDialogClose,
  SmartDialogContent,
  SmartDialogDescription,
  SmartDialogFooter,
  SmartDialogHeader,
  SmartDialogTitle,
  SmartDialogTrigger
} from '@codapet/design-system'

export const ConfirmBooking = () => (
  <SmartDialog defaultOpen>
    <SmartDialogTrigger asChild>
      <Button size="md">Book home visit</Button>
    </SmartDialogTrigger>
    <SmartDialogContent className="sm:max-w-md">
      <SmartDialogHeader>
        <SmartDialogTitle>Confirm your home visit</SmartDialogTitle>
        <SmartDialogDescription>
          Renders as a dialog on desktop and a drawer on mobile.
        </SmartDialogDescription>
      </SmartDialogHeader>
      <div className="px-4 text-sm text-muted-foreground sm:px-0">
        In-home wellness exam for Bella, Tuesday July 14 at 10:30 AM with Dr.
        Sarah Chen.
      </div>
      <SmartDialogFooter className="flex justify-end gap-2">
        <SmartDialogClose asChild>
          <Button size="md" variant="ghost">
            Go back
          </Button>
        </SmartDialogClose>
        <Button size="md">Confirm visit</Button>
      </SmartDialogFooter>
    </SmartDialogContent>
  </SmartDialog>
)

export const ShareRecord = () => (
  <SmartDialog defaultOpen>
    <SmartDialogTrigger asChild>
      <Button size="md" variant="ghost">
        Share record
      </Button>
    </SmartDialogTrigger>
    <SmartDialogContent className="sm:max-w-md">
      <SmartDialogHeader>
        <SmartDialogTitle>Share Max's medical record</SmartDialogTitle>
        <SmartDialogDescription>
          Send a secure link to a specialist or family member.
        </SmartDialogDescription>
      </SmartDialogHeader>
      <p className="px-4 text-sm text-muted-foreground sm:px-0">
        Recipients can view visit notes and prescriptions but cannot edit them.
      </p>
      <SmartDialogFooter className="flex justify-end gap-2">
        <SmartDialogClose asChild>
          <Button size="md" variant="ghost">
            Cancel
          </Button>
        </SmartDialogClose>
        <Button size="md">Create link</Button>
      </SmartDialogFooter>
    </SmartDialogContent>
  </SmartDialog>
)
