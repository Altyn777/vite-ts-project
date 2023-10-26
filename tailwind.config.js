/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./src/*.tsx"],
  theme: {
    extend: {
      colors: {
        gray: {
          350: "rgba(55, 65, 81, 0.8)",
        },
      },
    },
  },
  plugins: [],
};
