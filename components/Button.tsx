"use client";
import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "ghost" | "quiet";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors select-none";

const variants: Record<Variant, string> = {
  // Bone-on-black primary — the one "loud" action
  primary:
    "bg-ink text-bg border border-ink hover:bg-ink/90",
  // Hairline outline, subtle text — for secondary actions
  ghost:
    "border border-hair text-inkSoft hover:text-ink hover:border-ink/20",
  // Pure text, no border — for tertiary links
  quiet: "text-mute hover:text-inkSoft",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[11px]",
  md: "h-10 px-4 text-[12px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = CommonProps &
  Omit<HTMLMotionProps<"button">, "children" | "className">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "ghost", size = "sm", className = "", children, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
});

type LinkButtonProps = CommonProps & {
  href: string;
  ariaLabel?: string;
};

export function LinkButton({
  variant = "ghost",
  size = "sm",
  className = "",
  href,
  ariaLabel,
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} aria-label={ariaLabel}>
      <motion.span
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        style={{ display: "inline-flex" }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

// Circular icon-only button (same sizing family)
export function IconButton({
  href,
  onClick,
  ariaLabel,
  children,
  size = 36,
}: {
  href?: string;
  onClick?: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  size?: number;
}) {
  const inner = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="inline-flex items-center justify-center rounded-full border border-hair text-inkSoft transition-colors hover:border-ink/20 hover:text-ink"
      style={{ width: size, height: size }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.span>
  );
  if (href) return <Link href={href} aria-label={ariaLabel}>{inner}</Link>;
  return (
    <button onClick={onClick} aria-label={ariaLabel} className="contents">
      {inner}
    </button>
  );
}
