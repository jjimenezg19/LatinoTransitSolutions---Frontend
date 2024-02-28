import { reduce } from "lodash"

const spacing = reduce(Array.from(Array(201).keys()), (carry, key) => ({ ...carry, [key]: `${key * 0.25}rem` }), {})

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Poppins", "sans-serif"],
        base: ["Niramit", "sans-serif"]
      }
    },
    spacing
  },
  plugins: []
}
