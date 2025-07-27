/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Noto Serif JP", "serif"],
        sans: ["Noto Sans JP", "sans-serif"],
      },
      colors: {
        rose: {
          50: "#fef7f3",
          100: "#fceee6",
          200: "#f8ddd0",
          300: "#f3c5ae",
          400: "#eca184",
          500: "#e5815d",
          600: "#d56342",
          700: "#b64d31",
          800: "#923f2c",
          900: "#783729",
        },
      },
    },
  },
  plugins: [],
};
