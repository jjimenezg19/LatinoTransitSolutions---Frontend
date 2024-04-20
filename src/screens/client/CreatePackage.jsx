import { useEffect, useState } from "react"
import { axios } from "../../utils/axios.js"
import { useSystemStore } from "../../stores/system.js"
import { notify } from "../../utils/notify.js"

import Table from "../../components/display/Table.jsx"
import Input from "../../components/form/Input.jsx"
import InputNumber from "../../components/form/InputNumber.jsx"
import FormActions from "../../components/form/FormActions.jsx"
import ConfirmationModal from "../../components/display/ConfirmationModal.jsx"

export default function CreatePackage() {
  const { currentUser } = useSystemStore()

  const DEFAULT_DATA = { id: null, type: "", name: "", description: "", price: 0, width: 0, height: 0, length: 0, weight: 0 }

  const [packageData, setPackageData] = useState(DEFAULT_DATA)
  const [packagesList, setPackagesList] = useState([])
  const [packageDelete, setPackageDelete] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPackagesList()
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setPackageDelete({})
    }
  }, [isOpen])

  const heads = [
    { text: "ID", scope: "id" },
    { text: "Type", scope: "type" },
    { text: "Name", scope: "name" },
    { text: "Description", scope: "description" },
    { text: "Price", scope: "price", prepend: "$" },
    { text: "Width", scope: "width" },
    { text: "Height", scope: "height" },
    { text: "Length", scope: "length" },
    { text: "Weight", scope: "weight" }
  ]

  const onUpdatePackageData = (key, value) => {
    setPackageData((oldvalue) => ({ ...oldvalue, [key]: value }))
  }

  const onTableAction = ({ type, row }) => {
    switch (type) {
      case "update":
        onUpdateRow(row)
        break
      case "delete":
        onDeleteRow(row)
        break
      case "duplicate":
        break
    }
  }

  const onUpdateRow = (data) => {
    setIsEditMode(true)
    setPackageData(data)
    document.getElementById("packageForm").scrollIntoView({ behavior: "smooth" })
  }

  const onDeleteRow = (data) => {
    setPackageDelete(data)
    setIsOpen(true)
  }

  const onConfirmDeleteRow = () => {
    setLoading(true)

    axios
      .delete("/package/delete", { data: { id: packageDelete.id } })
      .then(() => {
        notify("Package deleted successfully", "success")
        getPackagesList()

        if (packageDelete.id === packageData.id) {
          setIsEditMode(false)
          setPackageData(DEFAULT_DATA)
        }
      })
      .catch(() => {
        notify("There was an error deleting the package", "error")
      })
      .finally(() => {
        setIsOpen(false)
        setLoading(false)
        setPackageDelete({})
      })
  }

  const onCancelUpdate = () => {
    setIsEditMode(false)
    setPackageData(DEFAULT_DATA)
  }

  const onConfirm = () => {
    setLoading(true)
    const idUser = currentUser.id
    console.log(idUser)

    if (isEditMode) {
      axios
        .put("/package/update", packageData)
        .then(() => {
          notify("Package updated successfully", "success")
          setPackageData(DEFAULT_DATA)
          getPackagesList()
        })
        .catch(() => {
          notify("There was an error updating the package", "error")
        })
        .finally(() => {
          setLoading(false)
          setIsEditMode(false)
        })
    } else {
      axios
        .post("/package/create", { ...packageData, idUser })
        .then(() => {
          notify("Package created successfully", "success")
          setPackageData(DEFAULT_DATA)
          getPackagesList()
        })
        .catch(() => {
          notify("There was an error creating the package", "error")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const getPackagesList = () => {
    axios.get(`/package/get-my-packages/${currentUser.id}`).then((response) => {
      setPackagesList(response)
    })
  }

  return (
    <section className="w-full h-full flex flex-col md:flex-row gap-10 md:gap-6 md:justify-center">
      <div id="packageForm" className="w-full max-w-2xl shrink-0 grow-0 md:shrink md:grow md:max-h-full flex flex-col items-center mx-auto md:m-auto gap-3 md:gap-6 overflow-y-auto md:pr-2">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-2xl md:text-4xl font-bold">Register package</h3>
          <p className="text-sm md:text-base text-word-200">Please fill in the form below to register your package.</p>
        </div>

        <div className="w-full grid lg:grid-cols-2 gap-1 md:gap-y-4 md:gap-x-4">
          <Input noHint value={packageData.name} onUpdateValue={(val) => onUpdatePackageData("name", val)} label="Name" placeholder="Enter package name"></Input>
          <Input noHint value={packageData.description} onUpdateValue={(val) => onUpdatePackageData("description", val)} label="Description" placeholder="Enter package description"></Input>
          <Input noHint value={packageData.price} onUpdateValue={(val) => onUpdatePackageData("price", val)} label="Price" placeholder="Enter package price"></Input>
          <InputNumber noHint value={packageData.width} onUpdateValue={(val) => onUpdatePackageData("width", val)} label="Width (m)" placeholder="Enter width" min="0"></InputNumber>
          <InputNumber noHint value={packageData.height} onUpdateValue={(val) => onUpdatePackageData("height", val)} label="Height (m)" placeholder="Enter height" min="0"></InputNumber>
          <InputNumber noHint value={packageData.length} onUpdateValue={(val) => onUpdatePackageData("length", val)} label="Length (m)" placeholder="Enter length" min="0"></InputNumber>
          <InputNumber noHint value={packageData.weight} onUpdateValue={(val) => onUpdatePackageData("weight", val)} label="Weight (kg)" placeholder="Enter weight" min="0"></InputNumber>
        </div>

        <FormActions loading={loading} target="package" isEditMode={isEditMode} onCancel={onCancelUpdate} onConfirm={onConfirm}></FormActions>
      </div>

      <Table heads={heads} data={packagesList} onTableAction={onTableAction} actions={["update", "delete"]} className="w-full md:max-w-[900px] shrink-0 grow-0 md:shrink md:grow md:max-h-full pb-2"></Table>

      <ConfirmationModal loading={loading} width="500" open={isOpen} onCancel={() => setIsOpen(false)} onConfirm={onConfirmDeleteRow}>
        <p className="text-lg md:text-xl font-bold">Delete transport {packageDelete.name}</p>
        <p className="text-sm md:text-base">Are you sure to delete the package with id #{packageDelete.id}?</p>
        <p className="text-sm md:text-sm font-bold text-orange-400 mt-4">
          <i className="fas fa-warning"></i> This action cannot be reversed
        </p>
      </ConfirmationModal>
    </section>
  )
}
