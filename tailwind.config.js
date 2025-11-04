/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF3E6C",
        secondary: "#282C3F",
        accent: "#FF905A",
        surface: "#FFFFFF",
        background: "#F5F5F6",
        success: "#03A685",
        warning: "#FF9F00",
        error: "#FF3E6C",
        info: "#526CD0"
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      animation: {
        bounce: "bounce 0.3s ease-in-out",
        pulse: "pulse 0.2s ease-in-out"
      }
    },
  },
  plugins: [],
}