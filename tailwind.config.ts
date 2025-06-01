import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "monokai-filename": {
          bg: "#1d1e1a",
          text: "#dde5dd",
        },
      },
    },
  },
  plugins: [],
};
export default config;
