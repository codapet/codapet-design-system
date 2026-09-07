import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './accordion'

function items(staggerReveal = false) {
  return (
    <Accordion
      type="single"
      collapsible
      variant="outlined"
      staggerReveal={staggerReveal}
      defaultValue="a"
    >
      {['a', 'b', 'c'].map((value, i) => (
        <AccordionItem key={value} value={value} revealIndex={i}>
          <AccordionTrigger>Question {value}</AccordionTrigger>
          <AccordionContent>Answer {value}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

describe('Accordion staggerReveal', () => {
  it('offsets each item by 80ms × revealIndex when enabled', () => {
    const { container } = render(items(true))
    const cards = container.querySelectorAll<HTMLElement>(
      '[data-slot="accordion-item"]'
    )
    expect(cards).toHaveLength(3)
    cards.forEach(card =>
      expect(card.classList.contains('animate-accordion-item-in')).toBe(true)
    )
    expect(cards[0].style.animationDelay).toBe('')
    expect(cards[1].style.animationDelay).toBe('80ms')
    expect(cards[2].style.animationDelay).toBe('160ms')
  })

  it('leaves items untouched when disabled, even with a revealIndex', () => {
    const { container } = render(items(false))
    const cards = container.querySelectorAll<HTMLElement>(
      '[data-slot="accordion-item"]'
    )
    cards.forEach(card => {
      expect(card.classList.contains('animate-accordion-item-in')).toBe(false)
      expect(card.style.animationDelay).toBe('')
    })
  })
})

describe('AccordionTrigger icon', () => {
  it('renders the rotating chevron by default', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger>Q</AccordionTrigger>
          <AccordionContent>A</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole('button', { name: 'Q' })
    expect(trigger.querySelector('svg')).not.toBeNull()
    expect(trigger.className).toContain('[&[data-state=open]>svg]:rotate-180')
  })

  it('renders the two-bar plus/minus morph for icon="plus-minus"', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger icon="plus-minus" iconClassName="size-5">
            Q
          </AccordionTrigger>
          <AccordionContent>A</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole('button', { name: 'Q' })
    expect(trigger.querySelector('svg')).toBeNull()
    const icon = trigger.querySelector('span[aria-hidden]')
    expect(icon).not.toBeNull()
    expect(icon?.className).toContain('size-5')
    // Two bars; the second is the one that rotates flat when open.
    const bars = icon?.querySelectorAll('span') ?? []
    expect(bars).toHaveLength(2)
    expect(bars[1].className).toContain('group-data-[state=open]:rotate-0')
  })

  it('still prefers custom icons over the built-in ones', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger
            icon="plus-minus"
            collapsedIcon={<i data-testid="custom" />}
          >
            Q
          </AccordionTrigger>
          <AccordionContent>A</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByTestId('custom')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Q' }).querySelector('span[aria-hidden]')
    ).toBeNull()
  })
})

describe('AccordionContent motion', () => {
  it('fades while growing in the outlined variant only', () => {
    const { container, rerender } = render(items(false))
    let content = container.querySelector('[data-slot="accordion-content"]')
    expect(content?.className).toContain(
      'data-[state=open]:animate-accordion-down-fade'
    )

    rerender(
      <Accordion type="single" collapsible defaultValue="a">
        <AccordionItem value="a">
          <AccordionTrigger>Q</AccordionTrigger>
          <AccordionContent>A</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    content = container.querySelector('[data-slot="accordion-content"]')
    expect(content?.className).toContain(
      'data-[state=open]:animate-accordion-down'
    )
    expect(content?.className).not.toContain('accordion-down-fade')
  })
})
