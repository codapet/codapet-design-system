import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@codapet/design-system'

export const VetTeam = () => (
  <div className="flex items-center -space-x-2">
    <Avatar className="ring-2 ring-background">
      <AvatarImage src="https://i.pravatar.cc/80?img=47" alt="Dr. Sarah Chen" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
    <Avatar className="ring-2 ring-background">
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Dr. Aaron Patel" />
      <AvatarFallback>AP</AvatarFallback>
    </Avatar>
    <Avatar className="ring-2 ring-background">
      <AvatarImage src="https://i.pravatar.cc/80?img=32" alt="Dr. Maya Rivera" />
      <AvatarFallback>MR</AvatarFallback>
    </Avatar>
  </div>
)

export const VetWithName = () => (
  <div className="flex items-center gap-3">
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=47" alt="Dr. Sarah Chen" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium">Dr. Sarah Chen</p>
      <p className="text-xs text-muted-foreground">In-home companion vet</p>
    </div>
  </div>
)
