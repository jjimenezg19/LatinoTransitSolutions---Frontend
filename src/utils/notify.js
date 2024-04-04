import { toast } from "react-toastify"

export const notify = (message, type = "info") => {
  toast(message, { type })
}
