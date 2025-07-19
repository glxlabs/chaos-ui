import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brutalist" | "ghost" | "bordered";
  size?: "sm" | "md" | "lg" | "xl";
  shadow?: "none" | "brutal" | "magenta" | "white" | "black";
  hover?: boolean;
  glitchOnHover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      size = "md",
      shadow = "brutal",
      hover = false,
      glitchOnHover = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "bg-cyber-dark border-cyber-green transition-all duration-200",
      hover && "cursor-pointer",
      glitchOnHover && "hover:animate-glitch"
    );

    const sizeClasses = {
      sm: "p-brutal-3",
      md: "p-brutal-4",
      lg: "p-brutal-6",
      xl: "p-brutal-8",
    };

    const shadowClasses = {
      none: "shadow-none",
      brutal: "shadow-brutal",
      magenta: "shadow-brutal-magenta",
      white: "shadow-brutal-white",
      black: "shadow-brutal-black",
    };

    const variantClasses = {
      default: cn("border-brutal", hover && "hover:shadow-brutal-hover hover:-translate-y-1"),
      brutalist: cn("border-brutal-thick", hover && "hover:shadow-brutal-lg hover:-translate-y-1"),
      ghost: cn("border-0 bg-transparent", hover && "hover:bg-cyber-dark/50"),
      bordered: cn(
        "border-brutal border-cyber-green bg-cyber-black",
        hover && "hover:border-cyber-green-bright hover:shadow-brutal-hover"
      ),
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          shadowClasses[shadow],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5 pb-brutal-4 border-b border-cyber-green/20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// Card Title Component
export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ children, level = 3, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-lg font-brutalist font-bold uppercase tracking-wide text-cyber-green",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardTitle.displayName = "CardTitle";

// Card Description Component
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm text-cyber-gray", className)} {...props}>
        {children}
      </p>
    );
  }
);

CardDescription.displayName = "CardDescription";

// Card Content Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("pt-brutal-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center pt-brutal-4 border-t border-cyber-green/20", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;
