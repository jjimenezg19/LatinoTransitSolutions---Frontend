import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Input from "../components/form/Input"
import Select from "../components/form/Select"

import { simpleAxios } from "../utils/axios.js"
import Button from "../components/form/Button.jsx"

const TOKEN_ENCRYPT = import.meta.env.VITE_TOKEN_ENCRYPT

export default function SignUp() {
  const [dataForm, setDataForm] = useState({})
  const [dataFormError, setDataFormError] = useState({})
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const updateDataForm = (key, value) => {
    setDataForm((oldval) => ({ ...oldval, [key]: value }))
  }

  const validateFields = () => {
    let hasError = false

    /**
     * Código para validar los campos
     */

    if (!hasError) {
      signup()
    }
  }

  const signup = () => {
    simpleAxios.post("/auth/signup", dataForm).then(({ ok, data }) => {
      if (ok) {
        localStorage.setItem("auth_token", AES.encrypt(data.token, TOKEN_ENCRYPT))
        navigate("/home")
      } else {
        setError("There's something wrong")
      }
    })
  }

  const options = [
    { text: "Client", value: "client" },
    { text: "Checker", value: "checker" },
    { text: "Approver", value: "approver" },
    { text: "Carrier", value: "carrier" }
  ]

  return (
    <section className="w-full h-full flex items-center px-2">
      <div className="flex flex-col gap-4 rounded-xl sm:border-2 shadow-md p-3 sm:p-6 max-w-100 m-auto">
        <header className="flex flex-col gap-1">
          <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Sign up</h3>
          <p className="text-slate-400">Enter your information to create an account</p>
        </header>

        <div className="flex flex-col gap-1">
          <Select label="User type" placeholder="Select an user type" value={dataForm.usertype} error={dataFormError.usertype} onUpdateValue={(val) => updateDataForm("usertype", val)} options={options}></Select>
          <Input label="Name" placeholder="Enter your name" value={dataForm.name} error={dataFormError.name} onUpdateValue={(val) => updateDataForm("name", val)}></Input>
          <Input label="Email" placeholder="m@example.com" value={dataForm.email} error={dataFormError.email} onUpdateValue={(val) => updateDataForm("email", val)} type="email"></Input>
          <Input label="Password" placeholder="**********" value={dataForm.password} error={dataFormError.password} onUpdateValue={(val) => updateDataForm("password", val)} type="password"></Input>
          <Input label="Company" placeholder="Enter your company" value={dataForm.company} error={dataFormError.company} onUpdateValue={(val) => updateDataForm("company", val)}></Input>

          {error ? <span className="text-red-500 text-center h-6 block">{error}</span> : null}
        </div>

        <Button onClick={validateFields}>Sign up</Button>

        <footer className="flex flex-col sm:flex-row justify-center gap-1 w-full text-center">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </footer>
      </div>
    </section>
  )
}
