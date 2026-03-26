'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function CurrentThemeIndicator() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Current theme:</span>
      <Badge variant="default">{theme}</Badge>
      {theme === 'system' && (
        <>
          <span className="text-sm text-muted-foreground">resolved to:</span>
          <Badge variant="secondary">{resolvedTheme}</Badge>
        </>
      )}
    </div>
  )
}

export function ThemeDemo() {
  return (
    <div className="space-y-6">
      {/* Live Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-normal rounded-full" />
            Live Theme Toggle
          </CardTitle>
          <CardDescription>
            Try switching between Light, Dark, and System modes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <CurrentThemeIndicator />
          </div>
        </CardContent>
      </Card>

      {/* Component Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-normal rounded-full" />
            Component Preview
          </CardTitle>
          <CardDescription>
            See how components look in the current theme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Buttons */}
          <div className="space-y-2">
            <Label>Buttons</Label>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-2">
            <Label>Badges</Label>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-2">
            <Label>Input</Label>
            <Input placeholder="Type something..." />
          </div>
          <div className="space-y-2">
            <Label>Input (Error)</Label>
            <Input placeholder="Error state" error />
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <Label>Textarea</Label>
            <Textarea placeholder="Write your message..." />
          </div>

          {/* Switch */}
          <div className="flex items-center gap-3">
            <Switch id="demo-switch" />
            <Label htmlFor="demo-switch">Toggle switch</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
