import { formatCurrency } from "@utils/index"
import { NumericFormat } from "react-number-format"

const selectAmountClass =
  "flex cursor-pointer items-center justify-center rounded-lg border border-[#333350] bg-[#151532] py-1"

const BuyTokenForm = (props: { poolDetail: any }) => {
  const { poolDetail } = props

  const handleSelectAmount = (mul: number) => {
    console.log("multiple by", mul)
  }

  const handleApprove = () => {
    console.log("handleApprove")
  }

  return (
    <div className="relative flex h-96 w-[320px]">
      <div className="flex w-full flex-col items-center justify-center rounded-[20px] bg-[#151532] px-5 py-6 text-white">
        <div className="text-center text-18/24 font-semibold tracking-wide">
          PURCHASE TOKENS
        </div>
        <div className="flex flex-col rounded-xl bg-[#000024] p-5 pb-2">
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
            <div
              className={selectAmountClass}
              onClick={() => handleSelectAmount(0.25)}
            >
              25%
            </div>
            <div
              className={selectAmountClass}
              onClick={() => handleSelectAmount(0.5)}
            >
              50%
            </div>
            <div
              className={selectAmountClass}
              onClick={() => handleSelectAmount(0.75)}
            >
              75%
            </div>
            <div
              className={selectAmountClass}
              onClick={() => handleSelectAmount(1)}
            >
              MAX
            </div>
          </div>
        </div>

        <div className="mt-2 w-full pl-5 text-left text-[#9999A7]">
          Balance: 10,000 USDT
        </div>
        <div className="text-18/32 font-bold">=</div>
        <div className="flex w-full justify-between rounded-xl bg-[#000024] px-5 py-4 font-semibold">
          <span className="">{formatCurrency(10000000)}</span>
          <span className="">$token</span>
        </div>
        <div className="btnGradient mt-3" onClick={handleApprove}>
          Approve
        </div>
      </div>

      <div className="absolute z-20 flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-[#151532]/90 text-center">
        <span className="font-semibold">PUBLIC SALE STARTS IN</span>
        <div className="mt-5 rounded bg-[#6666664D]/30 px-10 py-2 text-[#cccccc]">
          WHITELIST CLOSED
        </div>
      </div>
    </div>
  )
}

export default BuyTokenForm
