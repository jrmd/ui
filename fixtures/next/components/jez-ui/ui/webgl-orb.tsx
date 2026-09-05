"use client";
import * as React from "react";
import { cn } from "./utils";
import { WebGLStage, type WebGLProps } from "./webgl-stage";
export function WebGLOrb({ className, ...props }: WebGLProps) {
  return <WebGLStage kind="orb" className={cn("", className)} {...props} />;
}
