import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@codapet/design-system'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

// NOTE: ChartContainer wraps recharts' ResponsiveContainer, so it needs a sized
// parent. The bounded container below gives it width/height for inline preview.
const data = [
  { month: 'Jan', visits: 18 },
  { month: 'Feb', visits: 24 },
  { month: 'Mar', visits: 31 },
  { month: 'Apr', visits: 27 },
  { month: 'May', visits: 35 },
  { month: 'Jun', visits: 42 }
]

const config = {
  visits: { label: 'In-home visits', color: 'var(--color-brand-text-vibrant, #2563eb)' }
} satisfies ChartConfig

export const MonthlyVisits = () => (
  <div className="w-80">
    <ChartContainer config={config} className="h-48 w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="visits" fill="var(--color-visits)" radius={4} />
      </BarChart>
    </ChartContainer>
  </div>
)
