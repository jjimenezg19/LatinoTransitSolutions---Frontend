export default function Button({ size, type, color, squared, disabled, readonly, className, children, onClick }) {
  size = size || "md"
  type = disabled ? "disabled" : type || "regular"
  color = color || "primary"

  const buttonSizes = {
    xs: `h-6 text-xs ${!squared ? "px-1" : "w-6"}`,
    sm: `h-6 text-xs md:h-8 md:text-sm ${!squared ? "px-1 md:px-2" : "w-6 md:w-8"}`,
    md: `h-8 text-sm md:h-10 md:text-base ${!squared ? "px-2 md:px-3" : "w-8 md:w-10"}`
  }

  const buttonColors = {
    regular: `bg-${color}-100 border-transparent text-buttonword-100 ${!readonly ? `hover:bg-${color}-200 active:bg-${color}-300 cursor-pointer` : ""}`,
    outlined: `bg-trasparent border-${color}-100 text-${color}-100 ${!readonly ? `hover:border-${color}-200 hover:text-${color}-200 active:border-${color}-300 active:text-${color}-300 cursor-pointer` : ""}`,
    flat: `bg-transparent border-transparent text-${color}-100 ${!readonly ? `hover:bg-${color}-100/20 active:bg-${color}-100/30 cursor-pointer` : ""}`,
    disabled: `bg-${color}-100/50 border-transparent text-buttonword-100/70 cursor-not-allowed`
  }

  return (
    <button disabled={disabled || readonly} onClick={!disabled && !readonly ? onClick : null} className={`${buttonSizes[size]} ${buttonColors[type]} ${className} flex justify-center items-center rounded-md border-2 font-semibold`}>
      {children}
    </button>
  )
}
