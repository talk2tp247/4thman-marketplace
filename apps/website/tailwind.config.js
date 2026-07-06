/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { blue: '#2563EB', gold: '#F59E0B' },
        surface: '#F8FAFC',
      },
    },
  },
  plugins: [],
};
