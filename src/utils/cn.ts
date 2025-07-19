import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const brutalVariants = {
  size: {
    sm: "px-brutal-3 py-brutal-2 text-sm",
    md: "px-brutal-4 py-brutal-3 text-base",
    lg: "px-brutal-6 py-brutal-4 text-lg",
    xl: "px-brutal-8 py-brutal-6 text-xl",
  },
  shadow: {
    none: "shadow-none",
    brutal: "shadow-brutal",
    magenta: "shadow-brutal-magenta",
    white: "shadow-brutal-white",
    black: "shadow-brutal-black",
    lg: "shadow-brutal-lg",
    xl: "shadow-brutal-xl",
    hover: "shadow-brutal-hover",
    inset: "shadow-brutal-inset",
  },
  border: {
    none: "border-0",
    thin: "border",
    brutal: "border-brutal",
    thick: "border-brutal-thick",
    extra: "border-brutal-extra",
  },
  animation: {
    none: "",
    glitch: "hover:animate-glitch",
    "rgb-split": "hover:animate-rgb-split",
    pulse: "hover:animate-pulse-cyber",
    shake: "hover:animate-shake",
    bounce: "hover:animate-bounce-brutal",
  },
};

export const getBrutalClasses = (variant: keyof typeof brutalVariants, value: string) => {
  return brutalVariants[variant][value as keyof (typeof brutalVariants)[typeof variant]] || "";
};

export const createBrutalClass = (
  base: string,
  variant?: string,
  size?: string,
  shadow?: string,
  animation?: string
) => {
  return cn(
    base,
    variant,
    size && getBrutalClasses("size", size),
    shadow && getBrutalClasses("shadow", shadow),
    animation && getBrutalClasses("animation", animation)
  );
};
