export default function Input({ label, value, placeholder, error, min, max, onUpdateValue }) {
  const handleInput = (val) => {
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
    const newval = value + action

    console.log(newval)

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
        <div className="flex items-center">
          <div onClick={() => handleButton(-1)} className="h-8 md:h-10 flex items-center justify-center shrink-0 grow-0 px-1 md:px-2 pr-2 md:pr-4 -mr-1 md:-mr-2 bg-primary-100 hover:bg-primary-200 active:bg-primary-300 rounded-tl-md rounded-bl-md cursor-pointer">
            <i className="fas fa-minus text-sm md:text-base text-buttonword-100"></i>
          </div>
          <input value={value} onInput={({ target }) => handleInput(target.value)} className={`${error ? "border-negative-100" : ""} relative`} placeholder={placeholder} type="text" />
          <div onClick={() => handleButton(1)} className="h-8 md:h-10 flex items-center justify-center shrink-0 grow-0 px-1 md:px-2 pl-2 md:pl-4 -ml-1 md:-ml-2 bg-primary-100 hover:bg-primary-200 active:bg-primary-300 rounded-tr-md rounded-br-md cursor-pointer">
            <i className="fas fa-plus text-sm md:text-base text-buttonword-100"></i>
          </div>
        </div>
        <span className="error text-negative-100 text-right block">{error}</span>
      </div>
    </div>
  )
}
