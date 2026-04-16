"use client";
import { motion } from "framer-motion";

type Props = {
  size?: number;
  className?: string;
  showTile?: boolean;
};

/**
 * Clean editorial JP mark. Real serif type set in SVG,
 * warm bone on warm near-black. No gradients, no candy.
 */
export default function JPLogo({
  size = 40,
  className,
  showTile = false,
}: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        aria-label="JP"
      >
        {showTile && (
          <>
            <rect
              x="1"
              y="1"
              width="98"
              height="98"
              rx="22"
              ry="22"
              fill="#14110E"
            />
            <rect
              x="1.5"
              y="1.5"
              width="97"
              height="97"
              rx="21.5"
              ry="21.5"
              fill="none"
              stroke="rgba(245,239,228,0.08)"
              strokeWidth="1"
            />
          </>
        )}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'Instrument Serif', Georgia, 'Times New Roman', serif"
          fontSize={showTile ? 58 : 78}
          fontStyle="italic"
          fontWeight="400"
          fill="#F5EFE4"
          letterSpacing="-2"
        >
          JP
        </text>
      </svg>
    </motion.span>
  );
}
