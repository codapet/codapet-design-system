import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@codapet/design-system'

export const VisitDetails = () => (
  <Sheet defaultOpen>
    <SheetTrigger asChild>
      <Button size="md" variant="ghost">
        Visit details
      </Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Home visit details</SheetTitle>
        <SheetDescription>
          Tuesday, July 14 · 10:30 AM with Dr. Sarah Chen
        </SheetDescription>
      </SheetHeader>
      <div className="space-y-3 px-4 text-sm text-muted-foreground">
        <p>Patient: Bella, 9-year-old Labrador</p>
        <p>Reason: Annual wellness exam and vaccinations</p>
        <p>Address: 142 Maple Street, Portland, OR</p>
      </div>
      <SheetFooter>
        <Button size="md">Reschedule</Button>
        <SheetClose asChild>
          <Button size="md" variant="ghost">
            Close
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
)

export const FilterVets = () => (
  <Sheet defaultOpen>
    <SheetTrigger asChild>
      <Button size="md" variant="ghost">
        Filters
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Filter vets</SheetTitle>
        <SheetDescription>
          Narrow down vets available for in-home care near you.
        </SheetDescription>
      </SheetHeader>
      <div className="space-y-3 px-4 text-sm text-muted-foreground">
        <p>Specialty: End-of-life and palliative care</p>
        <p>Availability: This week</p>
        <p>Distance: Within 15 miles</p>
      </div>
      <SheetFooter>
        <Button size="md">Apply filters</Button>
        <SheetClose asChild>
          <Button size="md" variant="ghost">
            Clear all
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
)
