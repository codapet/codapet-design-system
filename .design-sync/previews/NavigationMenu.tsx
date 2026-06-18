import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '@codapet/design-system'
import { Heart, PawPrint, Stethoscope } from 'lucide-react'

export const ServicesNav = () => (
  <div className="flex min-h-80 items-start justify-center">
    <NavigationMenu value="services">
      <NavigationMenuList>
        <NavigationMenuItem value="services">
          <NavigationMenuTrigger>Our care</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-2">
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2 font-medium">
                    <Stethoscope className="size-4" /> In-home wellness exams
                  </div>
                  <p className="text-muted-foreground">
                    A vet visits your home for routine checkups and vaccines.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2 font-medium">
                    <Heart className="size-4" /> End-of-life care
                  </div>
                  <p className="text-muted-foreground">
                    Compassionate in-home euthanasia and hospice support.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2 font-medium">
                    <PawPrint className="size-4" /> Memorial &amp; aftercare
                  </div>
                  <p className="text-muted-foreground">
                    Cremation, keepsakes, and grief resources for pet parents.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">For vets</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Booking</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
)

export const SimpleLinks = () => (
  <div className="flex min-h-64 items-start justify-center">
    <NavigationMenu value="resources">
      <NavigationMenuList>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1 p-2">
              <li>
                <NavigationMenuLink href="#">
                  Preparing for a home visit
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  Senior pet wellness guide
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  Grief &amp; remembrance
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
)
