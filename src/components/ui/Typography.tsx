import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "blockquote"
    | "code"
    | "lead"
    | "large"
    | "small"
    | "muted";
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "semibold" | "bold" | "black";
  brutalist?: boolean;
  glitchOnHover?: boolean;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (
    {
      variant = "p",
      size,
      weight,
      brutalist = false,
      glitchOnHover = false,
      children,
      className = "",
      as,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "text-cyber-white",
      brutalist && "font-brutalist",
      glitchOnHover && "hover:animate-rgb-split"
    );

    const variantClasses = {
      h1: "text-4xl md:text-6xl font-black uppercase tracking-tighter text-cyber-green",
      h2: "text-3xl md:text-5xl font-black uppercase tracking-tighter text-cyber-green",
      h3: "text-2xl md:text-4xl font-black uppercase tracking-tight text-cyber-green",
      h4: "text-xl md:text-3xl font-bold uppercase tracking-tight text-cyber-green",
      h5: "text-lg md:text-2xl font-bold uppercase tracking-wide text-cyber-green",
      h6: "text-base md:text-xl font-bold uppercase tracking-wide text-cyber-green",
      p: "text-base leading-relaxed",
      blockquote: "border-l-4 border-cyber-green pl-6 italic text-cyber-gray",
      code: "font-mono text-sm bg-cyber-dark px-2 py-1 border border-cyber-green text-cyber-green",
      lead: "text-lg md:text-xl leading-relaxed text-cyber-gray",
      large: "text-lg font-semibold",
      small: "text-sm text-cyber-gray",
      muted: "text-sm text-cyber-gray",
    };

    const sizeClasses = size
      ? {
          sm: "text-sm",
          base: "text-base",
          lg: "text-lg",
          xl: "text-xl",
          "2xl": "text-2xl",
          "3xl": "text-3xl",
          "4xl": "text-4xl",
        }[size]
      : "";

    const weightClasses = weight
      ? {
          normal: "font-normal",
          medium: "font-medium",
          semibold: "font-semibold",
          bold: "font-bold",
          black: "font-black",
        }[weight]
      : "";

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses, weightClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
export default Typography;
