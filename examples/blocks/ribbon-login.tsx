"use client";
import {
  RibbonLogin,
  RibbonLoginMasthead,
  RibbonLoginFormPanel,
} from "../../registry/blocks/ribbon-login";

export default function Example() {
  return (
    <RibbonLogin>
      <RibbonLoginMasthead />
      <RibbonLoginFormPanel />
    </RibbonLogin>
  );
}
