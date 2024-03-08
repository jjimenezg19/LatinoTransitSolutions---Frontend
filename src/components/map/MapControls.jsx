import { useEffect, useState } from "react"

export default function MapControls({ map, markers, onClearMarkers }) {
  const [infoRoute, setInfoRoute] = useState(null)

  const directionsRenderer = new google.maps.DirectionsRenderer()
  const directionsService = new google.maps.DirectionsService()
  const distanceMatrixService = new google.maps.DistanceMatrixService()

  const setRoute = () => {
    if (markers.length < 2) return

    directionsRenderer.setMap(map)

    const request = {
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }

    distanceMatrixService
      .getDistanceMatrix({
        ...request,
        origins: [markers[0].position],
        destinations: [markers[1].position]
      })
      .then((response) => {
        setInfoRoute(response.rows[0].elements[0])
      })

    directionsService
      .route({
        ...request,
        origin: markers[0].position,
        destination: markers[1].position
      })
      .then((response) => {
        directionsRenderer.setDirections(response)
      })
      .catch((e) => {
        window.alert("Directions request failed due to " + e)
      })

    onClearMarkers(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <button disabled={markers.length < 2} onClick={setRoute}>
        Start route
      </button>
      <button disabled={!markers?.length} onClick={() => onClearMarkers(true)}>
        Clear markers
      </button>
      <div>Distance: {infoRoute?.distance.text || "0 km"}</div>
      <div>Duration: {infoRoute?.duration.text || "0 min"}</div>
    </div>
  )
}
