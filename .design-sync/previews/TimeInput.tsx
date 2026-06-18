import { Label, TimeInput } from '@codapet/design-system'

// Arrival time for the in-home appointment.
export const ArrivalTime = () => (
  <div className="w-64 space-y-2">
    <Label htmlFor="arrival-time">Arrival time</Label>
    <TimeInput
      time={{ hours: 14, minutes: 30 }}
      setTime={() => {}}
      timeFormat="h:mm A"
    />
  </div>
)

// 24-hour clinic window in 15-minute steps.
export const WindowStart = () => (
  <div className="w-64 space-y-2">
    <Label htmlFor="window-start">Window start (24h)</Label>
    <TimeInput
      time={{ hours: 9, minutes: 0 }}
      setTime={() => {}}
      timeFormat="24h"
      minuteStep={15}
    />
  </div>
)
