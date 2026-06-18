import { Skeleton } from '@codapet/design-system'

export const AppointmentCard = () => (
  <div className="flex w-80 items-center gap-4 rounded-lg border p-4">
    <Skeleton className="size-12 rounded-full" />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
)

export const VetListLoading = () => (
  <div className="flex w-80 flex-col gap-4">
    {[0, 1, 2].map(i => (
      <div key={i} className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    ))}
  </div>
)
