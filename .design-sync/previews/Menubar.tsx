import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent
} from '@codapet/design-system'

export const ScheduleMenubar = () => (
  <div className="flex min-h-80 items-start">
    <Menubar value="schedule">
      <MenubarMenu value="schedule">
        <MenubarTrigger>Schedule</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New home visit <MenubarShortcut>&#8984;N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Block off time</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Recurring care</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Weekly wellness check</MenubarItem>
              <MenubarItem>Monthly senior exam</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Export to calendar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="patients">
        <MenubarTrigger>Patients</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Add new pet</MenubarItem>
          <MenubarItem>Import records</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="care">
        <MenubarTrigger>Care</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Treatment plans</MenubarItem>
          <MenubarItem>End-of-life resources</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </div>
)

export const ViewOptions = () => (
  <div className="flex min-h-80 items-start">
    <Menubar value="view">
      <MenubarMenu value="view">
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Calendar density</MenubarLabel>
          <MenubarRadioGroup value="week">
            <MenubarRadioItem value="day">Day</MenubarRadioItem>
            <MenubarRadioItem value="week">Week</MenubarRadioItem>
            <MenubarRadioItem value="month">Month</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarCheckboxItem checked>
            Show travel buffers
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>Show cancelled visits</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="help">
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Contact CodaPet support</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </div>
)
