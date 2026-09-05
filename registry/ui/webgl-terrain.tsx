"use client";
import * as React from "react";
import { cn } from "./utils";
import { WebGLStage, type WebGLProps } from "./webgl-stage";
export function WebGLTerrain({ className, ...props }: WebGLProps) {
  return <WebGLStage kind="terrain" className={cn("", className)} {...props} />;
}
