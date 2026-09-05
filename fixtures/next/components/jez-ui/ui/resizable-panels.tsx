"use client";
import * as React from "react";
import { cn } from "./utils";
type ResizeState = {
  sizes: number[];
  resize: (index: number, delta: number) => void;
  direction: "horizontal" | "vertical";
  ref: React.RefObject<HTMLDivElement | null>;
  mins: number[];
};
const Context = React.createContext<ResizeState | null>(null);
function useResize() {
  const state = React.useContext(Context);
  if (!state) throw new Error("ResizablePanel requires ResizablePanelGroup");
  return state;
}
export function ResizablePanelGroup({
  children,
  direction = "horizontal",
  className,
  ...props
}: React.ComponentProps<"div"> & { direction?: "horizontal" | "vertical" }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);
  const panels = childrenArray.filter(
    (c): c is React.ReactElement<React.ComponentProps<typeof ResizablePanel>> =>
      React.isValidElement(c) && c.type === ResizablePanel,
  );
  const count = panels.length;
  const initial = panels.map(
      (p) => p.props.defaultSize ?? 100 / Math.max(count, 1),
    ),
    sum = initial.reduce((a, b) => a + b, 0) || 1;
  const [stored, setSizes] = React.useState(() =>
    initial.map((v) => (v / sum) * 100),
  );
  const sizes =
    stored.length === count ? stored : initial.map((v) => (v / sum) * 100);
  const mins = panels.map((p) => p.props.minSize ?? 10);
  const resize = (index: number, delta: number) =>
    setSizes((prev) => {
      const current = prev.length === count ? prev : sizes;
      if (index < 0 || index >= count - 1) return current;
      const change = Math.max(
        mins[index] - current[index],
        Math.min(delta, current[index + 1] - mins[index + 1]),
      );
      return current.map((v, i) =>
        i === index ? v + change : i === index + 1 ? v - change : v,
      );
    });
  let panelIndex = 0;
  return (
    <Context.Provider value={{ sizes, resize, direction, ref, mins }}>
      <div
        ref={ref}
        className={cn(
          "flex min-h-48 min-w-0 overflow-hidden rounded-xl border border-border",
          direction === "vertical" && "h-96 flex-col",
          className,
        )}
        {...props}
      >
        {childrenArray.map((child, i) => {
          if (!React.isValidElement(child)) return child;
          if (child.type === ResizablePanel)
            return React.cloneElement(
              child as React.ReactElement<{ index: number }>,
              { index: panelIndex++, key: child.key ?? i },
            );
          if (child.type === ResizableHandle)
            return React.cloneElement(
              child as React.ReactElement<{ index: number }>,
              { index: panelIndex - 1, key: child.key ?? i },
            );
          return child;
        })}
      </div>
    </Context.Provider>
  );
}
export function ResizablePanel({
  index = 0,
  defaultSize: _defaultSize,
  minSize: _minSize,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  defaultSize?: number;
  minSize?: number;
  index?: number;
}) {
  const { sizes } = useResize();
  return (
    <div
      className={cn(
        "min-h-0 min-w-0 overflow-auto p-4 text-sm leading-relaxed",
        className,
      )}
      style={{
        flexBasis: `${sizes[index]}%`,
        flexGrow: 0,
        flexShrink: 1,
        ...style,
      }}
      {...props}
    />
  );
}
export function ResizableHandle({
  index = 0,
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<"div"> & { index?: number }) {
  const { sizes, resize, direction, ref, mins } = useResize();
  const previous = React.useRef<number | null>(null),
    vertical = direction === "vertical";
  return (
    <div
      role="separator"
      tabIndex={0}
      aria-label="Resize panels"
      aria-orientation={vertical ? "horizontal" : "vertical"}
      aria-valuenow={Math.round(sizes[index] ?? 0)}
      aria-valuemin={mins[index]}
      aria-valuemax={Math.round(
        (sizes[index] ?? 0) + (sizes[index + 1] ?? 0) - (mins[index + 1] ?? 0),
      )}
      className={cn(
        "relative shrink-0 touch-none bg-border hover:bg-primary focus-visible:bg-primary",
        vertical
          ? "h-px cursor-row-resize after:absolute after:inset-x-0 after:-top-2 after:h-4"
          : "w-px cursor-col-resize after:absolute after:inset-y-0 after:-left-2 after:w-4",
        className,
      )}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        const before = vertical ? "ArrowUp" : "ArrowLeft",
          after = vertical ? "ArrowDown" : "ArrowRight";
        if (e.key === before || e.key === after) {
          e.preventDefault();
          resize(index, e.key === before ? -5 : 5);
        }
      }}
      onPointerDown={(e) => {
        previous.current = vertical ? e.clientY : e.clientX;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (
          !e.currentTarget.hasPointerCapture(e.pointerId) ||
          previous.current === null ||
          !ref.current
        )
          return;
        const next = vertical ? e.clientY : e.clientX,
          box = ref.current.getBoundingClientRect();
        resize(
          index,
          ((next - previous.current) / (vertical ? box.height : box.width)) *
            100,
        );
        previous.current = next;
      }}
      onPointerUp={(e) => {
        previous.current = null;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => {
        previous.current = null;
      }}
      {...props}
    />
  );
}
export function ResizablePanels({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  return (
    <ResizablePanelGroup className={className}>
      <ResizablePanel defaultSize={40} minSize={20}>
        {left}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60} minSize={20}>
        {right}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
