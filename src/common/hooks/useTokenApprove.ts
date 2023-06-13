import ERC20_ABI from "@abi/Erc20.json"
import { BLAZE_TOKEN_CONTRACT, STAKING_CONTRACT } from "@constants/index"
import { AppContext } from "@contexts/AppContext"
import { getErrorMessage } from "@utils/getErrorMessage"
import { convertNumberToBigInt } from "@utils/index"
import { useCallback, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { useContractWrite, useWaitForTransaction } from "wagmi"

const useTokenApprove = (connectedAccount: `0x${string}` | undefined) => {
  const { isWrongChain } = useContext(AppContext)

  const {
    write,
    data: dataApprove,
    isLoading: loadingApprove
  } = useContractWrite({
    address: BLAZE_TOKEN_CONTRACT,
    abi: ERC20_ABI,
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
      toast.success("SUCCESS: token have been staked")
      setTimeout(() => window.location.reload(), 2000)
    }
    if (dataHash?.status === "reverted") {
      console.log("staking error", dataHash)
      toast.error("FAIL: execution reverted")
    }
  }, [dataHash])

  const approve = useCallback(
    async (amount: string) => {
      if (isWrongChain) return
      write?.({
        args: [STAKING_CONTRACT, convertNumberToBigInt(+amount)]
      })
    },
    [isWrongChain, write]
  )

  return { approve, loadingApprove: loadingHash || loadingApprove }
}

export default useTokenApprove
