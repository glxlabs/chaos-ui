import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "default" | "brutalist" | "gradient";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  color?: "green" | "magenta" | "white" | "red" | "blue";
  animated?: boolean;
  striped?: boolean;
  glitchOnComplete?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      showValue = false,
      color = "green",
      animated = false,
      striped = false,
      glitchOnComplete = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const isComplete = percentage >= 100;

    const sizeClasses = {
      sm: "h-2",
      md: "h-4",
      lg: "h-6",
    };

    const colorClasses = {
      green: "bg-cyber-green",
      magenta: "bg-cyber-magenta",
      white: "bg-cyber-white",
      red: "bg-red-500",
      blue: "bg-blue-500",
    };

    const backgroundClasses = {
      green: "bg-cyber-green/20",
      magenta: "bg-cyber-magenta/20",
      white: "bg-cyber-white/20",
      red: "bg-red-500/20",
      blue: "bg-blue-500/20",
    };

    const baseClasses = cn(
      "relative w-full overflow-hidden",
      sizeClasses[size],
      variant === "brutalist" && "border-brutal border-cyber-green",
      variant === "gradient" && "bg-gradient-to-r from-cyber-dark to-cyber-green/20",
      variant === "default" && backgroundClasses[color],
      isComplete && glitchOnComplete && "animate-glitch-brutal",
      className
    );

    const fillClasses = cn(
      "h-full transition-all duration-500 ease-out",
      colorClasses[color],
      animated && "animate-pulse",
      striped && "bg-stripes",
      variant === "brutalist" && "shadow-brutal-sm",
      variant === "gradient" && "bg-gradient-to-r from-cyber-green to-cyber-magenta"
    );

    return (
      <div ref={ref} className="space-y-2" {...props}>
        <div className={baseClasses}>
          <div className={fillClasses} style={{ width: `${percentage}%` }} />
          {striped && (
            <div
              className="absolute inset-0 bg-stripes opacity-30"
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>

        {showValue && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-mono text-cyber-white">{Math.round(percentage)}%</span>
            <span className="text-xs font-mono text-cyber-gray">
              {value}/{max}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
export default Progress;
