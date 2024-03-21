import { useEffect, useState } from "react"
import Button from "../form/Button"

export default function Modal({ open, width, height, hideCloseButton, className, children, onClose }) {
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
    <div className={`${display} w-full h-full fixed top-0 left-0 flex justify-center items-center bg-background-300/40 px-2`}>
      <div style={{ width: `${width}px`, height: `${height}px` }} className={`${className} ${open ? "modalOpen" : "modalClose"} rounded-xl bg-background-300 border-2 border-background-200 flex flex-col shadow-xl`}>
        {!hideCloseButton ? (
          <div className="flex justify-end pr-1 pt-1 shrink-0 grow-0">
            <Button onClick={onClose} type="flat" size="xs">
              <i className="fas fa-close"></i>
            </Button>
          </div>
        ) : null}

        <div className="w-full h-full shrink grow p-2 md:p-4">{children}</div>
      </div>
    </div>
  )
}
