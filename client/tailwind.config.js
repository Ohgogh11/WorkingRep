/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./src/Components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      screens: {
        mlg: { max: "1025px" },
        msm: { max: "650px" },
        mss: { max: "512px" },
      },
      height: {
        "screen-200": "calc(100vh - 200px)",
        "full-Screen": "calc(100vh - 88px)",
      },
      width: {
        "screen-60": "calc(100vh - 200px)",
      },
    },
  },
  plugins: [
    require("postcss-nested"), // Add this line
    require("autoprefixer"), // Add this line
    require("tailwindcss"),
    require("tailwindcss-animate"),
  ],
};
