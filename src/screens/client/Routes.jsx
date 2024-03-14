import { useState } from "react"
import Map from "../../components/map/Map"

export default function Routes() {
  const [route, setRoute] = useState({})
  const [markers, setMarkers] = useState({})
  const [routeDetails, setRouteDetails] = useState({})

  const routes = [
    {
      origin: { lat: 9.92058822772758, lng: -84.12575840950012 },
      destination: { lat: 9.898605191775998, lng: -84.13056492805481 }
    },
    {
      origin: { lat: 9.919015398449998, lng: -84.09469860680947 },
      destination: { lat: 9.90382534354744, lng: -84.00471285269677 }
    },
    {
      origin: { lat: 9.954843624196979, lng: -84.05543243665042 },
      destination: { lat: 9.96668121627498, lng: -84.02472955845764 }
    }
  ]

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
        <Map readonly route={route} onUpdateMarkers={setMarkers} onUpdateRouteDetails={setRouteDetails} />

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div>Distance: {routeDetails?.distance?.text || "0 km"}</div>
            <div>Duration: {routeDetails?.duration?.text || "0 min"}</div>
          </div>

          <div className="flex flex-col gap-2">
            {routes.map((route, index) => {
              return (
                <div onClick={() => setRoute(route)} key={index} className="cursor-pointer hover:text-primary-300">
                  Ruta #{index + 1}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
