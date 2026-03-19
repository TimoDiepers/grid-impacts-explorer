import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "border-violet-300/50 bg-violet-50/50 text-violet-700 dark:border-violet-800/40 dark:bg-violet-950/30 dark:text-violet-400",
      secondary:
        "border-neutral-300 bg-neutral-100/50 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-400",
      destructive:
        "border-red-300/50 bg-red-50/50 text-red-700 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-400",
      outline:
        "border-neutral-300 bg-transparent text-neutral-600 dark:border-neutral-700 dark:text-neutral-400",
      success:
        "border-emerald-300/50 bg-emerald-50/50 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/30 dark:text-emerald-400",
      warning:
        "border-amber-300/50 bg-amber-50/50 text-amber-700 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-400",
      info:
        "border-neutral-300 bg-neutral-100/30 text-neutral-600 dark:border-neutral-600 dark:bg-neutral-800/30 dark:text-neutral-400",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium font-mono",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
