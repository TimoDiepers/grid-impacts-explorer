import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-violet-600 text-white hover:bg-violet-500",
        gradient:
          "bg-violet-600 text-white hover:bg-violet-500",
        destructive:
          "bg-red-600 text-white hover:bg-red-500",
        outline:
          "border border-neutral-300 bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        secondary:
          "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
        ghost:
          "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-200",
        link:
          "text-violet-600 underline-offset-4 hover:underline hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-11 rounded-md px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
