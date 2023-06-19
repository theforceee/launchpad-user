import { createContext, useContext } from "react"
import { ModalData } from "./types"

export interface ModalContextValues {
  modal: ModalData
}

export const ModalContext = createContext<ModalContextValues>({} as ModalContextValues)

export const useModal = () => useContext<ModalContextValues>(ModalContext)
