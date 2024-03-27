import Button from "./Button"

export default function FormActions({ target, loading, calcelText, disableCancel, disableConfirm, isEditMode, onConfirm, onCancel }) {
  return isEditMode ? (
    <div className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4">
      <Button disabled={loading || disableCancel} onClick={onCancel} color="negative">
        {calcelText || "Cancel"}
      </Button>
      <Button disabled={loading || disableConfirm} onClick={onConfirm} color="positive">
        Update {target}
      </Button>
    </div>
  ) : (
    <div className="w-full flex justify-end">
      <Button className="w-full sm:w-auto" disabled={loading || disableConfirm} onClick={onConfirm}>
        Save {target}
      </Button>
    </div>
  )
}
