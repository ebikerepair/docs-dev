import {
  ImageZoom,
  type ImageZoomProps,
} from "fumadocs-ui/components/image-zoom";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";

import type { MDXComponents } from "mdx/types";

import { Mermaid } from "./components/mdx/Mermaid";
import * as ShowcaseComponents from "./components/mdx/Showcase";

import { cn } from "fumadocs-ui/utils/cn";

import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

// type CalloutType = "info" | "warning" | "error" | "success" | "idea";

// interface CalloutProps
//   extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
//   type?: CalloutType;
//   title?: ReactNode;
// }

// const CALLOUT_STYLES: Record<
//   CalloutType,
//   { bg: string; icon: string }
// > = {
//   info: {
//     bg: "bg-neutral-50 dark:bg-slate-900",
//     icon: "text-neutral-500 dark:text-slate-300",
//   },
//   warning: {
//     bg: "bg-amber-50 dark:bg-orange-900/70",
//     icon: "text-amber-500 dark:text-orange-300",
//   },
//   error: {
//     bg: "bg-red-50 dark:bg-red-950/60",
//     icon: "text-red-500 dark:text-red-300",
//   },
//   success: {
//     bg: "bg-emerald-50 dark:bg-emerald-950/60",
//     icon: "text-emerald-500 dark:text-emerald-300",
//   },
//   idea: {
//     bg: "bg-sky-50 dark:bg-sky-950/60",
//     icon: "text-sky-500 dark:text-sky-300",
//   },
// };

// const CalloutIcon: Record<CalloutType, typeof Info> = {
//   info: Info,
//   warning: AlertCircle,
//   error: AlertTriangle,
//   success: CheckCircle2,
//   idea: Lightbulb,
// };

// function Callout({
//   type = "info",
//   title,
//   children,
//   className,
//   ...props
// }: CalloutProps) {
//   const styles = CALLOUT_STYLES[type];
//   const Icon = CalloutIcon[type];

//   const hasTitle = Boolean(title);

//   return (
//     <div
//       className={cn(
//         "my-4 rounded-xl px-5 transition-colors w-full",
//         styles.bg,
//         className,
//       )}
//       {...props}
//     >
//       {
//         <div className="flex items-start gap-2 py-2">
//           <Icon className={cn("mt-[4px] h-5 w-5 shrink-0", styles.icon)} />
//           <div className="">{children}</div>
//         </div>
//       }
//     </div>
//   );
// }

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,

    // fumadocs extensions
    img: (props) => <ImageZoom {...(props as unknown as ImageZoomProps)} />,
    ...TabsComponents,

    // custom components
    Mermaid,
    ...ShowcaseComponents,

    // passthrough and overrides
    ...components,

    // Callout,
  };
}
