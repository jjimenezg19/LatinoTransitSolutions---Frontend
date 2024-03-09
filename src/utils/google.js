import { Loader } from "@googlemaps/js-api-loader"

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY

const loader = new Loader({ apiKey: GOOGLE_KEY })

export const googleLoader = (...libraries) => {
  return Promise.all(libraries.map((lib) => loader.importLibrary(lib)))
}
