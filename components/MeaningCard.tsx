"use client";
import { motion } from "framer-motion";

export default function MeaningCard({
  title,
  meaning,
  loading,
}: {
  title?: string;
  meaning?: string;
  loading?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="px-1"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="label">What it means</span>
        <div className="hair flex-1" />
      </div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {title ? (
            <h3 className="serif-italic mb-2 text-[17px] text-ink/90">
              {title}
            </h3>
          ) : null}
          <p
            className="text-[14px] font-light leading-[1.75] text-inkSoft"
            style={{ letterSpacing: "0.002em" }}
          >
            {meaning}
          </p>
        </>
      )}
    </motion.section>
  );
}

function Skeleton() {
  return (
    <div className="space-y-2">
      <div className="h-3 w-1/2 animate-pulse rounded bg-ink/5" />
      <div className="h-3 w-full animate-pulse rounded bg-ink/5" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-ink/5" />
    </div>
  );
}
