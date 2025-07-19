import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brutalist" | "shimmer";
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  animated?: boolean;
  lines?: number;
  avatar?: boolean;
  pulse?: boolean;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "default",
      width,
      height,
      rounded = "sm",
      animated = true,
      lines = 1,
      avatar = false,
      pulse = false,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    const baseClasses = cn(
      "bg-cyber-gray/20",
      variant === "brutalist" && "border-brutal border-cyber-green/30 bg-cyber-dark",
      variant === "shimmer" &&
        "bg-gradient-to-r from-cyber-gray/10 via-cyber-green/10 to-cyber-gray/10 bg-size-200 animate-shimmer",
      animated && variant === "default" && "animate-pulse",
      pulse && "animate-pulse-brutal",
      roundedClasses[rounded],
      className
    );

    const avatarClasses = cn("w-12 h-12 rounded-full", baseClasses);

    const defaultStyle = {
      width: width || (avatar ? "48px" : "100%"),
      height: height || (avatar ? "48px" : "20px"),
      ...style,
    };

    if (avatar) {
      return <div ref={ref} className={avatarClasses} {...props} />;
    }

    if (lines > 1) {
      return (
        <div ref={ref} className="space-y-2" {...props}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(baseClasses, index === lines - 1 && "w-3/4")}
              style={{
                width: index === lines - 1 ? "75%" : width || "100%",
                height: height || "16px",
              }}
            />
          ))}
        </div>
      );
    }

    return <div ref={ref} className={baseClasses} style={defaultStyle} {...props} />;
  }
);

Skeleton.displayName = "Skeleton";

// Convenience components for common patterns
export interface SkeletonTextProps extends Omit<SkeletonProps, "lines"> {
  lines?: number;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>((props, ref) => {
  return <Skeleton ref={ref} {...props} />;
});

SkeletonText.displayName = "SkeletonText";

export interface SkeletonAvatarProps extends Omit<SkeletonProps, "avatar"> {
  size?: "sm" | "md" | "lg" | "xl";
}

export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: { width: "32px", height: "32px" },
      md: { width: "48px", height: "48px" },
      lg: { width: "64px", height: "64px" },
      xl: { width: "80px", height: "80px" },
    };

    return <Skeleton ref={ref} avatar rounded="full" style={sizeClasses[size]} {...props} />;
  }
);

SkeletonAvatar.displayName = "SkeletonAvatar";

export { Skeleton };
export default Skeleton;
