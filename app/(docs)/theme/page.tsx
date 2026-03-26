import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CodeBlock } from '../buttons/CodeBlock'
import { ThemeDemo } from './theme-demo'

export default function ThemePage() {
  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4 py-6">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
          Theme / Dark Mode
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          Add dark mode support to your app with ThemeProvider and ThemeToggle
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-normal rounded-full" />
            Quick Start
          </CardTitle>
          <CardDescription>
            Three steps to enable dark mode in your app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              1. Import the design system styles
            </h4>
            <p className="text-sm text-muted-foreground">
              The styles include all light and dark mode CSS variables. Add this to your root layout or global CSS.
            </p>
            <CodeBlock
              language="css"
              code={`/* In your global CSS file */
@import "@codapet/design-system/styles";`}
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              2. Wrap your app with ThemeProvider
            </h4>
            <p className="text-sm text-muted-foreground">
              Add ThemeProvider to your root layout. It defaults to light mode and supports light, dark, and system modes.
            </p>
            <CodeBlock
              code={`// app/layout.tsx
import { ThemeProvider } from "@codapet/design-system"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              3. Add the ThemeToggle component
            </h4>
            <p className="text-sm text-muted-foreground">
              Place the toggle wherever you want in your UI - navbar, settings page, etc.
            </p>
            <CodeBlock
              code={`import { ThemeToggle } from "@codapet/design-system"

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <ThemeToggle />
    </nav>
  )
}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Live Demo */}
      <ThemeDemo />

      {/* ThemeProvider Props */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-normal rounded-full" />
            ThemeProvider Props
          </CardTitle>
          <CardDescription>
            Configuration options for ThemeProvider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Prop</th>
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Default</th>
                  <th className="text-left py-2 font-semibold text-foreground">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">defaultTheme</td>
                  <td className="py-2 pr-4 font-mono text-xs">&quot;light&quot;</td>
                  <td className="py-2">Initial theme. Options: &quot;light&quot;, &quot;dark&quot;, &quot;system&quot;</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">attribute</td>
                  <td className="py-2 pr-4 font-mono text-xs">&quot;class&quot;</td>
                  <td className="py-2">HTML attribute used for theme. Uses .dark class on html element</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">enableSystem</td>
                  <td className="py-2 pr-4 font-mono text-xs">true</td>
                  <td className="py-2">Enable system theme detection via prefers-color-scheme</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">disableTransitionOnChange</td>
                  <td className="py-2 pr-4 font-mono text-xs">true</td>
                  <td className="py-2">Prevents flash of wrong colors during theme switch</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">storageKey</td>
                  <td className="py-2 pr-4 font-mono text-xs">&quot;theme&quot;</td>
                  <td className="py-2">localStorage key used to persist the theme preference</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">children</td>
                  <td className="py-2 pr-4 font-mono text-xs">required</td>
                  <td className="py-2">Your app content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* useTheme Hook */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-normal rounded-full" />
            useTheme Hook
          </CardTitle>
          <CardDescription>
            Build custom theme UI with the useTheme hook
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you need more control than ThemeToggle provides, use the useTheme hook to build your own theme switcher.
          </p>
          <CodeBlock
            code={`import { useTheme } from "@codapet/design-system"

function CustomThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  )
}`}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Return Value</th>
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Type</th>
                  <th className="text-left py-2 font-semibold text-foreground">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">theme</td>
                  <td className="py-2 pr-4 font-mono text-xs">string</td>
                  <td className="py-2">The active theme setting (&quot;light&quot;, &quot;dark&quot;, or &quot;system&quot;)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">resolvedTheme</td>
                  <td className="py-2 pr-4 font-mono text-xs">string</td>
                  <td className="py-2">The actual resolved theme (&quot;light&quot; or &quot;dark&quot;). Useful when theme is &quot;system&quot;</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">setTheme</td>
                  <td className="py-2 pr-4 font-mono text-xs">(theme: string) =&gt; void</td>
                  <td className="py-2">Function to change the theme</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">themes</td>
                  <td className="py-2 pr-4 font-mono text-xs">string[]</td>
                  <td className="py-2">List of available themes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-normal rounded-full" />
            Advanced Usage
          </CardTitle>
          <CardDescription>
            Customization examples
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Default to dark mode
            </h4>
            <CodeBlock
              code={`<ThemeProvider defaultTheme="dark">
  {children}
</ThemeProvider>`}
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Follow system preference by default
            </h4>
            <CodeBlock
              code={`<ThemeProvider defaultTheme="system">
  {children}
</ThemeProvider>`}
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Custom storage key
            </h4>
            <p className="text-sm text-muted-foreground">
              Useful when you have multiple apps sharing the same domain and need separate theme preferences.
            </p>
            <CodeBlock
              code={`<ThemeProvider storageKey="my-app-theme">
  {children}
</ThemeProvider>`}
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Conditional rendering based on theme
            </h4>
            <p className="text-sm text-muted-foreground">
              Use resolvedTheme to conditionally render content. Always check for mount state to avoid hydration mismatches.
            </p>
            <CodeBlock
              code={`"use client"

import { useTheme } from "@codapet/design-system"
import { useEffect, useState } from "react"

function ThemedLogo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <img
      src={resolvedTheme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
      alt="Logo"
    />
  )
}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-normal rounded-full" />
            How It Works
          </CardTitle>
          <CardDescription>
            The dark mode system explained
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <span className="font-semibold text-foreground shrink-0">1.</span>
              <p>
                <span className="font-semibold text-foreground">CSS Variables</span> - All colors are defined as CSS custom properties in OKLCH color space. Light mode values are in :root, dark mode values are in .dark.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-foreground shrink-0">2.</span>
              <p>
                <span className="font-semibold text-foreground">Class-based switching</span> - When dark mode is active, a .dark class is added to the html element. This causes all CSS variables to switch to their dark values.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-foreground shrink-0">3.</span>
              <p>
                <span className="font-semibold text-foreground">next-themes</span> - The ThemeProvider wraps next-themes to handle persistence (localStorage), system preference detection, and hydration-safe rendering.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-foreground shrink-0">4.</span>
              <p>
                <span className="font-semibold text-foreground">No FOUC</span> - The disableTransitionOnChange option prevents a flash of wrong colors when switching themes. next-themes injects a script to set the correct theme before React hydrates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Three Modes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-normal rounded-full" />
            Theme Modes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Mode</th>
                  <th className="text-left py-2 font-semibold text-foreground">Behavior</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-semibold text-foreground">Light</td>
                  <td className="py-2">Default. No .dark class applied. All CSS variables use :root values.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-semibold text-foreground">Dark</td>
                  <td className="py-2">.dark class added to html. All CSS variables switch to .dark overrides.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-foreground">System</td>
                  <td className="py-2">Reads prefers-color-scheme from the OS and applies the matching class. Updates in real-time if the OS setting changes.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
