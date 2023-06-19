import { ComponentType } from "react"

export type AfterClosedCb = (data?: any) => any

export interface ModalRef {
  close: (data?: any) => void
  afterClosed: (cb: AfterClosedCb) => void
}

export interface ModalOptions<Data = any> {
  data?: Data
}

export interface ModalData {
  modalId: number
  content: ComponentType<ModalProps>
  options: ModalOptions
  modalRef: ModalRef
}

export interface ModalProps<Data = any> {
  modalRef: ModalRef
  data?: Data
}

type ExtractModalDataFromProps<P> = P extends ModalProps<infer ModalData> ? ModalData : any

type ExtractPropsFromComponent<C> = C extends ComponentType<infer P> ? P : never

export type ExtractModalData<T = any> = T extends (props: infer P) => any
  ? ExtractModalDataFromProps<P>
  : ExtractModalDataFromProps<ExtractPropsFromComponent<T>>
