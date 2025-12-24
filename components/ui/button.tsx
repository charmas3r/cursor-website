"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-charcoal-900 text-white hover:bg-charcoal-800 focus:ring-charcoal-500",
      secondary:
        "bg-blush-400 text-white hover:bg-blush-500 focus:ring-blush-400",
      outline:
        "border-2 border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white focus:ring-charcoal-500",
      ghost:
        "text-charcoal-700 hover:bg-charcoal-100 hover:text-charcoal-900 focus:ring-charcoal-300",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-full",
      md: "px-6 py-3 text-base rounded-full",
      lg: "px-8 py-4 text-lg rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };

