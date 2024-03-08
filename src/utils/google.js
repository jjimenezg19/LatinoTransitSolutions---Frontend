import { Loader } from "@googlemaps/js-api-loader"

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY

const loader = new Loader({ apiKey: GOOGLE_KEY })

export default loader
