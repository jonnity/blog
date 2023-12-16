import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "ant-nest": "url('/bg-ant-nest.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
