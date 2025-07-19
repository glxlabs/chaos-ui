import React, { forwardRef, useState, createContext, useContext } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: "default" | "brutalist" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export interface AccordionContextValue {
  type: "single" | "multiple";
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  variant: "default" | "brutalist" | "ghost";
  size: "sm" | "md" | "lg";
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion provider");
  }
  return context;
};

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      collapsible = false,
      defaultValue,
      value,
      onValueChange,
      variant = "default",
      size = "md",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue || (type === "multiple" ? [] : "")
    );

    const currentValue = value ?? internalValue;

    const handleValueChange = (itemValue: string) => {
      let newValue: string | string[];

      if (type === "multiple") {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        newValue = currentArray.includes(itemValue)
          ? currentArray.filter(v => v !== itemValue)
          : [...currentArray, itemValue];
      } else {
        newValue = currentValue === itemValue && collapsible ? "" : itemValue;
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const contextValue: AccordionContextValue = {
      type,
      value: currentValue,
      onValueChange: (value: string | string[]) => handleValueChange(value as string),
      variant,
      size,
    };

    const baseClasses = cn("w-full space-y-2", variant === "brutalist" && "space-y-4", className);

    return (
      <AccordionContext.Provider value={contextValue}>
        <div ref={ref} className={baseClasses} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

// Accordion Item Component
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, className = "", ...props }, ref) => {
    const { variant } = useAccordion();

    const baseClasses = cn(
      "border border-cyber-green/20 rounded-lg overflow-hidden",
      variant === "brutalist" && "border-brutal border-cyber-green shadow-brutal",
      variant === "ghost" && "border-transparent",
      className
    );

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

// Accordion Trigger Component
export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ value, children, icon, iconPosition = "right", className = "", ...props }, ref) => {
    const { value: currentValue, onValueChange, variant, size, type } = useAccordion();

    const isExpanded =
      type === "multiple"
        ? Array.isArray(currentValue) && currentValue.includes(value)
        : currentValue === value;

    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    };

    const variantClasses = {
      default: "bg-cyber-dark hover:bg-cyber-green/10 text-cyber-white",
      brutalist: "bg-cyber-dark hover:bg-cyber-green/10 text-cyber-white",
      ghost: "bg-transparent hover:bg-cyber-green/10 text-cyber-white",
    };

    const baseClasses = cn(
      "flex items-center justify-between w-full text-left transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-cyber-green/50",
      "font-brutalist font-semibold uppercase tracking-wide",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    const defaultIcon =
      iconPosition === "right" ? (
        <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
      ) : (
        <ChevronRight className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")} />
      );

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onValueChange(value)}
        className={baseClasses}
        {...props}
      >
        {iconPosition === "left" && <span className="mr-2">{icon || defaultIcon}</span>}

        <span className="flex-1 text-left">{children}</span>

        {iconPosition === "right" && <span className="ml-2">{icon || defaultIcon}</span>}
      </button>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

// Accordion Content Component
export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  forceMount?: boolean;
}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ value, children, forceMount = false, className = "", ...props }, ref) => {
    const { value: currentValue, variant, size, type } = useAccordion();

    const isExpanded =
      type === "multiple"
        ? Array.isArray(currentValue) && currentValue.includes(value)
        : currentValue === value;

    const sizeClasses = {
      sm: "px-3 py-2",
      md: "px-4 py-3",
      lg: "px-5 py-4",
    };

    const variantClasses = {
      default: "bg-cyber-dark/50 border-t border-cyber-green/20",
      brutalist: "bg-cyber-dark/50 border-t border-cyber-green/20",
      ghost: "bg-transparent border-t border-cyber-green/20",
    };

    if (!isExpanded && !forceMount) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "text-cyber-white transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-cyber-green/50",
          sizeClasses[size],
          variantClasses[variant],
          !isExpanded && "hidden",
          isExpanded && "animate-accordion-down",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

export { Accordion };
export default Accordion;
