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

  const routes = [
    { name: "Home", path: "home" },
    { name: "About Us", path: "about-us" },
    { name: "Contact Us", path: "contact-us" },
    { name: "Map", path: "map" }
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
            {routes.map(({ name, path }, index) => (
              <li key={index}>
                <NavLink to={path} className={({ isActive }) => (isActive ? "text-orange-400" : "") + " hover:text-orange-400"}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={logout} className="base-button">
          Log out
        </button>
      </header>

      <section className="w-full h-full shrink grow overflow-y-auto scrollgutter-edges pt-4">
        <Outlet />
      </section>
    </main>
  )
}
