"use client";
import * as React from "react";
import { cn } from "./utils";
import { WebGLStage, type WebGLProps } from "./webgl-stage";
export function WebGLImageDistortion({ className, ...props }: WebGLProps) {
  return (
    <WebGLStage kind="distortion" className={cn("", className)} {...props} />
  );
}
