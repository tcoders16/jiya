"use client";
import { motion } from "framer-motion";
import JPLogo from "./JPLogo";

export default function TodayHeader({
  greeting,
  date,
}: {
  greeting: string;
  date: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-[60px] items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <JPLogo size={26} />
        <div className="flex flex-col">
          <span className="label">{greeting}</span>
          <span className="text-[13px] font-normal tracking-tight text-ink/90">
            {date}
          </span>
        </div>
      </div>
      <span className="serif-italic text-[15px] tracking-tight text-ink/80">
        Ehsaas
      </span>
    </motion.header>
  );
}
