import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "ant-nest_landscpe": "url('/bg-ant-nest_landscape.webp')",
        "ant-nest_portrait": "url('/bg-ant-nest_portrait.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
