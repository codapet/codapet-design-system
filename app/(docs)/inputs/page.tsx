import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleUser, Search, X } from 'lucide-react'

export default function InputsPage() {
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
                Default State with left icon
              </Label>
              <Input
                placeholder="Default input state"
                leftIcon={<CircleUser className="stroke-[1.5px] size-4" />}
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Default State with right icon
              </Label>
              <Input
                placeholder="Default input state"
                rightIcon={<X className="stroke-[1.5px] size-4 " />}
              />
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
                Error State with Left Icon
              </Label>
              <Input
                placeholder="Error input state"
                error={true}
                leftIcon={<CircleUser className="stroke-[1.5px] size-4" />}
              />
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
