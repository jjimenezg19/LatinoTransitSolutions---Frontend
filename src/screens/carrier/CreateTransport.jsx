import { useEffect, useState } from "react"
import Table from "../../components/display/Table"
import Input from "../../components/form/Input"
import Select from "../../components/form/Select"
import FormActions from "../../components/form/FormActions"
import ConfirmationModal from "../../components/display/ConfirmationModal"

export default function CreateTransport() {
  const DEFAULT_DATA = { id: null, type: "walking", name: "", max_width: 0, max_height: 0, max_length: 0, max_weight: 0, plate: "" }

  const [transportData, setTransportData] = useState(DEFAULT_DATA)
  const [idTransportDelete, setIdTransportDelete] = useState(0)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setIdTransportDelete(0)
    }
  }, [isOpen])

  const heads = [
    { text: "ID", scope: "id" },
    { text: "Type", scope: "type" },
    { text: "Name", scope: "name" },
    { text: "Max width", scope: "max_width" },
    { text: "Max height", scope: "max_height" },
    { text: "Max length", scope: "max_length" },
    { text: "Max weight", scope: "max_weight" },
    { text: "Plate", scope: "plate" },
    { text: "Actions", scope: null }
  ]

  const [data, setData] = useState([
    {
      id: "1",
      type: "pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "2",
      type: "motorcycle",
      name: "Bajaj",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "3",
      type: "truck",
      name: "Hyunday",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "4",
      type: "walking",
      name: "Harold",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      max_weight: 40
    },
    {
      id: "1",
      type: "pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "2",
      type: "motorcycle",
      name: "Bajaj",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "3",
      type: "truck",
      name: "Hyunday",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "4",
      type: "walking",
      name: "Harold",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      max_weight: 40
    },
    {
      id: "1",
      type: "pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "2",
      type: "motorcycle",
      name: "Bajaj",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "3",
      type: "truck",
      name: "Hyunday",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "4",
      type: "walking",
      name: "Harold",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      max_weight: 40
    }
  ])

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

    setTimeout(() => {
      console.log(`Row with id #${idTransportDelete} deleted`)
      setIsOpen(false)
      setLoading(false)
    }, 1000)
  }

  const onCancelUpdate = () => {
    setIsEditMode(false)
    setTransportData(DEFAULT_DATA)
  }

  const onConfirm = () => {
    setLoading(true)

    setTimeout(() => {
      if (isEditMode) {
        console.log("Row updated")
      } else {
        setData((oldval) => [...oldval, transportData])
        setTransportData(DEFAULT_DATA)
      }

      setLoading(false)
    }, 1000)
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
          <Input value={transportData.max_width} onUpdateValue={(val) => onUpdateTransportData("max_width", val)} label="Max width" placeholder="Enter max width"></Input>
          <Input value={transportData.max_height} onUpdateValue={(val) => onUpdateTransportData("max_height", val)} label="Max height" placeholder="Enter max height"></Input>
          <Input value={transportData.max_length} onUpdateValue={(val) => onUpdateTransportData("max_length", val)} label="Max length" placeholder="Enter max length"></Input>
          <Input value={transportData.max_weight} onUpdateValue={(val) => onUpdateTransportData("max_weight", val)} label="Max weight" placeholder="Enter max weight"></Input>
          {transportData.type !== "walking" ? <Input value={transportData.plate} onUpdateValue={(val) => onUpdateTransportData("plate", val)} label="Plate" placeholder="Enter transport plate"></Input> : null}
        </div>

        <FormActions loading={loading} target="transport" isEditMode={isEditMode} onCancel={onCancelUpdate} onConfirm={onConfirm}></FormActions>
      </div>

      <Table onUpdate={onUpdateRow} onDelete={onDeleteRow} className="w-full md:max-w-[900px] shrink-0 grow-0 md:shrink md:grow md:max-h-full pb-2" heads={heads} data={data} actions={["update", "delete", "goto"]}></Table>

      <ConfirmationModal loading={loading} width="500" open={isOpen} onCancel={() => setIsOpen(false)} onConfirm={onConfirmDeleteRow}>
        <p className="text-lg md:text-xl font-bold">Are you sure to delete the transport with id #{idTransportDelete}?</p>
        <p className="text-sm md:text-base">This action cannot be reversed</p>
      </ConfirmationModal>
    </section>
  )
}
