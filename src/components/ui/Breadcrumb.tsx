import React, { forwardRef } from "react";
import { ChevronRight, Home, Slash } from "lucide-react";
import { cn } from "../../utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  current?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  variant?: "default" | "brutalist" | "minimal" | "pills";
  size?: "sm" | "md" | "lg";
  separator?: "chevron" | "slash" | "dot" | "arrow" | React.ReactNode;
  showHome?: boolean;
  maxItems?: number;
  showItemsIndicator?: boolean;
  clickable?: boolean;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      variant = "default",
      size = "md",
      separator = "chevron",
      showHome = false,
      maxItems = 0,
      showItemsIndicator = true,
      clickable = true,
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

    const separatorSizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    const variantClasses = {
      default: "bg-cyber-dark/30 border border-cyber-green/20 px-3 py-2 rounded",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal px-4 py-2",
      minimal: "bg-transparent",
      pills: "bg-cyber-dark/50 border border-cyber-green/10 px-3 py-2 rounded-full",
    };

    const getSeparatorIcon = () => {
      const iconClasses = cn("text-cyber-gray", separatorSizeClasses[size]);

      switch (separator) {
        case "chevron":
          return <ChevronRight className={iconClasses} />;
        case "slash":
          return <Slash className={iconClasses} />;
        case "dot":
          return <span className="text-cyber-gray mx-1">•</span>;
        case "arrow":
          return <span className="text-cyber-gray mx-1">→</span>;
        default:
          return typeof separator === "string" ? (
            <span className="text-cyber-gray mx-1">{separator}</span>
          ) : (
            separator
          );
      }
    };

    const processedItems = React.useMemo(() => {
      let finalItems = [...items];

      // Add home item if requested
      if (showHome && finalItems.length > 0 && !finalItems[0].icon) {
        finalItems = [
          { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
          ...finalItems,
        ];
      }

      // Handle maxItems truncation
      if (maxItems > 0 && finalItems.length > maxItems) {
        const start = finalItems.slice(0, 1);
        const end = finalItems.slice(-2);
        const truncatedItems = [...start, { label: "...", disabled: true }, ...end];
        return truncatedItems;
      }

      return finalItems;
    }, [items, showHome, maxItems]);

    const baseClasses = cn(
      "flex items-center gap-2 text-cyber-white",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => {
      const isLast = index === processedItems.length - 1;
      const isClickable = clickable && !item.disabled && !isLast && item.href;

      const itemClasses = cn(
        "flex items-center gap-2 transition-colors",
        isLast ? "text-cyber-green font-semibold" : "text-cyber-white",
        isClickable && "hover:text-cyber-green cursor-pointer",
        item.disabled && "text-cyber-gray cursor-not-allowed",
        item.current && "text-cyber-green font-semibold"
      );

      const content = (
        <>
          {item.icon && (
            <span className={cn("flex-shrink-0", isLast && "text-cyber-green")}>{item.icon}</span>
          )}
          <span className="font-mono">{item.label}</span>
        </>
      );

      if (isClickable) {
        return (
          <a
            key={index}
            href={item.href}
            className={itemClasses}
            onClick={e => {
              if (item.disabled) {
                e.preventDefault();
              }
            }}
          >
            {content}
          </a>
        );
      }

      return (
        <span key={index} className={itemClasses}>
          {content}
        </span>
      );
    };

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={baseClasses} {...props}>
        <ol className="flex items-center gap-2">
          {processedItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {renderBreadcrumbItem(item, index)}
              {index < processedItems.length - 1 && (
                <span className="flex-shrink-0" aria-hidden="true">
                  {getSeparatorIcon()}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

// Breadcrumb Builder Component
export interface BreadcrumbBuilderProps extends Omit<BreadcrumbProps, "items"> {
  children: React.ReactNode;
}

export const BreadcrumbBuilder = forwardRef<HTMLElement, BreadcrumbBuilderProps>(
  ({ children, ...props }, ref) => {
    const items = React.Children.toArray(children).map((child, index) => {
      if (React.isValidElement(child) && child.type === BreadcrumbItemComponent) {
        return child.props as BreadcrumbItem;
      }
      return { label: `Item ${index + 1}`, href: "#" };
    });

    return <Breadcrumb ref={ref} items={items} {...props} />;
  }
);

BreadcrumbBuilder.displayName = "BreadcrumbBuilder";

// Individual Breadcrumb Item Component (for builder pattern)
export interface BreadcrumbItemComponentProps extends BreadcrumbItem {
  children?: React.ReactNode;
}

export const BreadcrumbItemComponent = forwardRef<HTMLSpanElement, BreadcrumbItemComponentProps>(
  ({ children, label, ...props }, ref) => {
    return (
      <span ref={ref} {...props}>
        {children || label}
      </span>
    );
  }
);

BreadcrumbItemComponent.displayName = "BreadcrumbItem";

// Simple Breadcrumb Component
export interface SimpleBreadcrumbProps extends Omit<BreadcrumbProps, "items"> {
  paths: string[];
  baseUrl?: string;
}

export const SimpleBreadcrumb = forwardRef<HTMLElement, SimpleBreadcrumbProps>(
  ({ paths, baseUrl = "", ...props }, ref) => {
    const items = paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      href:
        index === paths.length - 1
          ? undefined
          : `${baseUrl}/${paths.slice(0, index + 1).join("/")}`,
      current: index === paths.length - 1,
    }));

    return <Breadcrumb ref={ref} items={items} {...props} />;
  }
);

SimpleBreadcrumb.displayName = "SimpleBreadcrumb";

// Breadcrumb with Dropdown Component
export interface BreadcrumbDropdownProps extends BreadcrumbProps {
  dropdownItems?: BreadcrumbItem[];
}

export const BreadcrumbDropdown = forwardRef<HTMLElement, BreadcrumbDropdownProps>(
  ({ dropdownItems = [], items, ...props }, ref) => {
    const [showDropdown] = React.useState(false);

    const processedItems = React.useMemo(() => {
      if (dropdownItems.length === 0) return items;

      const truncatedItems = [...items];
      if (truncatedItems.length > 3) {
        const start = truncatedItems.slice(0, 1);
        const end = truncatedItems.slice(-2);
        const dropdownItem = {
          label: "...",
          disabled: true,
        };
        return [...start, dropdownItem, ...end];
      }
      return truncatedItems;
    }, [items, dropdownItems]);

    return (
      <div className="relative">
        <Breadcrumb ref={ref} items={processedItems} {...props} />

        {dropdownItems.length > 0 && showDropdown && (
          <div className="absolute top-full left-0 mt-2 bg-cyber-dark border border-cyber-green rounded shadow-brutal z-10">
            <div className="py-2">
              {dropdownItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-cyber-white hover:bg-cyber-green/10 hover:text-cyber-green transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

BreadcrumbDropdown.displayName = "BreadcrumbDropdown";

export { Breadcrumb };
export default Breadcrumb;
