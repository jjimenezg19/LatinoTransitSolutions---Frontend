export default function Button({ size, type, color, disabled, children, onClick }) {
  size = size || "md"
  type = disabled ? "disabled" : type || "regular"
  color = color || "primary"

  const buttonSizes = {
    xs: "h-6 px-1 text-xs",
    sm: "h-6 px-1 text-xs md:h-8 md:px-2 md:text-sm",
    md: "h-8 px-2 text-sm md:h-10 md:px-3 md:text-base"
  }

  const buttonColors = {
    regular: `bg-${color}-100 border-transparent hover:bg-${color}-200 active:bg-${color}-300 text-buttonword-100`,
    outlined: `bg-trasparent border-${color}-100 text-${color}-100 hover:border-${color}-200 hover:text-${color}-200 active:border-${color}-300 active:text-${color}-300`,
    flat: `bg-transparent border-transparent text-${color}-100 hover:bg-${color}-100/20 active:bg-${color}-100/30`,
    disabled: `bg-${color}-100/50 border-transparent text-word-100/50 !cursor-not-allowed`
  }

  return (
    <button disabled={disabled} onClick={onClick} className={`${buttonSizes[size]} ${buttonColors[type]} cursor-pointer rounded-md border-2 font-semibold`}>
      {children}
    </button>
  )
}
