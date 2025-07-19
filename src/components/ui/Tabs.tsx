import React, { forwardRef, useState, createContext, useContext } from "react";
import { cn } from "../../utils/cn";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "brutalist" | "underline" | "pills";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: "horizontal" | "vertical";
  variant: "default" | "brutalist" | "underline" | "pills";
  size: "sm" | "md" | "lg";
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue = "",
      value,
      onValueChange,
      orientation = "horizontal",
      variant = "default",
      size = "md",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const currentValue = value ?? internalValue;
    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const contextValue: TabsContextValue = {
      value: currentValue,
      onValueChange: handleValueChange,
      orientation,
      variant,
      size,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("w-full", orientation === "vertical" && "flex gap-4", className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

// Tabs List Component
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className = "", ...props }, ref) => {
    const { orientation, variant } = useTabs();

    const baseClasses = cn(
      "flex",
      orientation === "horizontal" ? "flex-row" : "flex-col",
      variant === "default" && "bg-cyber-dark border border-cyber-green rounded-lg p-1",
      variant === "brutalist" && "bg-cyber-dark border-brutal border-cyber-green shadow-brutal p-1",
      variant === "underline" && "border-b border-cyber-green/30",
      variant === "pills" && "gap-2",
      className
    );

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

TabsList.displayName = "TabsList";

// Tabs Trigger Component
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, disabled = false, icon, className = "", ...props }, ref) => {
    const { value: currentValue, onValueChange, orientation, variant, size } = useTabs();
    const isActive = currentValue === value;

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };

    const variantClasses = {
      default: cn(
        "rounded-md transition-all duration-200",
        isActive
          ? "bg-cyber-green text-cyber-black shadow-sm"
          : "hover:bg-cyber-green/10 text-cyber-white hover:text-cyber-green"
      ),
      brutalist: cn(
        "rounded-md transition-all duration-200",
        isActive
          ? "bg-cyber-green text-cyber-black border-brutal shadow-brutal"
          : "hover:bg-cyber-green/10 text-cyber-white hover:text-cyber-green border-transparent"
      ),
      underline: cn(
        "border-b-2 transition-all duration-200",
        isActive
          ? "border-cyber-green text-cyber-green"
          : "border-transparent hover:border-cyber-green/50 text-cyber-white hover:text-cyber-green"
      ),
      pills: cn(
        "rounded-full transition-all duration-200",
        isActive
          ? "bg-cyber-green text-cyber-black"
          : "bg-cyber-dark border border-cyber-green/30 hover:bg-cyber-green/10 text-cyber-white hover:text-cyber-green"
      ),
    };

    const baseClasses = cn(
      "flex items-center justify-center gap-2 font-brutalist font-semibold uppercase tracking-wide",
      "focus:outline-none focus:ring-2 focus:ring-cyber-green/50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      orientation === "vertical" && "justify-start",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={() => onValueChange(value)}
        className={baseClasses}
        {...props}
      >
        {icon && <span className="w-4 h-4">{icon}</span>}
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

// Tabs Content Component
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  forceMount?: boolean;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, forceMount = false, className = "", ...props }, ref) => {
    const { value: currentValue, orientation } = useTabs();
    const isActive = currentValue === value;

    if (!isActive && !forceMount) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "focus:outline-none focus:ring-2 focus:ring-cyber-green/50",
          orientation === "vertical" && "flex-1",
          !isActive && "hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs };
export default Tabs;
