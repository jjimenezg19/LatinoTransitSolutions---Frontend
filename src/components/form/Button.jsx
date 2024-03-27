export default function Button({ size, type, color, disabled, readonly, className, children, onClick }) {
  size = size || "md"
  type = disabled ? "disabled" : type || "regular"
  color = color || "primary"

  const buttonSizes = {
    xs: "h-6 px-1 text-xs",
    sm: "h-6 px-1 text-xs md:h-8 md:px-2 md:text-sm",
    md: "h-8 px-2 text-sm md:h-10 md:px-3 md:text-base"
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
