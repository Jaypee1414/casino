/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        jaro: ['Jaro', 'sans-serif'], // Add Jaro as the font name
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(to right, #E88345, #AEAF6C)',
      },
      textStroke: {
        DEFAULT: '2px #201F17', // Default stroke color and width
        thin: '1px black', // Thin stroke
        thick: '1px black', // Thick stroke
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': '1px black', // Default stroke
        },
        '.text-stroke-thin': {
          '-webkit-text-stroke': '1px black', // Thin stroke
        },
        '.text-stroke-thick': {
          '-webkit-text-stroke': '1px black', // Thick stroke
        },
      });
    },
  ],
};

export default config;
