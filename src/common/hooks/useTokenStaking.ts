import STAKING_ABI from "@abi/Staking.json"
import { STAKING_CONTRACT } from "@constants/index"
import { AppContext } from "@contexts/AppContext"
import { getErrorMessage } from "@utils/getErrorMessage"
import { convertBigIntToNumber, convertNumberToBigInt } from "@utils/index"
import { useCallback, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { parseEther } from "viem"
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi"

const useTokenStaking = (connectedAccount: `0x${string}` | undefined) => {
  const { isWrongChain } = useContext(AppContext)

  const stakingConfig = {
    enabled: !!connectedAccount && !isWrongChain,
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    args: [connectedAccount]
  }

  const { data: multiplier }: any = useContractRead({
    ...stakingConfig,
    functionName: "getMultiplier"
  })

  const { data: tokenStaked }: any = useContractRead({
    ...stakingConfig,
    functionName: "staking"
  })

  const { data: tokenPendingWithdraw }: any = useContractRead({
    ...stakingConfig,
    functionName: "pendingERC20Withdrawals"
  })

  //#region STAKE ERC20
  const {
    data: dataStake,
    isLoading: loadingStake,
    write: writeStake
  } = useContractWrite({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "stakeERC20",
    account: connectedAccount,
    onError(error) {
      console.log("ERROR stake:", error?.message)
      toast.error(getErrorMessage(error, "Fail to Stake Token"))
    }
  })

  const { data: dataHash, isLoading: loadingHash } = useWaitForTransaction({
    hash: dataStake?.hash,
    enabled: !!dataStake && !loadingStake
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

  const stakeToken = useCallback(
    async (amount: string) => {
      if (isWrongChain) return

      const stakeAmount = parseEther(`${+amount}`).toString()
      writeStake?.({
        args: [stakeAmount]
      })
    },
    [isWrongChain, writeStake]
  )
  //#endregion STAKE ERC20

  //#region UNSTAKE ERC20
  const {
    data: dataUnstake,
    isLoading: loadingUnstake,
    write: writeUnstake
  } = useContractWrite({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "unstakeERC20",
    account: connectedAccount,
    onError(error) {
      console.log("ERROR unstake:", error?.message)
      toast.error(getErrorMessage(error, "Fail to Unstake Token"))
    }
  })

  const { data: dataHashUnstake, isLoading: loadingUnstakeHash } = useWaitForTransaction({
    hash: dataUnstake?.hash,
    enabled: !!dataUnstake && !loadingUnstake
  })

  useEffect(() => {
    if (dataHashUnstake?.status === "success") {
      toast.success("SUCCESS: token have been unstaked")
      setTimeout(() => window.location.reload(), 2000)
    }
    if (dataHashUnstake?.status === "reverted") {
      console.log("unstaking error", dataHashUnstake)
      toast.error("FAIL: execution reverted")
    }
  }, [dataHashUnstake])

  const unstakeToken = useCallback(
    async (amount: string) => {
      if (isWrongChain) return

      const unstakeAmount = parseEther(`${+amount}`).toString()
      writeUnstake?.({
        args: [unstakeAmount]
      })
    },
    [isWrongChain, writeUnstake]
  )
  //#endregion UNSTAKE ERC20

  return {
    multiplier,
    tokenStaked: convertBigIntToNumber(tokenStaked),
    tokenPendingWithdraw,
    // tokenPendingWithdraw: convertBigIntToNumber((tokenPendingWithdraw || [0])[0]),
    stakeToken,
    loadingStake: loadingHash || loadingStake,
    unstakeToken,
    loadingUnstake: loadingUnstake || loadingUnstakeHash
  }
}

export default useTokenStaking
