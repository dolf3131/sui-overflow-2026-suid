"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-none border-2 border-[color:var(--border)] font-semibold tracking-normal transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] disabled:opacity-50 disabled:pointer-events-none active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:var(--shadow-sm)]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] [box-shadow:var(--shadow)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:[box-shadow:var(--shadow-lg)] active:bg-[color:var(--primary)]/90",
  secondary:
    "bg-[color:var(--surface)] text-[color:var(--foreground)] [box-shadow:var(--shadow)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:[box-shadow:var(--shadow-lg)] active:bg-[color:var(--surface)]/90",
  ghost:
    "border-transparent bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--surface)] hover:translate-x-[-1px] hover:translate-y-[-1px]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  children,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

export function ButtonLink({
  className,
  href,
  variant = "primary",
  size = "md",
  ...props
}: React.ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
