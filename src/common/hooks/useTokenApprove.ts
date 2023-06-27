import ERC20_ABI from "@abi/Erc20.json"
import { BLAZE_TOKEN_CONTRACT, STAKING_CONTRACT } from "@constants/index"
import { AppContext } from "@contexts/AppContext"
import { getErrorMessage } from "@utils/getErrorMessage"
import { useCallback, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi"

export const MAX_INT = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

const useTokenApprove = (
  token: `0x${string}` | undefined = BLAZE_TOKEN_CONTRACT,
  spender: `0x${string}` | undefined = STAKING_CONTRACT
) => {
  const { isWrongChain } = useContext(AppContext)
  const { address: connectedAccount } = useAccount()

  const {
    write,
    data: dataApprove,
    isLoading: loadingApprove
  } = useContractWrite({
    address: token,
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
      toast.success("SUCCESS: token have been approved")
    }
    if (dataHash?.status === "reverted") {
      console.log("approving error", dataHash)
      toast.error("FAIL: execution reverted")
    }
  }, [dataHash])

  const approve = useCallback(async () => {
    if (isWrongChain) return
    write?.({
      args: [spender, MAX_INT]
    })
  }, [isWrongChain, spender, write])

  return { approve, loadingApprove: loadingHash || loadingApprove }
}

export default useTokenApprove
