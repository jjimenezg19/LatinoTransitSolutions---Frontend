export default function Input({ label, value, type, disabled, readonly, placeholder, error, noHint, className, onUpdateValue }) {
  return (
    <div className={`${className} lts-component flex flex-col gap-1`}>
      {label && <label className="font-medium leading-none">{label}</label>}
      <div className="w-full">
        <input value={value} onInput={({ target }) => (!disabled && !readonly && onUpdateValue ? onUpdateValue(target.value) : null)} className={`${error ? "!border-negative-100" : ""}`} placeholder={placeholder} type={type} disabled={disabled} readOnly={readonly} />
        {!noHint && <span className="error text-negative-100 text-right block">{error}</span>}
      </div>
    </div>
  )
}
