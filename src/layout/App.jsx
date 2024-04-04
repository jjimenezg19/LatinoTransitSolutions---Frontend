import { useEffect } from "react"
import { Outlet, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import Button from "../components/form/Button"

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/login")
    }
  }, [])

  const clientRoutes = [
    { name: "Packages", path: "packages" },
    { name: "Routes", path: "routes" },
    { name: "Trip", path: "trip" },
    { name: "Requests Routes", path: "requests-routes" },
    { name: "Sent Packages", path: "sent-packages" },
    { name: "Transports", path: "transports" }
  ]

  const logout = () => {
    localStorage.removeItem("auth_token")
    navigate("/login")
  }

  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="hidden md:block absolute w-full h-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-transparent to-transparent pointer-events-none"></div>

      <header className="relative w-full h-12 shrink-0 grow-0 flex justify-between items-center bg-background-200 px-4 md:px-8">
        <img className="hidden md:inline w-32" src="/images/logo.webp" alt="Logo de Latino Transit Solutions" />
        <img className="md:hidden w-10" src="/images/lts.svg" alt="Logo de Latino Transit Solutions" />
        <nav className="shrink-0 grow-0 flex justify-center items-center">
          <ul className="menu hidden md:flex w-full gap-8 justify-center items-center text-base text-word-200">
            {clientRoutes.map(({ name, path }, index) => (
              <li key={index}>
                <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button size="sm" type="flat" onClick={logout}>
          Log out
        </Button>
      </header>

      <section className="max-w-[1600px] w-full h-full shrink grow overflow-y-auto md:scrollgutter-edges p-2 md:p-4">
        <Outlet />
      </section>
    </main>
  )
}
