import { BLAZE_TOKEN_CONTRACT } from "@constants/index"
import { MAPPING_USDT_BY_NETWORK_ID } from "@constants/networks"
import { useAccount, useBalance, useChainId } from "wagmi"

const useUserAssets = () => {
  const chainId = useChainId()
  const { address } = useAccount()

  const { data: ethBalanceData } = useBalance({
    enabled: !!address,
    address
  })

  const { data: blazeBalanceData } = useBalance({
    enabled: !!address,
    address,
    token: BLAZE_TOKEN_CONTRACT
  })

  const { data: usdtBalanceData } = useBalance({
    enabled: !!address,
    address,
    token: MAPPING_USDT_BY_NETWORK_ID[chainId]
  })

  return {
    nativeBalanceData: ethBalanceData,
    usdtBalance: usdtBalanceData?.formatted,
    blazeBalance: blazeBalanceData?.formatted
  }
}

export default useUserAssets
