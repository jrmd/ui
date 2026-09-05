"use client";
import * as React from "react";
import { Dialog, Slot } from "radix-ui";
import { PanelLeft, X } from "lucide-react";
import { cn } from "./utils";
type SidebarState = {
  triggerRef: React.RefObject<HTMLElement | null>;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};
const Context = React.createContext<SidebarState | null>(null);
export function useSidebar() {
  const value = React.useContext(Context);
  if (!value) throw new Error("Sidebar components require SidebarProvider.");
  return value;
}
export function SidebarProvider({
  children,
  defaultOpen = true,
  open: controlled,
  onOpenChange,
  openMobile: controlledMobile,
  onOpenMobileChange,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openMobile?: boolean;
  onOpenMobileChange?: (open: boolean) => void;
}) {
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const [local, setLocal] = React.useState(defaultOpen),
    [mobile, setMobile] = React.useState(false),
    [isMobile, setIsMobile] = React.useState(false);
  const open = controlled ?? local,
    openMobile = controlledMobile ?? mobile;
  const setOpen = (v: boolean) => {
    setLocal(v);
    onOpenChange?.(v);
  };
  const setOpenMobile = (v: boolean) => {
    if (v)
      triggerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    setMobile(v);
    onOpenMobileChange?.(v);
  };
  React.useEffect(() => {
    const media = matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <Context.Provider
      value={{
        triggerRef,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar: () =>
          isMobile ? setOpenMobile(!openMobile) : setOpen(!open),
      }}
    >
      <div
        data-sidebar="provider"
        className={cn("flex min-h-[620px] w-full min-w-0", className)}
        style={
          {
            "--sidebar-width": "16rem",
            "--sidebar-icon-width": "4rem",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </Context.Provider>
  );
}
export function Sidebar({
  children,
  className,
  collapsible = "icon",
  variant = "sidebar",
  label = "Navigation",
  ...props
}: React.ComponentProps<"aside"> & {
  collapsible?: "icon" | "offcanvas" | "none";
  variant?: "sidebar" | "inset" | "floating";
  label?: string;
}) {
  const { triggerRef, open, openMobile, setOpenMobile, isMobile } =
    useSidebar();
  const collapsed = !open && collapsible !== "none";
  if (isMobile)
    return (
      <Dialog.Root open={openMobile} onOpenChange={setOpenMobile}>
        <Dialog.Portal>
          <Dialog.Overlay className="jez-overlay fixed inset-0 z-40 bg-black/35" />
          <Dialog.Content
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              triggerRef.current?.focus();
            }}
            aria-describedby={undefined}
            className="jez-sheet fixed inset-y-0 left-0 z-50 flex w-[min(20rem,90vw)] flex-col border-r border-border bg-background text-foreground shadow-xl"
          >
            <Dialog.Title className="sr-only">{label}</Dialog.Title>
            <Dialog.Close
              aria-label="Close sidebar"
              className="absolute right-2 top-2 z-10 rounded-md bg-background p-1.5"
            >
              <X size={16} />
            </Dialog.Close>
            <aside
              data-sidebar="sidebar"
              data-state="expanded"
              aria-label={label}
              className={cn(
                "group/sidebar flex min-h-0 flex-1 flex-col",
                className,
              )}
              {...props}
            >
              {children}
            </aside>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  return (
    <aside
      data-sidebar="sidebar"
      data-state={collapsed ? "collapsed" : "expanded"}
      aria-label={label}
      className={cn(
        "group/sidebar flex shrink-0 flex-col border-r border-border bg-background text-foreground transition-[width] duration-200 motion-reduce:transition-none",
        collapsed
          ? collapsible === "offcanvas"
            ? "hidden"
            : "w-[var(--sidebar-icon-width)]"
          : "w-[var(--sidebar-width)]",
        variant === "floating" && "m-2 rounded-xl border shadow-sm",
        variant === "inset" && "border-0 bg-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}
export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="header"
      className={cn("shrink-0 p-3", className)}
      {...props}
    />
  );
}
export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="content"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2",
        className,
      )}
      {...props}
    />
  );
}
export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="footer"
      className={cn("mt-auto shrink-0 border-t border-border p-3", className)}
      {...props}
    />
  );
}
export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="group"
      className={cn("relative py-3", className)}
      {...props}
    />
  );
}
export function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-2 px-3 text-[11px] font-medium text-muted-foreground group-data-[state=collapsed]/sidebar:sr-only",
        className,
      )}
      {...props}
    />
  );
}
export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("w-full", className)} {...props} />;
}
export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-sidebar="menu"
      className={cn("m-0 grid list-none gap-1 p-0", className)}
      {...props}
    />
  );
}
export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-sidebar="menu-item"
      className={cn("relative min-w-0", className)}
      {...props}
    />
  );
}
export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  className,
  onClick,
  children,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean; isActive?: boolean }) {
  const { setOpenMobile } = useSidebar();
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      type={asChild ? undefined : "button"}
      data-active={isActive}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex min-h-9 w-full min-w-0 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary [&_svg]:size-4 [&_svg]:shrink-0 group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-2 group-data-[state=collapsed]/sidebar:[&>span]:sr-only",
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setOpenMobile(false);
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}
export function SidebarMenuSub({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "my-1 ml-5 grid list-none gap-1 border-l border-border pl-3 group-data-[state=collapsed]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}
export function SidebarMenuSubItem(props: React.ComponentProps<"li">) {
  return <SidebarMenuItem {...props} />;
}
export function SidebarMenuSubButton(
  props: React.ComponentProps<typeof SidebarMenuButton>,
) {
  return <SidebarMenuButton {...props} />;
}
export function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute right-3 top-2.5 text-xs tabular-nums text-muted-foreground group-data-[state=collapsed]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}
export function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn("min-w-0 flex-1 bg-background", className)}
      {...props}
    />
  );
}
export function SidebarTrigger({
  className,
  onClick,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      type="button"
      aria-label="Toggle sidebar"
      className={cn(
        "grid size-9 place-items-center rounded-md hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary",
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggleSidebar();
      }}
      {...props}
    >
      {children ?? <PanelLeft size={17} />}
    </button>
  );
}
