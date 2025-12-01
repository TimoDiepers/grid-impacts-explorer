import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "border-transparent bg-blue-600/20 text-blue-400 border-blue-500/30",
      secondary:
        "border-transparent bg-zinc-800 text-zinc-300 border-zinc-700",
      destructive:
        "border-transparent bg-red-600/20 text-red-400 border-red-500/30",
      outline: 
        "border-zinc-700 bg-transparent text-zinc-300",
      success:
        "border-transparent bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
      warning:
        "border-transparent bg-amber-600/20 text-amber-400 border-amber-500/30",
      info:
        "border-transparent bg-cyan-600/20 text-cyan-400 border-cyan-500/30",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
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
