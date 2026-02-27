import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon
} from 'lucide-react'
import { CodeBlock } from '../buttons/CodeBlock'

export default function AccordionPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Accordion
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Expandable accordion panels with customisable icons and behaviours
        </p>
      </div>

      {/* Default */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Default
          </CardTitle>
          <CardDescription>
            Single collapsible accordion with the default rotating chevron icon
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a design system?</AccordionTrigger>
              <AccordionContent>
                A design system is a collection of reusable components, guided
                by clear standards, that can be assembled to build any number of
                applications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why use reusable components?</AccordionTrigger>
              <AccordionContent>
                Reusable components promote consistency across products, reduce
                duplicated effort, and make it easier to maintain and evolve
                your UI over time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I get started?</AccordionTrigger>
              <AccordionContent>
                Install the package, import the components you need, and start
                building. Check the documentation for each component for
                detailed usage examples.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <CodeBlock
            code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@codapet/design-system'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is a design system?</AccordionTrigger>
    <AccordionContent>
      A design system is a collection of reusable components...
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Why use reusable components?</AccordionTrigger>
    <AccordionContent>
      Reusable components promote consistency across products...
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          />
        </CardContent>
      </Card>

      {/* Plus / Minus icons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Plus / Minus Icons
          </CardTitle>
          <CardDescription>
            Custom{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              collapsedIcon
            </code>{' '}
            and{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              expandedIcon
            </code>{' '}
            props using{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              PlusIcon
            </code>{' '}
            and{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              MinusIcon
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                collapsedIcon={<PlusIcon className="size-4" />}
                expandedIcon={<MinusIcon className="size-4" />}
              >
                Can I use custom icons?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Pass <code>collapsedIcon</code> and{' '}
                <code>expandedIcon</code> to <code>AccordionTrigger</code> to
                replace the default chevron with any React node.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger
                collapsedIcon={<PlusIcon className="size-4" />}
                expandedIcon={<MinusIcon className="size-4" />}
              >
                Do animations still work?
              </AccordionTrigger>
              <AccordionContent>
                The content panel still animates open and closed. Only the icon
                rendering changes — the expand/collapse animations come from the
                Radix primitive.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger
                collapsedIcon={<PlusIcon className="size-4" />}
                expandedIcon={<MinusIcon className="size-4" />}
              >
                Is the icon accessible?
              </AccordionTrigger>
              <AccordionContent>
                Icons are wrapped in a <code>span</code> with{' '}
                <code>pointer-events-none</code>. The trigger button itself
                handles all keyboard and screen-reader interactions via the
                Radix primitive.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <CodeBlock
            code={`import { PlusIcon, MinusIcon } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@codapet/design-system'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger
      collapsedIcon={<PlusIcon className="size-4" />}
      expandedIcon={<MinusIcon className="size-4" />}
    >
      Can I use custom icons?
    </AccordionTrigger>
    <AccordionContent>
      Yes! Pass collapsedIcon and expandedIcon to AccordionTrigger...
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          />
        </CardContent>
      </Card>

      {/* Chevron Up / Down (no rotation) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            Chevron Up / Down Icons
          </CardTitle>
          <CardDescription>
            Using separate up and down chevrons instead of the rotating default
            — useful when you want a swap rather than a rotation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                collapsedIcon={<ChevronDownIcon className="size-4" />}
                expandedIcon={<ChevronUpIcon className="size-4" />}
              >
                Billing information
              </AccordionTrigger>
              <AccordionContent>
                Manage your payment methods, billing address, and view past
                invoices from your account settings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger
                collapsedIcon={<ChevronDownIcon className="size-4" />}
                expandedIcon={<ChevronUpIcon className="size-4" />}
              >
                Notification preferences
              </AccordionTrigger>
              <AccordionContent>
                Choose which emails and push notifications you want to receive.
                You can unsubscribe from any category at any time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <CodeBlock
            code={`import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

<AccordionTrigger
  collapsedIcon={<ChevronDownIcon className="size-4" />}
  expandedIcon={<ChevronUpIcon className="size-4" />}
>
  Billing information
</AccordionTrigger>`}
          />
        </CardContent>
      </Card>

      {/* Only expandedIcon provided */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            Only <code className="text-sm font-mono">expandedIcon</code>{' '}
            Provided
          </CardTitle>
          <CardDescription>
            When only{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              expandedIcon
            </code>{' '}
            is supplied, no icon is rendered in the collapsed state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                expandedIcon={
                  <PlusCircleIcon className="size-4 text-primary" />
                }
              >
                Show more details
              </AccordionTrigger>
              <AccordionContent>
                An icon appears only when the panel is expanded. This pattern
                works well for &quot;read more&quot; flows where the closed
                state should look clean.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger
                expandedIcon={
                  <PlusCircleIcon className="size-4 text-primary" />
                }
              >
                Advanced options
              </AccordionTrigger>
              <AccordionContent>
                These settings are hidden by default and only revealed when the
                user explicitly chooses to expand this section.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <CodeBlock
            code={`import { PlusCircleIcon } from 'lucide-react'

<AccordionTrigger
  expandedIcon={<PlusCircleIcon className="size-4 text-primary" />}
>
  Show more details
</AccordionTrigger>`}
          />
        </CardContent>
      </Card>

      {/* type="multiple" */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full" />
            Multiple Open at Once
          </CardTitle>
          <CardDescription>
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              type=&quot;multiple&quot;
            </code>{' '}
            allows several items to be expanded simultaneously
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Shipping policy</AccordionTrigger>
              <AccordionContent>
                We offer free standard shipping on all orders over $50. Express
                and overnight options are available at checkout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Returns & exchanges</AccordionTrigger>
              <AccordionContent>
                Items may be returned within 30 days of delivery in their
                original condition. Start a return from your order history page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Warranty information</AccordionTrigger>
              <AccordionContent>
                All products come with a 12-month manufacturer warranty.
                Extended warranty plans are available for select items.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <CodeBlock
            code={`<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>Shipping policy</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Returns & exchanges</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`}
          />
        </CardContent>
      </Card>

      {/* Disabled item */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full" />
            Disabled Item
          </CardTitle>
          <CardDescription>
            Individual items can be disabled by adding the{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              disabled
            </code>{' '}
            prop to{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              AccordionTrigger
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Available section</AccordionTrigger>
              <AccordionContent>
                This section is fully interactive and can be expanded or
                collapsed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger disabled>
                Disabled section (requires upgrade)
              </AccordionTrigger>
              <AccordionContent>
                This content is not reachable because the trigger is disabled.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Another available section</AccordionTrigger>
              <AccordionContent>
                This section is also interactive and works independently of the
                disabled item above.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <CodeBlock
            code={`<AccordionItem value="item-2">
  <AccordionTrigger disabled>
    Disabled section (requires upgrade)
  </AccordionTrigger>
  <AccordionContent>...</AccordionContent>
</AccordionItem>`}
          />
        </CardContent>
      </Card>

      {/* type="single" without collapsible */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            Single — Not Collapsible
          </CardTitle>
          <CardDescription>
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              type=&quot;single&quot;
            </code>{' '}
            without{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              collapsible
            </code>{' '}
            — one item is always open and clicking the active trigger has no
            effect
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Profile settings</AccordionTrigger>
              <AccordionContent>
                Update your display name, avatar, and public profile information
                from this section.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Security settings</AccordionTrigger>
              <AccordionContent>
                Change your password, enable two-factor authentication, and
                manage active sessions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Connected accounts</AccordionTrigger>
              <AccordionContent>
                Link your GitHub, Google, or other third-party accounts for
                single sign-on access.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <CodeBlock
            code={`<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Profile settings</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Security settings</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
