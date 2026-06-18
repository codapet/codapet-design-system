import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button
} from '@codapet/design-system'
import { ChevronsUpDown } from 'lucide-react'

export const VisitDetails = () => (
  <Collapsible defaultOpen className="w-80 rounded-lg border p-4">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-semibold">Appointment details</h4>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm">
          <ChevronsUpDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
    </div>
    <CollapsibleContent className="mt-3 space-y-1 text-sm text-muted-foreground">
      <p>Wellness exam for Maple (Golden Retriever)</p>
      <p>Tuesday, July 14 · 10:30 AM</p>
      <p>Dr. Sarah Chen · In-home visit</p>
    </CollapsibleContent>
  </Collapsible>
)
