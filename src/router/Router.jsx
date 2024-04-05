import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSystemStore } from "../stores/system.js"
import { useEffect } from "react"
import { isEmpty } from "lodash"
import { axios } from "../utils/axios.js"

import AuthRouter from "./AuthRouter.jsx"
import ClientRouter from "./ClientRouter.jsx"
import ApproverRouter from "./ApproverRouter.jsx"
import CheckerRouter from "./CheckerRouter.jsx"
import CarrierRouter from "./CarrierRouter.jsx"
import App from "../layout/App.jsx"
import MapRoutes from "../screens/client/Routes.jsx"
import Packages from "../screens/client/Packages.jsx"
import CreateTrip from "../screens/client/CreateTrip.jsx"
import Home from "../screens/Home.jsx"

export default function Router() {
  const { currentUser, setCurrentUser } = useSystemStore()

  useEffect(() => {
    const currentUserId = localStorage.getItem("current_session")

    if (isEmpty(currentUser) && currentUserId) {
      axios.get(`/user/get-by-id?id=${currentUserId}`).then((user) => {
        setCurrentUser(user)
      })
    }
  }, [])

  let router = null

  if (!isEmpty(currentUser)) {
    switch (currentUser.role) {
      case "client":
        router = <ClientRouter />
        break
      case "carrier":
        router = <CarrierRouter />
        break
      case "approver":
        router = <ApproverRouter />
        break
      case "checker":
        router = <CheckerRouter />
        break
    }
  }
  return (
    <BrowserRouter>
      <AuthRouter></AuthRouter>
      {router}
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
        </Route>
        {/* <Routes path="*" element={<Navigate to="/home" />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
