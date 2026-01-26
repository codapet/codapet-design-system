import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ArrowLeft, ArrowRight, PlusIcon } from 'lucide-react'

export default function ButtonsPage() {
  return (
    <div className="space-y-8 ">
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
              <Button tabIndex={0} variant="ghost-secondary">
                Ghost Secondary
              </Button>
              <Button tabIndex={0} variant="ghost-destructive">
                Ghost Destructive
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
              <Button tabIndex={0}>
                <ArrowLeft className="size-4" />
                Primary
              </Button>
              <Button tabIndex={0} variant="secondary">
                <ArrowLeft className="size-4" />
                Secondary
              </Button>
              <Button tabIndex={0} variant="tertiary">
                <ArrowLeft className="size-4" />
                Tertiary
              </Button>
              <Button tabIndex={0} variant="outline">
                <ArrowLeft className="size-4" />
                Outline
              </Button>
              <Button tabIndex={0} variant="ghost">
                <ArrowLeft className="size-4" />
                Ghost
              </Button>
              <Button tabIndex={0} variant="ghost-secondary">
                <ArrowLeft className="size-4" />
                Ghost Secondary
              </Button>
              <Button tabIndex={0} variant="ghost-destructive">
                <ArrowLeft className="size-4" />
                Ghost Destructive
              </Button>
              <Button tabIndex={0} variant="link">
                <ArrowLeft className="size-4" />
                Link
              </Button>
              <Button tabIndex={0} variant="destructive">
                <ArrowLeft className="size-4" />
                Destructive
              </Button>
              <Button tabIndex={0} variant="destructive-secondary">
                <ArrowLeft className="size-4" />
                Destructive Secondary
              </Button>
              <Button variant="destructive-tertiary">
                <ArrowLeft className="size-4" />
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
              <Button tabIndex={0}>
                Primary
                <ArrowRight className="size-4" />
              </Button>
              <Button tabIndex={0} variant="secondary">
                Secondary
                <ArrowRight className="size-4" />
              </Button>
              <Button tabIndex={0} variant="tertiary">
                Tertiary
                <ArrowRight className="size-4" />
              </Button>
              <Button tabIndex={0} variant="outline">
                Outline
                <ArrowRight className="size-4" />
              </Button>
              <Button tabIndex={0} variant="ghost">
                Ghost
                <ArrowRight className="size-4" />
              </Button>
              <Button tabIndex={0} variant="ghost-secondary">
                Ghost Secondary
                <ArrowRight className="size-4" />
              </Button>
              <Button tabIndex={0} variant="ghost-destructive">
                Ghost Destructive
                <ArrowRight className="size-4" />
              </Button>
              <Button tabIndex={0} variant="link">
                Link
                <ArrowRight className="size-4" />
              </Button>
              <Button tabIndex={0} variant="destructive">
                Destructive
                <ArrowRight className="size-4" />
              </Button>
              <Button tabIndex={0} variant="destructive-secondary">
                Destructive Secondary
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="destructive-tertiary">
                Destructive Tertiary
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* With Both Icons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              With Both Icons
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button tabIndex={0}>
                <ArrowLeft className="size-4" />
                Primary
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="secondary">
                <ArrowLeft className="size-4" />
                Secondary
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="tertiary">
                <ArrowLeft className="size-4" />
                Tertiary
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="outline">
                <ArrowLeft className="size-4" />
                Outline
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="ghost">
                <ArrowLeft className="size-4" />
                Ghost
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="ghost-secondary">
                <ArrowLeft className="size-4" />
                Ghost Secondary
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="ghost-destructive">
                <ArrowLeft className="size-4" />
                Ghost Destructive
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="link">
                <ArrowLeft className="size-4" />
                Link
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="destructive">
                <ArrowLeft className="size-4" />
                Destructive
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="destructive-secondary">
                <ArrowLeft className="size-4" />
                Destructive Secondary
                <ArrowRight />
              </Button>
              <Button variant="destructive-tertiary">
                <ArrowLeft className="size-4" />
                Destructive Tertiary
                <ArrowRight />
              </Button>
            </div>
          </div>

          {/* Icon Only */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Icon Only (Left Arrow)
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button tabIndex={0} className="">
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="secondary" className=" ">
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="tertiary" className=" ">
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="outline" className=" ">
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="ghost" className=" ">
                <ArrowLeft className="size-4" />
              </Button>

              <Button tabIndex={0} variant="ghost-secondary" className=" ">
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="ghost-destructive" className=" ">
                <ArrowLeft className="size-4" />
              </Button>

              <Button tabIndex={0} variant="destructive" className=" ">
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                tabIndex={0}
                variant="destructive-secondary"
                className=" "
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="destructive-tertiary" className=" ">
                <ArrowLeft />
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
              <Button disabled variant="ghost-secondary">
                Ghost Secondary
              </Button>
              <Button disabled variant="ghost-destructive">
                Ghost Destructive
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
              <Button disabled>
                <ArrowLeft className="size-4" />
                Primary
              </Button>
              <Button disabled variant="secondary">
                <ArrowLeft className="size-4" />
                Secondary
              </Button>
              <Button disabled variant="tertiary">
                <ArrowLeft className="size-4" />
                Tertiary
              </Button>
              <Button disabled variant="outline">
                <ArrowLeft className="size-4" />
                Outline
              </Button>
              <Button disabled variant="ghost">
                <ArrowLeft className="size-4" />
                Ghost
              </Button>
              <Button disabled variant="ghost-secondary">
                <ArrowLeft className="size-4" />
                Ghost Secondary
              </Button>
              <Button disabled variant="ghost-destructive">
                <ArrowLeft className="size-4" />
                Ghost Destructive
              </Button>
              <Button disabled variant="link">
                <ArrowLeft className="size-4" />
                Link
              </Button>
              <Button disabled variant="destructive">
                <ArrowLeft className="size-4" />
                Destructive
              </Button>
              <Button disabled variant="destructive-secondary">
                <ArrowLeft className="size-4" />
                Destructive Secondary
              </Button>
              <Button disabled variant="destructive-tertiary">
                <ArrowLeft className="size-4" />
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
              <Button disabled>
                <ArrowRight className="size-4" />
                Primary
              </Button>
              <Button disabled variant="secondary">
                <ArrowRight className="size-4" />
                Secondary
              </Button>
              <Button disabled variant="tertiary">
                <ArrowRight className="size-4" />
                Tertiary
              </Button>
              <Button disabled variant="outline">
                <ArrowRight className="size-4" />
                Outline
              </Button>
              <Button disabled variant="ghost">
                <ArrowRight className="size-4" />
                Ghost
              </Button>
              <Button disabled variant="ghost-secondary">
                <ArrowRight className="size-4" />
                Ghost Secondary
              </Button>
              <Button disabled variant="ghost-destructive">
                <ArrowRight className="size-4" />
                Ghost Destructive
              </Button>
              <Button disabled variant="link">
                <ArrowRight className="size-4" />
                Link
              </Button>
              <Button disabled variant="destructive">
                <ArrowRight className="size-4" />
                Destructive
              </Button>
              <Button disabled variant="destructive-secondary">
                <ArrowRight className="size-4" />
                Destructive Secondary
              </Button>
              <Button disabled variant="destructive-tertiary">
                <ArrowRight className="size-4" />
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
              <Button tabIndex={0} disabled>
                <ArrowLeft className="size-4" />
                Primary
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="secondary" disabled>
                <ArrowLeft className="size-4" />
                Secondary
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="tertiary" disabled>
                <ArrowLeft className="size-4" />
                Tertiary
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="outline" disabled>
                <ArrowLeft className="size-4" />
                Outline
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="ghost" disabled>
                <ArrowLeft className="size-4" />
                Ghost
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="ghost-secondary" disabled>
                <ArrowLeft className="size-4" />
                Ghost Secondary
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="ghost-destructive" disabled>
                <ArrowLeft className="size-4" />
                Ghost Destructive
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="link" disabled>
                <ArrowLeft className="size-4" />
                Link
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="destructive" disabled>
                <ArrowLeft className="size-4" />
                Destructive
                <ArrowRight />
              </Button>
              <Button tabIndex={0} variant="destructive-secondary" disabled>
                <ArrowLeft className="size-4" />
                Destructive Secondary
                <ArrowRight />
              </Button>
              <Button variant="destructive-tertiary" disabled>
                <ArrowLeft className="size-4" />
                Destructive Tertiary
                <ArrowRight />
              </Button>
            </div>
          </div>

          {/* Icon Only */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Icon Only (Left Arrow)
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button tabIndex={0} className=" " disabled>
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="secondary" disabled className=" ">
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="tertiary" disabled className=" ">
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="outline" disabled className=" ">
                <ArrowLeft className="size-4" />
              </Button>
              <Button tabIndex={0} variant="ghost" disabled>
                <ArrowLeft className="size-4" />
              </Button>

              <Button
                tabIndex={0}
                variant="ghost-secondary"
                disabled
                className=" "
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                tabIndex={0}
                variant="ghost-destructive"
                disabled
                className=" "
              >
                <ArrowLeft className="size-4" />
              </Button>

              <Button tabIndex={0} variant="destructive" disabled className=" ">
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                tabIndex={0}
                variant="destructive-secondary"
                disabled
                className=" "
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                tabIndex={0}
                variant="destructive-tertiary"
                disabled
                className=" "
              >
                <ArrowLeft className="size-4" />
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
    </div>
  )
}
