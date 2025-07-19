import React, { useState, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  glitchOnClick?: boolean;
  brutalist?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      glitchOnClick = true,
      brutalist = true,
      children,
      className = "",
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isGlitching, setIsGlitching] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (glitchOnClick && !disabled && !loading) {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          if (onClick) onClick(e);
        }, 150);
      } else if (onClick) {
        onClick(e);
      }
    };

    const baseClasses = cn(
      "inline-flex items-center justify-center font-brutalist font-bold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyber-green relative overflow-hidden",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      brutalist && "border-brutal",
      isGlitching && "animate-glitch"
    );

    const sizeClasses = {
      sm: "px-brutal-3 py-brutal-2 text-sm",
      md: "px-brutal-4 py-brutal-3 text-base",
      lg: "px-brutal-6 py-brutal-4 text-lg",
      xl: "px-brutal-8 py-brutal-6 text-xl",
    };

    const variantClasses = {
      primary: cn(
        "bg-cyber-green text-cyber-black border-cyber-green",
        brutalist && "shadow-brutal",
        "hover:bg-cyber-green-bright hover:shadow-brutal-hover",
        "active:translate-x-1 active:translate-y-1 active:shadow-none",
        "focus:ring-cyber-green"
      ),
      secondary: cn(
        "bg-cyber-magenta text-cyber-black border-cyber-magenta",
        brutalist && "shadow-brutal-magenta",
        "hover:bg-cyber-magenta-bright hover:shadow-brutal-hover",
        "active:translate-x-1 active:translate-y-1 active:shadow-none",
        "focus:ring-cyber-magenta"
      ),
      destructive: cn(
        "bg-brutal-red text-cyber-white border-brutal-red",
        brutalist && "shadow-brutal-black",
        "hover:bg-red-600 hover:shadow-brutal-hover",
        "active:translate-x-1 active:translate-y-1 active:shadow-none",
        "focus:ring-brutal-red"
      ),
      ghost: cn(
        "bg-transparent text-cyber-green border-transparent",
        "hover:bg-cyber-green hover:text-cyber-black",
        "focus:ring-cyber-green"
      ),
      outline: cn(
        "bg-transparent text-cyber-green border-cyber-green",
        "hover:bg-cyber-green hover:text-cyber-black",
        brutalist && "hover:shadow-brutal-hover",
        "active:translate-x-1 active:translate-y-1 active:shadow-none",
        "focus:ring-cyber-green"
      ),
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        onClick={handleClick}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <span
          className={cn(
            "flex items-center gap-2",
            isGlitching && "animate-rgb-split",
            loading && "opacity-0"
          )}
        >
          {children}
        </span>

        {isGlitching && (
          <div className="absolute inset-0 bg-cyber-magenta opacity-20 animate-pulse" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
