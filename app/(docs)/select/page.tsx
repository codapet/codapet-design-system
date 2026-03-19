'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  SearchableSelect,
  SearchableSelectContent,
  SearchableSelectGroup,
  SearchableSelectItem,
  SearchableSelectTrigger
} from '@/components/ui/searchable-select'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' }
]

const groupedOptions = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'svelte', label: 'Svelte', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'deno', label: 'Deno', group: 'Backend' },
  { value: 'bun', label: 'Bun', group: 'Backend' },
  { value: 'express', label: 'Express', group: 'Backend' }
]

const disabledOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue', disabled: true },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte', disabled: true }
]

export default function SelectPage() {
  const [singleValue, setSingleValue] = useState('')
  const [singleNoSearch, setSingleNoSearch] = useState('')
  const [multiValues, setMultiValues] = useState<string[]>([])
  const [multiMaxValues, setMultiMaxValues] = useState<string[]>([
    'react',
    'vue',
    'angular',
    'svelte'
  ])
  const [groupedValue, setGroupedValue] = useState('')
  const [disabledValue, setDisabledValue] = useState('')
  const [composedValue, setComposedValue] = useState('')
  const [convenienceValue, setConvenienceValue] = useState('')

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Select Components
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Searchable single-select and multi-select dropdowns with badge tags,
          grouping, and full keyboard navigation
        </p>
      </div>

      {/* Basic Single Select */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Basic Single Select
          </CardTitle>
          <CardDescription>
            A searchable single-select dropdown. Type to filter options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-sm">
            <Label>Framework</Label>
            <SearchableSelect
              options={frameworks}
              value={singleValue}
              onValueChange={setSingleValue}
              placeholder="Select a framework..."
            >
              <SearchableSelectTrigger className="w-[400px]" />
              <SearchableSelectContent className="w-[400px]" />
            </SearchableSelect>
            {singleValue && (
              <p className="text-sm text-muted-foreground">
                Selected: {singleValue}
              </p>
            )}
          </div>
          <CodeBlock
            code={`import {
  SearchableSelect,
  SearchableSelectTrigger,
  SearchableSelectContent,
} from '@codapet/design-system'

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
]

<SearchableSelect
  options={frameworks}
  value={value}
  onValueChange={setValue}
  placeholder="Select a framework..."
>
  <SearchableSelectTrigger />
  <SearchableSelectContent />
</SearchableSelect>`}
          />
        </CardContent>
      </Card>

      {/* Single Select - Search Disabled */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Single Select (Search Disabled)
          </CardTitle>
          <CardDescription>
            Search can be disabled with the <code>searchable</code> prop.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-sm">
            <Label>Framework</Label>
            <SearchableSelect
              options={frameworks}
              value={singleNoSearch}
              onValueChange={setSingleNoSearch}
              placeholder="Select a framework..."
              searchable={false}
            >
              <SearchableSelectTrigger />
              <SearchableSelectContent />
            </SearchableSelect>
          </div>
          <CodeBlock
            code={`<SearchableSelect
  options={frameworks}
  value={value}
  onValueChange={setValue}
  searchable={false}
  placeholder="Select a framework..."
>
  <SearchableSelectTrigger />
  <SearchableSelectContent />
</SearchableSelect>`}
          />
        </CardContent>
      </Card>

      {/* Multi Select */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Multi Select
          </CardTitle>
          <CardDescription>
            Select multiple items. Selected values appear as removable badge
            tags.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-md">
            <Label>Frameworks</Label>
            <SearchableSelect
              mode="multiple"
              options={frameworks}
              values={multiValues}
              onValuesChange={setMultiValues}
              placeholder="Select frameworks..."
            >
              <SearchableSelectTrigger />
              <SearchableSelectContent />
            </SearchableSelect>
            {multiValues.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Selected: {multiValues.join(', ')}
              </p>
            )}
          </div>
          <CodeBlock
            code={`<SearchableSelect
  mode="multiple"
  options={frameworks}
  values={values}
  onValuesChange={setValues}
  placeholder="Select frameworks..."
>
  <SearchableSelectTrigger />
  <SearchableSelectContent />
</SearchableSelect>`}
          />
        </CardContent>
      </Card>

      {/* Multi Select with maxCount */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Multi Select with maxCount
          </CardTitle>
          <CardDescription>
            Limit visible badges with <code>maxCount</code>. Excess items show
            as &quot;+N more&quot;.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-md">
            <Label>Frameworks (max 2 visible)</Label>
            <SearchableSelect
              mode="multiple"
              options={frameworks}
              values={multiMaxValues}
              onValuesChange={setMultiMaxValues}
              maxCount={2}
              placeholder="Select frameworks..."
            >
              <SearchableSelectTrigger />
              <SearchableSelectContent />
            </SearchableSelect>
          </div>
          <CodeBlock
            code={`<SearchableSelect
  mode="multiple"
  options={frameworks}
  values={values}
  onValuesChange={setValues}
  maxCount={2}
  placeholder="Select frameworks..."
>
  <SearchableSelectTrigger />
  <SearchableSelectContent />
</SearchableSelect>`}
          />
        </CardContent>
      </Card>

      {/* Grouped Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            Grouped Options
          </CardTitle>
          <CardDescription>
            Options can be grouped using the <code>group</code> field or
            composing <code>SearchableSelectGroup</code> manually.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-sm">
            <Label>Technology</Label>
            <SearchableSelect
              options={groupedOptions}
              value={groupedValue}
              onValueChange={setGroupedValue}
              placeholder="Select a technology..."
            >
              <SearchableSelectTrigger />
              <SearchableSelectContent />
            </SearchableSelect>
          </div>
          <CodeBlock
            code={`const options = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'deno', label: 'Deno', group: 'Backend' },
]

<SearchableSelect
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="Select a technology..."
>
  <SearchableSelectTrigger />
  <SearchableSelectContent />
</SearchableSelect>`}
          />
        </CardContent>
      </Card>

      {/* Disabled State */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Disabled States
          </CardTitle>
          <CardDescription>
            Disable the entire select or individual items.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Disabled Select</Label>
              <SearchableSelect
                options={frameworks}
                disabled
                placeholder="Disabled..."
              >
                <SearchableSelectTrigger />
                <SearchableSelectContent />
              </SearchableSelect>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Disabled Items (Vue, Svelte)</Label>
              <SearchableSelect
                options={disabledOptions}
                value={disabledValue}
                onValueChange={setDisabledValue}
                placeholder="Select a framework..."
              >
                <SearchableSelectTrigger />
                <SearchableSelectContent />
              </SearchableSelect>
            </div>
          </div>
          <CodeBlock
            code={`// Disabled entire select
<SearchableSelect options={frameworks} disabled>
  <SearchableSelectTrigger />
  <SearchableSelectContent />
</SearchableSelect>

// Disabled individual items
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue', disabled: true },
]

<SearchableSelect options={options} value={value} onValueChange={setValue}>
  <SearchableSelectTrigger />
  <SearchableSelectContent />
</SearchableSelect>`}
          />
        </CardContent>
      </Card>

      {/* Composed Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Composed Usage
          </CardTitle>
          <CardDescription>
            Build your select with explicit sub-components for full control over
            groups, items, and empty states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-sm">
            <Label>Runtime</Label>
            <SearchableSelect
              value={composedValue}
              onValueChange={setComposedValue}
              placeholder="Pick a runtime..."
              searchPlaceholder="Filter runtimes..."
            >
              <SearchableSelectTrigger />
              <SearchableSelectContent emptyText="No runtimes match your search.">
                <SearchableSelectGroup heading="JavaScript">
                  <SearchableSelectItem value="node">
                    Node.js
                  </SearchableSelectItem>
                  <SearchableSelectItem value="deno">Deno</SearchableSelectItem>
                  <SearchableSelectItem value="bun">Bun</SearchableSelectItem>
                </SearchableSelectGroup>
                <SearchableSelectGroup heading="Systems">
                  <SearchableSelectItem value="rust">Rust</SearchableSelectItem>
                  <SearchableSelectItem value="go">Go</SearchableSelectItem>
                  <SearchableSelectItem value="zig">Zig</SearchableSelectItem>
                </SearchableSelectGroup>
              </SearchableSelectContent>
            </SearchableSelect>
          </div>
          <CodeBlock
            code={`<SearchableSelect
  value={value}
  onValueChange={setValue}
  placeholder="Pick a runtime..."
  searchPlaceholder="Filter runtimes..."
>
  <SearchableSelectTrigger />
  <SearchableSelectContent emptyText="No runtimes match.">
    <SearchableSelectGroup heading="JavaScript">
      <SearchableSelectItem value="node">Node.js</SearchableSelectItem>
      <SearchableSelectItem value="deno">Deno</SearchableSelectItem>
      <SearchableSelectItem value="bun">Bun</SearchableSelectItem>
    </SearchableSelectGroup>
    <SearchableSelectGroup heading="Systems">
      <SearchableSelectItem value="rust">Rust</SearchableSelectItem>
      <SearchableSelectItem value="go">Go</SearchableSelectItem>
    </SearchableSelectGroup>
  </SearchableSelectContent>
</SearchableSelect>`}
          />
        </CardContent>
      </Card>

      {/* Convenience Options Prop */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Convenience Options Prop
          </CardTitle>
          <CardDescription>
            Pass an <code>options</code> array for quick setup without composing
            items manually.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 max-w-sm">
            <Label>Framework</Label>
            <SearchableSelect
              options={frameworks}
              value={convenienceValue}
              onValueChange={setConvenienceValue}
              placeholder="Select..."
            >
              <SearchableSelectTrigger />
              <SearchableSelectContent />
            </SearchableSelect>
          </div>
          <CodeBlock
            code={`const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
]

<SearchableSelect
  options={options}
  value={value}
  onValueChange={setValue}
>
  <SearchableSelectTrigger />
  <SearchableSelectContent />
</SearchableSelect>`}
          />
        </CardContent>
      </Card>

      {/* Props Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
            Props Reference
          </CardTitle>
          <CardDescription>
            Complete list of available props for each sub-component.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SearchableSelect Props */}
          <div>
            <h4 className="text-sm font-semibold mb-2">
              {'<SearchableSelect>'}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium">Prop</th>
                    <th className="text-left py-2 pr-4 font-medium">Type</th>
                    <th className="text-left py-2 pr-4 font-medium">Default</th>
                    <th className="text-left py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">mode</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      &quot;single&quot; | &quot;multiple&quot;
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      &quot;single&quot;
                    </td>
                    <td className="py-2">Selection mode</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">value</td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">-</td>
                    <td className="py-2">Controlled value (single mode)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">
                      onValueChange
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      (value: string) =&gt; void
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">-</td>
                    <td className="py-2">
                      Callback when value changes (single)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">values</td>
                    <td className="py-2 pr-4 font-mono text-xs">string[]</td>
                    <td className="py-2 pr-4 font-mono text-xs">[]</td>
                    <td className="py-2">Controlled values (multiple mode)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">
                      onValuesChange
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      (values: string[]) =&gt; void
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">-</td>
                    <td className="py-2">
                      Callback when values change (multiple)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">options</td>
                    <td className="py-2 pr-4 font-mono text-xs">Option[]</td>
                    <td className="py-2 pr-4 font-mono text-xs">[]</td>
                    <td className="py-2">
                      Convenience array to auto-render items
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">searchable</td>
                    <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                    <td className="py-2 pr-4 font-mono text-xs">true</td>
                    <td className="py-2">Show/hide the search input</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">
                      searchPlaceholder
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      &quot;Search...&quot;
                    </td>
                    <td className="py-2">Placeholder for the search input</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">placeholder</td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      &quot;Select...&quot;
                    </td>
                    <td className="py-2">Trigger placeholder text</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                    <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                    <td className="py-2 pr-4 font-mono text-xs">false</td>
                    <td className="py-2">Disable the select</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">maxCount</td>
                    <td className="py-2 pr-4 font-mono text-xs">number</td>
                    <td className="py-2 pr-4 font-mono text-xs">Infinity</td>
                    <td className="py-2">
                      Max visible badges before &quot;+N more&quot;
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">open</td>
                    <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                    <td className="py-2 pr-4 font-mono text-xs">-</td>
                    <td className="py-2">Controlled open state</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">
                      onOpenChange
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      (open: boolean) =&gt; void
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">-</td>
                    <td className="py-2">Callback when open state changes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Trigger Props */}
          <div>
            <h4 className="text-sm font-semibold mb-2">
              {'<SearchableSelectTrigger>'}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium">Prop</th>
                    <th className="text-left py-2 pr-4 font-medium">Type</th>
                    <th className="text-left py-2 pr-4 font-medium">Default</th>
                    <th className="text-left py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">size</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      &quot;sm&quot; | &quot;default&quot;
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      &quot;default&quot;
                    </td>
                    <td className="py-2">Trigger size</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">className</td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">-</td>
                    <td className="py-2">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Content Props */}
          <div>
            <h4 className="text-sm font-semibold mb-2">
              {'<SearchableSelectContent>'}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium">Prop</th>
                    <th className="text-left py-2 pr-4 font-medium">Type</th>
                    <th className="text-left py-2 pr-4 font-medium">Default</th>
                    <th className="text-left py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">emptyText</td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      &quot;No results found.&quot;
                    </td>
                    <td className="py-2">
                      Text shown when no options match search
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">className</td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">-</td>
                    <td className="py-2">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Item Props */}
          <div>
            <h4 className="text-sm font-semibold mb-2">
              {'<SearchableSelectItem>'}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium">Prop</th>
                    <th className="text-left py-2 pr-4 font-medium">Type</th>
                    <th className="text-left py-2 pr-4 font-medium">Default</th>
                    <th className="text-left py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">value</td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">required</td>
                    <td className="py-2">Unique value for this item</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                    <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                    <td className="py-2 pr-4 font-mono text-xs">false</td>
                    <td className="py-2">Disable this item</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-xs">className</td>
                    <td className="py-2 pr-4 font-mono text-xs">string</td>
                    <td className="py-2 pr-4 font-mono text-xs">-</td>
                    <td className="py-2">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Option Type */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Option Type</h4>
            <CodeBlock
              code={`type SearchableSelectOption = {
  value: string    // Unique identifier
  label: string    // Display text
  disabled?: boolean  // Disable this option
  group?: string      // Group heading (auto-groups when using options prop)
}`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
