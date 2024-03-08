import { AES } from "crypto-js"
import { useState } from "react"
import { useSystemStore } from "../stores/system.js"
import { simpleAxios } from "../utils/axios.js"
import { useNavigate } from "react-router-dom"

const TOKEN_ENCRYPT = process.env.REACT_APP_TOKEN_ENCRYPT

export default function AboutUs() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)

  const navigate = useNavigate()

  const setIsAuth = useSystemStore((state) => state.setIsAuth)

  const login = () => {
    simpleAxios.post("/auth/login", { username: email, password }).then(({ ok, data }) => {
      if (ok) {
        setIsAuth(true)
        localStorage.setItem("auth_token", AES.encrypt(data.token, TOKEN_ENCRYPT))
        navigate("/home")
      } else {
        setError("There's something wrong")
      }
    })
  }

  const validateFields = () => {
    let hasError = false

    if (!email) {
      setErrorEmail("Email is required")
      hasError = true
    }

    if (!password) {
      setErrorPassword("Password is required")
      hasError = true
    }

    if (!hasError) {
      login()
    }
  }

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-6 rounded-lg border shadow-sm mx-auto max-w-sm p-6">
        <div className="flex flex-col gap-2">
          <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
          <p className="text-slate-400">Enter your email below to login to your account</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium leading-none" htmlFor="email">
            Email
          </label>
          <div className="w-full">
            <input onInput={({ target }) => setEmail(target.value)} className={errorEmail ? "border-red-500" : ""} placeholder="m@example.com" type="email" />
            <small className="text-red-500 text-right h-6 block">{errorEmail}</small>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium leading-none" htmlFor="password">
            Password
          </label>
          <div className="w-full">
            <input onInput={({ target }) => setPassword(target.value)} className={errorPassword ? "border-red-500" : ""} placeholder="" type="password" />
            <small className="text-red-500 text-right h-6 block">{errorPassword}</small>
          </div>
          <a className="ml-auto inline-block  underline" href="#">
            Forgot your password?
          </a>
        </div>

        {error ? <small className="text-red-500 text-right h-6 block">{error}</small> : null}

        <button onClick={validateFields}>Login</button>

        <div className="w-full text-center ">
          <span>Don't have an account?</span>
          <a className="underline ml-1" href="#">
            Sign up
          </a>
        </div>
      </div>
    </section>
  )
}
