import { TickIcon } from "@/assets/icons/tick-icon"
import { useState } from "react"
import clsx from "clsx"

type CheckboxProps = {
  name: string
  value?: string
  onChange?: (val: any) => void
  className?: string
}

export function Checkbox({ name, value, className, onChange }: CheckboxProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div
      className={clsx(
        "relative inline-block h-[16px] w-[16px] translate-y-[3px] overflow-hidden rounded-[2px]",
        "outline-1 outline-offset-2 focus-within:outline",
        className
      )}
    >
      <input
        onChange={() => {
          setChecked((isChecked) => !isChecked)
          onChange?.(value)
        }}
        type="checkbox"
        value={value}
        name={name}
        className="h-[16px] w-[16px]"
      />
      <div className="pointer-events-none absolute -top-1 -right-1 -bottom-1 -left-1 flex items-center justify-center rounded-[4px] bg-clr-purple-70">
        {checked && <TickIcon className="text-clr-purple-80" />}
      </div>
    </div>
  )
}
