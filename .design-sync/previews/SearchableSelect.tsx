import {
  Label,
  SearchableSelect,
  SearchableSelectContent,
  SearchableSelectTrigger
} from '@codapet/design-system'

const breeds = [
  { value: 'labrador', label: 'Labrador Retriever', group: 'Dogs' },
  { value: 'golden', label: 'Golden Retriever', group: 'Dogs' },
  { value: 'frenchie', label: 'French Bulldog', group: 'Dogs' },
  { value: 'poodle', label: 'Poodle', group: 'Dogs' },
  { value: 'maine-coon', label: 'Maine Coon', group: 'Cats' },
  { value: 'siamese', label: 'Siamese', group: 'Cats' },
  { value: 'ragdoll', label: 'Ragdoll', group: 'Cats' }
]

export const SearchBreed = () => (
  <div className="flex w-72 flex-col gap-1.5">
    <Label>Pet breed</Label>
    <SearchableSelect
      options={breeds}
      defaultValue="golden"
      searchPlaceholder="Search breeds..."
      placeholder="Select a breed"
      defaultOpen
    >
      <SearchableSelectTrigger className="w-full" />
      <SearchableSelectContent />
    </SearchableSelect>
  </div>
)

export const MultiConditions = () => (
  <div className="flex w-72 flex-col gap-1.5">
    <Label>Existing conditions</Label>
    <SearchableSelect
      mode="multiple"
      options={[
        { value: 'arthritis', label: 'Arthritis' },
        { value: 'diabetes', label: 'Diabetes' },
        { value: 'kidney', label: 'Chronic kidney disease' },
        { value: 'heart', label: 'Heart murmur' },
        { value: 'allergies', label: 'Skin allergies' }
      ]}
      defaultValues={['arthritis', 'kidney']}
      searchPlaceholder="Search conditions..."
      placeholder="Select conditions"
      defaultOpen
    >
      <SearchableSelectTrigger className="w-full" />
      <SearchableSelectContent />
    </SearchableSelect>
  </div>
)

export const ClosedTrigger = () => (
  <div className="flex w-72 flex-col gap-1.5">
    <Label>Service area</Label>
    <SearchableSelect
      options={[
        { value: 'austin', label: 'Austin, TX' },
        { value: 'denver', label: 'Denver, CO' },
        { value: 'portland', label: 'Portland, OR' },
        { value: 'seattle', label: 'Seattle, WA' }
      ]}
      defaultValue="austin"
      placeholder="Select a city"
    >
      <SearchableSelectTrigger className="w-full" />
      <SearchableSelectContent />
    </SearchableSelect>
  </div>
)
