import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-neutral-700 bg-transparent hover:bg-neutral-800",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
      accent: {
        violet: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-violet-900/30 data-[state=on]:text-violet-400",
        cyan: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        blue: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        emerald: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        amber: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-violet-900/30 data-[state=on]:text-violet-400",
        rose: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        indigo: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        teal: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        lime: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        zinc: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        red: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        yellow: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
        purple: "text-neutral-500 hover:text-neutral-200 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-100",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      accent: "amber",
    },
  }
);

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
  accent: "amber",
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
