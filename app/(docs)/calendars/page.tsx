import { DateInputDemo } from './date-input-demo'

export default function CalendarsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Calendar Components
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Date pickers and calendar components for date selection
        </p>
      </div>

      <DateInputDemo />
    </div>
  )
}
