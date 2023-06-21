import STAKING_ABI from "@abi/Staking.json"
import { STAKING_CONTRACT } from "@constants/index"
import { useContractRead, Address } from "wagmi"

export const useGetMultiplier = (connectedAccount: Address | undefined) => {
  const { data: multiplier }: any = useContractRead({
    enabled: !!connectedAccount,
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    args: [connectedAccount],
    functionName: "getMultiplier"
  })

  return {
    multiplier
  }
}
