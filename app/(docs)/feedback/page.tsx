import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AlertCircle, Info } from 'lucide-react'
import { CodeBlock } from '../buttons/CodeBlock'

export default function FeedbackPage() {
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
            <CodeBlock
              code={`import { Alert, AlertDescription } from '@codapet/design-system'
import { Info, AlertCircle } from 'lucide-react'

{/* Informational Alert */}
<Alert>
  <Info className="h-4 w-4" />
  <AlertDescription>
    This is an informational alert with an icon.
  </AlertDescription>
</Alert>

{/* Destructive Alert */}
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>
    This is a destructive alert for errors.
  </AlertDescription>
</Alert>`}
            />
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
            <CodeBlock
              code={`import { Avatar, AvatarFallback, AvatarImage } from '@codapet/design-system'
import { Badge } from '@codapet/design-system'

{/* Avatars */}
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

{/* Badges */}
<div className="flex flex-wrap gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
