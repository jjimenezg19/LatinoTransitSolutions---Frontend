export default function Button({ size, type, color, disabled, children, onClick }) {
  size = size || "md"
  type = type || "regular"
  color = color || "primary"

  const buttonSizes = {
    sm: "!h-8 !px-2 !text-sm",
    md: "!h-10 !px-3 !text-base"
  }

  const buttonColors = {
    regular: `bg-${color}-100 border-transparent hover:bg-${color}-200 active:bg-${color}-300 text-word-100`,
    outlined: `bg-trasparent border-${color}-100 text-${color}-100 hover:border-${color}-200 hover:text-${color}-200 active:border-${color}-300 active:text-${color}-300`,
    flat: `bg-transparent border-transparent text-${color}-100 hover:bg-${color}-100/30 active:bg-${color}-100/20`,
    disabled: `bg-${color}-100/50 border-transparent text-word-100/50 cursor-not-allowed`
  }

  return (
    <button disabled={disabled} onClick={onClick} className={`${buttonSizes[size]} ${!disabled ? buttonColors[type] : buttonColors["disabled"]} cursor-pointer rounded-md border-2`}>
      {children}
    </button>
  )
}
