import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
        spacing: "margin, padding",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform",
        translate: "translateY",
      },
    },
  },
  plugins: [],
} satisfies Config;
