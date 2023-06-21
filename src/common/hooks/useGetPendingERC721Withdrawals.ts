import STAKING_ABI from "@abi/Staking.json"
import { STAKING_CONTRACT } from "@constants/index"
import { Address, useContractRead } from "wagmi"

export type PendingWithdrawNft = {
  tokenId: string
  applicableAt: string
  nftAddress: Address
}

export function useGetPendingERC721Withdrawals(
  connectedAccount: Address | undefined,
  nftContractAddr: Address | undefined
) {
  const { data, isLoading }: any = useContractRead({
    enabled: !!connectedAccount || !!nftContractAddr,
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "getPendingERC721Withdrawals",
    args: [connectedAccount, nftContractAddr]
  })

  const pendingERC721Withdrawals: PendingWithdrawNft[] =
    data?.map((item: any) => ({
      tokenId: item.tokenId.toString(),
      applicableAt: item.applicableAt.toString(),
      nftAddress: nftContractAddr
    })) || []

  return {
    isLoading,
    pendingERC721Withdrawals
  }
}
