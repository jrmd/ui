"use client";
import * as React from "react";
import { cn } from "./utils";
import { WebGLStage, type WebGLProps } from "./webgl-stage";
export function WebGLParticleField({ className, ...props }: WebGLProps) {
  return (
    <WebGLStage kind="particles" className={cn("", className)} {...props} />
  );
}
