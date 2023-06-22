import { useEffect, useState } from "react"

export function useInterval<Cb extends () => any>(cb: Cb, time: number) {
  const [val, setVal] = useState<ReturnType<Cb>>(cb())

  useEffect(() => {
    const timer = setInterval(() => {
      setVal(cb())
    }, time)

    return () => {
      clearInterval(timer)
    }
  }, [cb, time])

  return val
}
