import React, { useState, forwardRef } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "../../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "brutalist" | "ghost";
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  label?: string;
  hint?: string;
  showPasswordToggle?: boolean;
  clearable?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  glitchOnFocus?: boolean;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      inputSize = "md",
      error = false,
      success = false,
      label,
      hint,
      showPasswordToggle = false,
      clearable = false,
      icon,
      iconPosition = "left",
      glitchOnFocus = false,
      onClear,
      className = "",
      type: originalType = "text",
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    const type = originalType === "password" && showPassword ? "text" : originalType;
    const hasValue = value !== undefined && value !== "";

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      if (glitchOnFocus) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      props.onBlur?.(e);
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const baseClasses = cn(
      "w-full font-mono bg-cyber-black text-cyber-white placeholder-cyber-gray transition-all duration-200 focus:outline-none",
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

    const iconClasses = cn(
      "w-5 h-5 text-cyber-gray",
      focused && "text-cyber-green",
      error && "text-brutal-red",
      success && "text-cyber-green"
    );

    const paddingClasses = cn(
      icon && iconPosition === "left" && "pl-12",
      icon && iconPosition === "right" && "pr-12",
      (showPasswordToggle || clearable) && "pr-12"
    );

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-brutalist font-bold uppercase tracking-wide text-cyber-green">
            {label}
            {props.required && <span className="text-brutal-red ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 z-10",
                iconPosition === "left" ? "left-3" : "right-3"
              )}
            >
              <div className={iconClasses}>{icon}</div>
            </div>
          )}

          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              baseClasses,
              sizeClasses[inputSize],
              variantClasses[variant],
              paddingClasses,
              className
            )}
            {...props}
          />

          {(showPasswordToggle || clearable) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {clearable && hasValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-cyber-gray hover:text-cyber-green transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {showPasswordToggle && originalType === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-cyber-gray hover:text-cyber-green transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>
          )}
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

Input.displayName = "Input";

export { Input };
export default Input;
