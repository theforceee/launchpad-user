import clsx from "clsx"
import styles from "./countdown.module.scss"
import { useCountDown } from "@hooks/useCountDown"

type TimeFieldProps = { value: string; label: string }

const TimeField = ({ value, label }: TimeFieldProps) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-[#000122] px-[10px] pt-3 pb-2">
      <span className={clsx("text-28/36 font-bold tracking-wider")}>{value}</span>
      <span className="text-12/16 capitalize text-textGray">{label}</span>
    </div>
  )
}

const ColonField = () => <span className={clsx("pt-4 text-18/24 font-semibold")}>:</span>

const Countdown = ({ countdownDate }: { countdownDate: Date | undefined }) => {
  const { days, hours, minutes, seconds } = useCountDown(countdownDate, true)

  if (!countdownDate) return <></>

  return (
    <div className="mt-5 flex space-x-1.5">
      <TimeField label="days" value={days} />
      <ColonField />
      <TimeField label="hours" value={hours} />
      <ColonField />
      <TimeField label="minutes" value={minutes} />
      <ColonField />
      <TimeField label="seconds" value={seconds} />
    </div>
  )
}

export default Countdown
