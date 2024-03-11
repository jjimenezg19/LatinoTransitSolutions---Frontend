import Button from "./Button"

export default function FormActions({ target, calcelText, isEditMode, onConfirm, onCancel }) {
  return isEditMode ? (
    <div className="w-full flex justify-between">
      <Button onClick={onCancel} color="negative">
        {calcelText || "Cancel"}
      </Button>
      <Button onClick={onConfirm} color="positive">
        Update {target}
      </Button>
    </div>
  ) : (
    <div className="w-full flex justify-end">
      <Button onClick={onConfirm}>Register {target}</Button>
    </div>
  )
}
