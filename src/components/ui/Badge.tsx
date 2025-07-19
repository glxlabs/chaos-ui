import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "destructive" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  brutalist?: boolean;
  glitchOnHover?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      brutalist = true,
      glitchOnHover = false,
      pulse = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center font-mono font-bold uppercase tracking-wide transition-all duration-200",
      brutalist && "border-brutal",
      glitchOnHover && "hover:animate-glitch",
      pulse && "animate-pulse-cyber"
    );

    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-2 text-base",
    };

    const variantClasses = {
      default: cn(
        "bg-cyber-gray text-cyber-black border-cyber-gray",
        brutalist && "shadow-brutal-black"
      ),
      primary: cn(
        "bg-cyber-green text-cyber-black border-cyber-green",
        brutalist && "shadow-brutal"
      ),
      secondary: cn(
        "bg-cyber-magenta text-cyber-black border-cyber-magenta",
        brutalist && "shadow-brutal-magenta"
      ),
      destructive: cn(
        "bg-brutal-red text-cyber-white border-brutal-red",
        brutalist && "shadow-brutal-black"
      ),
      outline: cn(
        "bg-transparent text-cyber-green border-cyber-green",
        "hover:bg-cyber-green hover:text-cyber-black",
        brutalist && "hover:shadow-brutal-hover"
      ),
      ghost: cn("bg-transparent text-cyber-green border-transparent", "hover:bg-cyber-green/10"),
    };

    return (
      <span
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export default Badge;
