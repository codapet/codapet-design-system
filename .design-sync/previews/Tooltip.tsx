import {
  Button,
  RichTooltipContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@codapet/design-system'
import { HelpCircle, Info } from 'lucide-react'

export const Basic = () => (
  <TooltipProvider>
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button size="md" variant="ghost" aria-label="Help">
          <HelpCircle className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Schedule an in-home visit</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export const SurchargeHint = () => (
  <TooltipProvider>
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button size="md" variant="ghost">
          Travel fee
        </Button>
      </TooltipTrigger>
      <TooltipContent>$25 added for visits beyond 10 miles</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export const RichInfo = () => (
  <TooltipProvider>
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button size="md" variant="ghost" aria-label="About comfort care">
          <Info className="size-4" />
        </Button>
      </TooltipTrigger>
      <RichTooltipContent
        icon={<Info />}
        heading="Comfort care visits"
        side="bottom"
      >
        Our vets come to your home to keep your pet calm and pain-free in
        familiar surroundings.
      </RichTooltipContent>
    </Tooltip>
  </TooltipProvider>
)
