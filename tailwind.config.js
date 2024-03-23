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

  "--negative-100": "#c63939",
  "--negative-200": "#c94545",
  "--negative-300": "#cd5151",

  "--positive-100": "#1f9352",
  "--positive-200": "#22a059",
  "--positive-300": "#25ad5f",

  "--buttonword-100": "#e4e6ff",

  "--word-100": "#e4e6ff",
  "--word-200": "#bfc1d9",
  "--word-300": "#9fa2c6"
}

const customColors2 = {
  "--background-100": "#14171D",
  "--background-200": "#282F3D",
  "--background-300": "#3c475d",

  "--primary-100": "#23b290",
  "--primary-200": "#26c09c",
  "--primary-300": "#28cca6",

  "--negative-100": "#cb4d4d",
  "--negative-200": "#cf5959",
  "--negative-300": "#d26565",

  "--positive-100": "#599ff1",
  "--positive-200": "#69a9f2",
  "--positive-300": "#77b1f3",

  "--buttonword-100": "#14171D",

  "--word-100": "#e4e6ff",
  "--word-200": "#bfc1d9",
  "--word-300": "#9fa2c6"
}

const colors = Object.entries(mapKeys(customColors2, (_, key) => key.replace("--", ""))).reduce((acc, [key, value]) => {
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
    plugin(({ addComponents }) => {
      addComponents({
        ":root": customColors2
      })
    })
  ],
  safelist: [
    {
      pattern: /(bg|border|text)-(primary|negative|positive)-(100|200|300)/,
      variants: ["hover", "active"]
    }
  ]
}
