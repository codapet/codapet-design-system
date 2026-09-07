import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FaqAccordion, type FaqItem } from './faq-accordion'

const faqs: FaqItem[] = [
  { question: 'How does it work?', answer: 'A vet visits your home.' },
  { question: 'What does it cost?', answer: 'It depends on the area.' },
  {
    question: 'Can I read more?',
    answer: (
      <p>
        Yes, <a href="/faqs">on the FAQ page</a>.
      </p>
    )
  }
]

const trigger = (name: string) => screen.getByRole('button', { name })

describe('FaqAccordion', () => {
  it('renders every question closed by default', () => {
    render(<FaqAccordion faqs={faqs} />)
    for (const faq of faqs) {
      expect(trigger(faq.question)).toHaveAttribute('aria-expanded', 'false')
    }
    expect(screen.queryByText('A vet visits your home.')).toBeNull()
  })

  it('opens one question at a time and closes it on a second click', () => {
    render(<FaqAccordion faqs={faqs} />)

    fireEvent.click(trigger('How does it work?'))
    expect(trigger('How does it work?')).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    expect(screen.getByText('A vet visits your home.')).toBeInTheDocument()

    fireEvent.click(trigger('What does it cost?'))
    expect(trigger('How does it work?')).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    expect(trigger('What does it cost?')).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    expect(screen.queryByText('A vet visits your home.')).toBeNull()

    fireEvent.click(trigger('What does it cost?'))
    expect(trigger('What does it cost?')).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('opens defaultOpenQuestion on mount and follows it when it changes', () => {
    const { rerender } = render(
      <FaqAccordion faqs={faqs} defaultOpenQuestion="What does it cost?" />
    )
    expect(trigger('What does it cost?')).toHaveAttribute(
      'aria-expanded',
      'true'
    )

    rerender(
      <FaqAccordion faqs={faqs} defaultOpenQuestion="How does it work?" />
    )
    expect(trigger('How does it work?')).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    expect(trigger('What does it cost?')).toHaveAttribute(
      'aria-expanded',
      'false'
    )

    rerender(<FaqAccordion faqs={faqs} defaultOpenQuestion={undefined} />)
    for (const faq of faqs) {
      expect(trigger(faq.question)).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('renders string answers as a paragraph and node answers verbatim', () => {
    render(<FaqAccordion faqs={faqs} defaultOpenQuestion="Can I read more?" />)
    expect(screen.getByRole('link', { name: 'on the FAQ page' })).toHaveAttribute(
      'href',
      '/faqs'
    )

    fireEvent.click(trigger('How does it work?'))
    expect(screen.getByText('A vet visits your home.').tagName).toBe('P')
  })

  it('staggers items 80ms apart when staggerReveal is set', () => {
    const { container } = render(<FaqAccordion faqs={faqs} staggerReveal />)
    const cards = container.querySelectorAll<HTMLElement>(
      '[data-slot="accordion-item"]'
    )
    expect(cards[0].classList.contains('animate-accordion-item-in')).toBe(true)
    expect(cards[1].style.animationDelay).toBe('80ms')
    expect(cards[2].style.animationDelay).toBe('160ms')
  })

  it('uses the plus/minus morph and exposes the Radix accordion semantics', () => {
    render(<FaqAccordion faqs={faqs} />)
    const button = trigger('How does it work?')
    expect(button.querySelector('svg')).toBeNull()
    expect(button.querySelector('span[aria-hidden]')).not.toBeNull()
    expect(button).toHaveAttribute('aria-controls')
    fireEvent.click(button)
    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  it('keeps repeated questions independent', () => {
    const repeated: FaqItem[] = [
      { question: 'Same question', answer: 'First answer' },
      { question: 'Same question', answer: 'Second answer' }
    ]
    render(<FaqAccordion faqs={repeated} />)
    const [first, second] = screen.getAllByRole('button', {
      name: 'Same question'
    })

    fireEvent.click(second)
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(first).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Second answer')).toBeInTheDocument()
    expect(screen.queryByText('First answer')).toBeNull()
  })

  it('merges the class hooks onto item, question and answer', () => {
    const { container } = render(
      <FaqAccordion
        faqs={faqs}
        defaultOpenQuestion="How does it work?"
        itemClassName="item-x"
        questionClassName="question-x"
        answerClassName="answer-x"
      />
    )
    expect(
      container.querySelector('[data-slot="accordion-item"]')?.className
    ).toContain('item-x')
    expect(screen.getByText('How does it work?').className).toContain(
      'question-x'
    )
    expect(
      screen.getByText('A vet visits your home.').parentElement?.className
    ).toContain('answer-x')
  })
})
