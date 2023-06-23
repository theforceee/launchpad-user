import { Tiers, USER_TIER_MAPPING } from "@constants/index"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { get } from "../request"

export const useUserStakedInfo = () => {
  const { address } = useAccount()
  const [userStakedInfo, setUserStakedInfo] = useState<any>()

  useEffect(() => {
    ;(async () => {
      if (!address) return
      const resStaked = await get("staked-info", { account: address })
      if (!resStaked || !resStaked.data || resStaked.status !== 200) return
      setUserStakedInfo(resStaked.data)
    })()
  }, [address])

  return {
    userPosition: userStakedInfo?.userPosition || "-",
    userTier: USER_TIER_MAPPING[userStakedInfo?.tier?.tier as Tiers]
  }
}
