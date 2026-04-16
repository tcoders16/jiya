"use client";
import { motion } from "framer-motion";

export default function ForHerCard({
  line,
  loading,
}: {
  line?: string;
  loading?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="px-1"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="label" style={{ color: "var(--accent)" }}>
          For you
        </span>
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, rgba(212,165,116,0.4), rgba(212,165,116,0) 60%)",
          }}
        />
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-ink/5" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-ink/5" />
        </div>
      ) : (
        <p
          className="serif-italic text-[20px] leading-[1.5] text-ink"
          style={{ letterSpacing: "-0.003em" }}
        >
          &ldquo;{line}&rdquo;
        </p>
      )}
    </motion.section>
  );
}
