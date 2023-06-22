import ERC721_ABI from "@abi/Erc721.json"
import { STAKING_CONTRACT } from "@constants/index"
import { useContractRead } from "wagmi"

export const useNftGetApproved = (
  tokenAddress: `0x${string}` | undefined,
  tokenId: string | undefined,
  connectedAccount: `0x${string}` | undefined
) => {
  const {
    data: tokenApproved,
    refetch: refetchGetApproved,
    isLoading: getApprovedLoading
  } = useContractRead({
    address: tokenAddress,
    abi: ERC721_ABI,
    enabled: !!connectedAccount && !!tokenAddress && !!tokenId,
    account: connectedAccount,
    functionName: "getApproved",
    args: [tokenId]
  })

  const isApproved = tokenApproved === STAKING_CONTRACT

  return {
    isApproved,
    refetchGetApproved,
    getApprovedLoading
  }
}
