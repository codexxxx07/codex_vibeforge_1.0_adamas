/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        shipwise: {
          teal: "#1D7874",
          yellow: "#F4D35E",
          orange: "#EE964B",
          dark: "#262626",
          navy: "#0b0b18",
          cyan: "#5b9df0",
          lavender: "#8b90a0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
