import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { useSystemStore } from "../stores/system.js"
import { useEffect } from "react"
import { isEmpty } from "lodash"
import { axios } from "../utils/axios.js"

import authRouter from "./AuthRouter.jsx"
import clientRouter from "./ClientRouter.jsx"
import approverRouter from "./ApproverRouter.jsx"
import checkerRouter from "./CheckerRouter.jsx"
import carrierRouter from "./CarrierRouter.jsx"

import App from "../layout/App.jsx"
import Auth from "../layout/Auth.jsx"
import Home from "../screens/Home.jsx"

const getAllowedRoutes = (currentUser) => {
  switch (currentUser.role) {
    case "client":
      return clientRouter
    case "carrier":
      return carrierRouter
    case "approver":
      return approverRouter
    case "checker":
      return checkerRouter
    default:
      return []
  }
}

export default function Router() {
  const { currentUser, setCurrentUser } = useSystemStore()

  useEffect(() => {
    const id = Number(localStorage.getItem("current_session"))

    if (isEmpty(currentUser) && id) {
      axios.get(`/user/get-by-id/${id}`).then((user) => {
        setCurrentUser(user)
      })
    }
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
      children: authRouter
    },
    {
      path: "/",
      element: <App />,
      children: [
        ...getAllowedRoutes(currentUser),
        {
          path: "home",
          element: <Home />
        }
      ]
    },
    {
      path: "*",
      element: <Navigate to="/home" />
    }
  ])

  return (!isEmpty(currentUser) || (isEmpty(currentUser) && !localStorage.getItem("current_session"))) && <RouterProvider router={router} />
}
