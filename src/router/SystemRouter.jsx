import { Routes, Route } from "react-router-dom"

import App from "../layout/App.jsx"

import Home from "../screens/Home.jsx"

export default function SystemRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  )
}
