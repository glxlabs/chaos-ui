import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rows?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
  variant?: "default" | "brutalist";
  children: React.ReactNode;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols = 1,
      rows,
      gap = "md",
      responsive = true,
      variant = "default",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "grid",
      variant === "brutalist" && "p-brutal-4 border-brutal border-cyber-green bg-cyber-dark"
    );

    const colsClasses = {
      1: responsive ? "grid-cols-1" : "grid-cols-1",
      2: responsive ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2",
      3: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-3",
      4: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-4",
      5: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-5" : "grid-cols-5",
      6: responsive ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-6" : "grid-cols-6",
      7: responsive ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-7" : "grid-cols-7",
      8: responsive ? "grid-cols-1 md:grid-cols-4 lg:grid-cols-8" : "grid-cols-8",
      9: responsive ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-9" : "grid-cols-9",
      10: responsive ? "grid-cols-1 md:grid-cols-5 lg:grid-cols-10" : "grid-cols-10",
      11: responsive ? "grid-cols-1 md:grid-cols-5 lg:grid-cols-11" : "grid-cols-11",
      12: responsive ? "grid-cols-1 md:grid-cols-6 lg:grid-cols-12" : "grid-cols-12",
    };

    const rowsClasses = rows
      ? {
          1: "grid-rows-1",
          2: "grid-rows-2",
          3: "grid-rows-3",
          4: "grid-rows-4",
          5: "grid-rows-5",
          6: "grid-rows-6",
        }[rows]
      : "";

    const gapClasses = {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn(baseClasses, colsClasses[cols], rowsClasses, gapClasses[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

// Grid Item Component
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: "default" | "brutalist";
  children: React.ReactNode;
}

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      colSpan,
      rowSpan,
      colStart,
      rowStart,
      variant = "default",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      variant === "brutalist" && "border-brutal border-cyber-green bg-cyber-dark p-brutal-3"
    );

    const colSpanClasses = colSpan
      ? {
          1: "col-span-1",
          2: "col-span-2",
          3: "col-span-3",
          4: "col-span-4",
          5: "col-span-5",
          6: "col-span-6",
          7: "col-span-7",
          8: "col-span-8",
          9: "col-span-9",
          10: "col-span-10",
          11: "col-span-11",
          12: "col-span-12",
        }[colSpan]
      : "";

    const rowSpanClasses = rowSpan
      ? {
          1: "row-span-1",
          2: "row-span-2",
          3: "row-span-3",
          4: "row-span-4",
          5: "row-span-5",
          6: "row-span-6",
        }[rowSpan]
      : "";

    const colStartClasses = colStart
      ? {
          1: "col-start-1",
          2: "col-start-2",
          3: "col-start-3",
          4: "col-start-4",
          5: "col-start-5",
          6: "col-start-6",
          7: "col-start-7",
          8: "col-start-8",
          9: "col-start-9",
          10: "col-start-10",
          11: "col-start-11",
          12: "col-start-12",
        }[colStart]
      : "";

    const rowStartClasses = rowStart
      ? {
          1: "row-start-1",
          2: "row-start-2",
          3: "row-start-3",
          4: "row-start-4",
          5: "row-start-5",
          6: "row-start-6",
        }[rowStart]
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          colSpanClasses,
          rowSpanClasses,
          colStartClasses,
          rowStartClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = "GridItem";

export { Grid, GridItem };
export default Grid;
