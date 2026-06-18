import { AspectRatio } from '@codapet/design-system'
import { PawPrint } from 'lucide-react'

export const Widescreen = () => (
  <div className="w-80">
    <AspectRatio ratio={16 / 9}>
      <div className="flex size-full flex-col items-center justify-center gap-2 rounded-lg bg-muted text-muted-foreground">
        <PawPrint className="size-8" />
        <span className="text-sm">Bella&rsquo;s home visit &middot; 16:9</span>
      </div>
    </AspectRatio>
  </div>
)

export const Square = () => (
  <div className="w-56">
    <AspectRatio ratio={1}>
      <div className="flex size-full flex-col items-center justify-center gap-2 rounded-lg bg-primary/10 text-brand-text-vibrant">
        <PawPrint className="size-7" />
        <span className="text-sm font-medium">Pet portrait &middot; 1:1</span>
      </div>
    </AspectRatio>
  </div>
)

export const Portrait = () => (
  <div className="w-44">
    <AspectRatio ratio={3 / 4}>
      <div className="flex size-full flex-col items-center justify-center gap-2 rounded-lg bg-muted text-muted-foreground">
        <span className="text-sm">Memorial card</span>
        <span className="text-xs">3:4</span>
      </div>
    </AspectRatio>
  </div>
)
