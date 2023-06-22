import { TickIcon } from "@/assets/icons/tick-icon"
import { useState } from "react"

type CheckboxProps = {
  name: string
  value?: string
  onChange?: (val: any) => void
}

export function Checkbox({ name, value, onChange }: CheckboxProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="relative inline-block h-[14px] w-[14px] translate-y-[2px] overflow-hidden rounded-[2px] outline-1 outline-offset-2 focus-within:outline">
      <input
        onChange={() => {
          setChecked((isChecked) => !isChecked)
          onChange?.(value)
        }}
        type="checkbox"
        value={value}
        name={name}
        className="h-[14px] w-[14px]"
      />
      <div className="pointer-events-none absolute -top-1 -right-1 -bottom-1 -left-1 flex items-center justify-center rounded-[4px] bg-clr-purple-70">
        {checked && <TickIcon className="text-clr-purple-80" />}
      </div>
    </div>
  )
}
