import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "brutalist" | "dots" | "pulse" | "glitch";
  color?: "green" | "magenta" | "white" | "gray";
  speed?: "slow" | "normal" | "fast";
  thickness?: "thin" | "normal" | "thick";
  label?: string;
  showLabel?: boolean;
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = "md",
      variant = "default",
      color = "green",
      speed = "normal",
      thickness = "normal",
      label = "Loading...",
      showLabel = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    };

    const colorClasses = {
      green: "border-cyber-green",
      magenta: "border-cyber-magenta",
      white: "border-cyber-white",
      gray: "border-cyber-gray",
    };

    const speedClasses = {
      slow: "animate-spin-slow",
      normal: "animate-spin",
      fast: "animate-spin-fast",
    };

    const thicknessClasses = {
      thin: "border",
      normal: "border-2",
      thick: "border-4",
    };

    const baseClasses = cn(
      "inline-block rounded-full border-solid",
      sizeClasses[size],
      colorClasses[color],
      speedClasses[speed],
      thicknessClasses[thickness],
      variant === "default" && "border-t-transparent",
      variant === "brutalist" && "border-brutal border-cyber-green animate-spin",
      variant === "glitch" && "animate-glitch-spin",
      className
    );

    if (variant === "dots") {
      return (
        <div ref={ref} className={cn("flex space-x-1", className)} {...props}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={cn(
                "rounded-full",
                sizeClasses[size],
                colorClasses[color].replace("border-", "bg-"),
                "animate-bounce"
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.6s",
              }}
            />
          ))}
          {showLabel && <span className="ml-2 text-sm text-cyber-gray font-mono">{label}</span>}
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div ref={ref} className={cn("flex items-center space-x-2", className)} {...props}>
          <div
            className={cn(
              "rounded-full animate-pulse",
              sizeClasses[size],
              colorClasses[color].replace("border-", "bg-")
            )}
          />
          {showLabel && <span className="text-sm text-cyber-gray font-mono">{label}</span>}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("flex items-center space-x-2", className)} {...props}>
        <div className={baseClasses} />
        {showLabel && <span className="text-sm text-cyber-gray font-mono">{label}</span>}
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

// Convenience components for common patterns
export interface LoadingSpinnerProps extends SpinnerProps {
  fullScreen?: boolean;
  overlay?: boolean;
}

export const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ fullScreen = false, overlay = false, className = "", ...props }, ref) => {
    if (fullScreen) {
      return (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            overlay && "bg-cyber-black/80 backdrop-blur-sm"
          )}
        >
          <Spinner ref={ref} {...props} showLabel />
        </div>
      );
    }

    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <Spinner ref={ref} {...props} showLabel />
      </div>
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export { Spinner };
export default Spinner;
