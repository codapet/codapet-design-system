'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Body,
  DisplayHeading,
  HeadingL,
  HeadingM,
  HeadingS,
  HeadingXL,
  HeadingXS,
  HeadingXXS
} from '@/components/ui/typography'
import { CodeBlock } from '../buttons/CodeBlock'

export default function TypographyPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Typography
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Text styles and typography components for consistent content hierarchy
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            Display Headings
          </CardTitle>
          <CardDescription>
            Large display text for hero sections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <DisplayHeading size="lg">Display Text Large</DisplayHeading>
            <DisplayHeading size="md">Display Text Medium</DisplayHeading>
            <DisplayHeading size="sm">Display Text Small</DisplayHeading>
          </div>
          <CodeBlock
            code={`import { DisplayHeading } from '@codapet/design-system'

<DisplayHeading size="lg">Display Text Large</DisplayHeading>
<DisplayHeading size="md">Display Text Medium</DisplayHeading>
<DisplayHeading size="sm">Display Text Small</DisplayHeading>`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Heading Components
          </CardTitle>
          <CardDescription>Hierarchical heading styles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <HeadingXL>Heading XL - Extra Large Heading</HeadingXL>
            <HeadingL>Heading L - Large Heading</HeadingL>
            <HeadingM>Heading M - Medium Heading</HeadingM>
            <HeadingS>Heading S - Small Heading</HeadingS>
            <HeadingXS>Heading XS - Extra Small Heading</HeadingXS>
            <HeadingXXS>Heading XXS - Extra Extra Small Heading</HeadingXXS>
          </div>
          <CodeBlock
            code={`import {
  HeadingXL,
  HeadingL,
  HeadingM,
  HeadingS,
  HeadingXS,
  HeadingXXS
} from '@codapet/design-system'

<HeadingXL>Heading XL - Extra Large Heading</HeadingXL>
<HeadingL>Heading L - Large Heading</HeadingL>
<HeadingM>Heading M - Medium Heading</HeadingM>
<HeadingS>Heading S - Small Heading</HeadingS>
<HeadingXS>Heading XS - Extra Small Heading</HeadingXS>
<HeadingXXS>Heading XXS - Extra Extra Small Heading</HeadingXXS>`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Body Text Components
          </CardTitle>
          <CardDescription>
            Body text for content and descriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Large Body Text
              </p>
              <Body size="lg">
                This is large body text. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Body>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Medium Body Text (Default)
              </p>
              <Body size="md">
                This is medium body text. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </Body>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Small Body Text
              </p>
              <Body size="sm">
                This is small body text. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Body>
            </div>
          </div>
          <CodeBlock
            code={`import { Body } from '@codapet/design-system'
{/* Large Body Text */}
<Body size="lg">
  This is large body text. Lorem ipsum dolor sit amet, consectetur
  adipiscing elit.
</Body>

{/* Medium Body Text (Default) */}
<Body size="md">
  This is medium body text. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit.
</Body>

{/* Small Body Text */}
<Body size="sm">
  This is small body text. Lorem ipsum dolor sit amet, consectetur
  adipiscing elit.
</Body>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
