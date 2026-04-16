"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shayariData from "@/data/shayari.json";

export type Shayari = {
  id: string;
  text: string;
  translation: string;
  meaning: string;
};

type Props = {
  onShayariChange?: (shayari: Shayari) => void;
};

export default function ShayariRotator({ onShayariChange }: Props) {
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  const current = shayariData.shayari[idx % shayariData.shayari.length];

  useEffect(() => {
    onShayariChange?.(current);
  }, [idx, current]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIdx((i) => i + 1);
      setTimeLeft(120);
      return;
    }

    const t = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  return (
    <div className="px-1 py-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {/* Timer */}
          <div className="flex items-center justify-between">
            <span className="label">Today&apos;s Shayari</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-12 rounded-full bg-surface overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  animate={{ width: `${(timeLeft / 120) * 100}%` }}
                  transition={{ duration: 0.5, ease: "linear" }}
                />
              </div>
              <span className="text-[11px] text-inkSoft w-8 text-right">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Shayari Text */}
          <div className="space-y-2">
            <p className="serif italic text-[16px] leading-[1.6] text-ink">
              "{current.text}"
            </p>
            <p className="text-[13px] leading-[1.5] text-inkSoft">
              {current.translation}
            </p>
          </div>

          {/* Meaning */}
          <div className="rounded-lg bg-surface/50 p-3">
            <p className="text-[12px] leading-[1.5] text-inkSoft">
              {current.meaning}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                setIdx((i) => i - 1);
                setTimeLeft(120);
              }}
              className="flex-1 py-2 text-[12px] rounded-full border border-hair text-inkSoft hover:text-ink hover:border-ink/30 transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={() => {
                setIdx((i) => i + 1);
                setTimeLeft(120);
              }}
              className="flex-1 py-2 text-[12px] rounded-full border border-hair text-inkSoft hover:text-ink hover:border-ink/30 transition-colors"
            >
              Next →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
