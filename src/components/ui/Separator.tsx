import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "brutalist" | "dashed" | "dotted";
  size?: "sm" | "md" | "lg";
  glitchOnHover?: boolean;
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = "horizontal",
      variant = "default",
      size = "md",
      glitchOnHover = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn("border-cyber-green", glitchOnHover && "hover:animate-glitch");

    const orientationClasses = {
      horizontal: "w-full border-t",
      vertical: "h-full border-l",
    };

    const variantClasses = {
      default: "border-solid",
      brutalist: "border-solid border-brutal",
      dashed: "border-dashed",
      dotted: "border-dotted",
    };

    const sizeClasses = {
      sm: orientation === "horizontal" ? "border-t" : "border-l",
      md: orientation === "horizontal" ? "border-t-2" : "border-l-2",
      lg: orientation === "horizontal" ? "border-t-brutal" : "border-l-brutal",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          orientationClasses[orientation],
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
export default Separator;
