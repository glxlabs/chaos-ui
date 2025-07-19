import React, { forwardRef } from "react";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  brutalist?: boolean;
  dismissible?: boolean;
  glitchOnHover?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "default",
      size = "md",
      brutalist = true,
      dismissible = false,
      glitchOnHover = false,
      onDismiss,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "relative flex items-start gap-3 font-mono transition-all duration-200",
      brutalist && "border-brutal",
      glitchOnHover && "hover:animate-glitch"
    );

    const sizeClasses = {
      sm: "p-brutal-3 text-sm",
      md: "p-brutal-4 text-base",
      lg: "p-brutal-6 text-lg",
    };

    const variantClasses = {
      default: cn(
        "bg-cyber-dark text-cyber-white border-cyber-green",
        brutalist && "shadow-brutal"
      ),
      success: cn(
        "bg-cyber-green/10 text-cyber-green border-cyber-green",
        brutalist && "shadow-brutal"
      ),
      warning: cn(
        "bg-brutal-yellow/10 text-brutal-yellow border-brutal-yellow",
        brutalist && "shadow-brutal-black"
      ),
      error: cn(
        "bg-brutal-red/10 text-brutal-red border-brutal-red",
        brutalist && "shadow-brutal-black"
      ),
      info: cn(
        "bg-brutal-blue/10 text-brutal-blue border-brutal-blue",
        brutalist && "shadow-brutal-black"
      ),
    };

    const getIcon = () => {
      const iconClasses = "w-5 h-5 flex-shrink-0 mt-0.5";

      switch (variant) {
        case "success":
          return <CheckCircle className={iconClasses} />;
        case "warning":
          return <AlertTriangle className={iconClasses} />;
        case "error":
          return <AlertCircle className={iconClasses} />;
        case "info":
          return <Info className={iconClasses} />;
        default:
          return <Info className={iconClasses} />;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        {...props}
      >
        {getIcon()}

        <div className="flex-1 min-w-0">{children}</div>

        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-current hover:opacity-75 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

// Alert Title Component
export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn(
          "font-brutalist font-bold uppercase tracking-wide text-current mb-1",
          className
        )}
        {...props}
      >
        {children}
      </h4>
    );
  }
);

AlertTitle.displayName = "AlertTitle";

// Alert Description Component
export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm opacity-90", className)} {...props}>
        {children}
      </p>
    );
  }
);

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
export default Alert;
