import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@codapet/design-system'

export const BookingSummary = () => (
  <Drawer defaultOpen>
    <DrawerTrigger asChild>
      <Button size="md">Review booking</Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>Confirm your home visit</DrawerTitle>
          <DrawerDescription>
            In-home wellness exam for Bella with Dr. Sarah Chen.
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-2 px-4 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Tuesday, July 14 · 10:30 AM</span>
            <span className="text-brand-text-vibrant">$185</span>
          </div>
          <div className="flex justify-between">
            <span>Travel surcharge</span>
            <span>$25</span>
          </div>
        </div>
        <DrawerFooter>
          <Button size="md">Confirm and pay</Button>
          <DrawerClose asChild>
            <Button size="md" variant="ghost">
              Go back
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
)

export const ComfortCarePlan = () => (
  <Drawer defaultOpen>
    <DrawerTrigger asChild>
      <Button size="md" variant="ghost">
        View care plan
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>End-of-life comfort care</DrawerTitle>
          <DrawerDescription>
            A gentle, in-home plan for Max so his final days are peaceful.
          </DrawerDescription>
        </DrawerHeader>
        <p className="px-4 text-sm text-muted-foreground">
          Includes pain management, a quality-of-life assessment, and 24/7
          support from our care team.
        </p>
        <DrawerFooter>
          <Button size="md">Talk to a vet</Button>
          <DrawerClose asChild>
            <Button size="md" variant="ghost">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
)
