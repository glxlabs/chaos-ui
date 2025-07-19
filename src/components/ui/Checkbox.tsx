import React, { forwardRef } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../../utils/cn";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "brutalist";
  label?: string;
  description?: string;
  error?: boolean;
  indeterminate?: boolean;
  glitchOnClick?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      variant = "default",
      label,
      description,
      error = false,
      indeterminate = false,
      glitchOnClick = false,
      className = "",
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const iconSizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    const variantClasses = {
      default: cn(
        "border-brutal border-cyber-green bg-cyber-black text-cyber-green",
        "focus:outline-none focus:ring-2 focus:ring-cyber-green focus:ring-offset-2 focus:ring-offset-cyber-black",
        "checked:bg-cyber-green checked:text-cyber-black",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error && "border-brutal-red"
      ),
      brutalist: cn(
        "border-brutal-thick border-cyber-green bg-cyber-black text-cyber-green shadow-brutal",
        "focus:outline-none focus:ring-2 focus:ring-cyber-green focus:ring-offset-2 focus:ring-offset-cyber-black",
        "checked:bg-cyber-green checked:text-cyber-black checked:shadow-brutal-hover",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error && "border-brutal-red shadow-brutal-black"
      ),
    };

    const checkboxClasses = cn(
      "transition-all duration-200 cursor-pointer",
      "hover:border-cyber-green-bright",
      glitchOnClick && "hover:animate-glitch",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    return (
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={cn(checkboxClasses, "appearance-none")}
            {...props}
          />

          {/* Custom checkbox indicator */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center pointer-events-none",
              sizeClasses[size]
            )}
          >
            {indeterminate ? (
              <Minus className={cn(iconSizeClasses[size], "text-cyber-green")} />
            ) : checked ? (
              <Check className={cn(iconSizeClasses[size], "text-cyber-black")} />
            ) : null}
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

Checkbox.displayName = "Checkbox";

export { Checkbox };
export default Checkbox;
