import { useEffect, useState } from "react"
import Button from "../form/Button"

export default function Modal({ open, width, height, persistent, closeButton, className, children, onClose }) {
  closeButton = closeButton ?? true

  const [display, setDisplay] = useState("hidden")

  useEffect(() => {
    if (open) {
      setDisplay("block")
    } else {
      setTimeout(() => {
        setDisplay("hidden")
      }, 200)
    }
  }, [open])

  return (
    <div onClick={!persistent ? onClose : null} className={`${display} ${!persistent ? "cursor-pointer" : ""} w-full h-full fixed top-0 left-0 flex justify-center items-center bg-background-300/50 px-2`}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: `${width}px`, height: `${height}px` }} className={`${className} ${open ? "modalOpen" : "modalClose"} rounded-xl bg-background-200 border-2 border-background-300 flex flex-col shadow-[5px_5px_15px_0px_rgb(0,0,0,0.5)] cursor-default`}>
        {closeButton && (
          <div className="flex justify-end pr-1 pt-1 shrink-0 grow-0">
            <Button onClick={onClose} type="flat" size="xs">
              <i className="fas fa-close"></i>
            </Button>
          </div>
        )}

        <div className="w-full h-full shrink grow p-2 md:p-4">{children}</div>
      </div>
    </div>
  )
}
