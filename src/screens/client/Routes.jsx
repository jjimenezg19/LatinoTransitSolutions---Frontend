import { useState } from "react"
import Map from "../../components/map/Map"
import MapControls from "../../components/map/MapControls"

export default function Routes() {
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState({})
  const [routeDetails, setRouteDetails] = useState({})
  const [actions, setActions] = useState({ deleteMarkers: false, resetMap: false })

  return (
    <section className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col gap-4">
        <h3>Rutas para cliente</h3>
        <ul>
          <li>Lista de rutas</li>
          <li>Mapa que muestra la ruta seleccionada</li>
          <li>Botón para confirmar la ruta y pasar a asignar el paquete</li>
        </ul>
      </div>

      <div className="flex gap-8">
        <Map actions={actions} onUpdateMap={setMap} onUpdateMarkers={setMarkers} onUpdateActions={setActions} />
        <div className="flex flex-col gap-4">
          <MapControls map={map} markers={markers} onUpdateActions={setActions} onUpdateRouteDetails={setRouteDetails} />
          <div className="flex gap-4">
            <div>Distance: {routeDetails?.distance?.text || "0 km"}</div>
            <div>Duration: {routeDetails?.duration?.text || "0 min"}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
