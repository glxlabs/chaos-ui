import React, { useState, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "brutalist" | "ghost";
  textareaSize?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  label?: string;
  hint?: string;
  showCharCount?: boolean;
  maxLength?: number;
  glitchOnFocus?: boolean;
  autoResize?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant = "default",
      textareaSize = "md",
      error = false,
      success = false,
      label,
      hint,
      showCharCount = false,
      maxLength,
      glitchOnFocus = false,
      autoResize = false,
      className = "",
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    const charCount = typeof value === "string" ? value.length : 0;

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      if (glitchOnFocus) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const target = e.target;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
      }
      onChange?.(e);
    };

    const baseClasses = cn(
      "w-full font-mono bg-cyber-black text-cyber-white placeholder-cyber-gray transition-all duration-200 focus:outline-none resize-none",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      isGlitching && "animate-glitch",
      autoResize && "overflow-hidden"
    );

    const sizeClasses = {
      sm: "px-brutal-3 py-brutal-2 text-sm min-h-[80px]",
      md: "px-brutal-4 py-brutal-3 text-base min-h-[100px]",
      lg: "px-brutal-6 py-brutal-4 text-lg min-h-[120px]",
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
          <textarea
            ref={ref}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            className={cn(
              baseClasses,
              sizeClasses[textareaSize],
              variantClasses[variant],
              className
            )}
            {...props}
          />

          {showCharCount && (maxLength || charCount > 0) && (
            <div className="absolute bottom-2 right-2 text-xs font-mono text-cyber-gray">
              {charCount}
              {maxLength && `/${maxLength}`}
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

TextArea.displayName = "TextArea";

export { TextArea };
export default TextArea;
