'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { FaqAccordion, type FaqItem } from '@/components/ui/faq-accordion'
import { useState } from 'react'
import { CodeBlock } from '../buttons/CodeBlock'

const faqs: FaqItem[] = [
  {
    question: 'How does an in-home visit work?',
    answer:
      'Your veterinarian reaches out before the appointment, then comes to your home to assess your pet and talk through next steps together.'
  },
  {
    question: 'What does it cost?',
    answer:
      'Pricing depends on your area and veterinarian. Travel, large-pet and out-of-hours fees may apply and are shown before you book.'
  },
  {
    question: 'Can I read more about aftercare?',
    answer: (
      <p>
        Yes. Ashes can be returned in an urn or respectfully scattered through
        communal cremation. <a href="#">Compare the options</a> before your
        visit.
      </p>
    )
  }
]

export default function FaqAccordionPage() {
  const [openQuestion, setOpenQuestion] = useState<string | undefined>()
  const [replayKey, setReplayKey] = useState(0)

  return (
    <div className="flex flex-col gap-8 w-screen md:w-full px-4 ">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          FAQ Accordion
        </h2>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          A question/answer array in, the outlined Accordion out — one open at
          a time, a + that morphs into a −, and answers that fade as they grow
        </p>
      </div>

      {/* Basic */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Basic
          </CardTitle>
          <CardDescription>
            Pass{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">faqs</code>.
            A string answer renders as one paragraph; a node renders verbatim,
            with links already styled
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FaqAccordion faqs={faqs} />
          <CodeBlock
            code={`import { FaqAccordion, type FaqItem } from '@codapet/design-system'

const faqs: FaqItem[] = [
  { question: 'How does an in-home visit work?', answer: 'Your veterinarian...' },
  { question: 'What does it cost?', answer: 'Pricing depends on...' },
  { question: 'Can I read more?', answer: <p>Yes. <a href="/faqs">Compare the options</a>.</p> }
]

<FaqAccordion faqs={faqs} />`}
          />
        </CardContent>
      </Card>

      {/* Stagger + default open */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Staggered Reveal &amp; Default Open Question
          </CardTitle>
          <CardDescription>
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              staggerReveal
            </code>{' '}
            rises the questions in 80ms apart on mount.{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              defaultOpenQuestion
            </code>{' '}
            opens a question on mount and re-opens whenever the value changes —
            handy when a link elsewhere on the page points at one answer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setReplayKey(k => k + 1)}
            >
              Replay reveal
            </Button>
            {faqs.map(faq => (
              <Button
                key={faq.question}
                variant={
                  openQuestion === faq.question ? 'primary' : 'outline'
                }
                size="sm"
                onClick={() => setOpenQuestion(faq.question)}
              >
                Open: {faq.question}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpenQuestion(undefined)}
            >
              Close all
            </Button>
          </div>
          <FaqAccordion
            key={replayKey}
            faqs={faqs}
            staggerReveal
            defaultOpenQuestion={openQuestion}
          />
          <CodeBlock
            code={`<FaqAccordion
  faqs={faqs}
  staggerReveal
  defaultOpenQuestion={openQuestion}
/>`}
          />
        </CardContent>
      </Card>

      {/* Class hooks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            Restyling Each Slot
          </CardTitle>
          <CardDescription>
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              questionClassName
            </code>
            ,{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              answerClassName
            </code>{' '}
            and{' '}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              itemClassName
            </code>{' '}
            merge onto the label, the answer body and the card. Caller classes
            win via tailwind-merge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FaqAccordion
            faqs={faqs.slice(0, 2)}
            questionClassName="text-[16px] leading-6 xl:text-[20px] xl:leading-7"
            answerClassName="text-sm leading-5"
            itemClassName="rounded-xl"
          />
          <CodeBlock
            code={`<FaqAccordion
  faqs={faqs}
  questionClassName="text-[16px] leading-6 xl:text-[20px] xl:leading-7"
  answerClassName="text-sm leading-5"
  itemClassName="rounded-xl"
/>`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
