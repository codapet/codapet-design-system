'use client'

import * as React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { bodyTextVariants } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export interface FaqItem {
  question: string
  /** A plain string renders as one paragraph; pass a node for rich text. */
  answer: React.ReactNode
}

export interface FaqAccordionProps {
  faqs: FaqItem[]
  className?: string
  /** Fade-and-rise the questions in on mount, 80ms apart. */
  staggerReveal?: boolean
  /** Question text to open on mount, and again whenever this value changes. */
  defaultOpenQuestion?: string
  /** Merged onto every question label. */
  questionClassName?: string
  /** Merged onto every answer body. */
  answerClassName?: string
  /** Merged onto every item card. */
  itemClassName?: string
}

/**
 * Data-driven FAQ list on the outlined Accordion: one question open at a
 * time, a + that morphs into a −, and a fade-while-growing answer. Reach for
 * this over hand-assembling `Accordion*` whenever the content is a plain
 * question/answer array.
 */
function FaqAccordion({
  faqs,
  className,
  staggerReveal = false,
  defaultOpenQuestion,
  questionClassName,
  answerClassName,
  itemClassName
}: FaqAccordionProps) {
  // Radix wants a unique value per item. Question text is the natural key,
  // suffixed only when a list repeats a question.
  const values = React.useMemo(() => {
    const seen = new Set<string>()
    return faqs.map((faq, i) => {
      const value = seen.has(faq.question)
        ? `${faq.question}__${i}`
        : faq.question
      seen.add(faq.question)
      return value
    })
  }, [faqs])

  const valueFor = (question?: string) => {
    if (!question) return ''
    const i = faqs.findIndex(faq => faq.question === question)
    return i >= 0 ? values[i] : ''
  }

  const [value, setValue] = React.useState(() => valueFor(defaultOpenQuestion))

  // Re-open when the caller points at a different question, without an
  // effect: adjust state during render, the way React docs recommend.
  const [seenDefault, setSeenDefault] = React.useState(defaultOpenQuestion)
  if (defaultOpenQuestion !== seenDefault) {
    setSeenDefault(defaultOpenQuestion)
    setValue(valueFor(defaultOpenQuestion))
  }

  return (
    <Accordion
      type="single"
      collapsible
      variant="outlined"
      staggerReveal={staggerReveal}
      value={value}
      onValueChange={setValue}
      className={className}
    >
      {faqs.map((faq, i) => (
        <AccordionItem
          key={values[i]}
          value={values[i]}
          revealIndex={i}
          className={cn('rounded-lg', itemClassName)}
        >
          <AccordionTrigger icon="plus-minus">
            <span className={cn('text-vibrant-text-heading', questionClassName)}>
              {faq.question}
            </span>
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              bodyTextVariants({ size: 'md' }),
              'font-normal [&_a]:text-primary-stroke-default [&_a]:underline',
              answerClassName
            )}
          >
            {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { FaqAccordion }
