import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from '@codapet/design-system'

export const CancelAppointment = () => (
  <AlertDialog defaultOpen>
    <AlertDialogTrigger asChild>
      <Button size="md" variant="ghost">
        Cancel appointment
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Cancel this home visit?</AlertDialogTitle>
        <AlertDialogDescription>
          Dr. Chen's visit for Bella on July 14 will be cancelled. Cancellations
          within 24 hours may incur a fee.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Keep appointment</AlertDialogCancel>
        <AlertDialogAction>Yes, cancel visit</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

export const DeletePetRecord = () => (
  <AlertDialog defaultOpen>
    <AlertDialogTrigger asChild>
      <Button size="md" variant="ghost">
        Delete record
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Max's medical record?</AlertDialogTitle>
        <AlertDialogDescription>
          This permanently removes all visit notes, prescriptions, and wellness
          history. This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Delete permanently</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)
