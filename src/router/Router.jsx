import { BrowserRouter } from "react-router-dom"

import AuthRouter from "./AuthRouter.jsx"
import SystemRouter from "./SystemRouter.jsx"

export default function Router() {
  return (
    <BrowserRouter>
      <AuthRouter></AuthRouter>
      <SystemRouter></SystemRouter>
    </BrowserRouter>
  )
}
