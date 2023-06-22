import { PropsWithChildren } from "react"
import { useModal } from "./ModalContext"
import clsx from "clsx"
import { Transition } from "@headlessui/react"
import { useModalTransition } from "./useModalTransition"
import Image from "next/image"
import iconClose from "@images/icon-close.png"

type ModalProps = PropsWithChildren<{
  className?: string
  /**
   * Default: true
   */
  hasCloseBtn?: boolean
}>

export function Modal({ children, hasCloseBtn = true, className }: ModalProps) {
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
            onClick={() => modal.modalRef.close()}
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
              "relative min-w-[300px] max-w-[90vw] rounded-[20px] bg-clr-purple-60 p-5 pt-10 shadow-sm md:p-[30px] md:pt-[40px]",
              className
            )}
          >
            {hasCloseBtn && (
              <button
                type="button"
                onClick={() => modal.modalRef.close()}
                className="absolute top-4 right-4"
              >
                <Image src={iconClose} alt="" width={24} height={24} />
              </button>
            )}
            {children}
          </div>
        </Transition.Child>
      </Transition>
    </div>
  )
}

interface ModalTitleProps {
  className?: string
  children?: React.ReactNode
}

Modal.Header = function Header({ className, children }: ModalTitleProps) {
  return <div className={className}>{children}</div>
}

Modal.Body = function Body({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={className}>{children}</div>
}

Modal.Footer = function Footer(props: PropsWithChildren) {
  return <div>{props.children}</div>
}
