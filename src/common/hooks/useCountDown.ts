import { useEffect, useState } from "react"

export const useCountDown = (startDate?: Date, showDay = false) => {
  const [seconds, setSeconds] = useState<string>("0")
  const [minutes, setMinutes] = useState<string>("0")
  const [hours, setHours] = useState<string>("0")
  const [days, setDays] = useState<string>("0")

  useEffect(() => {
    let countDownInterval = undefined as any

    if (startDate && startDate >= new Date()) {
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24

      const countDown = startDate.getTime()
      countDownInterval = setInterval(function () {
        const now = new Date().getTime(),
          distance = countDown - now

        if (distance >= 0) {
          const currentDay = showDay
            ? Math.floor(distance / day)
                .toString()
                .padStart(2, "0")
            : Math.floor(distance / day)
          const currentHour = Math.floor(
            (distance % day) / hour + (showDay ? 0 : +currentDay)
          )
            .toString()
            .padStart(2, "0")
          const currentMinute = Math.floor((distance % hour) / minute)
            .toString()
            .padStart(2, "0")
          const currentSecond = Math.floor((distance % minute) / second)
            .toString()
            .padStart(2, "0")

          setDays(currentDay + "")
          setHours(currentHour)
          setMinutes(currentMinute)
          setSeconds(currentSecond)
        }
      }, 0)
    } else {
      setSeconds("00")
      setMinutes("00")
      setHours("00")
      setDays("00")
    }

    return () => {
      clearInterval(countDownInterval)
    }
  }, [showDay, startDate])

  return {
    days,
    hours,
    minutes,
    seconds
  }
}
