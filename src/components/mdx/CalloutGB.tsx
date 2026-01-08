import {
  type CSSProperties,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "fumadocs-ui/utils/cn";

import {
  CircleCheck,
  CircleX,
  Info,
  Lightbulb,
  MessageCircleQuestionMark,
  TriangleAlert,
} from "lucide-react";

export type CalloutType =
  | "info"
  | "warning"
  | "error"
  | "success"
  | "idea"
  | "answer"
  | "question";

type CalloutInputType = CalloutType | "warn" | "tip";

const CALLOUT_BACKGROUND: Record<CalloutType, string> = {
  info: "bg-neutral-50 dark:bg-slate-900",
  warning: "bg-amber-50 dark:bg-orange-900/70",
  error: "bg-red-50 dark:bg-red-950/60",
  success: "bg-emerald-50 dark:bg-emerald-950/60",
  idea: "bg-sky-50 dark:bg-sky-950/60",
  answer: "bg-emerald-50 dark:bg-emerald-950/60",
  question: "bg-neutral-50 dark:bg-slate-900",
};

const iconClass = "size-5 -me-0.5 fill-(--callout-color) text-fd-card";
const contrastIconClass = "size-5 -me-0.5 text-black dark:text-white";
const CALLOUT_ICON: Record<CalloutType, ReactNode> = {
  info: <Info className={iconClass} />,
  warning: <TriangleAlert className={iconClass} />,
  error: <CircleX className={iconClass} />,
  success: <CircleCheck className={iconClass} />,
  idea: <Lightbulb className={contrastIconClass} />,
  answer: <MessageCircleQuestionMark className={contrastIconClass} />,
  question: <MessageCircleQuestionMark className={contrastIconClass} />,
};

export interface CalloutProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  type?: CalloutInputType;
  title?: ReactNode;
  icon?: ReactNode;
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  (
    { type = "info", title, children, className, icon, style, ...props },
    ref,
  ) => {
    const resolvedType: CalloutType =
      type === "warn" ? "warning" : type === "tip" ? "info" : type;
    const bg = CALLOUT_BACKGROUND[resolvedType];

    const calloutStyle: CSSProperties = {
      "--callout-color": `var(--color-fd-${resolvedType}, var(--color-fd-muted))`,
      ...(style ?? {}),
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 my-4 rounded-xl bg-fd-card p-3 ps-[0.625rem] text-sm text-black dark:text-white shadow-md",
          bg,
          className,
        )}
        style={calloutStyle}
        {...props}
      >
        {CALLOUT_ICON[resolvedType]}
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          {title && (
            <p className="font-medium !my-0 text-black dark:text-white">
              {title}
            </p>
          )}
          <div className="prose-no-margin empty:hidden text-black dark:text-white">
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Callout.displayName = "Callout";
