import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        max: "1210px",
        "259":"259px",
        "350": "350px",
        "598": "598px",
      },
    },
  },
  plugins: [],
} satisfies Config;
