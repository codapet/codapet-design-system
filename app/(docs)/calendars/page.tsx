import { DateInputDemo } from './date-input-demo'
import { DateRangeInputDemo } from './date-range-input-demo'
import { TimeInputDemo } from './time-input-demo'

export default function CalendarsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Calendar Components
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Date pickers and calendar components for date selection
        </p>
      </div>

      <DateInputDemo />
      <DateRangeInputDemo />
      <TimeInputDemo />
    </div>
  )
}
