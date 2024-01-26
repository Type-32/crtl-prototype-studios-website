/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("daisyui"),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}