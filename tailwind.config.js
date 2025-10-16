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
          blue: "#4babce",  //skyblue tone from logo
          light:"#ffedd5", //light orange
        },
        secondary: {
          DEFAULT: "#ffde59", // Yellow for contrast
        },     
      },
      backgroundImage: {
        'primary-gradient': "linear-gradient(to bottom, #fde1cc, #edddab)",
      },
    },
  },
  plugins: [],
}
