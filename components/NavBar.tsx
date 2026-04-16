"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IconButton } from "./Button";

function IconChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NavBar({
  label,
  title,
  rightHref,
  rightLabel,
  backHref,
}: {
  label: string;
  title: string;
  rightHref?: string;
  rightLabel?: string;
  backHref?: string;
}) {
  const router = useRouter();

  const onBack = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  const onForward = () => {
    if (rightHref) router.push(rightHref);
    else router.forward();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-[60px] items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <IconButton ariaLabel="Back" onClick={onBack}>
          <IconChevronLeft />
        </IconButton>
        <div className="flex flex-col">
          <span className="label">{label}</span>
          <span className="serif-italic text-[15px] leading-tight text-ink/90">
            {title}
          </span>
        </div>
      </div>

      {rightHref ? (
        <motion.span
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          onClick={onForward}
          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-hair px-3 text-[11px] text-inkSoft transition-colors hover:border-ink/20 hover:text-ink"
          role="button"
          aria-label={rightLabel}
        >
          {rightLabel}
          <IconChevronRight />
        </motion.span>
      ) : null}
    </motion.header>
  );
}
