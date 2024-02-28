import { Routes, Route } from "react-router-dom"

import App from "../layout/App.jsx"

import Home from "../screens/Home.jsx"
import AboutUs from "../screens/AboutUs.jsx"
import ContactUs from "../screens/ContactUs.jsx"
import GoogleMaps from "../screens/GoogleMaps2.jsx"

export default function SystemRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="map" element={<GoogleMaps />} />
      </Route>
    </Routes>
  )
}
