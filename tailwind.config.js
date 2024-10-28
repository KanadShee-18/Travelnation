/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-radial":
          "radial-gradient(circle, rgba(206, 212, 240, 1) 0%, rgba(215, 222, 238, 1) 80%)", // Light theme
        "dark-custom-radial":
          "radial-gradient(circle, rgba(33, 38, 59, 1) 0%, rgba(28, 37, 56, 1) 72%)", // Dark theme
        "custom-linear": "linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)", // Adjust with your color choice
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        edu: ["Edu NSW ACT Foundation", "sans-serif"],
        imprima: ["Imprima", "sans-serif"],
      },
      dropShadow: {
        dsCustom: "1px 1px 2px rgba(161, 161, 161,0.6)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
