import { reduce } from "lodash"

const spacing = reduce(Array.from(Array(201).keys()), (carry, key) => ({ ...carry, [key]: `${key * 0.25}rem` }), {})

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Poppins", "sans-serif"],
        base: ["Niramit", "sans-serif"]
      },
      colors: {
        primary: "#e87430",
        secondary: {
          1: "#1c3e7d",
          2: "#11254b"
        },
        ternary: "#081b35",
        accent: "#7da2e8",
        negative: "#B80000",
        positive: "#5F8670",
        word: "#EFEEF6"
      }
    },
    spacing
  },
  plugins: []
}
