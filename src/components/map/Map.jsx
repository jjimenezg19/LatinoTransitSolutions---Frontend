import { useEffect } from "react"

export default function Map({ deleteMarkers, onUpdateDeleteMarkers, onUpdateMap, onUpdateMarkers }) {
  const markersList = []

  useEffect(() => {
    initMap()
  }, [])

  useEffect(() => {
    if (deleteMarkers) {
      markersList.forEach((marker) => {
        marker.setMap(null)
      })

      onUpdateDeleteMarkers(false)
    }
  }, [deleteMarkers])

  const initMap = () => {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: { lat: 9.902832813099959, lng: -84.10007357597351 }
    })

    onUpdateMap(map)

    map.addListener("click", ({ latLng: position }) => {
      if (markersList.length >= 2) return

      const marker = new google.maps.Marker({ map, position })
      markersList.push(marker)

      marker.addListener("click", () => {
        marker.setMap(null)
      })

      onUpdateMarkers([...markersList])
    })
  }

  return <div id="map" className="shrink-0 grow-0 w-200 h-200"></div>
}
