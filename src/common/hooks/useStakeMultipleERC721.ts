import STAKING_ABI from "@abi/Staking.json"
import { STAKING_CONTRACT } from "@constants/index"
import { getErrorMessage } from "@utils/getErrorMessage"
import { useCallback, useEffect } from "react"
import { toast } from "react-toastify"
import { useContractWrite, useWaitForTransaction } from "wagmi"

export const useStakeMultipleERC721 = (connectedAccount: `0x${string}` | undefined) => {
  const {
    data: dataStake,
    isLoading: loadingStake,
    write: writeStake
  } = useContractWrite({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "stakeMultipleERC721",
    account: connectedAccount,
    onError(error) {
      console.log("ERROR useStakeMultipleERC721:", error?.message)
      toast.error(getErrorMessage(error, "Fail to Stake NFT"))
    }
  })

  const { data: dataHash, isLoading: loadingHash } = useWaitForTransaction({
    hash: dataStake?.hash,
    enabled: !!dataStake && !loadingStake
  })

  useEffect(() => {
    if (dataHash?.status === "success") {
      toast.success("SUCCESS: NFT have been staked")
    }

    if (dataHash?.status === "reverted") {
      console.log("staking error", dataHash)
      toast.error("FAIL: execution reverted")
    }
  }, [dataHash])

  const stakeMultipleERC721 = useCallback(
    async (nftAdress: string, tokenIds: string[]) => {
      writeStake({
        args: [nftAdress, tokenIds]
      })
    },
    [writeStake]
  )

  return {
    stakeMultipleERC721,
    stakeMultipleERC721Status: dataHash?.status,
    loadingStake: loadingHash || loadingStake
  }
}
