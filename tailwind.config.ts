import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0C0A08",
        surface: "#15120E",
        surfaceAlt: "#1C1815",
        ink: "#F5EFE4",
        inkSoft: "#B5AD9E",
        mute: "#7A7366",
        hair: "rgba(245,239,228,0.08)",
        accent: "#D4A574",
        accentSoft: "#B88A5E",
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};

export default config;
