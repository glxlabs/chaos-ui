import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  variant?: "default" | "brutalist" | "centered";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { size = "xl", variant = "default", padding = "md", children, className = "", ...props },
    ref
  ) => {
    const baseClasses = cn("w-full mx-auto");

    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-6xl",
      "2xl": "max-w-7xl",
      full: "max-w-full",
    };

    const variantClasses = {
      default: "",
      brutalist: "border-brutal border-cyber-green shadow-brutal bg-cyber-dark",
      centered: "flex items-center justify-center min-h-[200px]",
    };

    const paddingClasses = {
      none: "",
      sm: "px-4 py-2",
      md: "px-6 py-4",
      lg: "px-8 py-6",
      xl: "px-12 py-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };
export default Container;
