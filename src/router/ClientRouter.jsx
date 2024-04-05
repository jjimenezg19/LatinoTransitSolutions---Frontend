import Routes from "../screens/client/Routes.jsx"
import Packages from "../screens/client/Packages.jsx"
import CreateTrip from "../screens/client/CreateTrip.jsx"

export default [
  {
    path: "routes",
    element: <Routes />
  },
  {
    path: "packages",
    element: <Packages />
  },
  {
    path: "trip",
    element: <CreateTrip />
  }
]
