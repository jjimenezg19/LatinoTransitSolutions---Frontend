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
      <header className="w-full h-12 shrink-0 grow-0 flex justify-between items-center bg-background-200 px-8">
        <div></div>
        <nav className="shrink-0 grow-0 flex justify-center items-center">
          <ul className="hidden md:flex w-full gap-8 justify-center items-center text-base">
            {clientRoutes.map(({ name, path }, index) => (
              <li key={index}>
                <NavLink to={path} className={({ isActive }) => (isActive ? "text-primary-100" : "") + " hover:text-primary-100 font-bold"}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button type="flat" onClick={logout}>
          Log out
        </Button>
      </header>

      <section className="max-w-[1600px] w-full h-full shrink grow overflow-y-auto md:scrollgutter-edges px-2 py-2 md:py-4">
        <Outlet />
      </section>
    </main>
  )
}
