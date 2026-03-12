'use client'

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react'
import * as React from 'react'
import { DayButton, DayPicker } from 'react-day-picker'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(4)]  md:[--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: date =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters
      }}
      classNames={{
        root: cn('w-fit ', classNames?.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative',
          classNames?.months
        ),
        month: cn('flex flex-col w-full gap-4', classNames?.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          classNames?.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          classNames?.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          classNames?.button_next
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          classNames?.month_caption
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
          classNames?.dropdowns
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
          classNames?.dropdown_root
        ),
        dropdown: cn(
          'absolute bg-popover inset-0 opacity-0',
          classNames?.dropdown
        ),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          classNames?.caption_label
        ),
        table: cn('w-full border-collapse', classNames?.table),
        weekdays: cn(
          'flex items-center justify-center w-full gap-2',
          classNames?.weekdays
        ),
        weekday: cn(
          'text-slate-700 font-medium rounded-full md:flex-1 size-6 mx-1 font-normal text-[0.8rem] select-none ',
          classNames?.weekday
        ),
        week: cn(
          'flex w-full md:mt-2 mt-[2px]  items-center justify-center gap-1',
          classNames?.week
        ),
        week_number_header: cn(
          'select-none w-(--cell-size) ',
          'flex items-center justify-center ',
          classNames?.week_number_header
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          classNames?.week_number
        ),
        day: cn(
          'relative flex items-center justify-center md:w-full md:h-full p-0 text-center  group/day aspect-square select-none size-7 md:mx-0 mx-1  rounded-full',
          classNames?.day
        ),
        range_start: cn(' bg-accent', classNames?.range_start),
        range_middle: cn('rounded-none', classNames?.range_middle),
        range_end: cn(' bg-accent', classNames?.range_end),
        today: cn(
          'bg-accent text-accent-foreground   rounded-full',
          classNames?.today
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          classNames?.outside
        ),
        disabled: cn('text-muted-foreground opacity-50', classNames?.disabled),
        hidden: cn('invisible', classNames?.hidden)
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-6', className)} {...props} />
            )
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-6', className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn('size-6', className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-slate-200 data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none md:font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]  [&>span]:text-xs [&>span]:opacity-70  md:p-0 rounded-full md:text-base text-sm font-medium text-black data-[range-middle=true]:rounded-md',
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
