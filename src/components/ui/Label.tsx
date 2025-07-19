import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: "default" | "brutalist" | "ghost";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  error?: boolean;
  success?: boolean;
  glitchOnHover?: boolean;
  children: React.ReactNode;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      variant = "default",
      size = "md",
      required = false,
      error = false,
      success = false,
      glitchOnHover = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "font-brutalist font-bold uppercase tracking-wide transition-all duration-200",
      "cursor-pointer",
      glitchOnHover && "hover:animate-rgb-split"
    );

    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    const variantClasses = {
      default: cn(
        "text-cyber-green",
        error && "text-brutal-red",
        success && "text-cyber-green-bright"
      ),
      brutalist: cn(
        "text-cyber-green text-shadow-brutal",
        error && "text-brutal-red",
        success && "text-cyber-green-bright"
      ),
      ghost: cn(
        "text-cyber-gray",
        "hover:text-cyber-green",
        error && "text-brutal-red hover:text-brutal-red",
        success && "text-cyber-green hover:text-cyber-green-bright"
      ),
    };

    return (
      <label
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        {...props}
      >
        {children}
        {required && (
          <span className="text-brutal-red ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };
export default Label;
