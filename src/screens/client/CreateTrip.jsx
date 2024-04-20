import { useEffect, useState } from "react"
import { axios } from "../../utils/axios.js"
import { useSystemStore } from "../../stores/system"
import { notify } from "../../utils/notify.js"

import Map from "../../components/map/Map"
import Table from "../../components/display/Table"
import Button from "../../components/form/Button"
import { isEmpty } from "lodash"

export default function createTrip() {
  const { routeToTrip, currentUser } = useSystemStore()

  const [packagesList, setPackagesList] = useState([])
  const [packageEntity, setPackage] = useState({})
  const [transport, setTransport] = useState({})
  const [route, setRoute] = useState({})

  const heads = [
    { text: "Type", scope: "type" },
    { text: "Name", scope: "name" },
    { text: "Price", scope: "price" },
    { text: "Width", scope: "width" },
    { text: "Height", scope: "height" },
    { text: "Length", scope: "length" },
    { text: "Weight", scope: "weight" }
  ]

  useEffect(() => {
    getPackagesList()
  }, [])

  useEffect(() => {
    if (routeToTrip.transportType && routeToTrip.transportName && routeToTrip.transportPlate) {
      setTransport({ maxWeight: routeToTrip.transportMaxWeight, maxLength: routeToTrip.transportMaxLength, maxHeight: routeToTrip.transportMaxHeight, maxWidth: routeToTrip.transportMaxWidth })
    }
  }, [routeToTrip])

  useEffect(() => {
    if (routeToTrip.transportType && routeToTrip.startLongitude && routeToTrip.endLatitude && routeToTrip.endLongitude) {
      setRoute({
        origin: { lat: Number(routeToTrip.startLatitude), lng: Number(routeToTrip.startLongitude) },
        destination: { lat: Number(routeToTrip.endLatitude), lng: Number(routeToTrip.endLongitude) }
      })
    }
  }, [routeToTrip])

  const onSetPackage = ({ row }) => {
    const { id, type, name, description, price, width, height, length, weight } = row
    setPackage({ id, type, name, description, price, width, height, length, weight, idUser: currentUser.id })
  }

  const startTrip = () => {
    axios
      .post("/trip/create", { idClient: currentUser.id, idTransportRoute: routeToTrip.idTransportRoute, package: packageEntity, transport })
      .then(() => {
        notify("The trip has started successfully", "success")
      })
      .catch(() => {
        notify("The package con not be transport for this vehicle", "error")
      })
  }

  const getPackagesList = () => {
    axios.get(`/package/get-my-packages/${currentUser.id}`).then((response) => {
      setPackagesList(response)
    })
  }

  return (
    <section className="w-full h-full flex flex-col lg:flex-row gap-10 md:gap-6 lg:justify-center">
      <div className="w-full h-full flex flex-col mx-auto gap-6">
        <div className="w-full flex flex-col gap-2 shrink-0 grow-0">
          <h3 className="text-2xl md:text-4xl font-bold">Package list</h3>
          <p className="text-sm md:text-base text-word-200">Choose the package to start a trip.</p>
        </div>

        <div className="h-10 shrink grow">
          <Table className="h-full shrink grow" heads={heads} data={packagesList} actions={[]} onClickRow={onSetPackage}></Table>
        </div>

        <div className="w-full flex justify-end shrink-0 grow-0">
          <Button disabled={isEmpty(packagesList)} onClick={startTrip}>
            Start trip
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Map mapId="map-readonly" readonly route={route} className="min-w-0 w-full h-full" />

        <div className="bg-background-200 w-full h-full shrink grow rounded-xl p-4 flex flex-col gap-2">
          {!isEmpty(routeToTrip) ? (
            <>
              <h6 className="font-bold">Route</h6>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Name</p>
                  <p className="line-clamp-1" title={routeToTrip.name}>
                    {routeToTrip.name}
                  </p>
                </div>
                <div className="col-span-2 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Description</p>
                  <p className="line-clamp-1" title={routeToTrip.description}>
                    {routeToTrip.description}
                  </p>
                </div>
                <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Type</p>
                  <p className="capitalize">{routeToTrip.type}</p>
                </div>
                <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Distance</p>
                  <p>{routeToTrip.distance} km</p>
                </div>
                <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-primary-100">Price</p>
                  <p>${routeToTrip.price}</p>
                </div>
              </div>
              <h6 className="font-bold">Transport</h6>
              <div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-primary-100">Name</p>
                    <p>{routeToTrip.transportName}</p>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-primary-100">Type</p>
                    <p className="line-clamp-2 capitalize">{routeToTrip.transportType}</p>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center bg-background-100 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-primary-100">Plate</p>
                    <p>{routeToTrip.transportPlate || "No plate"}</p>
                  </div>
                  <div className="col-span-3 flex justify-between items-center bg-background-100 rounded-xl p-4 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-primary-100">Weight</p>
                      <p>{routeToTrip.transportMaxWeight} kg</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-primary-100">Length</p>
                      <p>{routeToTrip.transportMaxLength} m</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-primary-100">Height</p>
                      <p>{routeToTrip.transportMaxHeight} m</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-primary-100">Width</p>
                      <p>{routeToTrip.transportMaxWidth} m</p>
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

/**
 * <h3>Asignación de paquete a ruta seleccionada para cliente</h3>
      <ul>
        <li>Mapa con la ruta seleccionada</li>
        <li>Detalles de la ruta</li>
        <li>Detalles del transporte</li>
        <li>Lista de paquetes para asignar a la ruta</li>
        <li>Botón de confirmar viaje</li>
        <li>{routeToTrip.idTransportRoute}</li>
        <li>{routeToTrip.transportName}</li>
        <li>{routeToTrip.transportType}</li>
      </ul>
    </section>
 */
