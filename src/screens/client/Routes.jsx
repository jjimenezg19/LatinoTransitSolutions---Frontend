import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { axios } from "../../utils/axios.js"
import { useSystemStore } from "../../stores/system.js"

import Map from "../../components/map/Map"
import Table from "../../components/display/Table"
import Button from "../../components/form/Button"
import { isEmpty } from "lodash"

export default function Routes() {
  const { routeToTrip, setRouteToTrip } = useSystemStore()
  const navigate = useNavigate()

  const [routeDetails, setRouteDetails] = useState({})
  const [routesList, setRoutesList] = useState([])
  const [route, setRoute] = useState({})

  const heads = [
    { text: "Name", scope: "name" },
    { text: "Distance", scope: "distance", append: " km" },
    { text: "Price", scope: "price", prepend: "$" },
    { text: "Transport type", scope: "transportType" },
    { text: "Transport brand/name", scope: "transportName" }
  ]

  useEffect(() => {
    getRoutesList()
  }, [])

  const onSetRoute = ({ row }) => {
    const { startLatitude, startLongitude, endLatitude, endLongitude } = row

    setRoute({
      origin: { lat: Number(startLatitude), lng: Number(startLongitude) },
      destination: { lat: Number(endLatitude), lng: Number(endLongitude) }
    })

    setRouteDetails(row)

    setRouteToTrip(row)
  }

  const getRoutesList = () => {
    axios.get("/route/available-routes").then((response) => {
      setRoutesList(response)
    })
  }

  return (
    <section className="w-full h-full flex flex-col lg:flex-row gap-10 md:gap-6 lg:justify-center">
      <div className="w-full h-full flex flex-col mx-auto gap-6">
        <div className="w-full flex flex-col gap-2 shrink-0 grow-0">
          <h3 className="text-2xl md:text-4xl font-bold">Routes list</h3>
          <p className="text-sm md:text-base text-word-200">Choose a route to start a trip.</p>
        </div>

        <div className="h-10 shrink grow">
          <Table className="h-full shrink grow" heads={heads} data={routesList} actions={[]} onClickRow={onSetRoute}></Table>
        </div>

        <div className="w-full flex justify-end shrink-0 grow-0">
          <Button disabled={isEmpty(routeToTrip)} onClick={() => navigate("/trip")}>
            Confirm route
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Map mapId="map-readonly" readonly route={route} className="min-w-0 w-full h-full" />

        <div className="bg-background-200 w-full h-full shrink grow rounded-xl p-4 flex flex-col gap-2">
          {!isEmpty(routeDetails) ? (
            <>
              <h6 className="font-bold">Route</h6>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Name</p>
                  <p className="line-clamp-1" title={routeDetails.name}>
                    {routeDetails.name}
                  </p>
                </div>
                <div className="col-span-2 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Description</p>
                  <p className="line-clamp-1" title={routeDetails.description}>
                    {routeDetails.description}
                  </p>
                </div>
                <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Type</p>
                  <p className="capitalize">{routeDetails.type}</p>
                </div>
                <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Distance</p>
                  <p>{routeDetails.distance} km</p>
                </div>
                <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Price</p>
                  <p>${routeDetails.price}</p>
                </div>
              </div>
              <h6 className="font-bold">Transport</h6>
              <div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-primary-100">Name</p>
                    <p>{routeDetails.transportName}</p>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-primary-100">Type</p>
                    <p className="line-clamp-2 capitalize">{routeDetails.transportType}</p>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-primary-100">Plate</p>
                    <p>{routeDetails.transportPlate || "No plate"}</p>
                  </div>
                  <div className="col-span-3 flex justify-between items-center bg-background-100 rounded-xl p-4 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-primary-100">Weight</p>
                      <p>{routeDetails.transportMaxWeight} kg</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-primary-100">Length</p>
                      <p>{routeDetails.transportMaxLength} m</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-primary-100">Height</p>
                      <p>{routeDetails.transportMaxHeight} m</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-primary-100">Width</p>
                      <p>{routeDetails.transportMaxWidth} m</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full text-2xl font-semibold text-center flex justify-center items-center">Choose a route to see its informations</div>
          )}
        </div>
      </div>
    </section>
  )
}
