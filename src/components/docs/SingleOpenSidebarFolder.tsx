"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

import type * as PageTree from "fumadocs-core/page-tree";
import Link from "fumadocs-core/link";
import { usePathname } from "fumadocs-core/framework";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "fumadocs-ui/components/ui/collapsible";
import { ChevronDown } from "fumadocs-ui/internal/icons";
import { useTreePath } from "fumadocs-ui/contexts/tree";
import { cn } from "fumadocs-ui/utils/cn";
import { isActive } from "fumadocs-ui/utils/is-active";

const OPEN_EVENT = "fd-sidebar-folder-open";

type OpenEventDetail = {
  level: number;
  key: string;
};

const baseItemClass =
  "relative flex flex-row items-center gap-2 rounded-lg p-2 ps-(--sidebar-item-offset) text-start text-fd-muted-foreground [overflow-wrap:anywhere] [&_svg]:size-4 [&_svg]:shrink-0";
const activeItemClass = "bg-fd-primary/10 text-fd-primary";
const inactiveItemClass =
  "transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none";

function getFolderKey(item: PageTree.Folder, level: number) {
  if (item.$id) return item.$id;
  if (item.index?.url) return item.index.url;
  if (typeof item.name === "string") return `${level}-${item.name}`;
  return String(level);
}

function dispatchOpen(level: number, key: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<OpenEventDetail>(OPEN_EVENT, { detail: { level, key } })
  );
}

export function SingleOpenSidebarFolder({
  item,
  level,
  children,
}: {
  item: PageTree.Folder;
  level: number;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const path = useTreePath();
  const key = getFolderKey(item, level);
  const inPath = path.includes(item);
  const [open, setOpen] = useState(() => inPath || item.defaultOpen === true);

  useEffect(() => {
    if (inPath) setOpen(true);
  }, [inPath]);

  useEffect(() => {
    if (!open) return;
    dispatchOpen(level, key);
  }, [open, level, key]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<OpenEventDetail>).detail;
      if (!detail || detail.level !== level || detail.key === key) return;
      setOpen(false);
    };

    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, [level, key]);

  const chevronClass = cn("ms-auto transition-transform", !open && "-rotate-90");
  const contentClass = cn(
    "relative",
    level === 1 && [
      "before:content-[''] before:absolute before:w-px before:inset-y-1 before:bg-fd-border before:start-2.5",
      "**:data-[active=true]:before:content-[''] **:data-[active=true]:before:bg-fd-primary **:data-[active=true]:before:absolute **:data-[active=true]:before:w-px **:data-[active=true]:before:inset-y-2.5 **:data-[active=true]:before:start-2.5",
    ]
  );
  const contentStyle = {
    "--sidebar-item-offset": `calc(var(--spacing) * ${(level + 1) * 3})`,
  } as CSSProperties;

  if (item.index) {
    const active = isActive(item.index.url, pathname, false);
    const itemClass = cn(
      baseItemClass,
      active ? activeItemClass : inactiveItemClass,
      "w-full"
    );

    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <Link
          href={item.index.url}
          external={item.index.external}
          data-active={active}
          className={itemClass}
          onClick={(event) => {
            if (
              event.target instanceof Element &&
              event.target.matches("[data-icon], [data-icon] *")
            ) {
              setOpen((prev) => !prev);
              event.preventDefault();
              return;
            }
            setOpen((prev) => (active ? !prev : true));
          }}
        >
          {item.icon}
          {item.name}
          <ChevronDown data-icon className={chevronClass} />
        </Link>
        <CollapsibleContent className={contentClass} style={contentStyle}>
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  const triggerClass = cn(baseItemClass, inactiveItemClass, "w-full");

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className={triggerClass}>
        {item.icon}
        {item.name}
        <ChevronDown data-icon className={chevronClass} />
      </CollapsibleTrigger>
      <CollapsibleContent className={contentClass} style={contentStyle}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
