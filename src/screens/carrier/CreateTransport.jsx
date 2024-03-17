import { useEffect, useState } from "react"
import Table from "../../components/display/Table"
import Input from "../../components/form/Input"
import Select from "../../components/form/Select"
import FormActions from "../../components/form/FormActions"
import ConfirmationModal from "../../components/display/ConfirmationModal"
import { axios } from "../../utils/axios.js"

export default function CreateTransport() {
  const DEFAULT_DATA = { id: null, type: "walking", name: "", maxWidth: 0, maxHeight: 0, maxLength: 0, maxWeight: 0, plate: "" }

  const [transportData, setTransportData] = useState(DEFAULT_DATA)
  const [transportsList, setTransportsList] = useState([])
  const [idTransportDelete, setIdTransportDelete] = useState(0)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTransportsList()
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setIdTransportDelete(0)
    }
  }, [isOpen])

  const heads = [
    { text: "ID", scope: "id" },
    { text: "Type", scope: "type" },
    { text: "Name", scope: "name" },
    { text: "Max width", scope: "maxWidth" },
    { text: "Max height", scope: "maxHeight" },
    { text: "Max length", scope: "maxLength" },
    { text: "Max weight", scope: "maxWeight" },
    { text: "Plate", scope: "plate" }
  ]

  const transportsOptions = [
    { text: "Walking", value: "walking" },
    { text: "Motorcycle", value: "motorcycle" },
    { text: "Pickup", value: "pickup" },
    { text: "Truck", value: "truck" }
  ]

  const onUpdateTransportData = (key, value) => {
    setTransportData((oldval) => ({ ...oldval, [key]: value }))
  }

  const onUpdateRow = ({ row }) => {
    setIsEditMode(true)
    setTransportData(row)
    document.getElementById("transportForm").scrollIntoView({ behavior: "smooth" })
  }

  const onDeleteRow = ({ row }) => {
    setIdTransportDelete(row.id)
    setIsOpen(true)
  }

  const onConfirmDeleteRow = () => {
    setLoading(true)

    axios
      .delete("/transport/delete", { data: { id: idTransportDelete } })
      .then(() => {
        getTransportsList()
      })
      .finally(() => {
        setIsOpen(false)
        setLoading(false)
      })
  }

  const onCancelUpdate = () => {
    setIsEditMode(false)
    setTransportData(DEFAULT_DATA)
  }

  const onConfirm = () => {
    setLoading(true)

    if (isEditMode) {
      axios
        .put("/transport/update", transportData)
        .then(() => {
          setTransportData(DEFAULT_DATA)
          getTransportsList()
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      axios
        .post("/transport/create", transportData)
        .then(() => {
          setTransportData(DEFAULT_DATA)
          getTransportsList()
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const getTransportsList = () => {
    axios.get("/transport/all").then((response) => {
      setTransportsList(response)
    })
  }

  return (
    <section className="w-full h-full flex flex-col md:flex-row gap-10 md:gap-6 md:justify-center">
      <div id="transportForm" className="w-full max-w-2xl shrink-0 grow-0 md:shrink md:grow md:max-h-full flex flex-col items-center m-auto gap-3 md:gap-6 overflow-y-auto md:pr-2">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-2xl md:text-4xl font-bold">Register transport</h3>
          <p className="text-sm md:text-base text-word/70">Please fill in the form below to register your transport.</p>
        </div>

        <div className="w-full grid lg:grid-cols-2 gap-1 md:gap-y-2 md:gap-x-4">
          <Select value={transportData.type} onUpdateValue={(val) => onUpdateTransportData("type", val)} label="Type" placeholder="Select type" options={transportsOptions}></Select>
          <Input value={transportData.name} onUpdateValue={(val) => onUpdateTransportData("name", val)} label="Name" placeholder="Enter transport name"></Input>
          <Input value={transportData.maxWidth} onUpdateValue={(val) => onUpdateTransportData("maxWidth", val)} label="Max width" placeholder="Enter max width"></Input>
          <Input value={transportData.maxHeight} onUpdateValue={(val) => onUpdateTransportData("maxHeight", val)} label="Max height" placeholder="Enter max height"></Input>
          <Input value={transportData.maxLength} onUpdateValue={(val) => onUpdateTransportData("maxLength", val)} label="Max length" placeholder="Enter max length"></Input>
          <Input value={transportData.maxWeight} onUpdateValue={(val) => onUpdateTransportData("maxWeight", val)} label="Max weight" placeholder="Enter max weight"></Input>
          {transportData.type !== "walking" ? <Input value={transportData.plate} onUpdateValue={(val) => onUpdateTransportData("plate", val)} label="Plate" placeholder="Enter transport plate"></Input> : null}
        </div>

        <FormActions loading={loading} target="transport" isEditMode={isEditMode} onCancel={onCancelUpdate} onConfirm={onConfirm}></FormActions>
      </div>

      <Table onUpdate={onUpdateRow} onDelete={onDeleteRow} heads={heads} data={transportsList} actions={["update", "delete", "duplicate"]} className="w-full md:max-w-[900px] shrink-0 grow-0 md:shrink md:grow md:max-h-full pb-2"></Table>

      <ConfirmationModal loading={loading} width="500" open={isOpen} onCancel={() => setIsOpen(false)} onConfirm={onConfirmDeleteRow}>
        <p className="text-lg md:text-xl font-bold">Are you sure to delete the transport with id #{idTransportDelete}?</p>
        <p className="text-sm md:text-base">This action cannot be reversed</p>
      </ConfirmationModal>
    </section>
  )
}
