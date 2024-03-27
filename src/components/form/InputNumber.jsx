import Button from "./Button"
import Input from "./Input"

export default function InputNumber({ label, value, disabled, readonly, placeholder, error, min, max, onUpdateValue }) {
  const handleInput = (val) => {
    if (disabled || readonly) return null

    val = Number(val.replace(/[^\d]/g, ""))

    if (val < Number(min)) {
      onUpdateValue(Number(min))
      return null
    }

    if (val > Number(max)) {
      onUpdateValue(Number(max))
      return null
    }

    onUpdateValue(val)
  }

  const handleButton = (action) => {
    if (disabled || readonly) return null

    const newval = value + action

    if (newval < Number(min)) {
      return null
    }

    if (newval > Number(max)) {
      return null
    }

    onUpdateValue(value + action)
  }

  return (
    <div className="lts-component flex flex-col gap-1">
      <label className="font-medium leading-none">{label}</label>
      <div className="w-full">
        <div className="w-full flex items-center">
          <Button disabled={disabled} readonly={readonly} onClick={() => handleButton(-1)} className="!pl-2 !pr-4 -mr-2">
            <i className="fas fa-minus"></i>
          </Button>
          <Input value={value} onUpdateValue={handleInput} className="w-full relative" type="text" disabled={disabled} readonly={readonly} error={error} placeholder={placeholder} noHint></Input>
          <Button disabled={disabled} readonly={readonly} onClick={() => handleButton(1)} className="!pr-2 !pl-4 -ml-2">
            <i className="fas fa-plus"></i>
          </Button>
        </div>
        <span className="error text-negative-100 text-right block">{error}</span>
      </div>
    </div>
  )
}
