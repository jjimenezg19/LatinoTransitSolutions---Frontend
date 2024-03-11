export default function FormActions({ target, calcelText, isEditMode, onConfirm, onCancel }) {
  return isEditMode ? (
    <div className="w-full flex justify-between">
      <button onClick={onCancel} data-type="outlined" className="bg-negative">
        {calcelText || "Cancel"}
      </button>
      <button onClick={onConfirm} className="bg-positive">
        Update {target}
      </button>
    </div>
  ) : (
    <div className="w-full flex justify-end">
      <button onClick={onConfirm}>Register {target}</button>
    </div>
  )
}
