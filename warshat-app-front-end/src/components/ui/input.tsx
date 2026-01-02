import * as React from "react"
import { cn } from "@/utils/cn"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "underline"
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const base =
      variant === "underline"
        ? "flex h-10 w-full bg-transparent border-0 border-b-2 rounded-none px-0 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0"
        : "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"

    return (
      <input type={type} className={cn(base, className)} ref={ref} {...props} />
    )
  },
)

Input.displayName = "Input"
