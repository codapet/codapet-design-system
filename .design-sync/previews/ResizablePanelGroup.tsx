import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@codapet/design-system'

// Appointment console: visit list beside the selected patient's details.
export const VisitConsole = () => (
  <div className="h-64 w-full overflow-hidden rounded-lg border border-sand-stroke-soft">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={35} minSize={20}>
        <div className="flex h-full flex-col gap-2 p-4">
          <p className="text-sm font-medium">Today's visits</p>
          <p className="text-sm text-muted-foreground">9:00 AM — Bella (cat)</p>
          <p className="text-sm text-muted-foreground">11:30 AM — Max (dog)</p>
          <p className="text-sm text-muted-foreground">2:30 PM — Luna (dog)</p>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <div className="flex h-full flex-col gap-2 p-4">
          <p className="text-sm font-medium">Bella · Domestic Shorthair</p>
          <p className="text-sm text-muted-foreground">
            In-home wellness exam and vaccine update.
          </p>
          <p className="text-sm text-muted-foreground">
            Address: 482 Maple Ave · Arrival 9:00–9:30 AM
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
)
