import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100/80",
        success:
          "border-green-100 bg-green-50 text-green-700 hover:bg-green-100/50",
        warning:
          "border-[#FBB03B]/20 bg-[#FBB03B]/5 text-[#FBB03B] hover:bg-[#FBB03B]/10",
        destructive: "border-red-100 bg-red-50 text-red-600 hover:bg-red-100",
        outline:
          "text-foreground border-border hover:bg-accent hover:text-accent-foreground",
      },
      shape: {
        pill: "rounded-full",
        soft: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "soft",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, shape }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
