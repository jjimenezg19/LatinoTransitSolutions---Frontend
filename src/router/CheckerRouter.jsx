import { Routes, Route } from "react-router-dom"

import App from "../layout/App.jsx"

import SentPackages from "../screens/checker/SentPackages.jsx"

export default function SystemRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="sent-packages" element={<SentPackages />} />
      </Route>
    </Routes>
  )
}
