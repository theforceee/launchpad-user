import ERC20_ABI from "@abi/Erc20.json"
import { BLAZE_TOKEN_CONTRACT, STAKING_CONTRACT } from "@constants/index"
import { AppContext } from "@contexts/AppContext"
import { convertBigIntToNumber } from "@utils/index"
import { useContext, useEffect, useState } from "react"
import { useContractRead } from "wagmi"

const useTokenAllowance = (connectedAccount: string | undefined) => {
  const { isWrongChain, tokenDetail } = useContext(AppContext)

  const [userAllowance, setUserAllowance] = useState<number>(0)

  const { data: allowance }: any = useContractRead({
    enabled: !!connectedAccount && !isWrongChain,
    address: BLAZE_TOKEN_CONTRACT,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [connectedAccount, STAKING_CONTRACT]
  })

  useEffect(() => {
    setUserAllowance(convertBigIntToNumber(allowance, tokenDetail?.decimals))
  }, [allowance, tokenDetail?.decimals])

  return { userAllowance }
}

export default useTokenAllowance
