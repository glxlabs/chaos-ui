import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  variant?: "default" | "brutalist";
  children: React.ReactNode;
}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = "vertical",
      spacing = "md",
      align = "stretch",
      justify = "start",
      wrap = false,
      variant = "default",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "flex",
      direction === "vertical" ? "flex-col" : "flex-row",
      wrap && "flex-wrap",
      variant === "brutalist" && "border-brutal border-cyber-green bg-cyber-dark p-brutal-4"
    );

    const spacingClasses = {
      none: direction === "vertical" ? "space-y-0" : "space-x-0",
      xs: direction === "vertical" ? "space-y-1" : "space-x-1",
      sm: direction === "vertical" ? "space-y-2" : "space-x-2",
      md: direction === "vertical" ? "space-y-4" : "space-x-4",
      lg: direction === "vertical" ? "space-y-6" : "space-x-6",
      xl: direction === "vertical" ? "space-y-8" : "space-x-8",
      "2xl": direction === "vertical" ? "space-y-12" : "space-x-12",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          spacingClasses[spacing],
          alignClasses[align],
          justifyClasses[justify],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

// HStack (Horizontal Stack) convenience component
export interface HStackProps extends Omit<StackProps, "direction"> {}

const HStack = forwardRef<HTMLDivElement, HStackProps>((props, ref) => {
  return <Stack ref={ref} direction="horizontal" {...props} />;
});

HStack.displayName = "HStack";

// VStack (Vertical Stack) convenience component
export interface VStackProps extends Omit<StackProps, "direction"> {}

const VStack = forwardRef<HTMLDivElement, VStackProps>((props, ref) => {
  return <Stack ref={ref} direction="vertical" {...props} />;
});

VStack.displayName = "VStack";

export { Stack, HStack, VStack };
export default Stack;
