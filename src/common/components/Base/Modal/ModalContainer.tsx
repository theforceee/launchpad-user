import { useEffect, useState } from "react"
import { modalSubject } from "./modalSubject"
import { ModalData } from "./typing"
import { ModalWrapper } from "./ModalWrapper"

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
