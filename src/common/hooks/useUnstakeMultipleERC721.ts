import STAKING_ABI from "@abi/Staking.json"
import { STAKING_CONTRACT } from "@constants/index"
import { getErrorMessage } from "@utils/getErrorMessage"
import { useCallback, useEffect } from "react"
import { toast } from "react-toastify"
import { Address, useContractWrite, useWaitForTransaction } from "wagmi"

export const useUnstakeMultipleERC721 = (connectedAccount: Address | undefined) => {
  const {
    data: dataStake,
    isLoading: loadingUnstake,
    write: writeUnstake
  } = useContractWrite({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "unstakeMultipleERC721",
    account: connectedAccount,
    onError(error) {
      console.log("ERROR useUnstakeMultipleERC721:", error?.message)
      toast.error(getErrorMessage(error, "Fail to Stake NFT"))
    }
  })

  const { data: dataHash, isLoading: loadingHash } = useWaitForTransaction({
    hash: dataStake?.hash,
    enabled: !!dataStake && !loadingUnstake
  })

  useEffect(() => {
    if (dataHash?.status === "success") {
      toast.success("SUCCESS: NFTs have been unstaked")
    }

    if (dataHash?.status === "reverted") {
      console.log("staking error", dataHash)
      toast.error("FAIL: execution reverted")
    }
  }, [dataHash])

  const unstakeMultipleERC721 = useCallback(
    async (nftAdress: string, tokenIds: string[]) => {
      writeUnstake({
        args: [nftAdress, tokenIds]
      })
    },
    [writeUnstake]
  )

  return {
    unstakeMultipleERC721,
    unstakeMultipleERC721Status: dataHash?.status,
    loadingUnstake: loadingHash || loadingUnstake
  }
}
