export default function Input({ label, value, disabled, readonly, placeholder, error, noHint, className, options, onUpdateValue }) {
  return (
    <div className={`${className} lts-component flex flex-col gap-1`}>
      <label className="font-medium leading-none">{label}</label>
      <div className="w-full">
        <select value={value} onChange={({ target }) => (!disabled && !readonly && onUpdateValue ? onUpdateValue(target.value) : null)} className={`${error ? "!border-negative-100" : ""}`} placeholder={placeholder} disabled={disabled} readOnly={readonly}>
          <option hidden>{placeholder}</option>
          {(options || []).map((option, index) => (
            <option disabled={readonly && option.value !== value} key={"option_" + index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        {!noHint && <span className="error text-negative-100 text-right block">{error}</span>}
      </div>
    </div>
  )
}
