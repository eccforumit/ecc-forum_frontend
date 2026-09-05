/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "Verdana", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        body: ["Verdana", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-montserrat)", "Verdana", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-montserrat)", "Verdana", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            h1: { fontFamily: 'var(--font-heading)' },
            h2: { fontFamily: 'var(--font-heading)' },
            h3: { fontFamily: 'var(--font-heading)' },
            h4: { fontFamily: 'var(--font-heading)' },
            p: { fontFamily: 'var(--font-body)' },
          }
        }
      },
      colors: {
        primary: {
          DEFAULT: "#006064",
          50: "#E0F7FA",
          100: "#B2EBF2",
          200: "#80DEEA",
          300: "#4DD0E1",
          400: "#26C6DA",
          500: "#00ACC1",
          600: "#0097A7",
          700: "#00838F",
          800: "#007179",
          900: "#006064",
        },
        secondary: {
          DEFAULT: "#00796B",
          50: "#E0F2F1",
          100: "#B2DFDB",
          200: "#80CBC4",
          300: "#4DB6AC",
          400: "#26A69A",
          500: "#009688",
          600: "#00897B",
          700: "#00796B",
          800: "#00695C",
          900: "#004D40",
        },
      },
    },
  },
  plugins: [],
};