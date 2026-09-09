/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        kotify: {
          cream: "#f7f3ec",
          ink: "#2b2420",
          muted: "#8a6f5c",
          accent: "#c1501f",
          "accent-pressed": "#a8420f",
        },
      },
    },
  },
  plugins: [],
};
