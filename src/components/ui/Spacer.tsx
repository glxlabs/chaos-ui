import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  direction?: "vertical" | "horizontal" | "both";
  variant?: "default" | "brutalist" | "visible";
}

const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  ({ size = "md", direction = "vertical", variant = "default", className = "", ...props }, ref) => {
    const sizeClasses = {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
      "3xl": "64px",
      "4xl": "96px",
    };

    const baseClasses = cn(
      "flex-shrink-0",
      variant === "brutalist" && "border-brutal border-cyber-green bg-cyber-dark",
      variant === "visible" && "border border-dashed border-cyber-green/30 bg-cyber-green/5"
    );

    const dimensionClasses = {
      vertical: {
        width: "100%",
        height: sizeClasses[size],
      },
      horizontal: {
        width: sizeClasses[size],
        height: "100%",
      },
      both: {
        width: sizeClasses[size],
        height: sizeClasses[size],
      },
    };

    const dimensions = dimensionClasses[direction];

    return (
      <div
        ref={ref}
        className={cn(baseClasses, className)}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          ...props.style,
        }}
        {...props}
      />
    );
  }
);

Spacer.displayName = "Spacer";

// Convenience components for common spacing patterns
export interface FlexSpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brutalist" | "visible";
}

const FlexSpacer = forwardRef<HTMLDivElement, FlexSpacerProps>(
  ({ variant = "default", className = "", ...props }, ref) => {
    const baseClasses = cn(
      "flex-1",
      variant === "brutalist" && "border-brutal border-cyber-green bg-cyber-dark",
      variant === "visible" && "border border-dashed border-cyber-green/30 bg-cyber-green/5"
    );

    return <div ref={ref} className={cn(baseClasses, className)} {...props} />;
  }
);

FlexSpacer.displayName = "FlexSpacer";

export { Spacer, FlexSpacer };
export default Spacer;
