import React, { forwardRef, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "../../utils/cn";

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "default" | "brutalist" | "minimal" | "pills";
  size?: "sm" | "md" | "lg";
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showInfo?: boolean;
  showSiblings?: number;
  showEllipsis?: boolean;
  disabled?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      variant = "default",
      size = "md",
      showFirstLast = true,
      showPrevNext = true,
      showInfo = false,
      showSiblings = 1,
      showEllipsis = true,
      disabled = false,
      totalItems,
      itemsPerPage = 10,
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

    const buttonSizeClasses = {
      sm: "h-8 px-3",
      md: "h-10 px-4",
      lg: "h-12 px-5",
    };

    const iconSizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    const variantClasses = {
      default: "bg-cyber-dark border border-cyber-green/20",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal",
      minimal: "bg-transparent",
      pills: "bg-cyber-dark/50 border border-cyber-green/10 rounded-full",
    };

    const buttonVariantClasses = {
      default: "border border-cyber-green/20 hover:border-cyber-green hover:bg-cyber-green/10",
      brutalist: "border-brutal border-cyber-green hover:shadow-brutal hover:bg-cyber-green/10",
      minimal: "border-none hover:bg-cyber-green/10",
      pills: "border border-cyber-green/10 rounded-full hover:bg-cyber-green/10",
    };

    const pageNumbers = useMemo(() => {
      const pages: (number | string)[] = [];
      const start = Math.max(1, currentPage - showSiblings);
      const end = Math.min(totalPages, currentPage + showSiblings);

      // Add first page
      if (start > 1) {
        pages.push(1);
        if (showEllipsis && start > 2) {
          pages.push("...");
        }
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add last page
      if (end < totalPages) {
        if (showEllipsis && end < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }

      return pages;
    }, [currentPage, totalPages, showSiblings, showEllipsis]);

    const handlePageChange = (page: number) => {
      if (disabled || page < 1 || page > totalPages || page === currentPage) return;
      onPageChange(page);
    };

    const renderPageButton = (page: number | string, index: number) => {
      const isEllipsis = page === "...";
      const isActive = page === currentPage;
      const pageNumber = typeof page === "number" ? page : 0;

      const buttonClasses = cn(
        "inline-flex items-center justify-center font-mono font-semibold transition-colors",
        buttonSizeClasses[size],
        sizeClasses[size],
        buttonVariantClasses[variant],
        isActive && "bg-cyber-green text-cyber-black",
        isEllipsis && "cursor-default border-none",
        disabled && "opacity-50 cursor-not-allowed",
        !isActive && !isEllipsis && "text-cyber-white hover:text-cyber-green",
        variant === "pills" && "rounded-full"
      );

      if (isEllipsis) {
        return (
          <span key={index} className={buttonClasses}>
            <MoreHorizontal className={iconSizeClasses[size]} />
          </span>
        );
      }

      return (
        <button
          key={index}
          onClick={() => handlePageChange(pageNumber)}
          disabled={disabled || isActive}
          className={buttonClasses}
          aria-label={`Go to page ${page}`}
          aria-current={isActive ? "page" : undefined}
        >
          {page}
        </button>
      );
    };

    const renderNavigationButton = (
      type: "first" | "prev" | "next" | "last",
      icon: React.ReactNode,
      targetPage: number,
      label: string
    ) => {
      const isDisabled =
        disabled ||
        (type === "first" && currentPage === 1) ||
        (type === "prev" && currentPage === 1) ||
        (type === "next" && currentPage === totalPages) ||
        (type === "last" && currentPage === totalPages);

      const buttonClasses = cn(
        "inline-flex items-center justify-center font-mono font-semibold transition-colors text-cyber-white",
        buttonSizeClasses[size],
        sizeClasses[size],
        buttonVariantClasses[variant],
        isDisabled ? "opacity-50 cursor-not-allowed" : "hover:text-cyber-green",
        variant === "pills" && "rounded-full"
      );

      return (
        <button
          onClick={() => handlePageChange(targetPage)}
          disabled={isDisabled}
          className={buttonClasses}
          aria-label={label}
        >
          {icon}
        </button>
      );
    };

    const getInfoText = () => {
      if (!totalItems) return null;

      const startItem = (currentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(currentPage * itemsPerPage, totalItems);

      return `Showing ${startItem}-${endItem} of ${totalItems} items`;
    };

    const baseClasses = cn("flex items-center justify-between gap-2", sizeClasses[size], className);

    const paginationClasses = cn(
      "flex items-center gap-1",
      variantClasses[variant],
      variant !== "minimal" && "p-1 rounded"
    );

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {showInfo && <div className="text-cyber-gray font-mono text-sm">{getInfoText()}</div>}

        <nav aria-label="Pagination navigation" className={paginationClasses}>
          {showFirstLast &&
            renderNavigationButton(
              "first",
              <ChevronsLeft className={iconSizeClasses[size]} />,
              1,
              "Go to first page"
            )}

          {showPrevNext &&
            renderNavigationButton(
              "prev",
              <ChevronLeft className={iconSizeClasses[size]} />,
              currentPage - 1,
              "Go to previous page"
            )}

          {pageNumbers.map((page, index) => renderPageButton(page, index))}

          {showPrevNext &&
            renderNavigationButton(
              "next",
              <ChevronRight className={iconSizeClasses[size]} />,
              currentPage + 1,
              "Go to next page"
            )}

          {showFirstLast &&
            renderNavigationButton(
              "last",
              <ChevronsRight className={iconSizeClasses[size]} />,
              totalPages,
              "Go to last page"
            )}
        </nav>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

// Simple Pagination Component
export interface SimplePaginationProps extends Omit<PaginationProps, "totalPages"> {
  totalItems: number;
  itemsPerPage: number;
}

export const SimplePagination = forwardRef<HTMLDivElement, SimplePaginationProps>(
  ({ totalItems, itemsPerPage, ...props }, ref) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <Pagination
        ref={ref}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        {...props}
      />
    );
  }
);

SimplePagination.displayName = "SimplePagination";

// Pagination with Page Size Selector
export interface PaginationWithSizeProps extends PaginationProps {
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
}

export const PaginationWithSize = forwardRef<HTMLDivElement, PaginationWithSizeProps>(
  ({ pageSizeOptions = [10, 20, 50, 100], onPageSizeChange, itemsPerPage = 10, ...props }, ref) => {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-cyber-gray font-mono text-sm">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={e => onPageSizeChange?.(parseInt(e.target.value))}
            className="bg-cyber-dark border border-cyber-green/20 text-cyber-white px-3 py-1 rounded font-mono text-sm"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <Pagination ref={ref} itemsPerPage={itemsPerPage} {...props} />
      </div>
    );
  }
);

PaginationWithSize.displayName = "PaginationWithSize";

// Compact Pagination Component
export interface CompactPaginationProps
  extends Omit<PaginationProps, "showFirstLast" | "showSiblings" | "showEllipsis"> {
  showLabel?: boolean;
}

export const CompactPagination = forwardRef<HTMLDivElement, CompactPaginationProps>(
  ({ showLabel = true, ...props }, ref) => {
    const { currentPage, totalPages } = props;

    return (
      <div className="flex items-center justify-between gap-4">
        {showLabel && (
          <div className="text-cyber-gray font-mono text-sm">
            Page {currentPage} of {totalPages}
          </div>
        )}

        <Pagination
          ref={ref}
          showFirstLast={false}
          showSiblings={0}
          showEllipsis={false}
          showInfo={false}
          {...props}
        />
      </div>
    );
  }
);

CompactPagination.displayName = "CompactPagination";

// Pagination Hook
export const usePagination = (
  totalItems: number,
  itemsPerPage: number = 10,
  initialPage: number = 1
) => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);
  const [pageSize, setPageSize] = React.useState(itemsPerPage);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const getPageData = <T,>(data: T[]) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    totalPages,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    getPageData,
  };
};

export { Pagination };
export default Pagination;
