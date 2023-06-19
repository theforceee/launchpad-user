import { Subject } from "@uikit/rx"
import { ModalData } from "./types"

export const modalSubject = new Subject<ModalData[]>([])
