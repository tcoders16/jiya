"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { JiyaPhoto } from "@/lib/getTodayPhoto";

export default function JiyaPhotoBlock({
  photo,
  label = "A Soft Glimpse",
}: {
  photo: JiyaPhoto | null;
  label?: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className="relative overflow-hidden rounded-[20px]"
        style={{
          aspectRatio: "4 / 5",
          border: "1px solid var(--hair)",
          background: "var(--surface)",
        }}
      >
        <div className="absolute left-4 top-4 z-10 label">{label}</div>

        {photo && !errored ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="(max-width: 420px) 100vw, 420px"
            className="object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          <PlaceholderArt />
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,10,8,0) 0%, rgba(12,10,8,0.85) 100%)",
          }}
        />

        {photo?.caption ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5"
          >
            <p
              className="serif-italic text-[15px] leading-[1.5] text-ink/95"
              style={{ letterSpacing: "-0.005em" }}
            >
              {photo.caption}
            </p>
          </motion.div>
        ) : null}
      </div>
    </motion.section>
  );
}

function PlaceholderArt() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 80% at 20% 10%, rgba(212,165,116,0.18), transparent 60%), linear-gradient(160deg, #1C1815 0%, #15120E 100%)",
      }}
    >
      <div className="flex h-full items-center justify-center">
        <div className="serif-italic text-center text-[13px] text-inkSoft/70">
          A quiet space
          <br />
          for a soft photo.
        </div>
      </div>
    </div>
  );
}
