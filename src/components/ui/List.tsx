import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  variant?: "default" | "brutalist" | "clean" | "spaced";
  size?: "sm" | "md" | "lg";
  ordered?: boolean;
  marker?: "bullet" | "number" | "dash" | "arrow" | "none";
  children: React.ReactNode;
}

const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  (
    {
      variant = "default",
      size = "md",
      ordered = false,
      marker = "bullet",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const variantClasses = {
      default: "space-y-2",
      brutalist: "space-y-3 border-l-4 border-cyber-green pl-4",
      clean: "space-y-1",
      spaced: "space-y-4",
    };

    const markerClasses = {
      bullet: "list-disc list-inside",
      number: "list-decimal list-inside",
      dash: "list-none",
      arrow: "list-none",
      none: "list-none",
    };

    const baseClasses = cn(
      "text-cyber-white",
      sizeClasses[size],
      variantClasses[variant],
      !ordered && markerClasses[marker],
      ordered && "list-decimal list-inside",
      className
    );

    const Component = ordered ? "ol" : "ul";

    return (
      <Component ref={ref as any} className={baseClasses} {...props}>
        {marker === "dash" || marker === "arrow"
          ? React.Children.map(children, child => (
              <li className="flex items-start gap-2">
                <span className="text-cyber-green font-bold mt-1">
                  {marker === "dash" ? "–" : "→"}
                </span>
                <span className="flex-1">{child}</span>
              </li>
            ))
          : children}
      </Component>
    );
  }
);

List.displayName = "List";

// List Item Component
export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, active = false, disabled = false, icon, className = "", ...props }, ref) => {
    const baseClasses = cn(
      "text-cyber-white transition-colors",
      active && "text-cyber-green bg-cyber-green/10 px-2 py-1 rounded",
      disabled && "text-cyber-gray cursor-not-allowed",
      !disabled && "hover:text-cyber-green",
      className
    );

    return (
      <li ref={ref} className={baseClasses} {...props}>
        {icon ? (
          <div className="flex items-center gap-2">
            <span className="text-cyber-green">{icon}</span>
            {children}
          </div>
        ) : (
          children
        )}
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

// Description List Component
export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  children: React.ReactNode;
  variant?: "default" | "brutalist" | "horizontal";
  size?: "sm" | "md" | "lg";
}

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ children, variant = "default", size = "md", className = "", ...props }, ref) => {
    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const variantClasses = {
      default: "space-y-3",
      brutalist: "space-y-4 border-l-4 border-cyber-green pl-4",
      horizontal: "space-y-2",
    };

    const baseClasses = cn(
      "text-cyber-white",
      sizeClasses[size],
      variantClasses[variant],
      variant === "horizontal" && "grid grid-cols-1 md:grid-cols-2 gap-4",
      className
    );

    return (
      <dl ref={ref} className={baseClasses} {...props}>
        {children}
      </dl>
    );
  }
);

DescriptionList.displayName = "DescriptionList";

// Description Term Component
export interface DescriptionTermProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const DescriptionTerm = forwardRef<HTMLElement, DescriptionTermProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <dt
        ref={ref}
        className={cn(
          "font-brutalist font-bold uppercase tracking-wide text-cyber-green mb-1",
          className
        )}
        {...props}
      >
        {children}
      </dt>
    );
  }
);

DescriptionTerm.displayName = "DescriptionTerm";

// Description Details Component
export interface DescriptionDetailsProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const DescriptionDetails = forwardRef<HTMLElement, DescriptionDetailsProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <dd ref={ref} className={cn("text-cyber-white", className)} {...props}>
        {children}
      </dd>
    );
  }
);

DescriptionDetails.displayName = "DescriptionDetails";

// Interactive List Component
export interface InteractiveListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "brutalist" | "cards";
  selectable?: boolean;
  hoverable?: boolean;
}

export const InteractiveList = forwardRef<HTMLDivElement, InteractiveListProps>(
  (
    {
      children,
      variant = "default",
      selectable = false,
      hoverable = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "divide-y divide-cyber-green/20",
      brutalist: "space-y-2",
      cards: "space-y-3",
    };

    const baseClasses = cn(
      "w-full",
      variantClasses[variant],
      variant === "brutalist" && "border border-cyber-green bg-cyber-dark",
      className
    );

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={cn(
              "transition-colors",
              variant === "cards" && "p-4 border border-cyber-green/20 rounded bg-cyber-dark/50",
              variant === "brutalist" && "p-3 border-b border-cyber-green/20 last:border-b-0",
              variant === "default" && "py-3 px-4",
              hoverable && "hover:bg-cyber-green/5",
              selectable && "cursor-pointer hover:bg-cyber-green/10"
            )}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);

InteractiveList.displayName = "InteractiveList";

export { List };
export default List;
