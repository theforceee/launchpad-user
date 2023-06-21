import ERC721_ABI from "@abi/Erc721.json"
import { STAKING_CONTRACT } from "@constants/index"
import { getErrorMessage } from "@utils/getErrorMessage"
import { useCallback, useEffect } from "react"
import { toast } from "react-toastify"
import { Address, useContractWrite, useWaitForTransaction } from "wagmi"

type NftApproveOptions = {
  onApproveSuccess: () => void
}

export const useErc721Approve = (
  tokenAddress: Address | undefined,
  connectedAccount: Address | undefined,
  options?: NftApproveOptions
) => {
  const {
    write,
    data: dataApprove,
    isLoading: loadingApprove
  } = useContractWrite({
    address: tokenAddress,
    abi: ERC721_ABI,
    functionName: "approve",
    account: connectedAccount,
    onError(error) {
      console.log("ERROR approve:", error?.message)
      toast.error(getErrorMessage(error, "Fail to Approve"))
    }
  })

  const { data: dataHash, isLoading: loadingHash } = useWaitForTransaction({
    hash: dataApprove?.hash
  })

  useEffect(() => {
    if (dataHash?.status === "success") {
      options?.onApproveSuccess()
      return
    }

    if (dataHash?.status === "reverted") {
      console.log("nft approve error", dataHash)
      toast.error("FAIL: execution reverted")
    }
  }, [dataHash])

  const approve = useCallback(
    async (tokenId: string) => {
      write?.({
        args: [STAKING_CONTRACT, tokenId]
      })
    },
    [write]
  )

  return {
    approve,
    isApproving: loadingHash || loadingApprove
  }
}
