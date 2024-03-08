import { BrowserRouter } from "react-router-dom"

import AuthRouter from "./AuthRouter.jsx"
import ClientRouter from "./ClientRouter.jsx"
import ApproverRouter from "./ApproverRouter.jsx"
import CheckerRouter from "./CheckerRouter.jsx"
import CarrierRouter from "./CarrierRouter.jsx"

export default function Router() {
  return (
    <BrowserRouter>
      <AuthRouter></AuthRouter>
      <ClientRouter></ClientRouter>
      <ApproverRouter></ApproverRouter>
      <CheckerRouter></CheckerRouter>
      <CarrierRouter></CarrierRouter>
    </BrowserRouter>
  )
}
