import { PropsWithChildren } from "react"
import { useModal } from "./ModalContext"
import clsx from "clsx"
import { Transition } from "@headlessui/react"
import { useModalTransition } from "./useModalTransition"

type ModalProps = PropsWithChildren<{
  className?: string
}>

export function Modal({ children, className }: ModalProps) {
  const { modal } = useModal()
  const { show } = useModalTransition(modal)

  return (
    <div className="relative flex min-h-full items-center justify-center overflow-auto p-4 text-center">
      <Transition appear show={show} as="div">
        <Transition.Child
          as={"div"}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-25"
            onClick={modal.modalRef.close}
          />
        </Transition.Child>

        <Transition.Child
          as={"div"}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0 -translate-y-16"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-16"
        >
          <div
            className={clsx(
              "relative min-w-[300px] max-w-[90vw] rounded-[6px] bg-white p-[25px] shadow-sm",
              className
            )}
          >
            {children}
          </div>
        </Transition.Child>
      </Transition>
    </div>
  )
}

interface ModalTitleProps {
  className?: string
  hasCloseBtn?: boolean
  children?: React.ReactNode
}

Modal.Header = function Header({ className, children, hasCloseBtn }: ModalTitleProps) {
  const { modal } = useModal()

  return (
    <div className={clsx("relative flex items-center justify-between gap-4", className)}>
      <div className="flex flex-1 flex-wrap">{children}</div>

      {hasCloseBtn && (
        <button
          type="button"
          onClick={modal.modalRef.close}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 focus:bg-gray-300"
        >
          x
        </button>
      )}
    </div>
  )
}

Modal.Body = function Body(props: PropsWithChildren) {
  return <div>{props.children}</div>
}

Modal.Footer = function Footer(props: PropsWithChildren) {
  return <div>{props.children}</div>
}
