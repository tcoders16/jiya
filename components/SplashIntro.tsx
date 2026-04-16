"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 6-second editorial splash — logo is the hero, visible from t=0.
 *
 * Timeline:
 *   0.00 – 1.20  JP tile reveals (scale 0.7→1, blur 14→0, y 20→0)
 *   0.30 – 1.30  JP italic serif letters fade + rise inside tile
 *   0.80 – 2.40  Thin ring draws around the tile (pathLength)
 *   1.20 – 2.60  Specular sweep across tile
 *   0.60 – 6.00  Warm champagne bloom breathes (loop)
 *   2.00 – 2.90  Four corner hairline marks grow outward
 *   2.80 – 3.50  Hairline rule expands under tile
 *   3.20 – 4.20  "Ehsaas" letters stagger up from mask
 *   4.00 – 5.00  "For Jiya" letter-spacing eases in
 *   5.00 – 5.50  Hold
 *   5.50 – 6.00  Stage exits (scale 1.04 + blur + fade)
 */
const TOTAL_MS = 6000;

export default function SplashIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ehsaas:splash:seen")) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("ehsaas:splash:seen", "1");
      setShow(false);
    }, TOTAL_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{
            background:
              "radial-gradient(130% 90% at 50% 30%, #1E1812 0%, #100D0A 55%, #070604 100%)",
          }}
        >
          <div className="noise" aria-hidden />

          <CornerMarks />

          <motion.div
            exit={{
              scale: 1.04,
              transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            }}
            className="relative flex h-full w-full flex-col items-center justify-center gap-7"
          >
            <Tile />
            <Divider />
            <Wordmark />
            <ForJiya />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------- TILE --------------------------------- */

function Tile() {
  const TILE = 132;
  return (
    <motion.div
      // Logo is the FIRST thing — starts animating at t=0.
      initial={{ opacity: 0, y: 20, scale: 0.7, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ width: TILE, height: TILE }}
    >
      {/* warm champagne bloom — breathes for entire splash */}
      <motion.div
        aria-hidden
        className="absolute -inset-16 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.0, 0.35, 0.55, 0.4, 0.55, 0.35] }}
        transition={{
          duration: 5.4,
          delay: 0.2,
          ease: "easeInOut",
          times: [0, 0.15, 0.35, 0.55, 0.75, 1],
        }}
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,165,116,0.35), transparent 70%)",
          filter: "blur(26px)",
          zIndex: -1,
        }}
      />

      <svg viewBox="0 0 132 132" width={TILE} height={TILE}>
        <defs>
          <linearGradient id="sp-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5EFE4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F5EFE4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sp-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4A574" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4A574" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F5EFE4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sp-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F5EFE4" stopOpacity="0" />
            <stop offset="50%" stopColor="#F5EFE4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F5EFE4" stopOpacity="0" />
          </linearGradient>
          <clipPath id="tile-clip">
            <rect x="4" y="4" width="124" height="124" rx="30" ry="30" />
          </clipPath>
        </defs>

        {/* tile surface */}
        <rect x="4" y="4" width="124" height="124" rx="30" ry="30" fill="#14110E" />
        <rect
          x="4.5"
          y="4.5"
          width="123"
          height="123"
          rx="29.5"
          ry="29.5"
          fill="none"
          stroke="url(#sp-rim)"
          strokeWidth="1"
        />

        {/* ring that draws around the tile */}
        <motion.rect
          x="4"
          y="4"
          width="124"
          height="124"
          rx="30"
          ry="30"
          fill="none"
          stroke="url(#sp-ring)"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* JP monogram */}
        <motion.text
          x="66"
          y="72"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'Instrument Serif', Georgia, 'Times New Roman', serif"
          fontSize="80"
          fontStyle="italic"
          fontWeight="400"
          fill="#F5EFE4"
          style={{ letterSpacing: "-0.04em" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          JP
        </motion.text>

        {/* specular sweep */}
        <g clipPath="url(#tile-clip)">
          <motion.rect
            x="-60"
            y="0"
            width="80"
            height="132"
            fill="url(#sp-sweep)"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 160, opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.4, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ mixBlendMode: "screen" }}
          />
        </g>
      </svg>
    </motion.div>
  );
}

/* ------------------------------ CORNER MARKS ------------------------------ */

function CornerMarks() {
  const mark = "rgba(245,239,228,0.22)";
  const inset = 30;
  const len = 14;
  const t = { duration: 0.9, delay: 2.0, ease: [0.22, 1, 0.36, 1] };

  const H = (pos: React.CSSProperties, origin: "left" | "right") => (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={t}
      style={{
        position: "absolute",
        ...pos,
        width: len,
        height: 1,
        background: mark,
        transformOrigin: `${origin} center`,
      }}
    />
  );
  const V = (pos: React.CSSProperties, origin: "top" | "bottom") => (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={t}
      style={{
        position: "absolute",
        ...pos,
        width: 1,
        height: len,
        background: mark,
        transformOrigin: `center ${origin}`,
      }}
    />
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {H({ top: inset, left: inset }, "left")}
      {V({ top: inset, left: inset }, "top")}
      {H({ top: inset, right: inset }, "right")}
      {V({ top: inset, right: inset }, "top")}
      {H({ bottom: inset, left: inset }, "left")}
      {V({ bottom: inset, left: inset }, "bottom")}
      {H({ bottom: inset, right: inset }, "right")}
      {V({ bottom: inset, right: inset }, "bottom")}
    </div>
  );
}

/* -------------------------------- DIVIDER -------------------------------- */

function Divider() {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 60, opacity: 1 }}
      transition={{ duration: 0.9, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-px"
      style={{
        background:
          "linear-gradient(90deg, rgba(245,239,228,0) 0%, rgba(245,239,228,0.5) 50%, rgba(245,239,228,0) 100%)",
      }}
    />
  );
}

/* -------------------------------- WORDMARK -------------------------------- */

function Wordmark() {
  const letters = "Ehsaas".split("");
  return (
    <div className="relative overflow-hidden px-2">
      <h1
        className="serif flex text-[52px] leading-none text-ink"
        style={{ letterSpacing: "0.015em" }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1.0,
              delay: 3.2 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {ch}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}

/* -------------------------------- FOR JIYA -------------------------------- */

function ForJiya() {
  return (
    <motion.div
      initial={{ opacity: 0, letterSpacing: "0.6em" }}
      animate={{ opacity: 0.78, letterSpacing: "0.4em" }}
      transition={{ duration: 1.2, delay: 4.0, ease: [0.22, 1, 0.36, 1] }}
      className="text-[10px] uppercase text-inkSoft"
      style={{ paddingLeft: "0.4em" }}
    >
      For Jiya
    </motion.div>
  );
}
