import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Card,
  CardContent
} from '@codapet/design-system'

const services = [
  { title: 'Wellness exams', detail: 'Routine head-to-tail checkups at home.' },
  { title: 'Vaccinations', detail: 'Core and lifestyle vaccines on schedule.' },
  { title: 'Quality of life', detail: 'Compassionate end-of-life assessments.' },
  { title: 'Sick visits', detail: 'Same-week care when something feels off.' }
]

export const ServicesCarousel = () => (
  <div className="w-80">
    <Carousel className="w-full">
      <CarouselContent>
        {services.map(s => (
          <CarouselItem key={s.title}>
            <Card>
              <CardContent className="flex h-32 flex-col justify-center gap-1 p-6">
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
)
