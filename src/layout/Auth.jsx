import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/home")
    }
  }, [])

  return (
    <main className="w-full h-full flex flex-col">
      <header className="w-full h-12 shrink-0 grow-0 flex justify-end items-center gap-4 bg-slate-800 px-8">
        <button onClick={() => navigate("/login")} className="base-button">
          Log in
        </button>
        <button onClick={() => navigate("/signin")} className="base-button">
          Sign in
        </button>
      </header>

      <section className="w-full h-full shrink grow overflow-y-auto scrollgutter-edges pt-4">
        <Outlet />
      </section>
    </main>
  )
}
