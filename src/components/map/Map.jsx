import { useEffect, useState } from "react"
import googleLoader from "../../utils/google.js"

const MAP_CENTER = { lat: 9.902832813099959, lng: -84.10007357597351 }

export default function Map() {
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState({})
  const [infoRoute, setInfoRoute] = useState(null)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)
  const [hasRoute, setHasRoute] = useState(false)

  useEffect(() => {
    Promise.all([googleLoader.importLibrary("maps"), googleLoader.importLibrary("marker")]).then((response) => {
      const [mapLibrary, markerLibrary] = response
      initMap(mapLibrary.Map, markerLibrary.AdvancedMarkerElement)
    })
  }, [])

  const initMap = (Map, Marker) => {
    const map = new Map(document.getElementById("map"), {
      mapId: "latinotransitsolutions-map",
      zoom: 12,
      center: MAP_CENTER
    })

    setMap(map)

    map.addListener("click", ({ latLng: position }) => {
      if (markers.origin && markers.destination) return

      setMarkers((oldval) => {
        const target = oldval.origin ? "destination" : "origin"

        const marker = new Marker({ map, position })

        marker.addListener("click", () => {
          setMarkers((oldval) => ({ ...oldval, [target]: null }))
          marker.setMap(null)
        })

        return { ...oldval, [target]: marker }
      })
    })
  }

  const setRoute = () => {
    if (!markers.origin || !markers.destination) return

    googleLoader.importLibrary("routes").then(({ DirectionsRenderer, DirectionsService, DistanceMatrixService }) => {
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
    markers.origin?.setMap(null)
    markers.destination?.setMap(null)

    setMarkers({ origin: null, destination: null })
  }

  const onResetMap = () => {
    directionsRenderer.setDirections({ routes: [] })
    map.setZoom(12)
    map.setCenter(MAP_CENTER)
    setInfoRoute(null)
    setHasRoute(false)
  }

  return (
    <div className="flex gap-8">
      <div id="map" className="shrink-0 grow-0 w-150 h-150"></div>
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
    </div>
  )
}
