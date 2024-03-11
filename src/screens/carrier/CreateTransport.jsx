import { useEffect, useState } from "react"
import Table from "../../components/display/Table"
import Input from "../../components/form/Input"
import Select from "../../components/form/Select"
import FormActions from "../../components/form/FormActions"

export default function CreateTransport() {
  const [transportType, setTransportType] = useState("walking")
  const [action, setAction] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)

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

  const data = [
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    },
    {
      id: "1",
      type: "Pickup",
      name: "Toyota",
      max_width: 10,
      max_height: 20,
      max_length: 30,
      plate: "ABC123",
      max_weight: 40
    }
  ]

  const transportsOptions = [
    { text: "Walking", value: "walking" },
    { text: "Motorcycle", value: "motorcycle" },
    { text: "Pickup", value: "pickup" },
    { text: "Truck", value: "truck" }
  ]

  const onUpdateRow = ({ row }) => {
    setIsEditMode(true)
    console.log(row)
  }

  const onDeleteRow = ({ row }) => {
    console.log("Confirmation modal", row)
  }

  const onCancelUpdate = () => {
    setIsEditMode(false)
  }

  const onConfirm = () => {
    if (isEditMode) {
      console.log("Row updated")
    } else {
      console.log("Row created")
    }
  }

  return (
    <section className="w-full h-full flex flex-col md:flex-row gap-10 md:gap-6 md:justify-center">
      <div className="w-full max-w-2xl shrink-0 grow-0 md:shrink md:grow md:max-h-full flex flex-col items-center m-auto gap-3 md:gap-6 overflow-y-auto md:pr-2">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-2xl md:text-4xl font-bold">Register transport</h3>
          <p className="text-sm md:text-base text-word/70">Please fill in the form below to register your transport.</p>
        </div>

        <div className="w-full grid lg:grid-cols-2 gap-1 md:gap-y-2 md:gap-x-4">
          <Select value={transportType} onUpdateValue={setTransportType} label="Type" placeholder="Select type" options={transportsOptions}></Select>
          <Input label="Name" placeholder="Enter transport name"></Input>
          <Input label="Max width" placeholder="Enter max width"></Input>
          <Input label="Max height" placeholder="Enter max height"></Input>
          <Input label="Max length" placeholder="Enter max length"></Input>
          <Input label="Max weight" placeholder="Enter max weight"></Input>
          {transportType !== "walking" ? <Input label="Plate" placeholder="Enter transport plate"></Input> : null}
        </div>

        <FormActions target="transport" isEditMode={isEditMode} onCancel={onCancelUpdate} onConfirm={onConfirm}></FormActions>
      </div>

      <Table onUpdate={onUpdateRow} onDelete={onDeleteRow} className="w-full shrink-0 grow-0 md:shrink md:grow md:max-h-full" heads={heads} data={data} actions={["update", "delete"]}></Table>
    </section>
  )
}
