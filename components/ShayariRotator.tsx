"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import shayariData from "@/data/shayari.json";

export type Shayari = {
  id: string;
  text: string;
  translation: string;
  meaning: string;
};

// 5 Jiya photos cycle with each shayari
const PHOTOS = [
  "/images/jiya/jiya-001.jpg",
  "/images/jiya/jiya-002.jpg",
  "/images/jiya/jiya-003.jpg",
  "/images/jiya/jiya-004.jpg",
  "/images/jiya/jiya-005.jpg",
];

type Props = {
  onShayariChange?: (shayari: Shayari) => void;
};

export default function ShayariRotator({ onShayariChange }: Props) {
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  const total = shayariData.shayari.length;
  const current = shayariData.shayari[((idx % total) + total) % total];
  const photo = PHOTOS[((idx % PHOTOS.length) + PHOTOS.length) % PHOTOS.length];

  useEffect(() => {
    onShayariChange?.(current);
  }, [idx]);

  // Countdown timer
  useEffect(() => {
    setTimeLeft(120);
  }, [idx]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIdx((i) => i + 1);
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const goNext = () => setIdx((i) => i + 1);
  const goPrev = () => setIdx((i) => i - 1);

  return (
    <div className="px-1">
      {/* Section label + timer */}
      <div className="mb-3 flex items-center justify-between">
        <span className="label">Shayari</span>
        <div className="flex items-center gap-2">
          <div className="h-1 w-14 rounded-full bg-surface overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: `${(timeLeft / 120) * 100}%` }}
              transition={{ duration: 0.8, ease: "linear" }}
            />
          </div>
          <span className="tabular-nums text-[11px] text-inkSoft w-7 text-right">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden border border-hair bg-surface"
        >
          {/* Photo */}
          <div className="relative w-full overflow-hidden bg-surface">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={photo}
                  alt="Jiya"
                  width={900}
                  height={1200}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 480px) 100vw, 480px"
                  priority={idx < 2}
                />
              </motion.div>
            </AnimatePresence>
            {/* Index pill */}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm">
              <span className="text-[10px] text-ink/70 tabular-nums">
                {((idx % total) + total) % total + 1} / {total}
              </span>
            </div>
          </div>

          {/* Shayari text */}
          <div className="p-4 space-y-3">
            <p
              className="serif italic text-[18px] leading-[1.65] text-ink"
              style={{ letterSpacing: "0.01em" }}
            >
              "{current.text}"
            </p>
            <p className="text-[12px] leading-[1.5] text-inkSoft">
              {current.translation}
            </p>

            {/* Meaning accordion */}
            <div className="rounded-xl bg-bg/60 border border-hair px-3 py-2.5">
              <p className="text-[11.5px] leading-[1.55] text-inkSoft">
                {current.meaning}
              </p>
            </div>

            {/* Nav */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={goPrev}
                className="flex-1 py-2.5 rounded-full border border-hair text-[12px] text-inkSoft hover:text-ink hover:border-ink/30 active:scale-95 transition-all"
              >
                ← Prev
              </button>
              <button
                onClick={goNext}
                className="flex-1 py-2.5 rounded-full border border-hair text-[12px] text-inkSoft hover:text-ink hover:border-ink/30 active:scale-95 transition-all"
              >
                Next →
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
