import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "ant-nest_landscpe": "url('/bg-ant-nest_landscape.webp')",
        "ant-nest_portrait": "url('/bg-ant-nest_portrait.webp')",
      },
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
