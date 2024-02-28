import { useEffect } from "react"

export default function GoogleMaps() {
  const markers = []
  const directionsRenderer = new google.maps.DirectionsRenderer()

  useEffect(() => {
    initMap()
  })

  const initMap = () => {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: 9.902832813099959, lng: -84.10007357597351 }
    })

    map.addListener("click", ({ latLng: position }) => {
      if (markers.length >= 2) return

      const marker = new google.maps.Marker({ map, position })
      markers.push(marker)

      // marker.addListener("click", () => {
      //   marker.setMap(null)
      //   markers.pop()
      // })
    })

    directionsRenderer.setMap(map)
  }

  const clearMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null)
    })
  }

  const setRoute = () => {
    const directionsService = new google.maps.DirectionsService()
    const distanceMatrixService = new google.maps.DistanceMatrixService()

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
        const info = response.rows[0].elements[0]
        document.getElementById("distanceEle").innerText = info?.distance.text
        document.getElementById("durationEle").innerText = info?.duration.text
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

    clearMarkers()
  }

  return (
    <div className="flex gap-8 w-full">
      <div id="map" className="shrink-0 grow-0 w-200 h-200"></div>

      <div className="flex flex-col gap-4">
        <button onClick={setRoute} className="base-button">
          Start route
        </button>
        <div>
          Distance: <span id="distanceEle"></span>
        </div>
        <div>
          Duration: <span id="durationEle"></span>
        </div>
      </div>
    </div>
  )
}
