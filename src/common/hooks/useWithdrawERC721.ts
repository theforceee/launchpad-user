import STAKING_ABI from "@abi/Staking.json"
import { STAKING_CONTRACT } from "@constants/index"
import { getErrorMessage } from "@utils/getErrorMessage"
import { useCallback, useEffect } from "react"
import { toast } from "react-toastify"
import { Address, useContractWrite, useWaitForTransaction } from "wagmi"

export const useWithdrawErc721 = (connectedAccount: Address | undefined) => {
  const {
    write,
    data: dataApprove,
    isLoading: loadingApprove
  } = useContractWrite({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "withdrawERC721",
    account: connectedAccount,
    onError(error) {
      console.log("ERROR approve:", error?.message)
      toast.error(getErrorMessage(error, "Fail to withdraw NFT"))
    }
  })

  const { data: dataHash, isLoading: loadingHash } = useWaitForTransaction({
    hash: dataApprove?.hash
  })

  useEffect(() => {
    if (dataHash?.status === "success") {
      return
    }

    if (dataHash?.status === "reverted") {
      console.log("useWithdrawErc721 error", dataHash)
      toast.error("FAIL: execution reverted")
    }
  }, [dataHash])

  const widthdrawERC721 = useCallback(
    (nftAddress: Address, tokenId: string) => {
      write({ args: [nftAddress, tokenId] })
    },
    [write]
  )

  return {
    widthdrawERC721,
    isWithdrawing: loadingHash || loadingApprove
  }
}
