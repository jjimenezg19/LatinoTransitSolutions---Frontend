import { useEffect, useState } from "react"
import { axios } from "../../utils/axios.js"
import { notify } from "../../utils/notify.js"
import { isEmpty } from "lodash"
import { Popover } from "flowbite-react"

import Map from "../../components/map/Map"
import Table from "../../components/display/Table"
import ConfirmationModal from "../../components/display/ConfirmationModal"

export default function CreateRoute() {
  const [route, setRoute] = useState({})
  const [routesList, setRoutesList] = useState([])
  const [routeApprove, setRouteApprove] = useState({})
  const [routeDetails, setRouteDetails] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRoutesList()
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setRouteApprove({})
    }
  }, [isOpen])

  const heads = [
    { text: "ID", scope: "id" },
    { text: "Name", scope: "name" },
    { text: "Type", scope: "type" }
  ]

  const onSetRoute = ({ row }) => {
    const { latitude: startLatitude, longitude: startLongitude } = row.startPoint.coordinate
    const { latitude: endLatitude, longitude: endLongitude } = row.endPoint.coordinate

    setRoute({
      origin: { lat: Number(startLatitude), lng: Number(startLongitude) },
      destination: { lat: Number(endLatitude), lng: Number(endLongitude) }
    })

    setRouteDetails(row)
  }

  const onTableAction = ({ type, row }) => {
    switch (type) {
      case "approve":
        setRouteApprove(row)
        setIsOpen(true)
        break
    }
  }

  const onConfirmApproveRoute = () => {
    setLoading(true)

    axios
      .put("/route/approve-route", { id: routeApprove.id })
      .then(() => {
        getRoutesList()
        notify("Route approved successfully", "success")
      })
      .catch(() => {
        notify("There was an error approving the route", "error")
      })
      .finally(() => {
        setIsOpen(false)
        setLoading(false)
        setRouteApprove({})
      })
  }

  const getRoutesList = () => {
    axios.get("/route/pending-routes").then((response) => {
      setRoutesList(response)
    })
  }

  return (
    <section className="w-full h-full flex flex-col lg:flex-row gap-10 md:gap-6 lg:justify-center">
      <div className="w-full shrink-0 grow-0 md:shrink md:grow md:max-h-full flex flex-col items-center gap-3 md:gap-6 overflow-y-auto md:pr-2">
        <Map mapId="requests-routes" readonly route={route} className="min-w-0 w-full h-full"></Map>
      </div>

      <div className="w-full md:max-w-[900px] flex flex-col gap-2 shrink grow">
        <Table className="h-full shrink grow" heads={heads} data={routesList} onClickRow={onSetRoute} onTableAction={onTableAction} actions={["approve"]}></Table>
        <div className="bg-background-200 w-full h-full shrink grow rounded-xl p-4 flex flex-col gap-3">
          {!isEmpty(routeDetails) ? (
            <>
              <h6 className="font-bold">Route</h6>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col justify-center bg-background-100 rounded-xl py-2 px-4 text-sm">
                  <p className="font-semibold text-primary-100">Name</p>
                  <p className="h-10">{routeDetails.name}</p>
                </div>
                <div className="flex flex-col justify-center bg-background-100 rounded-xl py-2 px-4 text-sm">
                  <p className="font-semibold text-primary-100">Description</p>
                  <p className="h-10 line-clamp-2">{routeDetails.description}</p>
                </div>
                <div className="flex flex-col justify-center bg-background-100 rounded-xl py-2 px-4 text-sm">
                  <p className="font-semibold text-primary-100">Type</p>
                  <p className="h-10">{routeDetails.type}</p>
                </div>
                <div className="flex flex-col justify-center bg-background-100 rounded-xl py-2 px-4 text-sm">
                  <p className="font-semibold text-primary-100">Price</p>
                  <p className="h-10">₡{routeDetails.price}</p>
                </div>
              </div>
              <h6 className="font-bold">Transport</h6>
              <div>
                <p>Transport info</p>
              </div>
            </>
          ) : (
            <div className="w-full h-full text-2xl font-semibold text-center flex justify-center items-center">Choose a route to see its informations</div>
          )}
        </div>
      </div>

      <ConfirmationModal loading={loading} width="500" open={isOpen} onCancel={setIsOpen} onConfirm={onConfirmApproveRoute}>
        <p className="text-lg md:text-xl font-bold">Approve route {routeApprove.name}</p>
        <p className="text-sm md:text-base">Are you sure to approve the route with id #{routeApprove.id}?</p>
      </ConfirmationModal>
    </section>
  )
}
