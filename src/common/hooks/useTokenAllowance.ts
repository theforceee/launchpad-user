import ERC20_ABI from "@abi/Erc20.json"
import { AppContext } from "@contexts/AppContext"
import { convertBigIntToNumber } from "@utils/index"
import { useContext, useEffect, useState } from "react"
import { useContractRead } from "wagmi"
import { TokenDetailTypes } from "./useTokenDetail"

const useTokenAllowance = (
  token: TokenDetailTypes | undefined,
  owner: string | undefined,
  spender: `0x${string}` | undefined
) => {
  const { isWrongChain } = useContext(AppContext)

  const [userAllowance, setUserAllowance] = useState<number>(0)

  const { data: allowance, refetch } = useContractRead({
    enabled: !!owner && !!token && !!spender && !isWrongChain,
    address: token?.address,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [owner, spender]
  })

  useEffect(() => {
    setUserAllowance(convertBigIntToNumber(allowance as any, token?.decimals))
  }, [allowance, token?.decimals])

  return { userAllowance, refetch }
}

export default useTokenAllowance
