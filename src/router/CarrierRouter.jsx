import { Routes, Route } from "react-router-dom"

import App from "../layout/App.jsx"

import CreateTransport from "../screens/carrier/CreateTransport.jsx"

export default function SystemRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index path="transports" element={<CreateTransport />} />
      </Route>
    </Routes>
  )
}
