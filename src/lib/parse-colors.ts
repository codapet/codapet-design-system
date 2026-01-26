import { readFileSync } from 'fs'
import { join } from 'path'

export interface ColorData {
  name: string
  lightValue: string
  darkValue?: string
  cssVar: string
}

export interface ColorGroup {
  title: string
  description: string
  colors: ColorData[]
}

function getCategory(name: string): { title: string; description: string } {
  if (name.startsWith('brand-')) {
    return { title: 'Brand Colors', description: 'Primary brand color palette' }
  }
  if (name.startsWith('sand-')) {
    return { title: 'Sand Colors', description: 'Neutral sand color palette' }
  }
  if (name.startsWith('rose-')) {
    return { title: 'Rose Colors', description: 'Rose accent color palette' }
  }
  if (name.startsWith('red-')) {
    return { title: 'Red Colors', description: 'Red accent colors' }
  }
  if (name.startsWith('sage-')) {
    return { title: 'Sage Colors', description: 'Sage accent color palette' }
  }
  if (name.includes('-surface-')) {
    return {
      title: 'Surface Colors',
      description: 'Surface background colors for different contexts'
    }
  }
  if (name.includes('-stroke-')) {
    return { title: 'Stroke Colors', description: 'Border and stroke colors' }
  }
  if (name.startsWith('chart-')) {
    return {
      title: 'Chart Colors',
      description: 'Colors for data visualization and charts'
    }
  }
  if (name.startsWith('sidebar-')) {
    return {
      title: 'Sidebar Colors',
      description: 'Colors specific to sidebar components'
    }
  }
  if (
    ['background', 'foreground', 'card', 'popover'].includes(name) ||
    (name.includes('-foreground') &&
      ['card', 'popover'].some((p) => name.startsWith(p)))
  ) {
    return {
      title: 'Base Colors',
      description: 'Fundamental background and foreground colors'
    }
  }
  if (
    [
      'primary',
      'secondary',
      'muted',
      'accent',
      'destructive',
      'border',
      'input',
      'ring'
    ].some((p) => name.includes(p)) &&
    !name.includes('-surface-') &&
    !name.includes('-stroke-')
  ) {
    return {
      title: 'Semantic Colors',
      description:
        'Primary, secondary, muted, accent, and destructive colors'
    }
  }
  return {
    title: 'Utility Colors',
    description: 'Utility and helper colors'
  }
}

function isColorVariable(name: string): boolean {
  // Exclude non-color variables
  const excluded = ['radius', 'font-']
  return !excluded.some((ex) => name.includes(ex))
}

export function parseColorsFromCSS(): ColorGroup[] {
  // Read the CSS file - path is relative to project root
  const cssPath = join(process.cwd(), 'src', 'styles.css')
  const cssContent = readFileSync(cssPath, 'utf-8')

  // Extract :root block
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/)
  const rootContent = rootMatch ? rootMatch[1] : ''

  // Extract .dark block
  const darkMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/)
  const darkContent = darkMatch ? darkMatch[1] : ''

  // Parse variables from :root
  const lightVars: Record<string, string> = {}
  const rootVarRegex = /--([\w-]+):\s*([^;]+);/g
  let match
  while ((match = rootVarRegex.exec(rootContent)) !== null) {
    const [, name, value] = match
    const trimmedValue = value.trim()
    if (isColorVariable(name)) {
      lightVars[name] = trimmedValue
    }
  }

  // Parse variables from .dark
  const darkVars: Record<string, string> = {}
  const darkVarRegex = /--([\w-]+):\s*([^;]+);/g
  while ((match = darkVarRegex.exec(darkContent)) !== null) {
    const [, name, value] = match
    const trimmedValue = value.trim()
    if (isColorVariable(name)) {
      darkVars[name] = trimmedValue
    }
  }

  // Group colors by category
  const categoryMap = new Map<string, ColorData[]>()

  // Process all light mode variables
  for (const [name, lightValue] of Object.entries(lightVars)) {
    const category = getCategory(name)
    const categoryKey = category.title

    if (!categoryMap.has(categoryKey)) {
      categoryMap.set(categoryKey, [])
    }

    const colorData: ColorData = {
      name,
      lightValue,
      darkValue: darkVars[name],
      cssVar: `--${name}`
    }

    categoryMap.get(categoryKey)!.push(colorData)
  }

  // Convert to ColorGroup array
  const colorGroups: ColorGroup[] = []
  const categoryDescriptions = new Map<string, string>()

  // First pass: collect all categories and their descriptions
  for (const [name] of Object.entries(lightVars)) {
    const category = getCategory(name)
    if (!categoryDescriptions.has(category.title)) {
      categoryDescriptions.set(category.title, category.description)
    }
  }

  // Second pass: create groups
  for (const [title, colors] of categoryMap.entries()) {
    // Sort colors by name for consistency
    colors.sort((a, b) => a.name.localeCompare(b.name))

    colorGroups.push({
      title,
      description: categoryDescriptions.get(title) || '',
      colors
    })
  }

  // Sort groups by a predefined order for better UX
  const groupOrder = [
    'Base Colors',
    'Semantic Colors',
    'Brand Colors',
    'Sand Colors',
    'Rose Colors',
    'Red Colors',
    'Sage Colors',
    'Surface Colors',
    'Stroke Colors',
    'Chart Colors',
    'Sidebar Colors',
    'Utility Colors'
  ]

  colorGroups.sort((a, b) => {
    const indexA = groupOrder.indexOf(a.title)
    const indexB = groupOrder.indexOf(b.title)
    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  return colorGroups
}
