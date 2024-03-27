import Button from "./Button"
import Input from "./Input"

export default function InputNumber({ label, value, disabled, readonly, placeholder, error, min, max, onUpdateValue }) {
  min = min ? Number(min) : null
  max = max ? Number(max) : null

  let interval = null

  if (min !== null && value < min) {
    value = min
    onUpdateValue(value)
  }

  if (max !== null && value > max) {
    value = max
    onUpdateValue(value)
  }

  const handleInput = (val) => {
    if (disabled || readonly) return null

    val = Number(val.replace(/[^\d]/g, ""))

    if (min !== null && val < min) {
      val = min
    }

    if (max !== null && val > max) {
      val = max
    }

    onUpdateValue(val)
  }

  const handleButton = (action) => {
    if (disabled || readonly) return null

    const newval = value + action

    if (min !== null && newval < min) {
      return null
    }

    if (max !== null && newval > max) {
      return null
    }

    onUpdateValue(value + action)
  }

  return (
    <div className="lts-component flex flex-col gap-1">
      <label className="font-medium leading-none">{label}</label>
      <div className="w-full">
        <div className="w-full flex items-center">
          <Button disabled={disabled || (min !== null && value <= min)} readonly={readonly} onClick={() => handleButton(-1)} className="!pl-2 !pr-4 -mr-2">
            <i className="fas fa-minus"></i>
          </Button>
          <Input value={value} onUpdateValue={handleInput} className="w-full relative" type="text" disabled={disabled} readonly={readonly} error={error} placeholder={placeholder} noHint></Input>
          <Button disabled={disabled || (max !== null && value >= max)} readonly={readonly} onClick={() => handleButton(1)} className="!pr-2 !pl-4 -ml-2">
            <i className="fas fa-plus"></i>
          </Button>
        </div>
        <span className="error text-negative-100 text-right block">{error}</span>
      </div>
    </div>
  )
}
