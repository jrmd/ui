"use client";
import {
  MarketingNavigation,
  MarketingNavigationBrand,
  MarketingNavigationLinks,
} from "../../registry/blocks/marketing-navigation";
import {
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../../registry/ui/navigation-menu";
export default function Example() {
  return (
    <MarketingNavigation>
      <MarketingNavigationBrand asChild>
        <a href="#home">Our studio</a>
      </MarketingNavigationBrand>
      <MarketingNavigationLinks>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="#work">Our work</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="#contact">Contact us</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </MarketingNavigationLinks>
    </MarketingNavigation>
  );
}
