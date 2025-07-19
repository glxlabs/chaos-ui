import React, { forwardRef } from "react";
import { Search, FileX, Inbox, AlertCircle, Plus, RefreshCw } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "./Button";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: "default" | "brutalist" | "minimal" | "error";
  size?: "sm" | "md" | "lg";
  illustration?: "search" | "empty" | "error" | "inbox" | "custom";
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      title,
      description,
      icon,
      variant = "default",
      size = "md",
      illustration = "empty",
      actions,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "py-8 px-4",
      md: "py-12 px-6",
      lg: "py-16 px-8",
    };

    const iconSizeClasses = {
      sm: "w-12 h-12",
      md: "w-16 h-16",
      lg: "w-20 h-20",
    };

    const titleSizeClasses = {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
    };

    const descriptionSizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const variantClasses = {
      default: "bg-cyber-dark/30 border border-cyber-green/20",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal",
      minimal: "bg-transparent",
      error: "bg-red-500/10 border border-red-500/20",
    };

    const getDefaultIcon = () => {
      const iconClasses = cn(
        "text-cyber-gray",
        iconSizeClasses[size],
        variant === "error" && "text-red-500"
      );

      switch (illustration) {
        case "search":
          return <Search className={iconClasses} />;
        case "empty":
          return <FileX className={iconClasses} />;
        case "error":
          return <AlertCircle className={iconClasses} />;
        case "inbox":
          return <Inbox className={iconClasses} />;
        default:
          return <FileX className={iconClasses} />;
      }
    };

    const baseClasses = cn(
      "flex flex-col items-center justify-center text-center rounded-lg",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {/* Icon */}
        <div className="mb-4">{icon || getDefaultIcon()}</div>

        {/* Title */}
        <h3
          className={cn(
            "font-brutalist font-bold uppercase tracking-wide mb-2",
            titleSizeClasses[size],
            variant === "error" ? "text-red-500" : "text-cyber-green"
          )}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className={cn("text-cyber-gray mb-6 max-w-md", descriptionSizeClasses[size])}>
            {description}
          </p>
        )}

        {/* Children content */}
        {children && <div className="mb-6">{children}</div>}

        {/* Actions */}
        {actions && <div className="flex flex-wrap gap-3 justify-center">{actions}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

// Pre-built Empty State variants
export interface EmptySearchProps extends Omit<EmptyStateProps, "illustration" | "icon"> {
  searchTerm?: string;
  onClear?: () => void;
}

export const EmptySearch = forwardRef<HTMLDivElement, EmptySearchProps>(
  ({ title = "No results found", description, searchTerm, onClear, actions, ...props }, ref) => {
    const defaultDescription = searchTerm
      ? `No results found for "${searchTerm}". Try adjusting your search terms.`
      : "No results found. Try adjusting your search terms.";

    const defaultActions = onClear ? (
      <Button variant="ghost" onClick={onClear}>
        Clear Search
      </Button>
    ) : null;

    return (
      <EmptyState
        ref={ref}
        title={title}
        description={description || defaultDescription}
        illustration="search"
        actions={actions || defaultActions}
        {...props}
      />
    );
  }
);

EmptySearch.displayName = "EmptySearch";

export interface EmptyDataProps extends Omit<EmptyStateProps, "illustration" | "icon"> {
  resource?: string;
  onCreate?: () => void;
  onRefresh?: () => void;
}

export const EmptyData = forwardRef<HTMLDivElement, EmptyDataProps>(
  ({ title, description, resource = "items", onCreate, onRefresh, actions, ...props }, ref) => {
    const defaultTitle = title || `No ${resource} found`;
    const defaultDescription =
      description ||
      `You haven't created any ${resource} yet. Get started by creating your first one.`;

    const defaultActions = (
      <div className="flex gap-3">
        {onCreate && (
          <Button variant="primary" onClick={onCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Create {resource}
          </Button>
        )}
        {onRefresh && (
          <Button variant="ghost" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        )}
      </div>
    );

    return (
      <EmptyState
        ref={ref}
        title={defaultTitle}
        description={defaultDescription}
        illustration="empty"
        actions={actions || defaultActions}
        {...props}
      />
    );
  }
);

EmptyData.displayName = "EmptyData";

export interface EmptyErrorProps
  extends Omit<EmptyStateProps, "illustration" | "icon" | "variant"> {
  error?: string;
  onRetry?: () => void;
}

export const EmptyError = forwardRef<HTMLDivElement, EmptyErrorProps>(
  ({ title = "Something went wrong", description, error, onRetry, actions, ...props }, ref) => {
    const defaultDescription =
      description || error || "An error occurred while loading the data. Please try again.";

    const defaultActions = onRetry ? (
      <Button variant="primary" onClick={onRetry}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    ) : null;

    return (
      <EmptyState
        ref={ref}
        title={title}
        description={defaultDescription}
        illustration="error"
        variant="error"
        actions={actions || defaultActions}
        {...props}
      />
    );
  }
);

EmptyError.displayName = "EmptyError";

export { EmptyState };
export default EmptyState;
