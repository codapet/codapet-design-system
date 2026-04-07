'use client'

import { SearchInput } from '@/components/ui/search-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

const sampleSuggestions = [
  { icon: <MapPin />, label: 'Text' },
  { icon: <MapPin />, label: 'Text filled' },
  { icon: <MapPin />, label: 'Text filled 1' },
  { icon: <MapPin />, label: 'Text filled 2' }
]

export default function SearchInputPage() {
  const [iconValue, setIconValue] = useState('')
  const [buttonValue, setButtonValue] = useState('')
  const [suggestValue, setSuggestValue] = useState('')
  const [searchResult, setSearchResult] = useState('')

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Search Input
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Search input with icon and button variants, suggestions dropdown,
          and clearable state
        </p>
      </div>

      {/* Icon Variant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Icon Variant
          </CardTitle>
          <CardDescription>
            Default search input with a 36x36 icon search button on the right.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-sm">
            <SearchInput
              variant="icon"
              label="Label"
              icon={<MapPin />}
              helperText="Helper text to guide you on what to do"
              value={iconValue}
              onValueChange={setIconValue}
              onSearch={(v) => setSearchResult(`Icon search: ${v}`)}
            />
          </div>
          {searchResult && (
            <p className="text-sm text-muted-foreground">{searchResult}</p>
          )}
          <CodeBlock
            code={`import { SearchInput } from '@codapet/design-system'
import { MapPin } from 'lucide-react'

<SearchInput
  variant="icon"
  label="Label"
  icon={<MapPin />}
  helperText="Helper text to guide you on what to do"
  value={value}
  onValueChange={setValue}
  onSearch={(v) => console.log('Search:', v)}
/>`}
          />
        </CardContent>
      </Card>

      {/* Button Variant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Button Variant
          </CardTitle>
          <CardDescription>
            Search input with a &quot;Search&quot; text button on the right.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-sm">
            <SearchInput
              variant="button"
              label="Label"
              icon={<MapPin />}
              helperText="Helper text to guide you on what to do"
              value={buttonValue}
              onValueChange={setButtonValue}
              onSearch={(v) => setSearchResult(`Button search: ${v}`)}
            />
          </div>
          <CodeBlock
            code={`<SearchInput
  variant="button"
  label="Label"
  icon={<MapPin />}
  helperText="Helper text to guide you on what to do"
  value={value}
  onValueChange={setValue}
  onSearch={(v) => console.log('Search:', v)}
/>`}
          />
        </CardContent>
      </Card>

      {/* With Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            With Suggestions
          </CardTitle>
          <CardDescription>
            Type in the input to see a dropdown of suggestion results. Click a
            suggestion to select it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-sm">
            <SearchInput
              variant="icon"
              label="Label"
              icon={<MapPin />}
              helperText="Helper text to guide you on what to do"
              value={suggestValue}
              onValueChange={setSuggestValue}
              suggestions={sampleSuggestions}
              onSuggestionClick={(label) =>
                setSearchResult(`Selected: ${label}`)
              }
            />
          </div>
          <CodeBlock
            code={`const suggestions = [
  { icon: <MapPin />, label: 'Text' },
  { icon: <MapPin />, label: 'Text filled' },
  { icon: <MapPin />, label: 'Text filled 1' },
  { icon: <MapPin />, label: 'Text filled 2' },
]

<SearchInput
  variant="icon"
  label="Label"
  icon={<MapPin />}
  suggestions={suggestions}
  onSuggestionClick={(label) => console.log('Selected:', label)}
/>`}
          />
        </CardContent>
      </Card>

      {/* Without Left Icon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Without Left Icon
          </CardTitle>
          <CardDescription>
            Search input without a left icon, both variants.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 max-w-sm">
            <SearchInput
              variant="icon"
              label="Label"
              placeholder="Search..."
              helperText="Icon variant without left icon"
            />
            <SearchInput
              variant="button"
              label="Label"
              placeholder="Search..."
              helperText="Button variant without left icon"
            />
          </div>
          <CodeBlock
            code={`{/* Omit the icon prop */}
<SearchInput variant="icon" label="Label" placeholder="Search..." />
<SearchInput variant="button" label="Label" placeholder="Search..." />`}
          />
        </CardContent>
      </Card>

      {/* Error State */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Error State
          </CardTitle>
          <CardDescription>
            Error styling with red border, subtle background, and error helper
            text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 max-w-sm">
            <SearchInput
              variant="icon"
              label="Label"
              icon={<MapPin />}
              error
              errorMessage="Helper text to guide you on what to do"
              defaultValue="Text filled"
            />
            <SearchInput
              variant="button"
              label="Label"
              icon={<MapPin />}
              error
              errorMessage="Helper text to guide you on what to do"
              defaultValue="Text filled"
            />
          </div>
          <CodeBlock
            code={`<SearchInput
  variant="icon"
  label="Label"
  icon={<MapPin />}
  error
  errorMessage="Helper text to guide you on what to do"
  defaultValue="Text filled"
/>`}
          />
        </CardContent>
      </Card>

      {/* Disabled State */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
            Disabled State
          </CardTitle>
          <CardDescription>
            Disabled search input with reduced opacity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 max-w-sm">
            <SearchInput
              variant="icon"
              label="Label"
              icon={<MapPin />}
              helperText="Helper text to guide you on what to do"
              disabled
            />
            <SearchInput
              variant="button"
              label="Label"
              icon={<MapPin />}
              helperText="Helper text to guide you on what to do"
              disabled
            />
          </div>
          <CodeBlock
            code={`<SearchInput
  variant="icon"
  label="Label"
  icon={<MapPin />}
  disabled
  helperText="Helper text to guide you on what to do"
/>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
