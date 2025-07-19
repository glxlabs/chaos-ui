import React, { forwardRef, useEffect, useState } from "react";
import { X, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  title?: string;
  description?: string;
  duration?: number;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  brutalist?: boolean;
  glitchOnShow?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = "default",
      title,
      description,
      duration = 5000,
      showIcon = true,
      closable = true,
      onClose,
      position = "top-right",
      brutalist = true,
      glitchOnShow = false,
      action,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration]);

    const handleClose = () => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 150);
    };

    const getIcon = () => {
      const iconClasses = "w-5 h-5";
      switch (variant) {
        case "success":
          return <CheckCircle className={cn(iconClasses, "text-green-500")} />;
        case "warning":
          return <AlertTriangle className={cn(iconClasses, "text-yellow-500")} />;
        case "error":
          return <XCircle className={cn(iconClasses, "text-red-500")} />;
        case "info":
          return <Info className={cn(iconClasses, "text-blue-500")} />;
        default:
          return <Info className={cn(iconClasses, "text-cyber-green")} />;
      }
    };

    const variantClasses = {
      default: "bg-cyber-dark border-cyber-green text-cyber-white",
      success: "bg-cyber-dark border-green-500 text-cyber-white",
      warning: "bg-cyber-dark border-yellow-500 text-cyber-white",
      error: "bg-cyber-dark border-red-500 text-cyber-white",
      info: "bg-cyber-dark border-blue-500 text-cyber-white",
    };

    const positionClasses = {
      "top-right": "fixed top-4 right-4",
      "top-left": "fixed top-4 left-4",
      "bottom-right": "fixed bottom-4 right-4",
      "bottom-left": "fixed bottom-4 left-4",
      "top-center": "fixed top-4 left-1/2 -translate-x-1/2",
      "bottom-center": "fixed bottom-4 left-1/2 -translate-x-1/2",
    };

    const baseClasses = cn(
      "z-50 min-w-[320px] max-w-md p-4 rounded-md shadow-lg transition-all duration-300",
      brutalist && "border-brutal shadow-brutal",
      variantClasses[variant],
      positionClasses[position],
      isExiting && "animate-slide-out-right opacity-0",
      !isExiting && "animate-slide-in-right",
      glitchOnShow && "animate-glitch-brutal",
      className
    );

    if (!isVisible) return null;

    return (
      <div ref={ref} className={baseClasses} {...props}>
        <div className="flex items-start gap-3">
          {showIcon && <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>}

          <div className="flex-1 min-w-0">
            {title && (
              <div className="font-brutalist font-bold text-sm uppercase tracking-wide mb-1">
                {title}
              </div>
            )}
            {description && <div className="text-sm text-cyber-gray mb-2">{description}</div>}
            {children}

            {action && (
              <div className="mt-3">
                <button
                  onClick={action.onClick}
                  className={cn(
                    "text-sm font-mono font-bold px-3 py-1 rounded border transition-colors",
                    brutalist && "border-brutal",
                    variant === "default" &&
                      "border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-cyber-black",
                    variant === "success" &&
                      "border-green-500 text-green-500 hover:bg-green-500 hover:text-cyber-black",
                    variant === "warning" &&
                      "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-cyber-black",
                    variant === "error" &&
                      "border-red-500 text-red-500 hover:bg-red-500 hover:text-cyber-black",
                    variant === "info" &&
                      "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-cyber-black"
                  )}
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>

          {closable && (
            <button
              onClick={handleClose}
              className={cn(
                "flex-shrink-0 p-1 rounded transition-colors",
                "hover:bg-cyber-white/10 text-cyber-gray hover:text-cyber-white"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = "Toast";

// Toast Provider Context for managing multiple toasts
export interface ToastContextType {
  addToast: (toast: Omit<ToastProps, "onClose">) => void;
  removeToast: (id: string) => void;
  toasts: Array<ToastProps & { id: string }>;
}

export const ToastContext = React.createContext<ToastContextType | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children, maxToasts = 5 }) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const addToast = (toast: Omit<ToastProps, "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    setToasts(prev => {
      const newToasts = [newToast, ...prev];
      return newToasts.slice(0, maxToasts);
    });
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <div className="fixed inset-0 pointer-events-none z-50">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook to use toast functionality
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export { Toast };
export default Toast;
