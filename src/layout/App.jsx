import { useEffect } from "react"
import { Outlet, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

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
    <main className="w-full h-full flex flex-col">
      <header className="w-full h-12 shrink-0 grow-0 flex justify-between items-center bg-slate-800 px-8">
        <div></div>
        <nav className="shrink-0 grow-0 flex justify-center items-center">
          <ul className="w-full flex gap-8 justify-center items-center text-base">
            {clientRoutes.map(({ name, path }, index) => (
              <li key={index}>
                <NavLink to={path} className={({ isActive }) => (isActive ? "text-orange-400" : "") + " hover:text-orange-400"}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={logout}>Log out</button>
      </header>

      <section className="w-full h-full shrink grow overflow-y-auto scrollgutter-edges pt-4 px-2 md:px-4">
        <Outlet />
      </section>
    </main>
  )
}
