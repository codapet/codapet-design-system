'use client'

import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button, LoadingDots } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '../buttons/CodeBlock'

export default function LayoutPage() {
  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4 ">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Layout Components
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
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
        <CardContent className="space-y-4">
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
          <CodeBlock
            code={`import { Tabs, TabsContent, TabsList, TabsTrigger, Input, Label, Switch } from '@codapet/design-system'

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
</Tabs>`}
          />
        </CardContent>
      </Card>

      <Card id="motion-demo">
        <CardHeader>
          <CardTitle>Motion</CardTitle>
          <CardDescription>
            Hover a card, switch a tab, or toggle the loading button
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card interactive className="cursor-pointer overflow-hidden py-0">
              <div className="overflow-hidden">
                <div className="interactive-media h-32 bg-primary-surface-light" />
              </div>
              <CardHeader className="pb-6">
                <CardTitle>{'<Card interactive>'}</CardTitle>
                <CardDescription>
                  The block above carries interactive-media
                </CardDescription>
              </CardHeader>
            </Card>
            <a
              href="#motion-demo"
              className="interactive-surface block rounded-3xl border border-gray-stroke-default p-5"
            >
              <p className="font-semibold">Any element</p>
              <p className="text-sm text-muted-foreground">
                className=&quot;interactive-surface&quot;
              </p>
            </a>
          </div>

          <Tabs defaultValue="euthanasia">
            <TabsList>
              <TabsTrigger value="euthanasia">Euthanasia</TabsTrigger>
              <TabsTrigger value="cremation">Cremation</TabsTrigger>
              <TabsTrigger value="memorial">Memorial</TabsTrigger>
            </TabsList>
            <TabsContent value="euthanasia" className="pt-2">
              Panels fade in only after the first switch.
            </TabsContent>
            <TabsContent value="cremation" className="pt-2">
              Private and communal options.
            </TabsContent>
            <TabsContent value="memorial" className="pt-2">
              Paw prints and keepsakes.
            </TabsContent>
          </Tabs>

          <LoadingButtonDemo />
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingButtonDemo() {
  const [loading, setLoading] = React.useState(false)
  return (
    <div className="flex items-center gap-3">
      <Button size="md" loading={loading}>
        {loading ? (
          <>
            Checking availability
            <LoadingDots />
          </>
        ) : (
          'Find availability'
        )}
      </Button>
      <Button size="md" variant="outline" onClick={() => setLoading(l => !l)}>
        Toggle loading
      </Button>
    </div>
  )
}
