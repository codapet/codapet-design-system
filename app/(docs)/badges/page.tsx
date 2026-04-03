'use client'

import { BadgeActionable } from '@/components/ui/badge-actionable'
import {
  BadgeInformative,
  BadgeInformativeGroup,
  BadgeInformativeItem
} from '@/components/ui/badge-informative'
import { BadgeNumber } from '@/components/ui/badge-number'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CalendarDays, Clock3, Dog, MapPin } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

export default function BadgesPage() {
  const [selectedM, setSelectedM] = useState<string | null>(null)
  const [selectedS, setSelectedS] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Badges
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Actionable, informative, and number badge components
        </p>
      </div>

      {/* ──── Actionable Badges ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Actionable Badges
          </CardTitle>
          <CardDescription>
            Interactive filter chips for search interfaces, toggles, and
            removable tags. Clickable.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Size M */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size M &mdash; With Icon
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeActionable
                size="M"
                icon={<MapPin className="size-5" />}
              >
                Default
              </BadgeActionable>
              <BadgeActionable
                size="M"
                icon={<MapPin className="size-5" />}
                onBackground
              >
                On Background
              </BadgeActionable>
              <div className="px-2 py-1 text-xs text-slate-400">
                (hover to see hover state)
              </div>
              <BadgeActionable
                size="M"
                icon={<MapPin className="size-5" />}
                selected
              >
                Selected
              </BadgeActionable>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size M &mdash; No Icon
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeActionable size="M">Default</BadgeActionable>
              <BadgeActionable size="M" onBackground>
                On Background
              </BadgeActionable>
              <BadgeActionable size="M" selected>
                Selected
              </BadgeActionable>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size S &mdash; With Icon
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeActionable
                size="S"
                icon={<MapPin className="size-5" />}
              >
                Default
              </BadgeActionable>
              <BadgeActionable
                size="S"
                icon={<MapPin className="size-5" />}
                onBackground
              >
                On Background
              </BadgeActionable>
              <BadgeActionable
                size="S"
                icon={<MapPin className="size-5" />}
                selected
              >
                Selected
              </BadgeActionable>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size S &mdash; No Icon
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeActionable size="S">Default</BadgeActionable>
              <BadgeActionable size="S" onBackground>
                On Background
              </BadgeActionable>
              <BadgeActionable size="S" selected>
                Selected
              </BadgeActionable>
            </div>
          </div>

          {/* Interactive demo */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Interactive Demo (click to toggle)
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              {['Ashburn, VA', 'New York, NY', 'San Francisco, CA'].map(
                city => (
                  <BadgeActionable
                    key={city}
                    size="M"
                    icon={<MapPin className="size-5" />}
                    selected={selectedM === city}
                    onClick={() =>
                      setSelectedM(prev => (prev === city ? null : city))
                    }
                  >
                    {city}
                  </BadgeActionable>
                )
              )}
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {['Dogs', 'Cats', 'Birds'].map(pet => (
                <BadgeActionable
                  key={pet}
                  size="S"
                  icon={<Dog className="size-5" />}
                  selected={selectedS === pet}
                  onClick={() =>
                    setSelectedS(prev => (prev === pet ? null : pet))
                  }
                >
                  {pet}
                </BadgeActionable>
              ))}
            </div>
          </div>

          <CodeBlock
            code={`import { BadgeActionable } from '@codapet/design-system'
import { MapPin } from 'lucide-react'

{/* Default */}
<BadgeActionable size="M" icon={<MapPin className="size-5" />}>
  Ashburn, VA
</BadgeActionable>

{/* On Background (darker border) */}
<BadgeActionable size="M" onBackground icon={<MapPin className="size-5" />}>
  Ashburn, VA
</BadgeActionable>

{/* Selected */}
<BadgeActionable size="M" selected icon={<MapPin className="size-5" />}>
  Ashburn, VA
</BadgeActionable>

{/* Size S, no icon */}
<BadgeActionable size="S">Dogs</BadgeActionable>

{/* Interactive toggle */}
<BadgeActionable
  size="M"
  selected={isSelected}
  onClick={() => setIsSelected(!isSelected)}
>
  Ashburn, VA
</BadgeActionable>`}
          />
        </CardContent>
      </Card>

      {/* ──── Informative Badges ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Informative Badges
          </CardTitle>
          <CardDescription>
            Static badges for displaying status, categories, or metadata. Not
            clickable.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Single content - Size M */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size M &mdash; 1 Content
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeInformative
                size="M"
                icon={<Dog className="size-4" />}
              >
                Ashburn, VA
              </BadgeInformative>
              <BadgeInformative size="M">Ashburn, VA</BadgeInformative>
            </div>
          </div>

          {/* Single content - Size S */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size S &mdash; 1 Content
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeInformative
                size="S"
                icon={<Dog className="size-4" />}
              >
                Ashburn, VA
              </BadgeInformative>
              <BadgeInformative size="S">Ashburn, VA</BadgeInformative>
            </div>
          </div>

          {/* Multi content - Size M */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size M &mdash; 2 Contents
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeInformativeGroup size="M" colorScheme="gray">
                <BadgeInformativeItem
                  size="M"
                  colorScheme="gray"
                  icon={<Dog className="size-4" />}
                >
                  Ashburn, VA
                </BadgeInformativeItem>
                <BadgeInformativeItem
                  size="M"
                  colorScheme="gray"
                  icon={<Dog className="size-4" />}
                >
                  Ashburn, VA
                </BadgeInformativeItem>
              </BadgeInformativeGroup>
              <BadgeInformativeGroup size="M" colorScheme="gray">
                <BadgeInformativeItem size="M" colorScheme="gray">
                  Ashburn, VA
                </BadgeInformativeItem>
                <BadgeInformativeItem size="M" colorScheme="gray">
                  Ashburn, VA
                </BadgeInformativeItem>
              </BadgeInformativeGroup>
            </div>
          </div>

          {/* Multi content - Size S */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size S &mdash; 2 Contents
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeInformativeGroup size="S" colorScheme="gray">
                <BadgeInformativeItem
                  size="S"
                  colorScheme="gray"
                  icon={<Dog className="size-4" />}
                >
                  Ashburn, VA
                </BadgeInformativeItem>
                <BadgeInformativeItem
                  size="S"
                  colorScheme="gray"
                  icon={<Dog className="size-4" />}
                >
                  Ashburn, VA
                </BadgeInformativeItem>
              </BadgeInformativeGroup>
              <BadgeInformativeGroup size="S" colorScheme="gray">
                <BadgeInformativeItem size="S" colorScheme="gray">
                  Ashburn, VA
                </BadgeInformativeItem>
                <BadgeInformativeItem size="S" colorScheme="gray">
                  Ashburn, VA
                </BadgeInformativeItem>
              </BadgeInformativeGroup>
            </div>
          </div>

          {/* With Button */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size M &mdash; With Button
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeInformative
                size="M"
                icon={<Dog className="size-4" />}
                linkText="Find a vet"
                linkHref="#"
              >
                Ashburn, VA
              </BadgeInformative>
              <BadgeInformative
                size="M"
                linkText="Find a vet"
                linkHref="#"
              >
                Ashburn, VA
              </BadgeInformative>
            </div>
          </div>

          <CodeBlock
            code={`import {
  BadgeInformative,
  BadgeInformativeGroup,
  BadgeInformativeItem
} from '@codapet/design-system'
import { Dog } from 'lucide-react'

{/* Single content with icon */}
<BadgeInformative size="M" icon={<Dog className="size-4" />}>
  Ashburn, VA
</BadgeInformative>

{/* Without icon */}
<BadgeInformative size="S">Ashburn, VA</BadgeInformative>

{/* Multi-content */}
<BadgeInformativeGroup size="M" colorScheme="gray">
  <BadgeInformativeItem size="M" colorScheme="gray" icon={<Dog />}>
    Ashburn, VA
  </BadgeInformativeItem>
  <BadgeInformativeItem size="M" colorScheme="gray" icon={<Dog />}>
    Ashburn, VA
  </BadgeInformativeItem>
</BadgeInformativeGroup>

{/* With button link */}
<BadgeInformative size="M" icon={<Dog />} linkText="Find a vet" linkHref="#">
  Ashburn, VA
</BadgeInformative>`}
          />
        </CardContent>
      </Card>

      {/* ──── Color Variations ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Informative Badge &mdash; Color Variations
          </CardTitle>
          <CardDescription>
            Gray (default), Blue, and Yellow color schemes for informative
            badges.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Gray (default)
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeInformativeGroup size="M" colorScheme="gray">
                <BadgeInformativeItem
                  size="M"
                  colorScheme="gray"
                  icon={<CalendarDays className="size-4" />}
                >
                  Text example
                </BadgeInformativeItem>
                <BadgeInformativeItem
                  size="M"
                  colorScheme="gray"
                  icon={<Clock3 className="size-4" />}
                >
                  9:00am-7:00pm
                </BadgeInformativeItem>
              </BadgeInformativeGroup>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Blue
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeInformativeGroup size="M" colorScheme="blue">
                <BadgeInformativeItem
                  size="M"
                  colorScheme="blue"
                  icon={<CalendarDays className="size-4" />}
                >
                  Next available
                </BadgeInformativeItem>
                <BadgeInformativeItem
                  size="M"
                  colorScheme="blue"
                  icon={<Clock3 className="size-4" />}
                >
                  9:00am-7:00pm
                </BadgeInformativeItem>
              </BadgeInformativeGroup>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Yellow
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <BadgeInformativeGroup size="M" colorScheme="yellow">
                <BadgeInformativeItem
                  size="M"
                  colorScheme="yellow"
                  icon={<CalendarDays className="size-4" />}
                >
                  On vacation until:
                </BadgeInformativeItem>
                <BadgeInformativeItem
                  size="M"
                  colorScheme="yellow"
                  icon={<Clock3 className="size-4" />}
                >
                  September 5, 2024
                </BadgeInformativeItem>
              </BadgeInformativeGroup>
            </div>
          </div>

          <CodeBlock
            code={`import { BadgeInformativeGroup, BadgeInformativeItem } from '@codapet/design-system'
import { CalendarDays, Clock3 } from 'lucide-react'

{/* Gray (default) */}
<BadgeInformativeGroup size="M" colorScheme="gray">
  <BadgeInformativeItem size="M" colorScheme="gray" icon={<CalendarDays />}>
    Text example
  </BadgeInformativeItem>
  <BadgeInformativeItem size="M" colorScheme="gray" icon={<Clock3 />}>
    9:00am-7:00pm
  </BadgeInformativeItem>
</BadgeInformativeGroup>

{/* Blue */}
<BadgeInformativeGroup size="M" colorScheme="blue">
  <BadgeInformativeItem size="M" colorScheme="blue" icon={<CalendarDays />}>
    Next available
  </BadgeInformativeItem>
  <BadgeInformativeItem size="M" colorScheme="blue" icon={<Clock3 />}>
    9:00am-7:00pm
  </BadgeInformativeItem>
</BadgeInformativeGroup>

{/* Yellow */}
<BadgeInformativeGroup size="M" colorScheme="yellow">
  <BadgeInformativeItem size="M" colorScheme="yellow" icon={<CalendarDays />}>
    On vacation until:
  </BadgeInformativeItem>
  <BadgeInformativeItem size="M" colorScheme="yellow" icon={<Clock3 />}>
    September 5, 2024
  </BadgeInformativeItem>
</BadgeInformativeGroup>`}
          />
        </CardContent>
      </Card>

      {/* ──── Number Badges ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Number Badges
          </CardTitle>
          <CardDescription>
            Numeric notification indicators in active, disabled, and resting
            states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size M
            </h4>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <BadgeNumber size="M" state="active" value={1} />
                <span className="text-xs text-slate-400">Active</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BadgeNumber size="M" state="disabled" value={1} />
                <span className="text-xs text-slate-400">Disabled</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BadgeNumber size="M" state="resting" value={1} />
                <span className="text-xs text-slate-400">Resting</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Size S
            </h4>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <BadgeNumber size="S" state="active" value={1} />
                <span className="text-xs text-slate-400">Active</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BadgeNumber size="S" state="disabled" value={1} />
                <span className="text-xs text-slate-400">Disabled</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BadgeNumber size="S" state="resting" value={1} />
                <span className="text-xs text-slate-400">Resting</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Multiple Values
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              {[1, 2, 3, 5, 9].map(n => (
                <BadgeNumber key={n} size="M" state="active" value={n} />
              ))}
            </div>
          </div>

          <CodeBlock
            code={`import { BadgeNumber } from '@codapet/design-system'

{/* Active (filled) */}
<BadgeNumber size="M" state="active" value={1} />

{/* Disabled */}
<BadgeNumber size="M" state="disabled" value={1} />

{/* Resting (outlined) */}
<BadgeNumber size="M" state="resting" value={1} />

{/* Size S */}
<BadgeNumber size="S" state="active" value={3} />`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
