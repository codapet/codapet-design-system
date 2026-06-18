import { MultiSelectFreeText } from '@codapet/design-system'
import { Tag } from 'lucide-react'

export const Symptoms = () => (
  <div className="w-80">
    <MultiSelectFreeText
      label="Observed symptoms"
      mandatory
      placeholder="Add a symptom and press Enter"
      icon={<Tag />}
      defaultValues={['Loss of appetite', 'Lethargy']}
      options={[
        { value: 'Vomiting', label: 'Vomiting' },
        { value: 'Limping', label: 'Limping' },
        { value: 'Excessive thirst', label: 'Excessive thirst' },
        { value: 'Coughing', label: 'Coughing' }
      ]}
    />
  </div>
)

export const Medications = () => (
  <div className="w-80">
    <MultiSelectFreeText
      label="Current medications"
      placeholder="Type a medication name"
      defaultValues={['Gabapentin', 'Carprofen']}
      options={[
        { value: 'Apoquel', label: 'Apoquel' },
        { value: 'Metronidazole', label: 'Metronidazole' },
        { value: 'Furosemide', label: 'Furosemide' }
      ]}
    />
  </div>
)

export const Empty = () => (
  <div className="w-80">
    <MultiSelectFreeText
      label="Behavioral notes"
      placeholder="Add tags for the visiting vet"
      options={[
        { value: 'Anxious around strangers', label: 'Anxious around strangers' },
        { value: 'Food motivated', label: 'Food motivated' },
        { value: 'Sensitive paws', label: 'Sensitive paws' }
      ]}
    />
  </div>
)
