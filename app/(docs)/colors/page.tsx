import { parseColorsFromCSS } from '@/lib/parse-colors'
import { ColorsClient } from './colors-client'

export default function ColorsPage() {
  const colorGroups = parseColorsFromCSS()

  return <ColorsClient colorGroups={colorGroups} />
}
