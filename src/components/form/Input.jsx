export default function Input({ label, value, type, placeholder, error, onUpdateValue }) {
  return (
    <div className="lts-component flex flex-col gap-1">
      <label className="font-medium leading-none">{label}</label>
      <div className="w-full">
        <input value={value} onInput={({ target }) => onUpdateValue(target.value)} className={error ? "border-negative-100" : ""} placeholder={placeholder} type={type} />
        <span className="error text-negative-100 text-right block">{error}</span>
      </div>
    </div>
  )
}
