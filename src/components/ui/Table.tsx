import React, { forwardRef, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: "default" | "brutalist" | "striped" | "borderless";
  size?: "sm" | "md" | "lg";
  stickyHeader?: boolean;
  hoverable?: boolean;
  children: React.ReactNode;
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      variant = "default",
      size = "md",
      stickyHeader = false,
      hoverable = false,
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
      default: "bg-cyber-dark border border-cyber-green",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal",
      striped: "bg-cyber-dark border border-cyber-green",
      borderless: "bg-cyber-dark",
    };

    const baseClasses = cn(
      "w-full border-collapse",
      sizeClasses[size],
      variantClasses[variant],
      hoverable && "hover:shadow-lg transition-shadow",
      className
    );

    return (
      <div className={cn("overflow-x-auto", stickyHeader && "max-h-96 overflow-y-auto")}>
        <table ref={ref} className={baseClasses} {...props}>
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

// Table Header Component
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
  sticky?: boolean;
}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, sticky = false, className = "", ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          "bg-cyber-dark border-b border-cyber-green",
          sticky && "sticky top-0 z-10",
          className
        )}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = "TableHeader";

// Table Body Component
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
  striped?: boolean;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, striped = false, className = "", ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(striped && "[&>tr:nth-child(even)]:bg-cyber-dark/50", className)}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";

// Table Row Component
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  selected?: boolean;
  hoverable?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, selected = false, hoverable = false, className = "", ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-cyber-green/20",
          selected && "bg-cyber-green/10",
          hoverable && "hover:bg-cyber-green/5 transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

// Table Head Cell Component
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, sortable = false, sortDirection = null, onSort, className = "", ...props }, ref) => {
    const baseClasses = cn(
      "px-4 py-3 text-left font-brutalist font-bold uppercase tracking-wide text-cyber-green",
      sortable && "cursor-pointer hover:bg-cyber-green/10 transition-colors",
      className
    );

    const handleClick = () => {
      if (sortable && onSort) {
        onSort();
      }
    };

    return (
      <th ref={ref} className={baseClasses} onClick={handleClick} {...props}>
        <div className="flex items-center gap-2">
          {children}
          {sortable && (
            <div className="flex flex-col">
              <ChevronUp
                className={cn(
                  "w-3 h-3 transition-colors",
                  sortDirection === "asc" ? "text-cyber-green" : "text-cyber-gray"
                )}
              />
              <ChevronDown
                className={cn(
                  "w-3 h-3 -mt-1 transition-colors",
                  sortDirection === "desc" ? "text-cyber-green" : "text-cyber-gray"
                )}
              />
            </div>
          )}
        </div>
      </th>
    );
  }
);

TableHead.displayName = "TableHead";

// Table Cell Component
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  numeric?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, numeric = false, className = "", ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn("px-4 py-3 text-cyber-white", numeric && "text-right font-mono", className)}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

// Table Footer Component
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn("bg-cyber-dark border-t border-cyber-green", className)}
        {...props}
      >
        {children}
      </tfoot>
    );
  }
);

TableFooter.displayName = "TableFooter";

// Sortable Table Hook
export const useSortableTable = <T,>(data: T[], key: keyof T) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [sortedData, setSortedData] = useState<T[]>(data);

  const handleSort = () => {
    let newDirection: "asc" | "desc" | null = "asc";

    if (sortDirection === "asc") {
      newDirection = "desc";
    } else if (sortDirection === "desc") {
      newDirection = null;
    }

    setSortDirection(newDirection);

    if (newDirection === null) {
      setSortedData(data);
    } else {
      const sorted = [...data].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue < bValue) return newDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return newDirection === "asc" ? 1 : -1;
        return 0;
      });
      setSortedData(sorted);
    }
  };

  return { sortedData, sortDirection, handleSort };
};

export { Table };
export default Table;
