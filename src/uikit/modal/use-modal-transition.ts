import { useEffect, useRef, useState } from "react"
import { ModalData } from "./types"

/**
 * DO NOT EDIT THIS VALUE, this value must higher than the enter duration to
 * prevent layout shifting(there is a issue with fixed element when having scroll)
 */
const DURATION = 280

export function useModalTransition(modal: ModalData) {
  const [show, setShow] = useState<undefined | boolean>(undefined)
  const closeFuncRef = useRef<(data?: unknown) => void>()
  const closeFuncDataRef = useRef<unknown>()

  // Start transition
  useEffect(() => {
    setShow(true)
  }, [])

  useEffect(() => {
    // Check closeFuncRef.current exist to prevent issue with react strict mode
    // https://legacy.reactjs.org/docs/strict-mode.html#ensuring-reusable-state
    closeFuncRef.current = closeFuncRef.current || modal.modalRef.close
    modal.modalRef.close = (data?: unknown) => {
      closeFuncDataRef.current = data
      setShow(false)
    }
  }, [modal.modalRef])

  // This useEffect is used for waiting for Transition to complete
  // before invoke the real close modal function.
  useEffect(() => {
    if (show || show === undefined) return

    setTimeout(() => {
      closeFuncRef.current?.(closeFuncDataRef.current)
    }, DURATION)
  }, [show])

  return { show: !!show }
}
