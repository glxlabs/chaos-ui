import React, { forwardRef, useState } from "react";
import { User } from "lucide-react";
import { cn } from "../../utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "brutalist" | "square" | "rounded";
  fallback?: string;
  status?: "online" | "offline" | "away" | "busy" | "none";
  ring?: boolean;
  ringColor?: "green" | "magenta" | "white" | "red" | "blue";
  clickable?: boolean;
  loading?: boolean;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      size = "md",
      variant = "default",
      fallback,
      status = "none",
      ring = false,
      ringColor = "green",
      clickable = false,
      loading = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const sizeClasses = {
      xs: "w-6 h-6 text-xs",
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
      xl: "w-16 h-16 text-xl",
      "2xl": "w-20 h-20 text-2xl",
    };

    const variantClasses = {
      default: "rounded-full",
      brutalist: "rounded-none border-brutal border-cyber-green",
      square: "rounded-md",
      rounded: "rounded-lg",
    };

    const ringClasses = {
      green: "ring-2 ring-cyber-green ring-offset-2 ring-offset-cyber-black",
      magenta: "ring-2 ring-cyber-magenta ring-offset-2 ring-offset-cyber-black",
      white: "ring-2 ring-cyber-white ring-offset-2 ring-offset-cyber-black",
      red: "ring-2 ring-red-500 ring-offset-2 ring-offset-cyber-black",
      blue: "ring-2 ring-blue-500 ring-offset-2 ring-offset-cyber-black",
    };

    const statusClasses = {
      online: "bg-green-500",
      offline: "bg-cyber-gray",
      away: "bg-yellow-500",
      busy: "bg-red-500",
      none: "",
    };

    const baseClasses = cn(
      "relative inline-flex items-center justify-center overflow-hidden bg-cyber-dark",
      sizeClasses[size],
      variantClasses[variant],
      ring && ringClasses[ringColor],
      clickable && "cursor-pointer hover:opacity-80 transition-opacity",
      loading && "animate-pulse",
      className
    );

    const handleImageError = () => {
      setImageError(true);
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const shouldShowImage = src && !imageError && imageLoaded;
    const shouldShowFallback = fallback && (!src || imageError);

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {/* Image */}
        {src && !imageError && (
          <img
            src={src}
            alt={alt || "Avatar"}
            className={cn(
              "w-full h-full object-cover",
              variantClasses[variant],
              !imageLoaded && "opacity-0"
            )}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        )}

        {/* Fallback content */}
        {!shouldShowImage && (
          <div className="w-full h-full flex items-center justify-center">
            {shouldShowFallback ? (
              <span className="font-brutalist font-bold text-cyber-green">
                {getInitials(fallback)}
              </span>
            ) : (
              <User className="w-1/2 h-1/2 text-cyber-gray" />
            )}
          </div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-cyber-dark/50 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-cyber-green border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Status indicator */}
        {status !== "none" && (
          <div
            className={cn(
              "absolute rounded-full border-2 border-cyber-black",
              statusClasses[status],
              // Position based on size
              size === "xs" && "w-2 h-2 -bottom-0.5 -right-0.5",
              size === "sm" && "w-2.5 h-2.5 -bottom-0.5 -right-0.5",
              size === "md" && "w-3 h-3 -bottom-0.5 -right-0.5",
              size === "lg" && "w-3.5 h-3.5 -bottom-1 -right-1",
              size === "xl" && "w-4 h-4 -bottom-1 -right-1",
              size === "2xl" && "w-5 h-5 -bottom-1 -right-1"
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

// Avatar Group Component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  spacing?: "tight" | "normal" | "loose";
  showMore?: boolean;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      max = 5,
      size = "md",
      spacing = "normal",
      showMore = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const spacingClasses = {
      tight: "-space-x-1",
      normal: "-space-x-2",
      loose: "-space-x-3",
    };

    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;

    return (
      <div
        ref={ref}
        className={cn("flex items-center", spacingClasses[spacing], className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="relative">
            {React.cloneElement(child as React.ReactElement, {
              size,
              ring: true,
              ringColor: "green",
            })}
          </div>
        ))}

        {remainingCount > 0 && showMore && (
          <div
            className={cn(
              "relative inline-flex items-center justify-center bg-cyber-dark border-2 border-cyber-green text-cyber-green font-brutalist font-bold",
              size === "xs" && "w-6 h-6 text-xs",
              size === "sm" && "w-8 h-8 text-sm",
              size === "md" && "w-10 h-10 text-base",
              size === "lg" && "w-12 h-12 text-lg",
              size === "xl" && "w-16 h-16 text-xl",
              size === "2xl" && "w-20 h-20 text-2xl",
              "rounded-full"
            )}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export { Avatar };
export default Avatar;
