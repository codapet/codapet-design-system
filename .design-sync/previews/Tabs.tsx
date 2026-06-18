import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@codapet/design-system'

export const PetProfile = () => (
  <Tabs defaultValue="overview" className="w-96">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="records">Records</TabsTrigger>
      <TabsTrigger value="visits">Visits</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" className="text-sm text-muted-foreground">
      Maple is a 4-year-old Golden Retriever, 31 kg, spayed female. No known
      allergies.
    </TabsContent>
    <TabsContent value="records" className="text-sm text-muted-foreground">
      Rabies and DHPP vaccines current through March 2027. Last bloodwork was
      normal.
    </TabsContent>
    <TabsContent value="visits" className="text-sm text-muted-foreground">
      Last in-home wellness exam on April 2 with Dr. Sarah Chen. Next visit due
      in October.
    </TabsContent>
  </Tabs>
)
