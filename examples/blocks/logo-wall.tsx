"use client";
import {
  LogoWall,
  LogoWallLead,
  LogoWallLogos,
} from "../../registry/blocks/logo-wall";

export default function Example() {
  return (
    <LogoWall>
      <LogoWallLead />
      <LogoWallLogos />
    </LogoWall>
  );
}
