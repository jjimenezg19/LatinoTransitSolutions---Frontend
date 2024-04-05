import { Routes, Route } from "react-router-dom"

import App from "../layout/App.jsx"

import RequestsRoutes from "../screens/approver/RequestsRoutes.jsx"

export default function ApproverRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index path="requests-routes" element={<RequestsRoutes />} />
      </Route>
    </Routes>
  )
}
