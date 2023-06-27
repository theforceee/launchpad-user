import { get, post } from "@/common/request"
import Countdown from "@components/Base/Countdown"
import { useId } from "@components/Base/Identity"
import { confirm } from "@components/Base/Modal"
import { Spinner } from "@components/Base/Spinner"
import { URLS } from "@constants/index"
import { MAPPING_CURRENCY_ADDRESS, NETWORK_AVAILABLE } from "@constants/networks"
import useTokenBalance from "@hooks/useTokenBalance"
import useTokenDetail from "@hooks/useTokenDetail"
import iconLock from "@images/icon-lock.png"
import {
  PoolStatus,
  getDateFromUnix,
  getPoolTimelineStatus,
  isCameTime,
  isNotYetTime,
  poolStatus
} from "@utils/getPoolDetailStatus"
import { formatCurrency } from "@utils/index"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { NumericFormat } from "react-number-format"
import { toast } from "react-toastify"
import { useAccount } from "wagmi"

type PurchasePercentTypes = {
  value: number
  label: string
}
const purchasePercents: Array<PurchasePercentTypes> = [
  {
    label: "25%",
    value: 0.25
  },
  {
    label: "50%",
    value: 0.5
  },
  {
    label: "75%",
    value: 0.75
  },
  {
    label: "MAX",
    value: 1
  }
]

const BuyTokenForm = (props: { poolDetail: any; poolStatus: poolStatus }) => {
  const { poolDetail, poolStatus } = props
  const { isConnected, address: connectedAccount } = useAccount()
  const { user } = useId()
  const userAlreadyKYC = true

  const [isApplied, setIsApplied] = useState<boolean>(false)
  const [refetch, setRefetch] = useState<boolean>(false)
  const [selectedPercent, setSelectedPercent] = useState<number>()

  const [poolCurrencyAddress, setPoolCurrencyAddress] = useState<`0x${string}`>()
  const { userBalance, loadingBalance } = useTokenBalance(poolCurrencyAddress, connectedAccount, 97)

  const publicPool = useMemo(
    () => poolDetail?.pools.find((item: any) => !item.is_private),
    [poolDetail]
  )
  const privatePool = useMemo(
    () => poolDetail?.pools.find((item: any) => !!item.is_private),
    [poolDetail]
  )

  useEffect(() => {
    console.log("poolStatus", poolStatus)
  }, [poolStatus])

  useEffect(() => {
    ;(async () => {
      if (!connectedAccount || !poolDetail) return
      const currencyAddress = (MAPPING_CURRENCY_ADDRESS as any)[poolDetail.token?.network][
        poolDetail.accepted_currency
      ]
      setPoolCurrencyAddress(currencyAddress)

      const resSub = await get(`pool/${poolDetail?.slug}/submission`, {
        account: connectedAccount
      })
      if (!resSub || !resSub.data) return
      setIsApplied(true)
    })()
  }, [connectedAccount, poolDetail, refetch])

  const handleSelectAmount = (mul: number) => {
    console.log("multiple by", mul)
    setSelectedPercent(mul)
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
          toast.error("Fail to apply whitelist: " + resApply?.message)
          return
        }
        toast.success("Success to apply whitelist")
        setRefetch((pre) => !pre)
      }
    })

  const renderCoating = () => {
    if (!poolDetail)
      return (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-clr-purple-70 opacity-80" />
          <div className="relative flex flex-col items-center justify-center gap-2 text-14/18 text-white">
            <Spinner />
          </div>
        </div>
      )

    if (
      ![
        PoolStatus.BEFORE_WHITELIST,
        PoolStatus.WHITELIST,
        PoolStatus.BEFORE_PRIVATE_WL,
        PoolStatus.TBA
      ].includes(poolStatus)
    )
      return <></>
    const startJoinTime = getDateFromUnix(poolDetail?.start_join_time)
    const endJoinTime = getDateFromUnix(poolDetail?.end_join_time)
    const startBuyPrivateWL = getDateFromUnix(privatePool?.start_buy_time)

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
          if (isConnected && user && !userAlreadyKYC)
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
              {isApplied && user ? (
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

        // After end Whitelist, waiting for Private WL
        case PoolStatus.BEFORE_PRIVATE_WL:
          return (
            <>
              <span className="font-semibold">PRIVATE SALE STARTS IN</span>

              <Countdown countdownDate={startBuyPrivateWL} />

              {isApplied && user && (
                <div className="mt-5 flex rounded bg-[#00E1504D] py-2 px-10 text-[#73E480]">
                  WHITELISTED
                </div>
              )}
            </>
          )

        case PoolStatus.TBA:
        default:
          return (
            <>
              <span className="font-semibold text-[#F29B4B]">EARLY ACCESS</span>
              <span className="font-semibold">
                WHITELIST <br /> COMMING SOON
              </span>
            </>
          )
      }
    }

    return (
      <div className="absolute z-20 flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-[#151532]/90 text-center">
        {renderMainContent()}
      </div>
    )
  }

  return (
    <div className="relative flex h-[350px] w-[320px]">
      {renderCoating()}

      <div className="flex w-full flex-col items-center justify-center rounded-[20px] bg-[#151532] px-5 py-6 text-white">
        <div className="text-center text-18/24 font-semibold tracking-wide">PURCHASE TOKENS</div>

        <div className="mt-3 w-full text-right text-12/16 text-[#66667B]">
          <span>Balance: </span>
          <span>{`${formatCurrency(userBalance, 2)} ${
            poolDetail?.accepted_currency || "N/A"
          }`}</span>
        </div>
        <div className="mt-1 flex w-full flex-col rounded-lg bg-[#000024] p-3">
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
        </div>

        <div className="mt-1 grid w-full grid-cols-4 gap-[6px]">
          {purchasePercents.map((percent: PurchasePercentTypes, index: number) => (
            <div
              className={clsx(
                "flex h-[30px] cursor-pointer items-center justify-center rounded-lg py-1 text-12/16",
                selectedPercent === percent.value
                  ? "bg-[#504FBE] text-white"
                  : "bg-[#000122] text-textGray"
              )}
              key={index}
              onClick={() => handleSelectAmount(percent.value)}
            >
              {percent.label}
            </div>
          ))}
        </div>

        <div className="text-18/32 font-bold">=</div>
        <div className="flex w-full justify-center rounded-xl bg-[#000024] px-5 py-4 font-semibold">
          <span className="">{formatCurrency(10000000)}</span>
          <span className="ml-1">{}</span>
        </div>
        <button
          disabled={true}
          className="btnGradientPurple btnMedium mt-3 !max-w-full"
          onClick={handleApprove}
        >
          <span>Approve</span>
        </button>
      </div>
    </div>
  )
}

export default BuyTokenForm
