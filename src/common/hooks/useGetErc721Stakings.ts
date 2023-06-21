import STAKING_ABI from "@abi/Staking.json"
import { STAKING_CONTRACT } from "@constants/index"
import { Address, useContractRead } from "wagmi"

export function useGetErc721Stakings(
  connectedAccount: Address | undefined,
  nftContractAddr: Address
) {
  const { data, isLoading } = useContractRead({
    enabled: !!connectedAccount,
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "getERC721Stakings",
    args: [connectedAccount, nftContractAddr]
  })

  return {
    isLoading,
    nftIds: (data as bigint[])?.map((v) => `${v}`) || []
  }
}
