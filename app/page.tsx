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
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  Body,
  DisplayHeading,
  HeadingL,
  HeadingM,
  HeadingS,
  HeadingXL,
  HeadingXS,
  HeadingXXS,
  Label
} from '@/components/ui/typography'
import { AlertCircle, Info, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import packageJson from '../package.json'

export default function Home() {
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Beautiful, Accessible Components
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive collection of reusable UI components built with
            Tailwind CSS and shadcn/ui, designed to create consistent and
            delightful user experiences across all CodaPet applications.
          </p>
        </div>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Buttons
              </CardTitle>
              <CardDescription>
                Various button styles and states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button variant="primary" size="icon">
                  <PlusIcon className="w-4 h-4 shrink-0" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Form Elements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Form Elements
              </CardTitle>
              <CardDescription>Input fields and form controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Elements */}
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

          {/* Selection Controls */}
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

        {/* Tabs Section */}
        <Card className="mb-16">
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

        {/* Alerts and Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

        {/* Typography */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              Typography
            </CardTitle>
            <CardDescription>Display text variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <DisplayHeading size="lg">Display Text Large</DisplayHeading>
              <DisplayHeading size="md">Display Text Medium</DisplayHeading>
              <DisplayHeading size="sm">Display Text Small</DisplayHeading>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                Heading Components
              </h3>
              <div className="space-y-3">
                <HeadingXL>Heading XL - Extra Large Heading</HeadingXL>
                <HeadingL>Heading L - Large Heading</HeadingL>
                <HeadingM>Heading M - Medium Heading</HeadingM>
                <HeadingS>Heading S - Small Heading</HeadingS>
                <HeadingXS>Heading XS - Extra Small Heading</HeadingXS>
                <HeadingXXS>Heading XXS - Extra Extra Small Heading</HeadingXXS>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                Body Text Components
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Large Body Text
                  </p>
                  <Body size="lg">
                    This is large body text. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </Body>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Medium Body Text (Default)
                  </p>
                  <Body size="md">
                    This is medium body text. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </Body>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Small Body Text
                  </p>
                  <Body size="sm">
                    This is small body text. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </Body>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Extra Small Body Text
                  </p>
                  <Body size="xs">
                    This is extra small body text. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </Body>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                Label Components
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Large Label
                  </p>
                  <Label size="lg">
                    Large label text for prominent form fields
                  </Label>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Medium Label (Default)
                  </p>
                  <Label size="md">
                    Medium label text for standard form fields
                  </Label>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Small Label
                  </p>
                  <Label size="sm">
                    Small label text for compact form fields
                  </Label>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    Extra Small Label
                  </p>
                  <Label size="xs">
                    Extra small label text for minimal form fields
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Separator className="my-8" />
        <div className="text-center text-slate-600 dark:text-slate-400">
          <p className="mb-2">Built with ❤️ for CodaPet</p>
          <p className="text-sm">
            Powered by Tailwind CSS, shadcn/ui, and Next.js
          </p>
        </div>
      </main>
    </div>
  )
}
