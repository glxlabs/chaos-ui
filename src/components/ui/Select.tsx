import React, { useState, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: "default" | "brutalist" | "ghost";
  selectSize?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  label?: string;
  hint?: string;
  placeholder?: string;
  options: SelectOption[];
  glitchOnFocus?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = "default",
      selectSize = "md",
      error = false,
      success = false,
      label,
      hint,
      placeholder = "Select option...",
      options,
      glitchOnFocus = false,
      className = "",
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setFocused(true);
      if (glitchOnFocus) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setFocused(false);
      props.onBlur?.(e);
    };

    const baseClasses = cn(
      "w-full font-mono bg-cyber-black text-cyber-white transition-all duration-200 focus:outline-none appearance-none cursor-pointer",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      isGlitching && "animate-glitch"
    );

    const sizeClasses = {
      sm: "px-brutal-3 py-brutal-2 text-sm",
      md: "px-brutal-4 py-brutal-3 text-base",
      lg: "px-brutal-6 py-brutal-4 text-lg",
    };

    const variantClasses = {
      default: cn(
        "border-brutal border-cyber-green",
        focused && "border-cyber-green-bright shadow-brutal",
        error && "border-brutal-red shadow-brutal-black",
        success && "border-cyber-green shadow-brutal"
      ),
      brutalist: cn(
        "border-brutal-thick border-cyber-green shadow-brutal",
        focused && "border-cyber-green-bright shadow-brutal-lg",
        error && "border-brutal-red shadow-brutal-black",
        success && "border-cyber-green shadow-brutal"
      ),
      ghost: cn(
        "border-0 border-b-brutal border-cyber-green bg-transparent",
        focused && "border-cyber-green-bright",
        error && "border-brutal-red",
        success && "border-cyber-green"
      ),
    };

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-brutalist font-bold uppercase tracking-wide text-cyber-green">
            {label}
            {props.required && <span className="text-brutal-red ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              baseClasses,
              sizeClasses[selectSize],
              variantClasses[variant],
              "pr-10",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-cyber-black text-cyber-white"
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom chevron */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-colors",
                focused ? "text-cyber-green" : "text-cyber-gray",
                error && "text-brutal-red",
                success && "text-cyber-green"
              )}
            />
          </div>
        </div>

        {hint && (
          <p
            className={cn(
              "text-xs font-mono",
              error ? "text-brutal-red" : success ? "text-cyber-green" : "text-cyber-gray"
            )}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
export default Select;
