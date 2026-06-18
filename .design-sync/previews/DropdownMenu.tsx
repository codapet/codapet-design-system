import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@codapet/design-system'
import {
  CalendarPlus,
  ClipboardList,
  FileText,
  Mail,
  PawPrint,
  Settings,
  Stethoscope,
  Trash2,
  User
} from 'lucide-react'

export const AppointmentActions = () => (
  <div className="flex min-h-72 items-start">
    <DropdownMenu defaultOpen modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="md">
          <PawPrint className="size-4" /> Bella&rsquo;s visit
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuLabel>Appointment</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CalendarPlus className="size-4" /> Reschedule visit
            <DropdownMenuShortcut>&#8984;R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Stethoscope className="size-4" /> Reassign vet
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="size-4" /> View care notes
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 className="size-4" /> Cancel appointment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)

export const WithSubmenu = () => (
  <div className="flex min-h-80 items-start">
    <DropdownMenu defaultOpen modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="md">
          Send to pet parent
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuLabel>Communications</DropdownMenuLabel>
        <DropdownMenuItem>
          <Mail className="size-4" /> Email confirmation
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ClipboardList className="size-4" /> Care templates
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>End-of-life care guide</DropdownMenuItem>
            <DropdownMenuItem>Post-visit recovery plan</DropdownMenuItem>
            <DropdownMenuItem>Wellness check summary</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="size-4" /> Notification settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)

export const CheckboxAndRadio = () => (
  <div className="flex min-h-80 items-start">
    <DropdownMenu defaultOpen modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="md">
          <User className="size-4" /> Filter caseload
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuLabel>Visit types</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked>
          Wellness exams
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          End-of-life care
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Vaccinations</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value="soonest">
          <DropdownMenuRadioItem value="soonest">
            Soonest appointment
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">
            Pet name (A&ndash;Z)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)
