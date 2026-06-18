import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@codapet/design-system'

export const FaqSingle = () => (
  <Accordion
    type="single"
    collapsible
    defaultValue="prep"
    className="w-96"
  >
    <AccordionItem value="prep">
      <AccordionTrigger>How should I prepare for the visit?</AccordionTrigger>
      <AccordionContent>
        Keep your pet in a calm, familiar room. Have their medical history and
        any current medications handy so our vet can review them on arrival.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="duration">
      <AccordionTrigger>How long does an in-home visit take?</AccordionTrigger>
      <AccordionContent>
        Most wellness exams run 45 to 60 minutes. We never rush, so your pet
        stays comfortable throughout the appointment.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="payment">
      <AccordionTrigger>When am I charged?</AccordionTrigger>
      <AccordionContent>
        Payment is collected after the visit once your final invoice is
        confirmed. We accept all major cards and pet insurance reimbursement.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)
