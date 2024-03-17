import { useEffect, useState } from "react"
import { googleLoader } from "../../utils/google.js"
import Button from "../form/Button.jsx"

const MAP_CENTER = { lat: 9.902832813099959, lng: -84.10007357597351 }

export default function Map({ mapId, route, readonly, controls, className, onUpdateMarkers, onUpdateRouteDetails }) {
  controls = controls || false

  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState({})
  const [hasRoute, setHasRoute] = useState(false)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)
  const [directionsService, setDirectionsService] = useState(null)
  const [distanceMatrixService, setDistanceMatrixService] = useState(null)

  useEffect(() => {
    googleLoader("maps", "marker", "routes").then(([{ Map }, { AdvancedMarkerElement }, { DirectionsRenderer, DirectionsService, DistanceMatrixService }]) => {
      setDirectionsRenderer(new DirectionsRenderer())
      setDirectionsService(new DirectionsService())
      setDistanceMatrixService(new DistanceMatrixService())

      initMap(Map, AdvancedMarkerElement)
    })
  }, [])

  useEffect(() => {
    onUpdateMarkers(markers)
    console.log(markers)
  }, [markers])

  useEffect(() => {
    if (map && route?.origin && route?.destination) {
      setRoute(route)
    }
  }, [map, route])

  const initMap = (Map, Marker) => {
    const map = new Map(document.getElementById(mapId), {
      mapId: `latinotransitsolutions-${mapId}`,
      zoom: 12,
      center: MAP_CENTER
    })

    setMap(map)

    if (!readonly) {
      map.addListener("click", ({ latLng: position }) => {
        if (markers.origin && markers.destination) return null

        setMarkers((oldval) => {
          const target = oldval.origin ? "destination" : "origin"

          const marker = new Marker({ map, position })

          marker.addListener("click", () => {
            setMarkers((oldval) => ({ ...oldval, [target]: null }))
            marker.setMap(null)
          })

          const { lat, lng } = marker.position

          return { ...oldval, [target]: { marker, lat, lng } }
        })
      })
    }
  }

  const setRoute = ({ origin, destination }) => {
    if (!origin || !destination) return

    directionsRenderer.setMap(map)
    directionsRenderer.setDirections({ routes: [] })

    const request = {
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }

    distanceMatrixService
      .getDistanceMatrix({
        ...request,
        origins: [origin],
        destinations: [destination]
      })
      .then((response) => {
        onUpdateRouteDetails(response.rows[0].elements[0])
      })

    directionsService
      .route({
        ...request,
        origin,
        destination
      })
      .then((response) => {
        directionsRenderer.setDirections(response)
        setHasRoute(true)
      })
      .catch((e) => {
        window.alert("Directions request failed due to " + e)
      })

    onClearMarkers()
  }

  const onResetMap = () => {
    directionsRenderer.setDirections({ routes: [] })
    setHasRoute(false)
    onUpdateRouteDetails({})
    map.setZoom(12)
    map.setCenter(MAP_CENTER)
  }

  const onClearMarkers = () => {
    markers.origin?.marker?.setMap(null)
    markers.destination?.marker?.setMap(null)

    setMarkers({ origin: null, destination: null })
  }

  return (
    <div className="flex flex-col gap-4">
      <div id={mapId} className={`${className} min-w-150 min-h-75`}></div>

      {controls && (
        <div className="flex gap-3">
          <Button disabled={!markers.origin || !markers.destination} onClick={() => setRoute(markers)}>
            Start route
          </Button>
          {hasRoute ? (
            <Button onClick={onResetMap}>Reset map</Button>
          ) : (
            <Button disabled={!markers.origin && !markers.destination} onClick={onClearMarkers}>
              Clear markers
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
