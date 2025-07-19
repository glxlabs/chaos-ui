import React, { forwardRef, useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delay?: number;
  duration?: number;
  variant?: "default" | "brutalist" | "dark";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  arrow?: boolean;
  offset?: number;
  trigger?: "hover" | "click" | "focus";
  closeOnClick?: boolean;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      side = "top",
      align = "center",
      delay = 0,
      duration = 200,
      variant = "default",
      size = "md",
      disabled = false,
      arrow = true,
      offset = 8,
      trigger = "hover",
      closeOnClick = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const showTooltip = () => {
      if (disabled) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(true);
          updatePosition();
        }, delay);
      } else {
        setIsVisible(true);
        updatePosition();
      }
    };

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    const updatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = 0;
      let y = 0;

      // Calculate position based on side
      switch (side) {
        case "top":
          y = triggerRect.top - tooltipRect.height - offset;
          break;
        case "bottom":
          y = triggerRect.bottom + offset;
          break;
        case "left":
          x = triggerRect.left - tooltipRect.width - offset;
          break;
        case "right":
          x = triggerRect.right + offset;
          break;
      }

      // Calculate position based on alignment
      if (side === "top" || side === "bottom") {
        switch (align) {
          case "start":
            x = triggerRect.left;
            break;
          case "center":
            x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
            break;
          case "end":
            x = triggerRect.right - tooltipRect.width;
            break;
        }
      } else {
        switch (align) {
          case "start":
            y = triggerRect.top;
            break;
          case "center":
            y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
            break;
          case "end":
            y = triggerRect.bottom - tooltipRect.height;
            break;
        }
      }

      setPosition({ x, y });
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
    };

    const variantClasses = {
      default: "bg-cyber-dark border border-cyber-green text-cyber-white",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal text-cyber-white",
      dark: "bg-cyber-black border border-cyber-green/50 text-cyber-white",
    };

    const arrowClasses = {
      top: "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-cyber-green",
      bottom:
        "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-cyber-green",
      left: "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-cyber-green",
      right:
        "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-cyber-green",
    };

    const tooltipClasses = cn(
      "absolute z-50 rounded-md font-mono transition-all duration-200",
      "pointer-events-none select-none",
      sizeClasses[size],
      variantClasses[variant],
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
      className
    );

    const triggerProps = {
      ...(trigger === "hover" && {
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
      }),
      ...(trigger === "click" && {
        onClick: () => {
          if (isVisible && closeOnClick) {
            hideTooltip();
          } else {
            showTooltip();
          }
        },
      }),
      ...(trigger === "focus" && {
        onFocus: showTooltip,
        onBlur: hideTooltip,
      }),
    };

    return (
      <div ref={ref} className="relative inline-block" {...props}>
        <div ref={triggerRef} {...triggerProps}>
          {children}
        </div>

        {isVisible && (
          <div
            ref={tooltipRef}
            className={tooltipClasses}
            style={{
              left: position.x,
              top: position.y,
              transitionDuration: `${duration}ms`,
            }}
          >
            {content}
            {arrow && <div className={cn("absolute w-0 h-0 border-4", arrowClasses[side])} />}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

// Tooltip Provider for managing global tooltip behavior
export interface TooltipProviderProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delay = 0,
  duration = 200,
}) => {
  return (
    <div
      style={
        {
          "--tooltip-delay": `${delay}ms`,
          "--tooltip-duration": `${duration}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export { Tooltip };
export default Tooltip;
