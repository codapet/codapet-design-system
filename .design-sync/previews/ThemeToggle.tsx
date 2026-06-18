import { ThemeProvider, ThemeToggle } from '@codapet/design-system'

// Theme switcher button (uses next-themes; wrapped in ThemeProvider).
export const Toggle = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <ThemeToggle />
  </ThemeProvider>
)
