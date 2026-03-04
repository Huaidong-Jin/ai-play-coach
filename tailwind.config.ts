import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        apc: {
          bg: "var(--bg)",
          surface: "var(--surface)",
          surface2: "var(--surface-2)",
          text: "var(--text)",
          text2: "var(--text-2)",
          muted: "var(--muted)",
          border: "var(--border)",
          accent: "var(--accent)",
          accent2: "var(--accent-2)",
        },
        "apc-rose": {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
        },
      },
      boxShadow: {
        "apc-soft-1": "0 18px 40px var(--shadow-1)",
        "apc-soft-2": "0 22px 45px var(--shadow-2)",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;

