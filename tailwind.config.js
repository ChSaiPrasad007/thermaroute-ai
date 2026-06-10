/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      colors: {
        ink: "#17201b",
        paper: "#f8f6ef",
        moss: "#466a45",
        fern: "#78a65a",
        solar: "#f3b23c",
        clay: "#c45c3c",
        blueglass: "#3f7f95"
      },
      boxShadow: {
        soft: "0 18px 40px rgba(23, 32, 27, 0.12)"
      }
    }
  },
  plugins: []
};

