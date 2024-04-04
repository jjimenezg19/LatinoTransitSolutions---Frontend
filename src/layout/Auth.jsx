import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "../components/form/Button"

export default function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/home")
    }
  }, [])

  return (
    <main className="w-full h-full flex flex-col">
      <header className="w-full h-12 shrink-0 grow-0 flex justify-end items-center gap-4 bg-slate-800 px-8">
        {pathname !== "/login" ? (
          <Button size="sm" onClick={() => navigate("/login")}>
            Log in
          </Button>
        ) : null}
        {pathname !== "/signup" ? (
          <Button size="sm" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        ) : null}
      </header>

      <section className="w-full h-full shrink grow overflow-y-auto scrollgutter-edges pt-4">
        <Outlet />
      </section>
    </main>
  )
}
