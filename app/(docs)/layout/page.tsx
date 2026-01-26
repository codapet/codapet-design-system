import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '../buttons/CodeBlock'

export default function LayoutPage() {
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
            code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from '@codapet/design-system'
import { Input } from '@codapet/design-system'
import { Label } from '@codapet/design-system'
import { Switch } from '@codapet/design-system'

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
    </div>
  )
}
