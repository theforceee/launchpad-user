import { useEffect, useState } from "react"

// Fix Hydration ERROR
const useIsMounted = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

export default useIsMounted
