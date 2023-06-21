import STAKING_ABI from "@abi/Staking.json"
import { STAKING_CONTRACT } from "@constants/index"
import { getErrorMessage } from "@utils/getErrorMessage"
import { useCallback, useEffect } from "react"
import { toast } from "react-toastify"
import { Address, useContractWrite, useWaitForTransaction } from "wagmi"

export const useUnstakeErc721 = (connectedAccount: Address | undefined) => {
  const {
    data: dataStake,
    isLoading: loadingUnstake,
    write: writeUnstake
  } = useContractWrite({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "unstakeERC721",
    account: connectedAccount,
    onError(error) {
      console.log("ERROR stake:", error?.message)
      toast.error(getErrorMessage(error, "Fail to Stake NFT"))
    }
  })

  const { data: dataHash, isLoading: loadingHash } = useWaitForTransaction({
    hash: dataStake?.hash,
    enabled: !!dataStake && !loadingUnstake
  })

  useEffect(() => {
    if (dataHash?.status === "success") {
      toast.success("SUCCESS: NFT have been unstaked")
    }

    if (dataHash?.status === "reverted") {
      console.log("staking error", dataHash)
      toast.error("FAIL: execution reverted")
    }
  }, [dataHash])

  const unstakeNft = useCallback(
    async (nftAdress: string, tokenId: string) => {
      writeUnstake({
        args: [nftAdress, tokenId]
      })
    },
    [writeUnstake]
  )

  return {
    unstakeNft,
    unstakeNftStatus: dataHash?.status,
    loadingUnstake: loadingHash || loadingUnstake
  }
}
