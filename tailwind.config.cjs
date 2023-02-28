/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        sectionColor:"#F5F5F5",
        sectionGray:"#37474F",
        sectionBlue:"#407BFF",
        sectionLightBlue:"#9FBDFF"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
