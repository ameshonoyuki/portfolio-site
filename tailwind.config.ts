import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08070f",
        bg2: "#0f0d1c",
        ink: "#f1ecf8",
        muted: "#a79fbd",
        violet: "#9d7bff",
        teal: "#5fe3d0",
        gold: "#e8c98a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Hiragino Sans", "Yu Gothic", "Meiryo", "sans-serif"],
        mincho: ["var(--font-mincho)", "Hiragino Mincho ProN", "Yu Mincho", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
