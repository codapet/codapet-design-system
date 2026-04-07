'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { CodeBlock } from '../buttons/CodeBlock'

export default function TabsPage() {
  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Tabs
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Horizontal and vertical tab navigation with animated sliding
          indicator
        </p>
      </div>

      {/* ──── Medium Size ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Medium Size (Default)
          </CardTitle>
          <CardDescription>
            Default tab size with 14px font and 72px minimum width.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList>
              <TabsTrigger value="tab1">Account</TabsTrigger>
              <TabsTrigger value="tab2">Password</TabsTrigger>
              <TabsTrigger value="tab3">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Account settings content goes here.
              </p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Password settings content goes here.
              </p>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4">
              <p className="text-sm text-muted-foreground">
                General settings content goes here.
              </p>
            </TabsContent>
          </Tabs>

          <CodeBlock
            code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from '@codapet/design-system'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Password</TabsTrigger>
    <TabsTrigger value="tab3">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Account content</TabsContent>
  <TabsContent value="tab2">Password content</TabsContent>
  <TabsContent value="tab3">Settings content</TabsContent>
</Tabs>`}
          />
        </CardContent>
      </Card>

      {/* ──── Large Size ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Large Size
          </CardTitle>
          <CardDescription>
            Larger tab variant with 16px font and 88px minimum width.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList>
              <TabsTrigger value="tab1" size="lg">
                Account
              </TabsTrigger>
              <TabsTrigger value="tab2" size="lg">
                Password
              </TabsTrigger>
              <TabsTrigger value="tab3" size="lg">
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Account settings content goes here.
              </p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Password settings content goes here.
              </p>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4">
              <p className="text-sm text-muted-foreground">
                General settings content goes here.
              </p>
            </TabsContent>
          </Tabs>

          <CodeBlock
            code={`{/* Large size - pass size="lg" to each TabsTrigger */}
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1" size="lg">Account</TabsTrigger>
    <TabsTrigger value="tab2" size="lg">Password</TabsTrigger>
    <TabsTrigger value="tab3" size="lg">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">...</TabsContent>
</Tabs>`}
          />
        </CardContent>
      </Card>

      {/* ──── Tab Counts ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Tab Formations
          </CardTitle>
          <CardDescription>
            Tabs support any number of items. Showing formations of 2 through 6
            tabs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              6 Tabs
            </h4>
            <Tabs defaultValue="t1">
              <TabsList>
                <TabsTrigger value="t1">Tab</TabsTrigger>
                <TabsTrigger value="t2">Tab</TabsTrigger>
                <TabsTrigger value="t3">Tab</TabsTrigger>
                <TabsTrigger value="t4">Tab</TabsTrigger>
                <TabsTrigger value="t5">Tab</TabsTrigger>
                <TabsTrigger value="t6">Tab</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              5 Tabs
            </h4>
            <Tabs defaultValue="t1">
              <TabsList>
                <TabsTrigger value="t1">Tab</TabsTrigger>
                <TabsTrigger value="t2">Tab</TabsTrigger>
                <TabsTrigger value="t3">Tab</TabsTrigger>
                <TabsTrigger value="t4">Tab</TabsTrigger>
                <TabsTrigger value="t5">Tab</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              4 Tabs
            </h4>
            <Tabs defaultValue="t1">
              <TabsList>
                <TabsTrigger value="t1">Tab</TabsTrigger>
                <TabsTrigger value="t2">Tab</TabsTrigger>
                <TabsTrigger value="t3">Tab</TabsTrigger>
                <TabsTrigger value="t4">Tab</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              3 Tabs
            </h4>
            <Tabs defaultValue="t1">
              <TabsList>
                <TabsTrigger value="t1">Tab</TabsTrigger>
                <TabsTrigger value="t2">Tab</TabsTrigger>
                <TabsTrigger value="t3">Tab</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              2 Tabs
            </h4>
            <Tabs defaultValue="t1">
              <TabsList>
                <TabsTrigger value="t1">Tab</TabsTrigger>
                <TabsTrigger value="t2">Tab</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <CodeBlock
            code={`{/* Any number of tabs */}
<Tabs defaultValue="t1">
  <TabsList>
    <TabsTrigger value="t1">Tab</TabsTrigger>
    <TabsTrigger value="t2">Tab</TabsTrigger>
    <TabsTrigger value="t3">Tab</TabsTrigger>
    {/* Add more as needed */}
  </TabsList>
</Tabs>`}
          />
        </CardContent>
      </Card>

      {/* ──── States ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            States
          </CardTitle>
          <CardDescription>
            Tabs support default, selected, hover, focus, and disabled states.
            Hover and click to see state changes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              With Disabled Tab
            </h4>
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="normal">Normal</TabsTrigger>
                <TabsTrigger value="disabled" disabled>
                  Disabled
                </TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  This tab is selected.
                </p>
              </TabsContent>
              <TabsContent value="normal" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  This tab is selectable.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <CodeBlock
            code={`{/* Disabled tab */}
<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="normal">Normal</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
  </TabsList>
</Tabs>`}
          />
        </CardContent>
      </Card>

      {/* ──── With Content ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            With Content Panels
          </CardTitle>
          <CardDescription>
            Full working example with content panels that switch on tab
            selection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="demo-name">Name</Label>
                <Input id="demo-name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-email">Email</Label>
                <Input
                  id="demo-email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </TabsContent>
            <TabsContent value="password" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="demo-current">Current password</Label>
                <Input id="demo-current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-new">New password</Label>
                <Input id="demo-new" type="password" />
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">
                Configure your notification preferences here.
              </p>
            </TabsContent>
          </Tabs>

          <CodeBlock
            code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from '@codapet/design-system'
import { Input } from '@codapet/design-system'
import { Label } from '@codapet/design-system'

<Tabs defaultValue="account" className="w-full">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account" className="space-y-4 mt-4">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter your name" />
  </TabsContent>
  <TabsContent value="password" className="space-y-4 mt-4">
    <Label htmlFor="current">Current password</Label>
    <Input id="current" type="password" />
  </TabsContent>
  <TabsContent value="notifications" className="mt-4">
    Notification settings here...
  </TabsContent>
</Tabs>`}
          />
        </CardContent>
      </Card>

      {/* ──── Vertical Tabs ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            Vertical Tabs
          </CardTitle>
          <CardDescription>
            Vertical orientation with a sliding left-side indicator. Pass{' '}
            <code>orientation=&quot;vertical&quot;</code> to the Tabs root.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs
            defaultValue="tab1"
            orientation="vertical"
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="tab1">Account</TabsTrigger>
              <TabsTrigger value="tab2">Password</TabsTrigger>
              <TabsTrigger value="tab3">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <p className="text-sm text-muted-foreground">
                Account settings content goes here.
              </p>
            </TabsContent>
            <TabsContent value="tab2">
              <p className="text-sm text-muted-foreground">
                Password settings content goes here.
              </p>
            </TabsContent>
            <TabsContent value="tab3">
              <p className="text-sm text-muted-foreground">
                General settings content goes here.
              </p>
            </TabsContent>
          </Tabs>

          <CodeBlock
            code={`{/* Vertical orientation */}
<Tabs defaultValue="tab1" orientation="vertical">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Password</TabsTrigger>
    <TabsTrigger value="tab3">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Account content</TabsContent>
  <TabsContent value="tab2">Password content</TabsContent>
  <TabsContent value="tab3">Settings content</TabsContent>
</Tabs>`}
          />
        </CardContent>
      </Card>

      {/* ──── Vertical Large ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Vertical — Large Size
          </CardTitle>
          <CardDescription>
            Vertical tabs with the large size variant.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs
            defaultValue="tab1"
            orientation="vertical"
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="tab1" size="lg">
                Account
              </TabsTrigger>
              <TabsTrigger value="tab2" size="lg">
                Password
              </TabsTrigger>
              <TabsTrigger value="tab3" size="lg">
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <p className="text-sm text-muted-foreground">
                Account settings content goes here.
              </p>
            </TabsContent>
            <TabsContent value="tab2">
              <p className="text-sm text-muted-foreground">
                Password settings content goes here.
              </p>
            </TabsContent>
            <TabsContent value="tab3">
              <p className="text-sm text-muted-foreground">
                General settings content goes here.
              </p>
            </TabsContent>
          </Tabs>

          <CodeBlock
            code={`<Tabs defaultValue="tab1" orientation="vertical">
  <TabsList>
    <TabsTrigger value="tab1" size="lg">Account</TabsTrigger>
    <TabsTrigger value="tab2" size="lg">Password</TabsTrigger>
    <TabsTrigger value="tab3" size="lg">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">...</TabsContent>
</Tabs>`}
          />
        </CardContent>
      </Card>

      {/* ──── Vertical with Content ──── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Vertical with Content Panels
          </CardTitle>
          <CardDescription>
            Full working vertical example with form content panels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs
            defaultValue="account"
            orientation="vertical"
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="disabled" disabled>
                Disabled
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="v-name">Name</Label>
                <Input id="v-name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-email">Email</Label>
                <Input
                  id="v-email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </TabsContent>
            <TabsContent value="password" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="v-current">Current password</Label>
                <Input id="v-current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v-new">New password</Label>
                <Input id="v-new" type="password" />
              </div>
            </TabsContent>
            <TabsContent value="notifications">
              <p className="text-sm text-muted-foreground">
                Configure your notification preferences here.
              </p>
            </TabsContent>
          </Tabs>

          <CodeBlock
            code={`<Tabs defaultValue="account" orientation="vertical">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
  </TabsList>
  <TabsContent value="account" className="space-y-4">
    <Label>Name</Label>
    <Input placeholder="Enter your name" />
  </TabsContent>
  <TabsContent value="password" className="space-y-4">
    <Label>Current password</Label>
    <Input type="password" />
  </TabsContent>
  <TabsContent value="notifications">
    Notification settings here...
  </TabsContent>
</Tabs>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
