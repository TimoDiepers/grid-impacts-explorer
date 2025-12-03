import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-gray-200 bg-transparent shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
      accent: {
        violet: "text-violet-100/90 hover:bg-violet-400/10 hover:text-violet-50 data-[state=on]:bg-violet-400/20 data-[state=on]:text-violet-50",
        cyan: "text-cyan-100/90 hover:bg-cyan-400/10 hover:text-cyan-50 data-[state=on]:bg-cyan-400/20 data-[state=on]:text-cyan-50",
        blue: "text-blue-100/90 hover:bg-blue-400/10 hover:text-blue-50 data-[state=on]:bg-blue-400/20 data-[state=on]:text-blue-50",
        emerald: "text-emerald-100/90 hover:bg-emerald-400/10 hover:text-emerald-50 data-[state=on]:bg-emerald-400/20 data-[state=on]:text-emerald-50",
        amber: "text-amber-100/90 hover:bg-amber-400/15 hover:text-amber-50 data-[state=on]:bg-amber-400/25 data-[state=on]:text-amber-50",
        rose: "text-rose-100/90 hover:bg-rose-400/10 hover:text-rose-50 data-[state=on]:bg-rose-400/20 data-[state=on]:text-rose-50",
        indigo: "text-indigo-100/90 hover:bg-indigo-400/10 hover:text-indigo-50 data-[state=on]:bg-indigo-400/20 data-[state=on]:text-indigo-50",
        teal: "text-teal-100/90 hover:bg-teal-400/10 hover:text-teal-50 data-[state=on]:bg-teal-400/20 data-[state=on]:text-teal-50",
        lime: "text-lime-100/90 hover:bg-lime-400/15 hover:text-lime-50 data-[state=on]:bg-lime-400/25 data-[state=on]:text-lime-50",
        zinc: "text-zinc-200/90 hover:bg-zinc-300/10 hover:text-zinc-50 data-[state=on]:bg-zinc-300/20 data-[state=on]:text-zinc-50",
        red: "text-red-100/90 hover:bg-red-400/10 hover:text-red-50 data-[state=on]:bg-red-400/20 data-[state=on]:text-red-50",
        yellow: "text-yellow-100 hover:bg-yellow-400/15 hover:text-yellow-50 data-[state=on]:bg-yellow-400/25 data-[state=on]:text-yellow-50",
        purple: "text-purple-100/90 hover:bg-purple-400/10 hover:text-purple-50 data-[state=on]:bg-purple-400/20 data-[state=on]:text-purple-50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      accent: "violet",
    },
  }
);

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
  accent: "violet",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, accent, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size, accent }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, accent, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
          accent: context.accent || accent,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem, toggleVariants };
