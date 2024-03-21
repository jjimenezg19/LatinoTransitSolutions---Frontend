import { mapKeys, reduce } from "lodash"
import plugin from "tailwindcss/plugin"

const spacing = reduce(Array.from(Array(201).keys()), (carry, key) => ({ ...carry, [key]: `${key * 0.25}rem` }), {})

const customColors = {
  "--background-100": "#181d25",
  "--background-200": "#213345",
  "--background-300": "#253d56",

  "--primary-100": "#d17505",
  "--primary-200": "#e07e06",
  "--primary-300": "#ef8606",

  "--accent-100": "#4da6ff",
  "--accent-200": "#5cadff",
  "--accent-300": "#6bb5ff",

  "--negative-100": "#c63939",
  "--negative-200": "#c94545",
  "--negative-300": "#cd5151",

  "--positive-100": "#1f9352",
  "--positive-200": "#22a059",
  "--positive-300": "#25ad5f",

  "--word-100": "#e4e6ff",
  "--word-200": "#9fa2c6"
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
