import Routes from "../screens/client/Routes.jsx"
import CreatePackage from "../screens/client/CreatePackage.jsx"
import CreateTrip from "../screens/client/CreateTrip.jsx"

export default [
  {
    path: "routes",
    element: <Routes />
  },
  {
    path: "my-packages",
    element: <CreatePackage />
  },
  {
    path: "trip",
    element: <CreateTrip />
  }
]
