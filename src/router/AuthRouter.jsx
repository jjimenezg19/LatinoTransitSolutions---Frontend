import { Routes, Route } from "react-router-dom"

import Auth from "../layout/Auth.jsx"

import LogIn from "../screens/LogIn.jsx"
import SignUp from "../screens/SignUp.jsx"

export default function SystemRouter() {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route index path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  )
}
