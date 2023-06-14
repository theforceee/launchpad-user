import { AppContext } from "@contexts/AppContext"
import iconClose from "@images/icon-close.png"
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"
import BigNumber from "bignumber.js"
import clsx from "clsx"
import Image from "next/image"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { SEPARATOR } from "./StakingToken"

export type UnstakeDialogProps = {
  open: boolean
  handleClose: () => void
  unstakeToken: any
  tokenStaked: number
  loadingUnstake: boolean
}
type OptionTypes = {
  label: string
  value: number
}
const options: Array<OptionTypes> = [
  {
    label: "25%",
    value: 0.25
  },
  {
    label: "50%",
    value: 0.5
  },
  {
    label: "75%",
    value: 0.75
  },
  {
    label: "MAX",
    value: 1
  }
]
export default function UnstakeDialog(props: UnstakeDialogProps) {
  const { open, handleClose, unstakeToken, tokenStaked: maxUnstakeAmount, loadingUnstake } = props
  const { tokenDetail } = useContext(AppContext)
  const [inputAmount, setInputAmount] = useState<string>("")
  const [selectedOption, setSelectedOption] = useState<number>(0)

  useEffect(() => {
    if (selectedOption === 0) return
    const newAmount = new BigNumber(maxUnstakeAmount).multipliedBy(selectedOption).toString()
    setInputAmount(newAmount)
  }, [selectedOption, maxUnstakeAmount])

  const handleUnstake = () => {
    unstakeToken(inputAmount)
  }

  const handleChangeInputAmount = (event: ChangeEvent<HTMLInputElement> | undefined) => {
    const inputValue = event?.target.value || ""
    const newValue = inputValue.split(SEPARATOR).join("")
    setSelectedOption(0)
    const newAmount = new BigNumber(newValue).gt(maxUnstakeAmount) ? maxUnstakeAmount : newValue
    setInputAmount(newAmount + "")
  }

  return (
    <Dialog
      className="min-w-0 max-w-[360px] rounded-[20px] bg-[#151532] px-6 pb-6 text-white"
      open={open}
      handler={handleClose}
    >
      <DialogHeader className="relative flex justify-center pt-6 text-center">
        <span className="text-28/36 font-bold text-white">Unstake</span>
        <Image
          alt=""
          src={iconClose}
          className="absolute top-3 right-3 h-6 w-6 cursor-pointer"
          onClick={handleClose}
        />
      </DialogHeader>
      <DialogBody className="py-0">
        <div className="flex flex-col">
          <span className="text-12/16 font-semibold text-textGray">AMOUNT</span>
        </div>
        <div className="mt-2 flex w-full rounded-md bg-[#000122] px-3 py-4 text-white">
          <input
            type="number"
            className="w-full bg-transparent pr-2 outline-none"
            value={inputAmount}
            onChange={handleChangeInputAmount}
          />
          <span>{`$${tokenDetail?.symbol}`}</span>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {options.map(({ label, value }: OptionTypes) => (
            <div
              key={value}
              className={clsx(
                "flex h-[30px] cursor-pointer items-center justify-center rounded-md text-12/16",
                selectedOption === value ? "bg-[#504FBE] text-white" : "bg-[#000122] text-textGray"
              )}
              onClick={() => setSelectedOption(value)}
            >
              {label}
            </div>
          ))}
        </div>
      </DialogBody>
      <DialogFooter className="">
        <button
          disabled={loadingUnstake}
          onClick={handleUnstake}
          className="btnGradientOrange btnMedium !max-w-full"
        >
          <span>{loadingUnstake ? "Unstaking" : "Unstake"}</span>
        </button>
      </DialogFooter>
    </Dialog>
  )
}
