"use client";
import {
  FloatingNavigation,
  FloatingNavigationItem,
} from "../../registry/blocks/floating-navigation";
export default function Example() {
  return (
    <FloatingNavigation>
      <FloatingNavigationItem asChild>
        <a href="#work">Our work</a>
      </FloatingNavigationItem>
      <FloatingNavigationItem asChild>
        <a href="#studio">The studio</a>
      </FloatingNavigationItem>
    </FloatingNavigation>
  );
}
