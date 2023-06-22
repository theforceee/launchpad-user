import ConfirmDialog, { ConfirmDialogData } from "../ConfirmDialog"
import { openModal } from "./openModal"

export function confirm(data: ConfirmDialogData) {
  return openModal(ConfirmDialog, {
    data
  })
}
