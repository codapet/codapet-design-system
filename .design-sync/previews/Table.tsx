import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Badge
} from '@codapet/design-system'

export const UpcomingAppointments = () => (
  <div className="w-[560px]">
    <Table>
      <TableCaption>Upcoming in-home visits this week.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Pet</TableHead>
          <TableHead>Visit type</TableHead>
          <TableHead>Vet</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Maple</TableCell>
          <TableCell>Wellness exam</TableCell>
          <TableCell>Dr. Sarah Chen</TableCell>
          <TableCell>Jul 14, 10:30 AM</TableCell>
          <TableCell className="text-right">
            <Badge>Confirmed</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Biscuit</TableCell>
          <TableCell>Vaccination</TableCell>
          <TableCell>Dr. Aaron Patel</TableCell>
          <TableCell>Jul 15, 2:00 PM</TableCell>
          <TableCell className="text-right">
            <Badge variant="secondary">Pending</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Luna</TableCell>
          <TableCell>Quality of life assessment</TableCell>
          <TableCell>Dr. Maya Rivera</TableCell>
          <TableCell>Jul 16, 9:00 AM</TableCell>
          <TableCell className="text-right">
            <Badge variant="outline">Scheduled</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
)
