import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-none border-2 border-black bg-white px-3 py-1 text-base shadow-sm transition-none focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:ring-2 focus:ring-black focus:border-black",
        "aria-invalid:border-red-500",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
