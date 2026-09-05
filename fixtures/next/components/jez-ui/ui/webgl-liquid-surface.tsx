"use client";
import * as React from "react";
import { cn } from "./utils";
import { WebGLStage, type WebGLProps } from "./webgl-stage";
export function WebGLLiquidSurface({ className, ...props }: WebGLProps) {
  return <WebGLStage kind="liquid" className={cn("", className)} {...props} />;
}
