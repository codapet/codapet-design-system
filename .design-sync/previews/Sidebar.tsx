import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@codapet/design-system'
import { CalendarDays, PawPrint, Stethoscope, FileText } from 'lucide-react'

// NOTE: Sidebar relies on SidebarProvider context and is normally fixed/flex
// to a full app shell. Here it is wrapped in a bounded relative container so it
// renders inline as a preview card rather than spanning the viewport.
export const VetDashboardNav = () => (
  <div className="relative h-72 w-64 overflow-hidden rounded-lg border">
    <SidebarProvider
      defaultOpen
      style={{ minHeight: '100%' }}
      className="!min-h-full"
    >
      <Sidebar collapsible="none" className="h-full">
        <SidebarHeader className="px-3 py-2 text-sm font-semibold">
          CodaPet
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Care</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <CalendarDays />
                    <span>Appointments</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <PawPrint />
                    <span>Pets</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Stethoscope />
                    <span>Vets</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FileText />
                    <span>Records</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  </div>
)
