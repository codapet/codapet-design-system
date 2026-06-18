import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent
} from '@codapet/design-system'
import {
  CalendarClock,
  FileText,
  Heart,
  Mail,
  Stethoscope,
  Trash2
} from 'lucide-react'

export const PatientCard = () => (
  <ContextMenu modal={false}>
    <ContextMenuTrigger className="flex h-40 w-72 select-none flex-col justify-center rounded-lg border border-dashed text-center text-sm text-muted-foreground">
      <span className="font-medium text-foreground">Bella &middot; Golden Retriever</span>
      <span>Right-click for patient actions</span>
    </ContextMenuTrigger>
    <ContextMenuContent className="w-60">
      <ContextMenuLabel>Bella&rsquo;s record</ContextMenuLabel>
      <ContextMenuGroup>
        <ContextMenuItem>
          <CalendarClock className="size-4" /> Book follow-up
          <ContextMenuShortcut>&#8984;B</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Stethoscope className="size-4" /> Add care note
        </ContextMenuItem>
        <ContextMenuItem>
          <FileText className="size-4" /> Open visit history
        </ContextMenuItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuItem variant="destructive">
        <Trash2 className="size-4" /> Archive patient
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
)

export const WithSubmenu = () => (
  <ContextMenu modal={false}>
    <ContextMenuTrigger className="flex h-40 w-72 select-none flex-col justify-center rounded-lg border border-dashed text-center text-sm text-muted-foreground">
      <span className="font-medium text-foreground">Visit summary</span>
      <span>Right-click to share or label</span>
    </ContextMenuTrigger>
    <ContextMenuContent className="w-60">
      <ContextMenuItem>
        <Mail className="size-4" /> Email to pet parent
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <Heart className="size-4" /> Care category
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuRadioGroup value="eol">
            <ContextMenuRadioItem value="wellness">
              Wellness
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="eol">
              End-of-life care
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="urgent">Urgent</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked>
        Flag for vet review
      </ContextMenuCheckboxItem>
    </ContextMenuContent>
  </ContextMenu>
)
