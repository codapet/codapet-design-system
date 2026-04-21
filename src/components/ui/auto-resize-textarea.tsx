import * as React from 'react'

import { cn } from '@/lib/utils'
import { Textarea } from './textarea'

type AutoResizeTextareaProps = React.ComponentPropsWithoutRef<typeof Textarea> & {
  /** Stop growing after this many px and allow scroll */
  maxHeight?: number
  /** Minimum height in px */
  minHeight?: number
}

type TextareaEl = React.ElementRef<typeof Textarea>

export const AutoResizeTextarea = React.forwardRef<
  TextareaEl,
  AutoResizeTextareaProps
>(
  (
    {
      className,
      style,
      onInput,
      onChange,
      maxHeight,
      minHeight = 120,
      value,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<TextareaEl | null>(null)

    const setRefs = React.useCallback(
      (node: TextareaEl | null) => {
        innerRef.current = node

        if (typeof forwardedRef === 'function') forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
      },
      [forwardedRef]
    )

    const resize = React.useCallback(() => {
      const el = innerRef.current
      if (!el) return

      el.style.height = 'auto'
      const nextHeight = Math.max(minHeight, el.scrollHeight)

      if (maxHeight && nextHeight > maxHeight) {
        el.style.height = `${maxHeight}px`
        el.style.overflowY = 'auto'
      } else {
        el.style.height = `${nextHeight}px`
        el.style.overflowY = 'hidden'
      }
    }, [maxHeight, minHeight])

    React.useLayoutEffect(() => {
      resize()
    }, [resize, value])

    // Intercept programmatic writes to `el.value` (e.g. RHF reset/setValue,
    // hydration from localStorage) so height updates without a `value` prop.
    React.useLayoutEffect(() => {
      const el = innerRef.current
      if (!el) return

      const descriptor = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )
      if (!descriptor?.get || !descriptor?.set) return

      const { get, set } = descriptor
      Object.defineProperty(el, 'value', {
        configurable: true,
        get() {
          return get.call(this)
        },
        set(v) {
          set.call(this, v)
          resize()
        }
      })

      return () => {
        delete (el as Partial<HTMLTextAreaElement>).value
      }
    }, [resize])

    return (
      <Textarea
        {...props}
        ref={setRefs}
        value={value}
        onInput={e => {
          resize()
          onInput?.(e)
        }}
        onChange={e => {
          onChange?.(e)
        }}
        className={cn('resize-none', className)}
        style={{
          ...style,
          minHeight: minHeight,
          height: style?.height ?? 'auto',
          overflowY: style?.overflowY ?? 'hidden'
        }}
      />
    )
  }
)

AutoResizeTextarea.displayName = 'AutoResizeTextarea'
