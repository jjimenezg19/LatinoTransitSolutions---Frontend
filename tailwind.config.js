import { mapKeys, reduce } from "lodash"
import plugin from "tailwindcss/plugin"

const spacing = reduce(Array.from(Array(201).keys()), (carry, key) => ({ ...carry, [key]: `${key * 0.25}rem` }), {})

const customColors = {
  "--primary-100": "#d96826",
  "--primary-200": "#db7133",
  "--primary-300": "#dd7a40",

  "--secondary-100": "#152d5b",
  "--secondary-200": "#1e4285",

  "--ternary-100": "#07162c",

  "--accent-100": "#7da2e8",
  "--accent-200": "#97b5ed",
  "--accent-300": "#b1c7f1",

  "--negative-100": "#c33",
  "--negative-200": "#cf3f3f",
  "--negative-300": "#d24b4b",

  "--positive-100": "#29a35e",
  "--positive-200": "#2caf65",
  "--positive-300": "#2fbc6c",

  "--word-100": "#EFEEF6"
}

const colors = Object.entries(mapKeys(customColors, (_, key) => key.replace("--", ""))).reduce((acc, [key, value]) => {
  const [name, variant] = key.split("-")
  acc[name] = acc[name] || {}
  acc[name][variant] = value
  return acc
}, {})

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Poppins", "sans-serif"],
        base: ["Niramit", "sans-serif"]
      },
      colors
    },
    spacing
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ":root": customColors
      })
    })
  ],
  safelist: [
    {
      pattern: /bg-(primary|negative|positive)-(100|200|300)/,
      variants: ["hover", "active"]
    },
    {
      pattern: /border-(primary|negative|positive)-(100|200|300)/,
      variants: ["hover", "active"]
    },
    {
      pattern: /text-(primary|negative|positive)-(100|200|300)/,
      variants: ["hover", "active"]
    }
  ]
}
