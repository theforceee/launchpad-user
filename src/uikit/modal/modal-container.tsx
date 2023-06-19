import { useEffect, useState } from "react"
import { modalSubject } from "./modal-subject"
import { ModalData } from "./types"
import { ModalWrapper } from "./modal-wrapper"

export function ModalContainer() {
  const [modalList, setModalList] = useState<ModalData[]>([])

  useEffect(() => {
    modalSubject.subscribe((modalList) => {
      setModalList(modalList)
    })
  }, [])

  return <Recursive modals={modalList} />
}

function Recursive({ modals }: { modals: ModalData[] }) {
  if (modals.length === 0) return <></>

  const modal = modals[0]
  const remains = modals.slice(1)

  return (
    <ModalWrapper modal={modal}>
      <Recursive modals={remains} />
    </ModalWrapper>
  )
}
