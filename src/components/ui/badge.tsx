import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "border-violet-800/40 bg-violet-950/30 text-violet-400",
      secondary:
        "border-neutral-700 bg-neutral-800/50 text-neutral-400",
      destructive:
        "border-red-800/40 bg-red-950/30 text-red-400",
      outline:
        "border-neutral-700 bg-transparent text-neutral-400",
      success:
        "border-emerald-800/40 bg-emerald-950/30 text-emerald-400",
      warning:
        "border-amber-800/40 bg-amber-950/30 text-amber-400",

      info:
        "border-neutral-600 bg-neutral-800/30 text-neutral-400",
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
