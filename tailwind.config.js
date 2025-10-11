/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#af3233eb", // Firebrick tone — main Dristi color
          light: "#4babce",  //skyblue tone from logo
        },
        secondary: {
          DEFAULT: "#ffde59", // Yellow for contrast
        },
      },
    },
  },
  plugins: [],
}
