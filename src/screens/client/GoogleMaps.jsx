import { useEffect, useState } from "react"
import Map from "../../components/map/Map"
import MapControls from "../../components/map/MapControls"

export default function GoogleMaps() {
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [deleteMarkers, setDeleteMarkers] = useState(false)

  return (
    <div className="flex gap-8 w-full">
      <Map deleteMarkers={deleteMarkers} onUpdateDeleteMarkers={setDeleteMarkers} markers={markers} onUpdateMap={setMap} onUpdateMarkers={setMarkers} />
      <MapControls map={map} markers={markers} onClearMarkers={setDeleteMarkers} />
    </div>
  )
}
