import { Subject } from "@components/Base/rx"
import { ModalData } from "./typing"

export const modalSubject = new Subject<ModalData[]>([])
