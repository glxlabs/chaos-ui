import React, { forwardRef, useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  variant?: "default" | "brutalist" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  trigger?: "hover" | "click" | "focus";
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  arrow?: boolean;
  offset?: number;
  delay?: number;
  disabled?: boolean;
  modal?: boolean;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      content,
      side = "bottom",
      align = "center",
      variant = "default",
      size = "md",
      trigger = "click",
      closeOnOutsideClick = true,
      closeOnEscape = true,
      showCloseButton = false,
      arrow = true,
      offset = 8,
      delay = 0,
      disabled = false,
      modal = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const openPopover = () => {
      if (disabled) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setIsOpen(true);
          updatePosition();
        }, delay);
      } else {
        setIsOpen(true);
        requestAnimationFrame(updatePosition);
      }
    };

    const closePopover = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(false);
    };

    const updatePosition = () => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      let x = 0;
      let y = 0;

      // Calculate position based on side
      switch (side) {
        case "top":
          y = triggerRect.top - popoverRect.height - offset;
          break;
        case "bottom":
          y = triggerRect.bottom + offset;
          break;
        case "left":
          x = triggerRect.left - popoverRect.width - offset;
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
            x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
            break;
          case "end":
            x = triggerRect.right - popoverRect.width;
            break;
        }
      } else {
        switch (align) {
          case "start":
            y = triggerRect.top;
            break;
          case "center":
            y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
            break;
          case "end":
            y = triggerRect.bottom - popoverRect.height;
            break;
        }
      }

      // Keep popover within viewport
      x = Math.max(8, Math.min(x, viewport.width - popoverRect.width - 8));
      y = Math.max(8, Math.min(y, viewport.height - popoverRect.height - 8));

      setPosition({ x, y });
    };

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && closeOnEscape && isOpen) {
          closePopover();
        }
      };

      const handleOutsideClick = (e: MouseEvent) => {
        if (
          closeOnOutsideClick &&
          isOpen &&
          popoverRef.current &&
          triggerRef.current &&
          !popoverRef.current.contains(e.target as Node) &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          closePopover();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.addEventListener("mousedown", handleOutsideClick);

        if (modal) {
          document.body.style.overflow = "hidden";
        }
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("mousedown", handleOutsideClick);
        if (modal) {
          document.body.style.overflow = "unset";
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [isOpen, closeOnOutsideClick, closeOnEscape, modal]);

    const sizeClasses = {
      sm: "w-48 max-w-sm",
      md: "w-64 max-w-md",
      lg: "w-80 max-w-lg",
      xl: "w-96 max-w-xl",
    };

    const variantClasses = {
      default: "bg-cyber-dark border border-cyber-green text-cyber-white",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal text-cyber-white",
      glass: "bg-cyber-dark/90 backdrop-blur-md border border-cyber-green/50 text-cyber-white",
    };

    const arrowClasses = {
      top: "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-cyber-green",
      bottom:
        "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-cyber-green",
      left: "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-cyber-green",
      right:
        "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-cyber-green",
    };

    const popoverClasses = cn(
      "fixed z-50 rounded-lg p-4 shadow-lg transition-all duration-200",
      sizeClasses[size],
      variantClasses[variant],
      isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
      className
    );

    const triggerProps = {
      ...(trigger === "hover" && {
        onMouseEnter: openPopover,
        onMouseLeave: closePopover,
      }),
      ...(trigger === "click" && {
        onClick: () => {
          if (isOpen) {
            closePopover();
          } else {
            openPopover();
          }
        },
      }),
      ...(trigger === "focus" && {
        onFocus: openPopover,
        onBlur: closePopover,
      }),
    };

    return (
      <div ref={ref} className="relative inline-block" {...props}>
        <div ref={triggerRef} {...triggerProps}>
          {children}
        </div>

        {modal && isOpen && (
          <div className="fixed inset-0 z-40 bg-cyber-black/60 backdrop-blur-sm" />
        )}

        <div
          ref={popoverRef}
          className={popoverClasses}
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {showCloseButton && (
            <button
              onClick={closePopover}
              className={cn(
                "absolute top-2 right-2 p-1 rounded-md transition-colors",
                "hover:bg-cyber-white/10 text-cyber-gray hover:text-cyber-white"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {content}

          {arrow && <div className={cn("absolute w-0 h-0 border-4", arrowClasses[side])} />}
        </div>
      </div>
    );
  }
);

Popover.displayName = "Popover";

// Popover Content Component for better composition
export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    );
  }
);

PopoverContent.displayName = "PopoverContent";

// Popover Header Component
export interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PopoverHeader = forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("pb-2 border-b border-cyber-green/20", className)} {...props}>
        {children}
      </div>
    );
  }
);

PopoverHeader.displayName = "PopoverHeader";

// Popover Title Component
export interface PopoverTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          "text-sm font-brutalist font-bold uppercase tracking-wide text-cyber-green",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

PopoverTitle.displayName = "PopoverTitle";

export { Popover };
export default Popover;
