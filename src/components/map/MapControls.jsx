import { useState } from "react"
import { googleLoader } from "../../utils/google.js"

export default function MapControls({ map, markers, onUpdateActions }) {
  const [infoRoute, setInfoRoute] = useState(null)
  const [hasRoute, setHasRoute] = useState(false)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)

  const setRoute = () => {
    if (!markers.origin || !markers.destination) return

    googleLoader("routes").then(([{ DirectionsRenderer, DirectionsService, DistanceMatrixService }]) => {
      const renderer = new DirectionsRenderer()
      setDirectionsRenderer(renderer)

      const directionsService = new DirectionsService()
      const distanceMatrixService = new DistanceMatrixService()

      renderer.setMap(map)

      const request = {
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      }

      distanceMatrixService
        .getDistanceMatrix({
          ...request,
          origins: [markers.origin.position],
          destinations: [markers.destination.position]
        })
        .then((response) => {
          setInfoRoute(response.rows[0].elements[0])
        })

      directionsService
        .route({
          ...request,
          origin: markers.origin.position,
          destination: markers.destination.position
        })
        .then((response) => {
          renderer.setDirections(response)
          setHasRoute(true)
        })
        .catch((e) => {
          window.alert("Directions request failed due to " + e)
        })

      onClearMarkers()
    })
  }

  const onClearMarkers = () => {
    changeAction("deleteMarkers")
  }

  const onResetMap = () => {
    directionsRenderer.setDirections({ routes: [] })
    setHasRoute(false)
    setInfoRoute(null)
    changeAction("resetMap")
  }

  const changeAction = (action) => {
    onUpdateActions((oldval) => ({ ...oldval, [action]: true }))
  }

  return (
    <div className="flex flex-col gap-3">
      <button disabled={!markers.origin || !markers.destination} onClick={setRoute}>
        Start route
      </button>
      {hasRoute ? (
        <button onClick={onResetMap}>Reset map</button>
      ) : (
        <button disabled={!markers.origin && !markers.destination} onClick={onClearMarkers}>
          Clear markers
        </button>
      )}
      <div>Distance: {infoRoute?.distance?.text || "0 km"}</div>
      <div>Duration: {infoRoute?.duration?.text || "0 min"}</div>
    </div>
  )
}
