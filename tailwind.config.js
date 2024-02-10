/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  theme: {
    screens: {
      'tablet': '1023px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro",
      {
        infminecraft: {
          "primary": "#4ade80",
          "secondary": "#22c55e",
          "accent": "#a3e635",
          "neutral": "#374151",
          "base-100": "#1f2937",
          "info": "#3b82f6",
          "success": "#5eead4",
          "warning": "#ea580c",
          "error": "#dc2626",
        },
      },
    ],
  },
};