"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PoemEntry } from "@/lib/poem-store";
import { prettyDate } from "@/lib/date";

export default function ArchiveList({ poems }: { poems: PoemEntry[] }) {
  return (
    <ul className="mt-3 divide-y divide-hair">
      {poems.map((p, i) => (
        <motion.li
          key={p.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: Math.min(i * 0.06, 0.3),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link href={`/poem/${p.id}`} className="block py-5">
            <div className="mb-2 flex items-center gap-3">
              <span className="label">{prettyDate(p.date)}</span>
              <div className="hair flex-1" />
            </div>
            <div className="serif mb-1 text-[20px] leading-tight text-ink">
              {p.title}
            </div>
            <p className="serif-italic line-clamp-2 whitespace-pre-line text-[14px] leading-[1.55] text-inkSoft">
              {p.originalPoem}
            </p>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
