import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, Info, Settings, Heart } from 'lucide-react'
import packageJson from '../package.json'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/codapet-logo.png"
                alt="CodaPet Logo"
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-vibrant to-brand-normal bg-clip-text text-transparent">
                CodaPet Design System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">v{packageJson.version}</Badge>
              {/*
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>

                */}
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
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
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
