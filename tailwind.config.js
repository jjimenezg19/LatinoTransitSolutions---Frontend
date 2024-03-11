import { mapKeys, reduce } from "lodash"
import plugin from "tailwindcss/plugin"

const spacing = reduce(Array.from(Array(201).keys()), (carry, key) => ({ ...carry, [key]: `${key * 0.25}rem` }), {})

const customColors = {
  "--primary-100": "#d96826",
  "--primary-200": "#db7133",
  "--primary-300": "#dd7a40",

  "--secondary-100": "#11254b",
  "--secondary-200": "#1c3e7d",

  "--ternary-100": "#081b35",

  "--accent-100": "#7da2e8",
  "--accent-200": "#97b5ed",
  "--accent-300": "#b1c7f1",

  "--negative-100": "#c32222",
  "--negative-200": "#d02525",
  "--negative-300": "#da2b2b",

  "--positive-100": "#178245",
  "--positive-200": "#198f4c",
  "--positive-300": "#1c9c53",

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
