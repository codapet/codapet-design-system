'use client'

import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar'
import {
  AlertCircle,
  CalendarDays,
  ChevronDown,
  Layout,
  MessageSquare,
  MousePointer,
  Palette,
  ToggleLeft,
  Type
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import packageJson from '../../package.json'

const navigationItems = [
  {
    id: 'buttons',
    label: 'Buttons',
    icon: MousePointer,
    description: 'Various button styles and states'
  },
  {
    id: 'inputs',
    label: 'Inputs',
    icon: Type,
    description: 'Input fields and form controls'
  },
  {
    id: 'calendars',
    label: 'Calendars',
    icon: CalendarDays,
    description: 'Date pickers and calendars'
  },
  {
    id: 'textareas',
    label: 'Textareas',
    icon: MessageSquare,
    description: 'Multi-line text input fields'
  },
  {
    id: 'auto-resize-textarea',
    label: 'Auto-resize Textarea',
    icon: MessageSquare,
    description: 'Textarea that grows with content, optional max height'
  },
  {
    id: 'forms',
    label: 'Form Elements',
    icon: ToggleLeft,
    description: 'Checkboxes, radio buttons, switches'
  },
  {
    id: 'typography',
    label: 'Typography',
    icon: Type,
    description: 'Text styles and headings'
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: AlertCircle,
    description: 'Alerts, badges, and notifications'
  },
  {
    id: 'layout',
    label: 'Layout',
    icon: Layout,
    description: 'Cards, tabs, and containers'
  },
  {
    id: 'interactive',
    label: 'Interactive',
    icon: MousePointer,
    description: 'Sliders, progress bars, and controls'
  },
  {
    id: 'smart-dialog-drawer',
    label: 'Smart Dialog Drawer',
    icon: Layout,
    description: 'Responsive dialog that becomes a drawer on mobile'
  },
  {
    id: 'accordion',
    label: 'Accordion',
    icon: ChevronDown,
    description: 'Expandable accordion panels'
  }
]

const TokensItems = [
  {
    id: 'colors',
    label: 'Colors',
    icon: Palette,
    description: 'Color tokens'
  }
]

export default function DocsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const activeRoute = pathname?.split('/').pop() || 'buttons'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center space-x-3 px-2 py-2">
            <Image
              src="/codapet-logo.png"
              alt="CodaPet Logo"
              className="w-8 h-8 object-contain"
              width={32}
              height={32}
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-bold bg-gradient-to-r from-brand-vibrant to-brand-normal bg-clip-text text-transparent truncate">
                CodaPet Design System
              </h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
           <SidebarGroup>
            <SidebarGroupLabel>Tokens</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {TokensItems.map(item => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild isActive={activeRoute === item.id} tooltip={item.description}>
                        <Link href={`/${item.id}`}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Components</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map(item => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={activeRoute === item.id}
                        tooltip={item.description}
                      >
                        <Link href={`/${item.id}`}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>
        <SidebarFooter>
           <div className="ml-auto flex items-center space-x-4">
              <Badge variant="secondary" className="text-base">v{packageJson.version}</Badge>
            </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
         <SidebarTrigger  className='absolute top-0 left-0 z-50'/>
        {/* Header */}
        { false && <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex h-16 items-center gap-4 px-6">

            <div className="flex items-center gap-2">
              <Image
                src="/codapet-logo.png"
                alt="CodaPet Logo"
                className="w-8 h-8 object-contain"
                width={32}
                height={32}
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-brand-vibrant to-brand-normal bg-clip-text text-transparent">
                CodaPet Design System
              </h1>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <Badge variant="secondary">v{packageJson.version}</Badge>
            </div>
          </div>
        </header>}

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            <div className="p-8">{children}</div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </div>
  )
}
