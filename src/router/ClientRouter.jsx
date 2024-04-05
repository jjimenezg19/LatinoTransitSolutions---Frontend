import { Routes, Route } from "react-router-dom"

import App from "../layout/App.jsx"

import Home from "../screens/Home.jsx"
import MapRoutes from "../screens/client/Routes.jsx"
import Packages from "../screens/client/Packages.jsx"
import CreateTrip from "../screens/client/CreateTrip.jsx"

export default function ClientRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="routes" element={<MapRoutes />} />
        <Route path="packages" element={<Packages />} />
        <Route path="trip" element={<CreateTrip />} />
      </Route>
    </Routes>
    // <>
    //   <Route path="home" element={<Home />} />
    //   <Route path="routes" element={<MapRoutes />} />
    //   <Route path="packages" element={<Packages />} />
    //   <Route path="trip" element={<CreateTrip />} />
    // </>
  )
}
