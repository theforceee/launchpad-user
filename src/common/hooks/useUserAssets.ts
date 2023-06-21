import { BLAZE_TOKEN_CONTRACT } from "@constants/index"
import { MAPPING_USDT_BY_NETWORK_ID } from "@constants/networks"
import { useAccount, useBalance, useChainId } from "wagmi"

const useUserAssets = () => {
  const chainId = useChainId()
  const { address } = useAccount()

  const { data: ethBalanceData } = useBalance({
    address
  })

  const { data: blazeBalanceData } = useBalance({
    address,
    token: BLAZE_TOKEN_CONTRACT
  })

  const { data: usdtBalanceData } = useBalance({
    address,
    token: MAPPING_USDT_BY_NETWORK_ID[chainId]
  })

  return {
    nativeBalance: ethBalanceData?.formatted,
    usdtBalance: usdtBalanceData?.formatted,
    blazeBalance: blazeBalanceData?.formatted
  }
}

export default useUserAssets
