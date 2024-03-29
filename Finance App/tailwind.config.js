/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: '#585752',
        background: "#424242"
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}

