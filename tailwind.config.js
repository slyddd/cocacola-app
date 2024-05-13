import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#25232e",
            foreground: "#fff",
            primary: "#2e2323",
            secondary: "#05f",
          },
        },
        light: {
          colors: {
            background: "#fff",
            foreground: "#000",
            primary: "#fed8d8",
            secondary: "#05f",
          },
        },
      },
    }),
  ],
};
