"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconButton } from "./Button";

function IconArchive() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M6 8v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8M10 12h4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
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

export default function BottomActionRow() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-1 flex items-center justify-between gap-3"
    >
      <Link href="/archive" className="group flex-1">
        <motion.span
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="flex h-11 items-center justify-center gap-2 rounded-full border border-hair text-[12px] text-inkSoft transition-colors hover:border-ink/20 hover:text-ink"
        >
          <IconArchive />
          Archive
          <IconChevronRight />
        </motion.span>
      </Link>
      <IconButton href="/settings" ariaLabel="Settings" size={44}>
        <IconSettings />
      </IconButton>
    </motion.nav>
  );
}
