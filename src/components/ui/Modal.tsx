import React, { forwardRef, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "brutalist" | "glass";
  showCloseButton?: boolean;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  backdrop?: "blur" | "dark" | "none";
  animation?: "fade" | "slide" | "glitch";
  children: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size = "md",
      variant = "default",
      showCloseButton = true,
      closeOnOverlay = true,
      closeOnEscape = true,
      backdrop = "blur",
      animation = "fade",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && closeOnEscape) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, closeOnEscape, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlay && e.target === e.currentTarget) {
        onClose();
      }
    };

    if (!isOpen) return null;

    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-full mx-4",
    };

    const backdropClasses = {
      blur: "backdrop-blur-sm bg-cyber-black/80",
      dark: "bg-cyber-black/90",
      none: "bg-transparent",
    };

    const animationClasses = {
      fade: "animate-fade-in",
      slide: "animate-slide-in-bottom",
      glitch: "animate-glitch-in",
    };

    const variantClasses = {
      default: "bg-cyber-dark border-cyber-green text-cyber-white",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal",
      glass: "bg-cyber-dark/90 backdrop-blur-md border-cyber-green/50",
    };

    const overlayClasses = cn(
      "fixed inset-0 z-50 flex items-center justify-center p-4",
      backdropClasses[backdrop],
      animationClasses[animation]
    );

    const modalClasses = cn(
      "relative w-full border rounded-lg shadow-lg",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    return (
      <div className={overlayClasses} onClick={handleOverlayClick}>
        <div ref={ref} className={modalClasses} onClick={e => e.stopPropagation()} {...props}>
          {showCloseButton && (
            <button
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4 p-2 rounded-md transition-colors",
                "hover:bg-cyber-white/10 text-cyber-gray hover:text-cyber-white"
              )}
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

// Modal Header Component
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6 border-b border-cyber-green/20", className)} {...props}>
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = "ModalHeader";

// Modal Title Component
export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "text-xl font-brutalist font-bold uppercase tracking-wide text-cyber-green",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

ModalTitle.displayName = "ModalTitle";

// Modal Description Component
export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const ModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm text-cyber-gray mt-2", className)} {...props}>
        {children}
      </p>
    );
  }
);

ModalDescription.displayName = "ModalDescription";

// Modal Content Component
export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6", className)} {...props}>
        {children}
      </div>
    );
  }
);

ModalContent.displayName = "ModalContent";

// Modal Footer Component
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-6 border-t border-cyber-green/20 flex items-center justify-end space-x-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = "ModalFooter";

export { Modal };
export default Modal;
