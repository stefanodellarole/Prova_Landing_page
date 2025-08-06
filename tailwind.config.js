/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind v4 uses CSS-first configuration
  // This file is mainly for compatibility with tools that expect it
  content: [
    "./index.html",
    "./App.tsx",
    "./main.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  // Most configuration is now done via @theme in globals.css
  theme: {
    extend: {},
  },
  plugins: [],
  // Ensure compatibility with Tailwind v4
  future: {
    hoverOnlyWhenSupported: true,
  },
}