"use client";
import { motion } from "framer-motion";

export default function OriginalPoemCard({
  title,
  poem,
}: {
  title: string;
  poem: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="card relative overflow-hidden p-7"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="label">Today</span>
        <div className="hair flex-1" />
        <span className="serif-italic text-[13px] text-inkSoft">{title}</span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="serif whitespace-pre-line text-[22px] leading-[1.55] text-ink"
        style={{ letterSpacing: "-0.005em" }}
      >
        {poem}
      </motion.p>
    </motion.section>
  );
}
