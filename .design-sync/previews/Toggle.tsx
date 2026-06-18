import { Toggle } from '@codapet/design-system'
import { Bell, Heart, Star } from 'lucide-react'

export const FavoriteVet = () => (
  <div className="flex items-center gap-3">
    <Toggle defaultPressed aria-label="Save favorite vet">
      <Heart className="size-4" />
      Favorite
    </Toggle>
    <Toggle variant="outline" aria-label="Toggle reminders">
      <Bell className="size-4" />
      Remind me
    </Toggle>
  </div>
)

export const Sizes = () => (
  <div className="flex items-center gap-3">
    <Toggle size="sm" defaultPressed aria-label="Small">
      <Star className="size-3.5" />
    </Toggle>
    <Toggle size="default" aria-label="Default">
      <Star className="size-4" />
    </Toggle>
    <Toggle size="lg" variant="outline" defaultPressed aria-label="Large">
      <Star className="size-5" />
    </Toggle>
  </div>
)
