import { AES } from "crypto-js"
import { useState } from "react"
import { useSystemStore } from "../stores/system.js"
import { simpleAxios } from "../utils/axios.js"
import { useNavigate } from "react-router-dom"

const TOKEN_ENCRYPT = process.env.REACT_APP_TOKEN_ENCRYPT

export default function AboutUs() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const setIsAuth = useSystemStore((state) => state.setIsAuth)

  const login = () => {
    simpleAxios.post("/auth/login", { username, password }).then(({ ok, data }) => {
      if (ok) {
        setIsAuth(true)
        localStorage.setItem("auth_token", AES.encrypt(data.token, TOKEN_ENCRYPT))
        navigate("/home")
      } else {
        setError("There's something wrong")
      }
    })
  }

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 border border-orange-400 bg-orange-300/10 rounded-xl p-8">
        <h4>Log in</h4>
        <input onInput={({ target }) => setUsername(target.value)} placeholder="Username" className="base-input w-full" type="text" name="username" />
        <input onInput={({ target }) => setPassword(target.value)} placeholder="Password" className="base-input w-full" type="password" name="password" />
        <button className="base-button w-full" onClick={login}>
          Log In
        </button>
        <small className="text-red-500 text-center">{error}</small>
      </div>
    </section>
  )
}
