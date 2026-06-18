import { Progress, Label } from '@codapet/design-system'

export const ProfileCompletion = () => (
  <div className="flex w-80 flex-col gap-2">
    <div className="flex items-center justify-between">
      <Label>Pet profile completion</Label>
      <span className="text-sm text-muted-foreground">60%</span>
    </div>
    <Progress value={60} />
    <p className="text-sm text-muted-foreground">
      Add vaccination records to finish setting up Bella&rsquo;s profile.
    </p>
  </div>
)

export const RecordsUpload = () => (
  <div className="flex w-80 flex-col gap-2">
    <div className="flex items-center justify-between">
      <Label>Uploading medical records</Label>
      <span className="text-sm text-muted-foreground">85%</span>
    </div>
    <Progress value={85} />
  </div>
)
