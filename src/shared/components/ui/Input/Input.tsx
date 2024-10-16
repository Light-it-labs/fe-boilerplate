import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

import { tw } from "~/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";

    return (
      <Comp
        className={tw(
          "text-input-foreground w-full rounded-md border-none bg-white px-4 py-3 shadow-sm ring-1 ring-inset ring-purple-400",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500",
          "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50 disabled:ring-0",
          "placeholder:opacity-80",
          className,
        )}
        ref={ref}
        tabIndex={0}
        type={type}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
