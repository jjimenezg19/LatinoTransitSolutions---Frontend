import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AES } from "crypto-js"
import { simpleAxios } from "../utils/axios.js"
import { useSystemStore } from "../stores/system.js"

import Input from "../components/form/Input.jsx"
import Button from "../components/form/Button.jsx"

const TOKEN_ENCRYPT = import.meta.env.VITE_TOKEN_ENCRYPT

export default function AboutUs() {
  const { setCurrentUser } = useSystemStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)

  const navigate = useNavigate()

  const login = () => {
    simpleAxios.post("/auth/login", { email, password }).then(({ ok, data }) => {
      if (ok) {
        localStorage.setItem("auth_token", AES.encrypt(data.token, TOKEN_ENCRYPT))
        localStorage.setItem("current_session", data.user.id)
        setCurrentUser(data.user)
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
      <div className="flex flex-col gap-4 rounded-xl sm:border-2 border-primary-100/60 shadow-md p-3 sm:p-6 max-w-100 m-auto">
        <div className="flex flex-col gap-1">
          <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
          <p className="text-slate-400">Enter your email below to login to your account</p>
        </div>

        <div className="flex flex-col gap-1">
          <Input label="Email" placeholder="m@example.com" error={errorEmail} onUpdateValue={setEmail} type="email"></Input>
          <Input label="Password" placeholder="**********" error={errorPassword} onUpdateValue={setPassword} type="password"></Input>

          {error ? <span className="text-negative-100 text-center h-6 block">{error}</span> : null}
        </div>

        <Button onClick={validateFields}>Login</Button>

        <div className="flex flex-col sm:flex-row justify-center gap-1 w-full text-center">
          <span>Don't have an account?</span>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </section>
  )
}
