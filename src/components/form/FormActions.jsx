import Button from "./Button"

export default function FormActions({ target, loading, calcelText, disableCancel, disableConfirm, isEditMode, onConfirm, onCancel }) {
  return isEditMode ? (
    <div className="w-full flex justify-between">
      <Button disabled={loading || disableCancel} onClick={onCancel} color="negative">
        {calcelText || "Cancel"}
      </Button>
      <Button disabled={loading || disableConfirm} onClick={onConfirm} color="positive">
        Update {target}
      </Button>
    </div>
  ) : (
    <div className="w-full flex justify-end">
      <Button disabled={loading || disableConfirm} onClick={onConfirm}>
        Register {target}
      </Button>
    </div>
  )
}
