import { useEffect, useState } from "react"
import { axios } from "../../utils/axios.js"
import { notify } from "../../utils/notify.js"
import { useSystemStore } from "../../stores/system.js"

import Table from "../../components/display/Table"
import Input from "../../components/form/Input"
import Select from "../../components/form/Select"
import Button from "../../components/form/Button"
import FormActions from "../../components/form/FormActions"
import ConfirmationModal from "../../components/display/ConfirmationModal"
import Modal from "../../components/display/Modal"
import Map from "../../components/map/Map"
import { find } from "lodash"

export default function CreateRoute() {
  const { currentUser } = useSystemStore()

  const DEFAULT_DATA = { id: null, type: "walking", name: "", description: "", distance: "", startPoint: { coordinate: { latitude: "", longitude: "" } }, endPoint: { coordinate: { latitude: "", longitude: "" } } }

  const [routeData, setRouteData] = useState(DEFAULT_DATA)
  const [routeDetails, setRouteDetails] = useState({})
  const [routesList, setRoutesList] = useState([])
  const [routeDelete, setRouteDelete] = useState({})
  const [routeOnMap, setRouteOnMap] = useState(null)
  const [markers, setMarkers] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [unassignedTransportsList, setUnassignedTransportsList] = useState([])
  const [transportOptions, setTransportOptions] = useState([])
  const [assignedTransportsList, setAssignedTransportsList] = useState([])
  const [transportSelected, setTransportSelected] = useState(null)
  const [routeSelected, setRouteSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resetMap, setResetMap] = useState(false)

  useEffect(() => {
    getRoutesList()
  }, [])

  useEffect(() => {
    if (routeData.id >= 1) {
      const { latitude: startLatitude, longitude: startLongitude } = routeData.startPoint.coordinate
      const { latitude: endLatitude, longitude: endLongitude } = routeData.endPoint.coordinate

      setRouteOnMap({
        origin: { lat: Number(startLatitude), lng: Number(startLongitude) },
        destination: { lat: Number(endLatitude), lng: Number(endLongitude) }
      })
    }
  }, [routeData])

  useEffect(() => {
    if (!isOpen) {
      setRouteDelete({})
    }
  }, [isOpen])

  useEffect(() => {
    if (markers.origin) {
      const { lat: latitude, lng: longitude } = markers.origin
      setRouteData((oldvalue) => ({ ...oldvalue, startPoint: { coordinate: { latitude, longitude } } }))
    } else {
      setRouteData((oldvalue) => ({ ...oldvalue, startPoint: { coordinate: { latitude: "", longitude: "" } } }))
    }

    if (markers.destination) {
      const { lat: latitude, lng: longitude } = markers.destination
      setRouteData((oldvalue) => ({ ...oldvalue, endPoint: { coordinate: { latitude, longitude } } }))
    } else {
      setRouteData((oldvalue) => ({ ...oldvalue, endPoint: { coordinate: { latitude: "", longitude: "" } } }))
    }
  }, [markers])

  useEffect(() => {
    if (routeSelected) {
      getUnassignedTransports()
      getAssignedTransports()
    }
  }, [routeSelected])

  const heads = [
    { text: "ID", scope: "id" },
    { text: "Type", scope: "type" },
    { text: "Name", scope: "name" },
    { text: "Distance", scope: "distance", append: " km" }
  ]

  const transportHeads = [
    { text: "ID", scope: "id" },
    { text: "Type", scope: "type" },
    { text: "Name", scope: "name" }
  ]

  const onUpdateRouteData = (key, value) => {
    setRouteData((oldvalue) => ({ ...oldvalue, [key]: value }))
  }

  const onTableAction = ({ type, row }) => {
    switch (type) {
      case "update":
        onUpdateRow(row)
        break
      case "delete":
        onDeleteRow(row)
        break
      case "transport":
        setRouteSelected(row)
        break
    }
  }

  const onUpdateRow = (data) => {
    setIsEditMode(true)
    setRouteData(data)
    document.getElementById("routeForm").scrollIntoView({ behavior: "smooth" })
  }

  const onDeleteRow = (data) => {
    setRouteDelete(data)
    setIsOpen(true)
  }

  const onConfirmDeleteRow = () => {
    setLoading(true)

    axios
      .delete("/route/delete", { data: { id: routeDelete.id } })
      .then(() => {
        notify("Route deleted successfully", "success")
        getRoutesList()

        if (routeDelete.id === routeData.id) {
          setIsEditMode(false)
          setRouteData(DEFAULT_DATA)
        }
      })
      .catch(() => {
        notify("There was an error deleting the route", "error")
      })
      .finally(() => {
        setIsOpen(false)
        setLoading(false)
        setRouteDelete({})
      })
  }

  const onCancelUpdate = () => {
    setIsEditMode(false)
    setRouteData(DEFAULT_DATA)
  }

  const onConfirm = () => {
    setLoading(true)

    if (isEditMode) {
      axios
        .put("/route/update", {
          id: routeData.id,
          name: routeData.name,
          description: routeData.description
        })
        .then(() => {
          notify("Route updated successfully", "success")
          setRouteData(DEFAULT_DATA)
          getRoutesList()
        })
        .catch(() => {
          notify("There was an error updating the route", "error")
        })
        .finally(() => {
          setLoading(false)
          setIsEditMode(false)
        })
    } else {
      axios
        .post("/route/create", {
          idCarrier: currentUser.id,
          name: routeData.name,
          description: routeData.description,
          startLatitude: routeData.startPoint.coordinate.latitude,
          startLongitude: routeData.startPoint.coordinate.longitude,
          endLatitude: routeData.endPoint.coordinate.latitude,
          endLongitude: routeData.endPoint.coordinate.longitude,
          distance: (routeDetails.distance.value / 1000).toFixed(2)
        })
        .then(() => {
          notify("Route created successfully", "success")
          setRouteData(DEFAULT_DATA)
          setResetMap(true)
          getRoutesList()
        })
        .catch(() => {
          notify("There was an error creating the route", "error")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const onAssignTransport = () => {
    axios
      .post("/route/assign-transport", { idCarrier: currentUser.id, transport: transportSelected, route: routeSelected })
      .then(() => {
        getUnassignedTransports()
        getAssignedTransports()
        setTransportSelected(null)
        notify("Transport assigned successfully", "success")
      })
      .catch((error) => {
        notify(error, "error")
      })
  }

  const onSelectTransport = (value) => {
    const transportFound = find(unassignedTransportsList, ({ id }) => id == value)
    setTransportSelected(transportFound || null)
  }

  const getRoutesList = () => {
    axios.get(`/route/get-my-routes/${currentUser.id}`).then((response) => {
      setRoutesList(response)
    })
  }

  const getUnassignedTransports = () => {
    axios.get(`/transport/get-my-unassigned-transports/${currentUser.id}`).then((response) => {
      setTransportOptions(response.map(({ id, name }) => ({ text: `#${id} - ${name}`, value: id })))
      setUnassignedTransportsList(response)
    })
  }

  const getAssignedTransports = () => {
    axios.get(`/route/get-transports-route/${routeSelected.id}`).then((response) => {
      setAssignedTransportsList(response)
    })
  }

  const closeModal = () => {
    setRouteSelected(null)
    setTransportSelected(null)
  }

  return (
    <section className="w-full h-full flex flex-col md:flex-row gap-10 md:gap-6 md:justify-center">
      <div id="routeForm" className="w-full max-w-2xl shrink-0 grow-0 md:shrink md:grow md:max-h-full flex flex-col items-center mx-auto md:m-auto gap-4 overflow-y-auto md:pr-2">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-2xl md:text-4xl font-bold">Register route</h3>
          <p className="text-sm md:text-base text-word-200">Please fill in the form below to register your route.</p>
        </div>

        <div className="w-full grid lg:grid-cols-2 gap-1 md:gap-y-2 md:gap-x-4">
          <Input noHint value={routeData.name} onUpdateValue={(val) => onUpdateRouteData("name", val)} label="Name" placeholder="Enter route name"></Input>
          <Input noHint value={routeData.description} onUpdateValue={(val) => onUpdateRouteData("description", val)} label="Description" placeholder="Enter route description"></Input>
        </div>

        <Map className="!min-h-80 !min-w-full" route={routeOnMap} controls={!isEditMode} readonly={isEditMode} reset={resetMap} mapId="register-route" onUpdateMarkers={setMarkers} onUpdateRouteDetails={setRouteDetails} onUpdateResetMap={setResetMap}></Map>

        <div className="w-full grid lg:grid-cols-2 gap-1 md:gap-y-4 md:gap-x-4">
          <Input noHint value={routeData.startPoint.coordinate.latitude} label="Start latitude" placeholder="Choose route" readonly></Input>
          <Input noHint value={routeData.startPoint.coordinate.longitude} label="Start longitude" placeholder="Choose route" readonly></Input>
          <Input noHint value={routeData.endPoint.coordinate.latitude} label="End latitude" placeholder="Choose route" readonly></Input>
          <Input noHint value={routeData.endPoint.coordinate.longitude} label="End longitude" placeholder="Choose route" readonly></Input>
        </div>

        <FormActions loading={loading} target="route" isEditMode={isEditMode} onCancel={onCancelUpdate} onConfirm={onConfirm}></FormActions>
      </div>

      <Table heads={heads} data={routesList} onTableAction={onTableAction} actions={["update", "delete", "transport"]} className="w-full md:max-w-[900px] shrink-0 grow-0 md:shrink md:grow md:max-h-full pb-2"></Table>

      <ConfirmationModal loading={loading} width="500" open={isOpen} onCancel={() => setIsOpen(false)} onConfirm={onConfirmDeleteRow}>
        <p className="text-lg md:text-xl font-bold">Delete route {routeDelete.name}</p>
        <p className="text-sm md:text-base">Are you sure to delete the route with id #{routeDelete.id}?</p>
        <p className="text-sm md:text-sm font-bold text-orange-400 mt-4">
          <i className="fas fa-warning"></i> This action cannot be reversed
        </p>
      </ConfirmationModal>

      <Modal width="800" className="h-130" open={routeSelected} onClose={closeModal}>
        <div className="flex flex-col gap-4 h-full">
          <p className="shrink-0 grow-0 text-lg md:text-xl font-bold">Assign transport to route "{routeSelected?.name}"</p>
          <div className="shrink-0 grow-0 w-full flex items-end gap-4">
            <Select onUpdateValue={onSelectTransport} noHint options={transportOptions} label="Transports list" placeholder="Choose a transport to assign"></Select>
            <Button disabled={!transportSelected} onClick={onAssignTransport}>
              Assign
            </Button>
          </div>
          <Table className="h-10 shrink grow" heads={transportHeads} data={assignedTransportsList}></Table>
        </div>
      </Modal>
    </section>
  )
}
