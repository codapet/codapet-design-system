import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'

function HeadingXL({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h1'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h1'

  return (
    <Comp
      data-slot="h1"
      className={cn(
        'text-2xl md:text-4xl md:leading-[2.5rem] leading-[2rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}
function HeadingL({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h2'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h2'

  return (
    <Comp
      data-slot="h2"
      className={cn(
        'md:text-[1.5rem] text-[1.25rem] md:leading-[2rem] leading-[1.75rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}
function HeadingM({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h3'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h3'

  return (
    <Comp
      data-slot="h3"
      className={cn(
        'text-[1.125rem] md:text-2xl md:leading-[1.75rem] leading-[1.625rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}
function HeadingS({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h4'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h4'

  return (
    <Comp
      data-slot="h4"
      className={cn(
        'text-base leading-[1.5rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}
function HeadingXS({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h5'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h5'

  return (
    <Comp
      data-slot="h5"
      className={cn(
        'text-sm  leading-[1.25rem] font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}

function Heading2XS({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h5'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'h5'

  return (
    <Comp
      data-slot="h5"
      className={cn(
        'text-sm md:text-xs leading-[1rem]  font-semibold font-sans',
        className
      )}
      {...props}
    />
  )
}

export { Heading2XS, HeadingL, HeadingM, HeadingS, HeadingXL, HeadingXS }
