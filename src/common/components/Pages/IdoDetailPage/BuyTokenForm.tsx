import { get, post } from "@/common/request"
import Countdown from "@components/Base/Countdown"
import { confirm } from "@components/Base/Modal"
import { URLS } from "@constants/index"
import { AppContext } from "@contexts/AppContext"
import iconLock from "@images/icon-lock.png"
import { PoolStatus, getDateFromUnix, getPoolDetailStatus } from "@utils/getPoolDetailStatus"
import { formatCurrency } from "@utils/index"
import Image from "next/image"
import { useContext, useEffect, useMemo, useState } from "react"
import { NumericFormat } from "react-number-format"
import { toast } from "react-toastify"
import { useAccount } from "wagmi"

const selectAmountClass =
  "flex cursor-pointer items-center justify-center rounded-lg border border-[#333350] bg-[#151532] py-1"

const BuyTokenForm = (props: { poolDetail: any }) => {
  const { poolDetail } = props
  const { isConnected, address: connectedAccount } = useAccount()
  const { isWrongChain, isUserSigned } = useContext(AppContext)
  const userAlreadyKYC = true
  const [isApplied, setIsApplied] = useState<boolean>(false)
  const [refetch, setRefetch] = useState<boolean>(false)

  const poolStatus = useMemo(() => getPoolDetailStatus(poolDetail), [poolDetail])

  useEffect(() => {
    ;(async () => {
      if (!connectedAccount || !poolDetail) return
      const resSub = await get(`pool/${poolDetail?.slug}/submission`, {
        account: connectedAccount
      })
      if (!resSub || !resSub.data) return
      setIsApplied(true)
    })()
  }, [connectedAccount, poolDetail, refetch])

  const handleSelectAmount = (mul: number) => {
    console.log("multiple by", mul)
  }

  const handleApprove = () => {
    console.log("handleApprove")
  }
  const handleApplyWhitelist = () =>
    confirm({
      title: "handleApplyWhitelist",
      onConfirm: async () => {
        const resApply = await post(`pool/${poolDetail?.slug}/apply`, { account: connectedAccount })

        if (!resApply || resApply.status !== 200) {
          toast.error("Fail to apply whitelist: " + resApply?.statusText)
          return
        }
        toast.success("Success to apply whitelist")
        setRefetch((pre) => !pre)
      }
    })

  const renderCoating = () => {
    if (![PoolStatus.BEFORE_WHITELIST, PoolStatus.WHITELIST, PoolStatus.TBA].includes(poolStatus))
      return <></>
    const startJoinTime = getDateFromUnix(poolDetail?.start_join_time)
    const endJoinTime = getDateFromUnix(poolDetail?.end_join_time)

    const renderMainContent = () => {
      switch (poolStatus) {
        case PoolStatus.BEFORE_WHITELIST:
          return (
            <>
              <span className="font-semibold">WHITELIST STARTS IN</span>

              <Countdown countdownDate={startJoinTime} />
            </>
          )
        case PoolStatus.WHITELIST:
          if (isConnected && isUserSigned && !userAlreadyKYC)
            return (
              <div className="flex flex-col items-center">
                <span className="font-semibold">KYC REQUIRED</span>

                <Image alt="" src={iconLock} className="mt-5 h-[60px] w-[60px]" />

                <a href={URLS.PROFILE} className="btnBorderOrange btnMedium mt-7 px-14">
                  <span>Go to Profile</span>
                </a>
              </div>
            )

          return (
            <>
              <span className="font-semibold">WHITELIST ENDS IN</span>

              <Countdown countdownDate={endJoinTime} />

              {poolDetail?.require_kyc && !userAlreadyKYC && (
                <div className="mt-5 flex rounded bg-[#5a3b31] py-2 px-10 text-[#F29B4B]">
                  KYC REQUIRED
                </div>
              )}
              {isApplied && isUserSigned ? (
                <div className="mt-5 flex rounded bg-[#00E1504D] py-2 px-10 text-[#73E480]">
                  WHITELISTED
                </div>
              ) : (
                <button
                  onClick={handleApplyWhitelist}
                  className="btnGradientPurple btnMedium mt-5 w-full"
                >
                  <span>Apply Whitelist</span>
                </button>
              )}
            </>
          )
        case PoolStatus.TBA:
        default:
          return <span className="font-semibold">WHITELIST IS NOT YET OPEN</span>
      }
    }

    return (
      <div className="absolute z-20 flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-[#151532]/90 text-center">
        {renderMainContent()}
      </div>
    )
  }

  return (
    <div className="relative flex h-96 w-[320px]">
      {renderCoating()}

      <div className="flex w-full flex-col items-center justify-center rounded-[20px] bg-[#151532] px-5 py-6 text-white">
        <div className="text-center text-18/24 font-semibold tracking-wide">PURCHASE TOKENS</div>
        <div className="mt-5 flex flex-col rounded-xl bg-[#000024] p-5 pb-2">
          <div className="flex w-full justify-between font-bold">
            <NumericFormat
              className="mr-3 w-full bg-transparent outline-none"
              placeholder={"Enter amount"}
              thousandSeparator={true}
              decimalScale={6}
              // defaultValue={maximumBuy || 0}
              // isAllowed={checkAllowInput}
              // max={tokenBalance}
              min={0}
              maxLength={255}
              // disabled={wrongChain}
            />
            <span className="">{poolDetail?.accepted_currency || "USDT"}</span>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-[6px]">
            <div className={selectAmountClass} onClick={() => handleSelectAmount(0.25)}>
              25%
            </div>
            <div className={selectAmountClass} onClick={() => handleSelectAmount(0.5)}>
              50%
            </div>
            <div className={selectAmountClass} onClick={() => handleSelectAmount(0.75)}>
              75%
            </div>
            <div className={selectAmountClass} onClick={() => handleSelectAmount(1)}>
              MAX
            </div>
          </div>
        </div>

        <div className="mt-2 w-full pl-5 text-left text-[#9999A7]">Balance: 10,000 USDT</div>
        <div className="text-18/32 font-bold">=</div>
        <div className="flex w-full justify-between rounded-xl bg-[#000024] px-5 py-4 font-semibold">
          <span className="">{formatCurrency(10000000)}</span>
          <span className="">$token</span>
        </div>
        <div className="btnGradientPurple btnMedium mt-3 !max-w-full" onClick={handleApprove}>
          <span>Approve</span>
        </div>
      </div>
    </div>
  )
}

export default BuyTokenForm
