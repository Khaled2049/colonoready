const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        primary100: "#d4eaf7",
        primary200: "#b6ccd8",
        primary300: "#3b3c3d",
        accent100: "#71c4ef",
        accent200: "#00668c",
        text100: "#1d1c1c",
        text200: "#313d44",
        bg100: "#fffefb",
        bg200: "#f5f4f1",
        bg300: "#cccbc8",
      },
    },
  },
  plugins: [],
};
