import { BLAZE_TOKEN_CONTRACT, NETWORK_ID, STAKING_CONTRACT } from "@constants/index"
import { useCountDown } from "@hooks/useCountDown"
import iconInfo from "@images/icon-info.png"
import iconFiredrake from "@images/profile/tier-firedrake.png"
import iconPhoenix from "@images/profile/tier-phoenix.png"
import iconTrailblazer from "@images/profile/tier-trailblazer.png"
import { Tooltip } from "@material-tailwind/react"
import { formatCurrency } from "@utils/index"
import BigNumber from "bignumber.js"
import Image, { StaticImageData } from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"
import { useAccount, useBalance, useContractWrite, usePrepareContractWrite } from "wagmi"
import STAKING_ABI from "@abi/Staking.json"

export const SEPARATOR = ","
type TierTypes = {
  icon: StaticImageData
  label: string
  desc: string
}
const tiers: Array<TierTypes> = [
  {
    desc: "31-100%",
    icon: iconFiredrake,
    label: "Firedrake"
  },
  {
    desc: "top 11-30%",
    icon: iconPhoenix,
    label: "Phoenix"
  },
  {
    desc: "top 10%",
    icon: iconTrailblazer,
    label: "Trailblazer"
  }
]

const fakeClaimDate = 1687308446349

const StakingToken = () => {
  const [inputAmount, setInputAmount] = useState<string>("")
  const { address } = useAccount()
  const { data: userBalance } = useBalance({
    address,
    token: BLAZE_TOKEN_CONTRACT,
    chainId: +NETWORK_ID,
    onError(error) {
      console.log("Error to fetch balance", error)
    }
  })

  const { config } = usePrepareContractWrite()

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: STAKING_CONTRACT,
    abi: STAKING_ABI,
    functionName: "StakedERC20",
    mode: "prepared"
  })

  const { days, hours, minutes } = useCountDown(new Date(new Date(fakeClaimDate)), true)

  useEffect(() => {
    console.log("user balance", userBalance)
  }, [userBalance])

  const handleChangeInputAmount = (event: ChangeEvent<HTMLInputElement> | undefined) => {
    const inputValue = event?.target.value || ""
    const newValue = inputValue.split(SEPARATOR).join("")
    setInputAmount(newValue)
  }
  const handleSelectMaxAmount = () => {
    setInputAmount(new BigNumber(userBalance?.formatted || "0").toString())
  }

  const handleStake = () => {
    console.log("inputAmount", inputAmount)
    write?.()
  }

  return (
    <div className="flex flex-col border-r border-[#33344D] px-6">
      <div className="flex items-center">
        <span className="text-60/72 font-semibold tracking-wider">01</span>
        <span className="ml-3 w-full max-w-[400px] text-[24px] font-bold leading-7 tracking-wide">
          Get Leader Board Points for staking $BLAZE
        </span>
      </div>
      <ul className="mt-6 list-outside list-disc pl-5 text-14/20 text-[#CCCCD3]">
        <li className="">ranking determines tier and allocation of IDO tokens</li>
        <li className="">
          top 30% on Leader Board get IDO Private Sale access (top 2 tiers: Phoenix and Firedrake)
        </li>
      </ul>

      <div className="mt-5 text-12/16 font-semibold text-textGray">$BLAZE BALANCE</div>
      <div className="mt-2 flex items-center">
        <span className="text-28/36 font-bold tracking-wider">
          {formatCurrency(userBalance?.formatted)}
        </span>
        <a href="#" target="_blank" className="btnBorderOrange btnSmall ml-3 !border !px-4">
          <span>Buy $BLAZE</span>
        </a>
      </div>

      <div className="mt-5 flex flex-col rounded-xl bg-[#000122] p-5">
        <div className="text-12/16 font-semibold text-textGray">STAKE $BLAZE</div>
        <div className="mt-2 flex w-full items-center border-b border-[#33344D] pb-4">
          <div className="flex w-full rounded-xl bg-[#151532] p-2">
            <NumericFormat
              className="w-full bg-transparent pl-3 outline-none"
              placeholder={"Enter amount"}
              thousandSeparator={true}
              decimalScale={6}
              // isAllowed={checkAllowInput}
              min={0}
              maxLength={255}
              value={inputAmount}
              onChange={handleChangeInputAmount}
              // disabled={wrongChain}
            />
            <div
              onClick={handleSelectMaxAmount}
              className="ml-2 flex cursor-pointer rounded-lg bg-[#000122] px-4 py-[9px] text-14/18"
            >
              MAX
            </div>
          </div>

          <div className="btnGradientPurple btnMedium ml-1 !w-[168px]" onClick={handleStake}>
            <span>Stake</span>
          </div>
        </div>

        <div className="grid grid-cols-2 pt-3">
          <div className="flex flex-col items-center border-r border-[#33344D]">
            <div className="flex items-center text-12/16 font-semibold text-textGray">
              <span className="mr-1">$BLAZE STAKED</span>

              <Tooltip
                className="bg-[#33344D]"
                content={
                  <div className="w-[134px] p-1 text-12/18 text-[#F2F0FF]">
                    The amount of $BLAZE tokens that you have staked within the Trailblaze staking
                    contract
                  </div>
                }
              >
                <Image src={iconInfo} alt="" className="h-3 w-3" />
              </Tooltip>
            </div>
            <span className="mt-1 text-28/36 font-bold tracking-wider">
              {formatCurrency("14567")}
            </span>
            <div className="btnBorderOrangeDark btnSmall mt-3 w-full !border">
              <span>Unstake</span>
            </div>
            <span className="mt-2 text-12/16 text-textGray">30 days withdrawal cooldown</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center text-12/16 font-semibold text-textGray">
              <span className="mr-1">CLAIM $BLAZE</span>
              <Tooltip
                className="bg-[#33344D]"
                content={
                  <div className="w-[134px] p-1 text-12/18 text-[#F2F0FF]">
                    The amount of $BLAZE tokens that you have available to claim after unstaking
                  </div>
                }
              >
                <Image src={iconInfo} alt="" className="h-3 w-3" />
              </Tooltip>
            </div>
            <span className="mt-1 text-28/36 font-bold tracking-wider">
              {formatCurrency("11356")}
            </span>
            <div className="btnGradientPurple btnSmall mt-3 w-full">
              <span>Claim All</span>
            </div>
            <span className="mt-2 text-12/16 text-textGray">
              {`${days}d : ${hours}h : ${minutes}m`}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-x-2">
        <div className="flex items-center justify-between rounded-xl bg-[#000122] px-5 py-3">
          <div className="flex items-center text-12/16 font-semibold text-textGray">
            <span className="mr-1">RANK</span>

            <Tooltip
              className="bg-[#33344D]"
              content={
                <div className="w-[175px] p-1 text-12/18 text-[#F2F0FF]">
                  Your current rank in the IDO Leader Board
                </div>
              }
            >
              <Image src={iconInfo} alt="" />
            </Tooltip>
          </div>
          <div className="flex items-end">
            <span className="text-28/36 font-bold">17</span>
            <span className="ml-1 text-18/24 font-semibold">Th</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-[#000122] px-5 py-3">
          <div className="flex items-center text-12/16 font-semibold text-textGray">
            <span className="mr-1">TIER</span>

            <Tooltip
              className="bg-[#33344D]"
              content={
                <div className="flex w-[175px] flex-col space-y-2 p-1 text-12/18 text-[#F2F0FF] ">
                  {tiers.map(({ desc, icon, label }: TierTypes, index: number) => (
                    <div
                      className="flex items-center text-12/16 font-semibold tracking-wide"
                      key={index}
                    >
                      <Image alt="" src={icon} className="h-4 w-4" />
                      <span className="ml-1 text-blazeOrange">{label}</span>
                      <span className="ml-auto">{desc}</span>
                    </div>
                  ))}
                </div>
              }
            >
              <Image src={iconInfo} alt="" />
            </Tooltip>
          </div>
          <div className="flex">
            <Image alt="" src={iconFiredrake} className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakingToken
