import { useEffect } from "react"
import googleLoader from "../../utils/google.js"

export default function Map({ deleteMarkers, onUpdateDeleteMarkers, onUpdateMap, onUpdateMarkers }) {
  const markersList = []

  useEffect(() => {
    Promise.all([googleLoader.importLibrary("maps"), googleLoader.importLibrary("marker")]).then((response) => {
      const [mapLibrary, markerLibrary] = response
      initMap(mapLibrary.Map, markerLibrary.AdvancedMarkerElement)
    })
  }, [])

  // useEffect(() => {
  //   if (deleteMarkers) {
  //     markersList.forEach((marker) => {
  //       marker.setMap(null)
  //     })

  //     onUpdateDeleteMarkers(false)
  //   }
  // }, [deleteMarkers])

  const initMap = (Map, AdvancedMarkerElement) => {
    const map = new Map(document.getElementById("map"), {
      mapId: "latinotransitsolutions-map",
      zoom: 16,
      center: { lat: 9.902832813099959, lng: -84.10007357597351 }
    })

    onUpdateMap(map)

    map.addListener("click", ({ latLng: position }) => {
      if (markersList.length >= 2) return

      const marker = new AdvancedMarkerElement({ map, position })
      markersList.push(marker)

      marker.addListener("click", () => {
        marker.setMap(null)
      })

      onUpdateMarkers([...markersList])
    })
  }

  return <div id="map" className="shrink-0 grow-0 w-150 h-150"></div>
}
