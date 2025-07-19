import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "brutalist";
  label?: string;
  description?: string;
  error?: boolean;
  glitchOnClick?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = "md",
      variant = "default",
      label,
      description,
      error = false,
      glitchOnClick = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const variantClasses = {
      default: cn(
        "border-brutal border-cyber-green bg-cyber-black text-cyber-green",
        "focus:outline-none focus:ring-2 focus:ring-cyber-green focus:ring-offset-2 focus:ring-offset-cyber-black",
        "checked:bg-cyber-green checked:border-cyber-green",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error && "border-brutal-red"
      ),
      brutalist: cn(
        "border-brutal-thick border-cyber-green bg-cyber-black text-cyber-green shadow-brutal",
        "focus:outline-none focus:ring-2 focus:ring-cyber-green focus:ring-offset-2 focus:ring-offset-cyber-black",
        "checked:bg-cyber-green checked:border-cyber-green checked:shadow-brutal-hover",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error && "border-brutal-red shadow-brutal-black"
      ),
    };

    const radioClasses = cn(
      "rounded-full transition-all duration-200 cursor-pointer",
      "hover:border-cyber-green-bright",
      "before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-cyber-green before:scale-0 before:transition-transform before:duration-200",
      "checked:before:scale-50",
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
            type="radio"
            className={cn(radioClasses, "appearance-none relative")}
            {...props}
          />
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

Radio.displayName = "Radio";

// Radio Group Component
export interface RadioGroupProps {
  name: string;
  options: { value: string; label: string; description?: string }[];
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "brutalist";
  error?: boolean;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  size = "md",
  variant = "default",
  error = false,
  className = "",
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {options.map(option => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={e => onChange?.(e.target.value)}
          label={option.label}
          description={option.description}
          size={size}
          variant={variant}
          error={error}
        />
      ))}
    </div>
  );
};

export { Radio };
export default Radio;
