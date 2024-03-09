import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Input from "../components/form/Input.jsx"

import { AES } from "crypto-js"
import { simpleAxios } from "../utils/axios.js"

const TOKEN_ENCRYPT = import.meta.env.VITE_TOKEN_ENCRYPT

export default function AboutUs() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)

  const navigate = useNavigate()

  const login = () => {
    simpleAxios.post("/auth/login", { username: email, password }).then(({ ok, data }) => {
      if (ok) {
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
    <section className="w-full h-full flex items-center px-2">
      <div className="flex flex-col gap-4 rounded-xl sm:border-2 shadow-md p-3 sm:p-6 max-w-100 m-auto">
        <div className="flex flex-col gap-1">
          <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
          <p className="text-slate-400">Enter your email below to login to your account</p>
        </div>

        <div className="flex flex-col gap-1">
          <Input label="Email" placeholder="m@example.com" error={errorEmail} onUpdateValue={setEmail} type="email"></Input>
          <Input label="Password" placeholder="**********" error={errorPassword} onUpdateValue={setPassword} type="password"></Input>

          {error ? <span className="text-red-500 text-center h-6 block">{error}</span> : null}
        </div>

        <button onClick={validateFields}>Login</button>

        <div className="flex flex-col sm:flex-row justify-center gap-1 w-full text-center">
          <span>Don't have an account?</span>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </section>
  )
}
