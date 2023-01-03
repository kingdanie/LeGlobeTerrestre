
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "accent-color": process.env.NEXT_PUBLIC_ACCENT_COLOR
          ? process.env.NEXT_PUBLIC_ACCENT_COLOR
          : "#C9492C",
        "footer-color": "#3f3f3f",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require('@tailwindcss/typography')
  ],
};
