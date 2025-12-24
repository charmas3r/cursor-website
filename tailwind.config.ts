import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fefdfb",
          100: "#fdf9f3",
          200: "#f9f1e6",
          300: "#f5e8d6",
          400: "#eddcc2",
          500: "#e5cfae",
          600: "#d4b78e",
          700: "#b8956a",
          800: "#96754e",
          900: "#7a5f41",
        },
        blush: {
          50: "#fef7f7",
          100: "#fef0ef",
          200: "#fde1df",
          300: "#fbc9c5",
          400: "#f7a8a2",
          500: "#f1867e",
          600: "#e35d54",
          700: "#c9423a",
          800: "#a63730",
          900: "#89322c",
        },
        sage: {
          50: "#f6f7f6",
          100: "#e3e6e3",
          200: "#c7cdc6",
          300: "#a3ada2",
          400: "#7f8c7e",
          500: "#647163",
          600: "#4f5a4e",
          700: "#414940",
          800: "#363c35",
          900: "#2f332e",
        },
        charcoal: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#1a1a1a",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-down": "fadeInDown 0.8s ease-out forwards",
        "slide-in-left": "slideInLeft 0.8s ease-out forwards",
        "slide-in-right": "slideInRight 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #fdf9f3 0%, #fef0ef 50%, #fdf9f3 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

