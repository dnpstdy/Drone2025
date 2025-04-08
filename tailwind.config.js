/** @type {import('tailwindcss').Config} */
module.exports = {
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
        P: {
          50: 'var(--P50)',
          75: 'var(--P75)',
          100: 'var(--P100)',
          200: 'var(--P200)',
          300: 'var(--P300)',
          400: 'var(--P400)',
          500: 'var(--P500)',
        },
        S: {
          50: 'var(--S50)',
          75: 'var(--S75)',
          100: 'var(--S100)',
          200: 'var(--S200)',
          300: 'var(--S300)',
          400: 'var(--S400)',
          500: 'var(--S500)',
        },
        W: {
          100: 'var(--W100)',
        },
        G: 'var(--G)',
        R: 'var(--R)',
      },
      boxShadow: {
        custom: 'var(--shadow)',
      },
    },
  },
  plugins: [],
};
