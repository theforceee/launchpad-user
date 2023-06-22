import STAKING_ABI from "@abi/Staking.json"
import { STAKING_CONTRACT } from "@constants/index"
import { Address, useContractRead } from "wagmi"

export type PendingWithdrawNft = {
  tokenId: string
  applicableAt: string
  tokenAddress: Address
}

export function useGetPendingERC721Withdrawals(
  connectedAccount: Address | undefined,
  tokenAddress: Address | undefined
) {
  const { data, isLoading, refetch }: any = useContractRead({
    enabled: !!connectedAccount || !!tokenAddress,
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "getPendingERC721Withdrawals",
    args: [connectedAccount, tokenAddress]
  })

  const pendingERC721Withdrawals: PendingWithdrawNft[] =
    data?.map((item: any) => ({
      tokenId: item.tokenId.toString(),
      applicableAt: item.applicableAt.toString(),
      tokenAddress: tokenAddress
    })) || []

  return {
    isLoading,
    pendingERC721Withdrawals,
    refetch
  }
}
