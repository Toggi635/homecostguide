import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1C2B24",
        paper: "#FAF7F2",
        rust: { DEFAULT: "#B5651D", dark: "#945116" },
        forest: { DEFAULT: "#3F6E52", dark: "#325940" },
        line: "#E7E2D9",
        muted: "#6B6459",
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgb(28 43 36 / 0.06), 0 1px 2px 0 rgb(28 43 36 / 0.04)",
        card: "0 4px 16px 0 rgb(28 43 36 / 0.08)",
        lift: "0 12px 24px -4px rgb(28 43 36 / 0.16)",
      },
      borderRadius: {
        card: "0.75rem",
        btn: "0.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
