import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "brutalist";
  label?: string;
  description?: string;
  error?: boolean;
  glitchOnClick?: boolean;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = "md",
      variant = "default",
      label,
      description,
      error = false,
      glitchOnClick = false,
      className = "",
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: {
        switch: "w-8 h-4",
        thumb: "w-3 h-3",
        translate: "translate-x-4",
      },
      md: {
        switch: "w-10 h-5",
        thumb: "w-4 h-4",
        translate: "translate-x-5",
      },
      lg: {
        switch: "w-12 h-6",
        thumb: "w-5 h-5",
        translate: "translate-x-6",
      },
    };

    const variantClasses = {
      default: cn(
        "border-brutal border-cyber-green bg-cyber-black",
        "focus:outline-none focus:ring-2 focus:ring-cyber-green focus:ring-offset-2 focus:ring-offset-cyber-black",
        "checked:bg-cyber-green checked:border-cyber-green",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error && "border-brutal-red"
      ),
      brutalist: cn(
        "border-brutal-thick border-cyber-green bg-cyber-black shadow-brutal",
        "focus:outline-none focus:ring-2 focus:ring-cyber-green focus:ring-offset-2 focus:ring-offset-cyber-black",
        "checked:bg-cyber-green checked:border-cyber-green checked:shadow-brutal-hover",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error && "border-brutal-red shadow-brutal-black"
      ),
    };

    const switchClasses = cn(
      "relative inline-flex items-center transition-all duration-200 cursor-pointer",
      "hover:border-cyber-green-bright",
      glitchOnClick && "hover:animate-glitch",
      sizeClasses[size].switch,
      variantClasses[variant],
      className
    );

    const thumbClasses = cn(
      "absolute left-0.5 top-0.5 bg-cyber-white border border-cyber-green transition-transform duration-200",
      "shadow-sm",
      sizeClasses[size].thumb,
      checked && sizeClasses[size].translate,
      checked && "bg-cyber-black border-cyber-black"
    );

    return (
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            checked={checked}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          <div className={switchClasses}>
            <div className={thumbClasses} />
          </div>
        </div>

        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                className={cn(
                  "block text-sm font-brutalist font-bold text-cyber-white cursor-pointer",
                  error && "text-brutal-red"
                )}
              >
                {label}
                {props.required && <span className="text-brutal-red ml-1">*</span>}
              </label>
            )}
            {description && (
              <p className={cn("text-xs text-cyber-gray mt-1", error && "text-brutal-red")}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
export default Switch;
