export default function Input({ label, value, type, placeholder, error, onUpdateValue }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium leading-none">{label}</label>
      <div className="w-full">
        <input value={value} onInput={({ target }) => onUpdateValue(target.value)} className={error ? "border-red-500" : ""} placeholder={placeholder} type={type} />
        <span className="text-sm h-5 text-red-500 text-right block">{error}</span>
      </div>
    </div>
  )
}
