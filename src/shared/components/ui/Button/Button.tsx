import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  variants: {
    variant: {
      default: "bg-purple-500 hover:bg-purple-700",
      error: "bg-red-500 hover:bg-red-700",
      info: "bg-blue-500 hover:bg-blue-700",
      success: "bg-green-500 hover:bg-green-700",
    },
    size: {
      default: "px-4 py-3 text-base",
      sm: "px-4 py-2 text-sm",
      icon: "h-10 w-10",
    },
    disabled: {
      true: "pointer-events-none bg-gray-300 hover:bg-gray-300/50",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    disabled: false,
  },
});

export type ButtonProps = {
  asChild?: boolean;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<"button">, ButtonProps>(
  ({ className, variant, size, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonVariants({ variant, size, disabled, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
