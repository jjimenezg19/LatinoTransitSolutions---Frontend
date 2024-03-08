import { useState } from "react"
import { axios } from "../utils/axios.js"
import { useSystemStore } from "../stores/system.js"

export default function Home() {
  const [allCities, setAllCities] = useState(false)
  const isAuth = useSystemStore((state) => state.isAuth)

  const getAllCities = () => {
    axios.get("/city/all").then(({ ok, data }) => {
      if (ok) {
        console.log(data)
      } else {
        console.log("There's something wrong")
      }

      setAllCities(true)
    })
  }

  return (
    <section className="w-full h-full flex justify-center items-center">
      <h3>Hurrah! You are authenticated!</h3>
    </section>
  )
}
