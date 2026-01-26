'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import type { ColorData, ColorGroup } from '@/lib/parse-colors'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

function ColorSwatch({ color }: { color: ColorData }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(color.cssVar)
    toast.success(`Copied ${color.name} to clipboard`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative">
      <div className="flex flex-col gap-2">
        <div
          className="h-24 w-full rounded-lg border border-border shadow-sm transition-transform group-hover:scale-105"
          style={{ backgroundColor: `var(--${color.name})` }}
        />
        <div className="space-y-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <code className="text-xs">{color.cssVar}</code>
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <div>
              <span className="font-medium">Light:</span>{' '}
              <code className="text-[10px]">{color.lightValue}</code>
            </div>
            {color.darkValue ? (
              <div>
                <span className="font-medium">Dark:</span>{' '}
                <code className="text-[10px]">{color.darkValue}</code>
              </div>
            ) : (
              <div className="text-muted-foreground/60">Dark: N/A</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ColorGroupCard({ group }: { group: ColorGroup }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          {group.title}
        </CardTitle>
        <CardDescription>{group.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {group.colors.map((color) => (
            <ColorSwatch key={color.name} color={color} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ColorsClient({ colorGroups }: { colorGroups: ColorGroup[] }) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Color Tokens
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Complete color palette from the design system. Click any color to copy
          its CSS variable name.
        </p>
      </div>

      <div className="space-y-8">
        {colorGroups.map((group) => (
          <ColorGroupCard key={group.title} group={group} />
        ))}
      </div>
    </div>
  )
}
