import { ScrollArea, Separator } from '@codapet/design-system'

const visits = [
  { pet: 'Bella', owner: 'Sarah Chen', time: '9:00 AM', type: 'Wellness exam' },
  { pet: 'Milo', owner: 'James Ortiz', time: '10:30 AM', type: 'Vaccinations' },
  { pet: 'Luna', owner: 'Priya Shah', time: '12:00 PM', type: 'Senior checkup' },
  { pet: 'Rocky', owner: 'Dana Lee', time: '1:30 PM', type: 'End-of-life care' },
  { pet: 'Coco', owner: 'Tom Reyes', time: '3:00 PM', type: 'Follow-up' },
  { pet: 'Daisy', owner: 'Mara Voss', time: '4:15 PM', type: 'Wellness exam' },
  { pet: 'Oliver', owner: 'Nina Park', time: '5:00 PM', type: 'Dental check' },
  { pet: 'Zeus', owner: 'Ravi Anand', time: '6:00 PM', type: 'Vaccinations' }
]

export const VisitList = () => (
  <ScrollArea className="h-64 w-80 rounded-md border">
    <div className="p-4">
      <h4 className="mb-3 text-sm font-medium">Today&rsquo;s home visits</h4>
      {visits.map((v, i) => (
        <div key={v.pet}>
          {i > 0 && <Separator className="my-2" />}
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">
                {v.pet} &middot; {v.owner}
              </p>
              <p className="text-muted-foreground">{v.type}</p>
            </div>
            <span className="text-muted-foreground">{v.time}</span>
          </div>
        </div>
      ))}
    </div>
  </ScrollArea>
)

export const CareNotes = () => (
  <ScrollArea className="h-56 w-72 rounded-md border p-4 text-sm leading-relaxed text-muted-foreground">
    <h4 className="mb-2 text-sm font-medium text-foreground">
      Bella&rsquo;s care notes
    </h4>
    <p className="mb-2">
      Senior golden retriever, 12 years. Mild arthritis in both hips, managed
      with daily joint supplements and gentle exercise.
    </p>
    <p className="mb-2">
      Owner reports reduced appetite over the past week. Recommended a softened
      diet and a recheck within 10 days.
    </p>
    <p className="mb-2">
      Vaccinations current through next spring. No known medication allergies.
    </p>
    <p>
      Family is beginning to discuss quality-of-life and end-of-life planning.
      Shared CodaPet hospice resources and offered a follow-up conversation.
    </p>
  </ScrollArea>
)
