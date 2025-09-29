'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { Textarea } from '@/index'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Info,
  Layout,
  MessageSquare,
  MousePointer,
  PlusIcon,
  Search,
  ToggleLeft,
  Type
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import packageJson from '../package.json'

const navigationItems = [
  {
    id: 'buttons',
    label: 'Buttons',
    icon: MousePointer,
    description: 'Various button styles and states'
  },
  {
    id: 'inputs',
    label: 'Inputs',
    icon: Type,
    description: 'Input fields and form controls'
  },
  {
    id: 'textareas',
    label: 'Textareas',
    icon: MessageSquare,
    description: 'Multi-line text input fields'
  },
  {
    id: 'forms',
    label: 'Form Elements',
    icon: ToggleLeft,
    description: 'Checkboxes, radio buttons, switches'
  },
  {
    id: 'typography',
    label: 'Typography',
    icon: Type,
    description: 'Text styles and headings'
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: AlertCircle,
    description: 'Alerts, badges, and notifications'
  },
  {
    id: 'layout',
    label: 'Layout',
    icon: Layout,
    description: 'Cards, tabs, and containers'
  },
  {
    id: 'interactive',
    label: 'Interactive',
    icon: MousePointer,
    description: 'Sliders, progress bars, and controls'
  }
]

export default function Home() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'buttons'
  const renderContent = () => {
    switch (activeTab) {
      case 'buttons':
        return <ButtonsSection />
      case 'inputs':
        return <InputsSection />
      case 'textareas':
        return <TextareasSection />
      case 'forms':
        return <FormsSection />
      case 'typography':
        return <TypographySection />
      case 'feedback':
        return <FeedbackSection />
      case 'layout':
        return <LayoutSection />
      case 'interactive':
        return <InteractiveSection />
      default:
        return <ButtonsSection />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/codapet-logo.png"
                alt="CodaPet Logo"
                className="w-10 h-10 object-contain"
                width={40}
                height={40}
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-vibrant to-brand-normal bg-clip-text text-transparent">
                CodaPet Design System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">v{packageJson.version}</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <ScrollArea className="h-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Components
              </h2>
              <nav className="space-y-2">
                {navigationItems.map(item => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.id}
                      href={`?tab=${item.id}`}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm opacity-70 truncate">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-8">{renderContent()}</div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}

// Component Sections
function ButtonsSection() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Buttons
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Various button styles and states for different use cases
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Button Variants
          </CardTitle>
          <CardDescription>
            Different button styles and their use cases
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Without Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Without Icons
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button tabIndex={0}>Primary</Button>
              <Button tabIndex={0} variant="secondary">
                Secondary
              </Button>
              <Button tabIndex={0} variant="tertiary">
                Tertiary
              </Button>
              <Button tabIndex={0} variant="outline">
                Outline
              </Button>
              <Button tabIndex={0} variant="ghost">
                Ghost
              </Button>
              <Button tabIndex={0} variant="link">
                Link
              </Button>
              <Button tabIndex={0} variant="destructive">
                Destructive
              </Button>
              <Button tabIndex={0} variant="destructive-secondary">
                Destructive Secondary
              </Button>
              <Button variant="destructive-tertiary">
                Destructive Tertiary
              </Button>
            </div>
          </div>

          {/* With Left Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              With Left Icons
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button tabIndex={0} leftIcon={<ArrowLeft />}>
                Primary
              </Button>
              <Button tabIndex={0} variant="secondary" leftIcon={<ArrowLeft />}>
                Secondary
              </Button>
              <Button tabIndex={0} variant="tertiary" leftIcon={<ArrowLeft />}>
                Tertiary
              </Button>
              <Button tabIndex={0} variant="outline" leftIcon={<ArrowLeft />}>
                Outline
              </Button>
              <Button tabIndex={0} variant="ghost" leftIcon={<ArrowLeft />}>
                Ghost
              </Button>
              <Button tabIndex={0} variant="link" leftIcon={<ArrowLeft />}>
                Link
              </Button>
              <Button
                tabIndex={0}
                variant="destructive"
                leftIcon={<ArrowLeft />}
              >
                Destructive
              </Button>
              <Button
                tabIndex={0}
                variant="destructive-secondary"
                leftIcon={<ArrowLeft />}
              >
                Destructive Secondary
              </Button>
              <Button variant="destructive-tertiary" leftIcon={<ArrowLeft />}>
                Destructive Tertiary
              </Button>
            </div>
          </div>

          {/* With Right Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              With Right Icons
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button tabIndex={0} rightIcon={<ArrowRight />}>
                Primary
              </Button>
              <Button
                tabIndex={0}
                variant="secondary"
                rightIcon={<ArrowRight />}
              >
                Secondary
              </Button>
              <Button
                tabIndex={0}
                variant="tertiary"
                rightIcon={<ArrowRight />}
              >
                Tertiary
              </Button>
              <Button tabIndex={0} variant="outline" rightIcon={<ArrowRight />}>
                Outline
              </Button>
              <Button tabIndex={0} variant="ghost" rightIcon={<ArrowRight />}>
                Ghost
              </Button>
              <Button tabIndex={0} variant="link" rightIcon={<ArrowRight />}>
                Link
              </Button>
              <Button
                tabIndex={0}
                variant="destructive"
                rightIcon={<ArrowRight />}
              >
                Destructive
              </Button>
              <Button
                tabIndex={0}
                variant="destructive-secondary"
                rightIcon={<ArrowRight />}
              >
                Destructive Secondary
              </Button>
              <Button variant="destructive-tertiary" rightIcon={<ArrowRight />}>
                Destructive Tertiary
              </Button>
            </div>
          </div>

          {/* With Both Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              With Both Icons
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button
                tabIndex={0}
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Primary
              </Button>
              <Button
                tabIndex={0}
                variant="secondary"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Secondary
              </Button>
              <Button
                tabIndex={0}
                variant="tertiary"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Tertiary
              </Button>
              <Button
                tabIndex={0}
                variant="outline"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Outline
              </Button>
              <Button
                tabIndex={0}
                variant="ghost"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Ghost
              </Button>
              <Button
                tabIndex={0}
                variant="link"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Link
              </Button>
              <Button
                tabIndex={0}
                variant="destructive"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Destructive
              </Button>
              <Button
                tabIndex={0}
                variant="destructive-secondary"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Destructive Secondary
              </Button>
              <Button
                variant="destructive-tertiary"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Destructive Tertiary
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Sizes
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button variant="primary" size="icon">
                <PlusIcon className="w-4 h-4 shrink-0" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            Disabled Buttons
          </CardTitle>
          <CardDescription>
            All button variants in disabled state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Without Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Without Icons
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Primary</Button>
              <Button disabled variant="secondary">
                Secondary
              </Button>
              <Button disabled variant="tertiary">
                Tertiary
              </Button>
              <Button disabled variant="outline">
                Outline
              </Button>
              <Button disabled variant="ghost">
                Ghost
              </Button>
              <Button disabled variant="link">
                Link
              </Button>
              <Button disabled variant="destructive">
                Destructive
              </Button>
              <Button disabled variant="destructive-secondary">
                Destructive Secondary
              </Button>
              <Button disabled variant="destructive-tertiary">
                Destructive Tertiary
              </Button>
            </div>
          </div>

          {/* With Left Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              With Left Icons
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button disabled leftIcon={<ArrowLeft />}>
                Primary
              </Button>
              <Button disabled variant="secondary" leftIcon={<ArrowLeft />}>
                Secondary
              </Button>
              <Button disabled variant="tertiary" leftIcon={<ArrowLeft />}>
                Tertiary
              </Button>
              <Button disabled variant="outline" leftIcon={<ArrowLeft />}>
                Outline
              </Button>
              <Button disabled variant="ghost" leftIcon={<ArrowLeft />}>
                Ghost
              </Button>
              <Button disabled variant="link" leftIcon={<ArrowLeft />}>
                Link
              </Button>
              <Button disabled variant="destructive" leftIcon={<ArrowLeft />}>
                Destructive
              </Button>
              <Button
                disabled
                variant="destructive-secondary"
                leftIcon={<ArrowLeft />}
              >
                Destructive Secondary
              </Button>
              <Button
                disabled
                variant="destructive-tertiary"
                leftIcon={<ArrowLeft />}
              >
                Destructive Tertiary
              </Button>
            </div>
          </div>

          {/* With Right Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              With Right Icons
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button disabled rightIcon={<ArrowRight />}>
                Primary
              </Button>
              <Button disabled variant="secondary" rightIcon={<ArrowRight />}>
                Secondary
              </Button>
              <Button disabled variant="tertiary" rightIcon={<ArrowRight />}>
                Tertiary
              </Button>
              <Button disabled variant="outline" rightIcon={<ArrowRight />}>
                Outline
              </Button>
              <Button disabled variant="ghost" rightIcon={<ArrowRight />}>
                Ghost
              </Button>
              <Button disabled variant="link" rightIcon={<ArrowRight />}>
                Link
              </Button>
              <Button disabled variant="destructive" rightIcon={<ArrowRight />}>
                Destructive
              </Button>
              <Button
                disabled
                variant="destructive-secondary"
                rightIcon={<ArrowRight />}
              >
                Destructive Secondary
              </Button>
              <Button
                disabled
                variant="destructive-tertiary"
                rightIcon={<ArrowRight />}
              >
                Destructive Tertiary
              </Button>
            </div>
          </div>

          {/* With Both Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              With Both Icons
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button
                disabled
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Primary
              </Button>
              <Button
                disabled
                variant="secondary"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Secondary
              </Button>
              <Button
                disabled
                variant="tertiary"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Tertiary
              </Button>
              <Button
                disabled
                variant="outline"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Outline
              </Button>
              <Button
                disabled
                variant="ghost"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Ghost
              </Button>
              <Button
                disabled
                variant="link"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Link
              </Button>
              <Button
                disabled
                variant="destructive"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Destructive
              </Button>
              <Button
                disabled
                variant="destructive-secondary"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Destructive Secondary
              </Button>
              <Button
                disabled
                variant="destructive-tertiary"
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
              >
                Destructive Tertiary
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Sizes
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button disabled size="sm">
                Small
              </Button>
              <Button disabled size="md">
                Medium
              </Button>
              <Button disabled size="lg">
                Large
              </Button>
              <Button disabled variant="primary" size="icon">
                <PlusIcon className="w-4 h-4 shrink-0" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Icon Customization
          </CardTitle>
          <CardDescription>
            Examples of custom icon styling and positioning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Custom Icon Sizes */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Custom Icon Sizes
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button
                leftIcon={<ArrowLeft />}
                leftIconClassName="[&_svg]:size-3"
              >
                Small Icon
              </Button>
              <Button
                leftIcon={<ArrowLeft />}
                leftIconClassName="[&_svg]:size-5"
              >
                Medium Icon
              </Button>
              <Button
                leftIcon={<ArrowLeft />}
                leftIconClassName="[&_svg]:size-6"
              >
                Large Icon
              </Button>
              <Button
                leftIcon={<ArrowLeft />}
                leftIconClassName="[&_svg]:size-8"
              >
                Extra Large Icon
              </Button>
            </div>
          </div>

          {/* Custom Icon Spacing */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Custom Icon Spacing
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button leftIcon={<ArrowLeft />} leftIconClassName="mr-1">
                Tight Spacing
              </Button>
              <Button leftIcon={<ArrowLeft />} leftIconClassName="mr-3">
                Normal Spacing
              </Button>
              <Button leftIcon={<ArrowLeft />} leftIconClassName="mr-6">
                Wide Spacing
              </Button>
              <Button rightIcon={<ArrowRight />} rightIconClassName="ml-1">
                Tight Right
              </Button>
              <Button rightIcon={<ArrowRight />} rightIconClassName="ml-3">
                Normal Right
              </Button>
              <Button rightIcon={<ArrowRight />} rightIconClassName="ml-6">
                Wide Right
              </Button>
            </div>
          </div>

          {/* Custom Icon Colors */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Custom Icon Colors
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button
                leftIcon={<ArrowLeft />}
                leftIconClassName="[&_svg]:stroke-blue-500"
              >
                Blue Icon
              </Button>
              <Button
                leftIcon={<ArrowLeft />}
                leftIconClassName="[&_svg]:stroke-green-500"
              >
                Green Icon
              </Button>
              <Button
                leftIcon={<ArrowLeft />}
                leftIconClassName="[&_svg]:stroke-purple-500"
              >
                Purple Icon
              </Button>
              <Button
                leftIcon={<ArrowLeft />}
                leftIconClassName="[&_svg]:stroke-orange-500"
              >
                Orange Icon
              </Button>
            </div>
          </div>

          {/* Mixed Customizations */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Mixed Customizations
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
                leftIconClassName="[&_svg]:size-5 [&_svg]:stroke-blue-500 mr-2"
                rightIconClassName="[&_svg]:size-3 [&_svg]:stroke-green-500 ml-2"
              >
                Different Sizes
              </Button>
              <Button
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
                leftIconClassName="[&_svg]:stroke-red-500 mr-4"
                rightIconClassName="[&_svg]:stroke-blue-500 ml-4"
              >
                Different Colors
              </Button>
              <Button
                leftIcon={<ArrowLeft />}
                rightIcon={<ArrowRight />}
                leftIconClassName="[&_svg]:size-6 [&_svg]:stroke-purple-500 mr-1"
                rightIconClassName="[&_svg]:size-4 [&_svg]:stroke-orange-500 ml-1"
              >
                Mixed Styles
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InputsSection() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Input Components
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Comprehensive input components with various states, sizes, and icon
          support
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Input Sizes
          </CardTitle>
          <CardDescription>Different input field sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Small Input
              </Label>
              <Input size="sm" placeholder="Small input field" />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Medium Input (Default)
              </Label>
              <Input placeholder="Medium input field" />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Large Input
              </Label>
              <Input size="lg" placeholder="Large input field" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Input States
          </CardTitle>
          <CardDescription>
            Different input states and validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Default State
              </Label>
              <Input placeholder="Default input state" />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Error State
              </Label>
              <Input placeholder="Error input state" error={true} />
              <p className="text-sm text-destructive mt-1">
                This field is required
              </p>
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Disabled State
              </Label>
              <Input placeholder="Disabled input" disabled />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                With Icons
              </Label>
              <Input placeholder="Search..." leftIcon={<Search />} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TextareasSection() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Textarea Components
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Multi-line text input fields for longer content
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Textarea States
          </CardTitle>
          <CardDescription>
            Different textarea states and validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Default State
              </Label>
              <Textarea placeholder="Default textarea state" />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Error State
              </Label>
              <Textarea placeholder="Error textarea state" error={true} />
              <p className="text-sm text-destructive mt-1">
                This field is required
              </p>
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Disabled State
              </Label>
              <Textarea placeholder="Disabled textarea" disabled />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                With Label
              </Label>
              <Textarea placeholder="Enter your message" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FormsSection() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Form Elements
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Checkboxes, radio buttons, switches, and other form controls
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Interactive Elements
            </CardTitle>
            <CardDescription>
              Switches, sliders, and progress indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane mode</Label>
            </div>
            <div className="space-y-2">
              <Label>Volume</Label>
              <Slider
                defaultValue={[33]}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Progress</Label>
              <Progress value={65} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Selection Controls
            </CardTitle>
            <CardDescription>Radio buttons and checkboxes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center space-x-2">
              <Checkbox id="notifications" />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TypographySection() {
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
        </CardContent>
      </Card>
    </div>
  )
}

function FeedbackSection() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Feedback Components
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Alerts, badges, and notification components for user feedback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Alerts
            </CardTitle>
            <CardDescription>
              Feedback and notification messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                This is an informational alert with an icon.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This is a destructive alert for errors.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              Avatars & Badges
            </CardTitle>
            <CardDescription>
              User avatars and status indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LayoutSection() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Layout Components
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Cards, tabs, and container components for organizing content
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Tabs & Navigation
          </CardTitle>
          <CardDescription>Organized content with tabs</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter your username" />
              </div>
            </TabsContent>
            <TabsContent value="password" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Email notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="marketing" />
                <Label htmlFor="marketing">Marketing emails</Label>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function InteractiveSection() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Interactive Components
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Sliders, progress bars, and interactive controls
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Interactive Controls
          </CardTitle>
          <CardDescription>
            Sliders, switches, and progress indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane mode</Label>
          </div>
          <div className="space-y-2">
            <Label>Volume</Label>
            <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
          </div>
          <div className="space-y-2">
            <Label>Progress</Label>
            <Progress value={65} className="w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
