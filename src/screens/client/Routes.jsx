import { useEffect, useState } from "react"

import Map from "../../components/map/Map"
import MapControls from "../../components/map/MapControls"

export default function SignIn() {
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [deleteMarkers, setDeleteMarkers] = useState(false)

  return (
    <section className="w-full h-full flex gap-4 justify-center items-center">
      <div className="flex flex-col gap-4">
        <h3>Rutas para cliente</h3>
        <ul>
          <li>Lista de rutas</li>
          <li>Mapa que muestra la ruta seleccionada</li>
          <li>Botón para confirmar la ruta y pasar a asignar el paquete</li>
        </ul>
      </div>
      <Map deleteMarkers={deleteMarkers} onUpdateDeleteMarkers={setDeleteMarkers} markers={markers} onUpdateMap={setMap} onUpdateMarkers={setMarkers} />
      <MapControls map={map} markers={markers} onClearMarkers={setDeleteMarkers} />
    </section>
  )
}
