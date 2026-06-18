import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut
} from '@codapet/design-system'
import {
  CalendarPlus,
  FileText,
  Heart,
  PawPrint,
  Search,
  Stethoscope,
  User
} from 'lucide-react'

export const CareCommandMenu = () => (
  <Command className="w-80 rounded-lg border shadow-md">
    <CommandInput placeholder="Search patients and actions..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Quick actions">
        <CommandItem>
          <CalendarPlus className="size-4" /> Book a home visit
          <CommandShortcut>&#8984;B</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Stethoscope className="size-4" /> Add a care note
        </CommandItem>
        <CommandItem>
          <Heart className="size-4" /> Open end-of-life resources
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Patients">
        <CommandItem>
          <PawPrint className="size-4" /> Bella &middot; Golden Retriever
        </CommandItem>
        <CommandItem>
          <PawPrint className="size-4" /> Milo &middot; Tabby Cat
        </CommandItem>
        <CommandItem>
          <User className="size-4" /> Sarah Chen (pet parent)
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
)

export const SearchPalette = () => (
  <Command className="w-80 rounded-lg border shadow-md">
    <CommandInput placeholder="Jump to..." />
    <CommandList>
      <CommandEmpty>Nothing matched your search.</CommandEmpty>
      <CommandGroup heading="Navigate">
        <CommandItem>
          <Search className="size-4" /> Today&rsquo;s appointments
        </CommandItem>
        <CommandItem>
          <FileText className="size-4" /> Visit summaries
        </CommandItem>
        <CommandItem>
          <User className="size-4" /> Vet directory
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
)
