"use client";
import * as React from "react";
import { ChevronRight, Folder, FolderOpen, FileCode2 } from "lucide-react";
import { cn } from "./utils";
export type TreeNode = { id: string; label: string; children?: TreeNode[] };
export function TreeView({
  nodes,
  onSelect,
  className,
  label = "Files",
  renderLabel,
}: {
  nodes: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  className?: string;
  label?: string;
  renderLabel?: (node: TreeNode) => React.ReactNode;
}) {
  const [closed, setClosed] = React.useState<Set<string>>(new Set());
  const [selected, setSelected] = React.useState<string>();
  const [focused, setFocused] = React.useState(nodes[0]?.id);
  const root = React.useRef<HTMLUListElement>(null);
  const visible: { node: TreeNode; depth: number; parent?: string }[] = [];
  function flatten(list: TreeNode[], depth = 0, parent?: string) {
    for (const node of list) {
      visible.push({ node, depth, parent });
      if (node.children && !closed.has(node.id))
        flatten(node.children, depth + 1, node.id);
    }
  }
  flatten(nodes);
  function toggle(id: string) {
    setClosed((v) => {
      const n = new Set(v);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }
  function focus(id?: string) {
    if (!id) return;
    setFocused(id);
    root.current
      ?.querySelectorAll<HTMLLIElement>('[role="treeitem"]')
      .forEach((el) => {
        if (el.dataset.id === id) el.focus();
      });
  }
  return (
    <ul
      ref={root}
      role="tree"
      aria-label={label}
      className={cn("grid w-full gap-0.5 text-sm", className)}
    >
      {visible.map(({ node, depth, parent }, index) => (
        <li
          key={node.id}
          data-id={node.id}
          role="treeitem"
          aria-level={depth + 1}
          aria-expanded={node.children ? !closed.has(node.id) : undefined}
          aria-selected={selected === node.id}
          tabIndex={focused === node.id ? 0 : -1}
          onFocus={() => setFocused(node.id)}
          onClick={() => {
            setSelected(node.id);
            if (node.children) toggle(node.id);
            else onSelect?.(node);
          }}
          onKeyDown={(e) => {
            if (
              [
                "ArrowDown",
                "ArrowUp",
                "ArrowLeft",
                "ArrowRight",
                "Home",
                "End",
                "Enter",
                " ",
              ].includes(e.key)
            )
              e.preventDefault();
            if (e.key === "ArrowDown") focus(visible[index + 1]?.node.id);
            if (e.key === "ArrowUp") focus(visible[index - 1]?.node.id);
            if (e.key === "Home") focus(visible[0]?.node.id);
            if (e.key === "End") focus(visible.at(-1)?.node.id);
            if (e.key === "ArrowRight" && node.children) {
              if (closed.has(node.id)) toggle(node.id);
              else focus(node.children[0]?.id);
            }
            if (e.key === "ArrowLeft") {
              if (node.children && !closed.has(node.id)) toggle(node.id);
              else focus(parent);
            }
            if (e.key === "Enter" || e.key === " ") {
              setSelected(node.id);
              if (node.children) toggle(node.id);
              else onSelect?.(node);
            }
          }}
          style={{ paddingLeft: 12 + depth * 20 }}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md py-2 pr-3 transition-colors hover:bg-muted",
            selected === node.id && "bg-primary/8 text-primary",
          )}
        >
          <ChevronRight
            size={13}
            className={cn(
              "shrink-0 transition-transform",
              !node.children && "invisible",
              node.children && !closed.has(node.id) && "rotate-90",
            )}
          />
          {node.children ? (
            closed.has(node.id) ? (
              <Folder size={16} />
            ) : (
              <FolderOpen size={16} />
            )
          ) : (
            <FileCode2 size={16} className="text-muted-foreground" />
          )}
          <span className="truncate">{renderLabel?.(node) ?? node.label}</span>
          {node.children && (
            <span className="ml-auto text-xs text-muted-foreground">
              {node.children.length}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
