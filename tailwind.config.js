/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37",
        darkGold: "#B8860B",
        background: "#0F172A",
        card: "#1E293B",
        accent: "#FACC15",
        success: "#22C55E",
        danger: "#EF4444",
        textLight: "#F8FAFC",
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  plugins: [],
};
