import { useEffect, useState } from "react"
import { googleLoader } from "../../utils/google.js"

const MAP_CENTER = { lat: 9.902832813099959, lng: -84.10007357597351 }

export default function Map({ actions, onUpdateMap, onUpdateMarkers, onUpdateActions }) {
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    googleLoader("maps", "marker").then(([{ Map }, { AdvancedMarkerElement }]) => {
      initMap(Map, AdvancedMarkerElement)
    })
  }, [])

  useEffect(() => {
    onUpdateMarkers(markers)
  }, [markers])

  useEffect(() => {
    if (actions.deleteMarkers) {
      onClearMarkers()
    }

    if (actions.resetMap) {
      onResetMap()
    }
  }, [actions])

  const changeAction = (action) => {
    onUpdateActions((oldval) => ({ ...oldval, [action]: false }))
  }

  const initMap = (Map, Marker) => {
    const map = new Map(document.getElementById("map"), {
      mapId: "latinotransitsolutions-map",
      zoom: 12,
      center: MAP_CENTER
    })

    setMap(map)
    onUpdateMap(map)

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

  const onResetMap = () => {
    map.setZoom(12)
    map.setCenter(MAP_CENTER)
    changeAction("resetMap")
  }

  const onClearMarkers = () => {
    markers.origin?.setMap(null)
    markers.destination?.setMap(null)

    setMarkers({ origin: null, destination: null })
    changeAction("deleteMarkers")
  }

  return <div id="map" className="shrink-0 grow-0 w-150 h-150"></div>
}
