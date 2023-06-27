import { useCountDown } from "@hooks/useCountDown"
import useTokenAllowance from "@hooks/useTokenAllowance"
import useTokenApprove from "@hooks/useTokenApprove"
import useTokenBalance from "@hooks/useTokenBalance"
import useTokenStaking from "@hooks/useTokenStaking"
import iconInfo from "@images/icon-info.png"
import iconFiredrake from "@images/profile/tier-firedrake.png"
import iconPhoenix from "@images/profile/tier-phoenix.png"
import iconTrailblazer from "@images/profile/tier-trailblazer.png"
import { Tooltip } from "@material-tailwind/react"
import { convertBigIntToNumber, formatCurrency, getRankingSuffix, getTierColor } from "@utils/index"
import Image, { StaticImageData } from "next/image"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { NumericFormat } from "react-number-format"
import { useAccount } from "wagmi"
import UnstakeDialog from "./UnstakeDialog"
import { get } from "@/common/request"
import clsx from "clsx"
import { BLAZE_TOKEN_CONTRACT, STAKING_CONTRACT, USER_TIER_MAPPING } from "@constants/index"
import { useUserStakedInfo } from "@hooks/useUserStakedInfo"
import useTokenDetail from "@hooks/useTokenDetail"
import { ETH_NETWORK_ID } from "@constants/networks"

export const SEPARATOR = ","
type TierTypes = {
  icon: StaticImageData
  label: string
  desc: string
}
const tiers: Array<TierTypes> = [
  {
    desc: "top 10%",
    icon: iconFiredrake,
    label: "Firedrake"
  },
  {
    desc: "top 11-30%",
    icon: iconPhoenix,
    label: "Phoenix"
  },
  {
    desc: "31-100%",
    icon: iconTrailblazer,
    label: "Trailblazer"
  }
]

const StakingToken = () => {
  const { address: connectedAccount } = useAccount()
  const { tokenDetail } = useTokenDetail(BLAZE_TOKEN_CONTRACT, +ETH_NETWORK_ID)
  const { userAllowance, refetch: refetchAllowance } = useTokenAllowance(
    tokenDetail,
    connectedAccount,
    STAKING_CONTRACT
  )
  const { userBalance, loadingBalance } = useTokenBalance(BLAZE_TOKEN_CONTRACT, connectedAccount)
  const { approve, loadingApprove } = useTokenApprove()
  const {
    stakeToken,
    loadingStake,
    tokenStaked,
    tokenPendingWithdraw,
    unstakeToken,
    loadingUnstake
  } = useTokenStaking(connectedAccount)
  const { days, hours, minutes } = useCountDown(
    tokenPendingWithdraw && new Date(+BigInt(tokenPendingWithdraw[1]).toString() * 1000),
    true
  )
  const { userPosition, userTier } = useUserStakedInfo()

  const [openUnstakeDialog, setOpenUnstakeDialog] = useState<boolean>(false)
  const [inputAmount, setInputAmount] = useState<string>("")

  // refetch allowance after approve
  useEffect(() => {
    if (loadingApprove) return
    refetchAllowance()
  }, [loadingApprove, refetchAllowance])

  const disabledClaimPending = useMemo(
    () =>
      !tokenPendingWithdraw ||
      new Date().getTime() < +BigInt(tokenPendingWithdraw[1]).toString() * 1000,
    [tokenPendingWithdraw]
  )

  const handleChangeInputAmount = (event: ChangeEvent<HTMLInputElement> | undefined) => {
    const inputValue = event?.target.value || ""
    const newValue = inputValue.split(SEPARATOR).join("")
    setInputAmount(newValue)
  }
  const handleSelectMaxAmount = () => {
    setInputAmount(userBalance)
  }

  const handleApprove = () => {
    approve()
  }

  const handleStake = () => {
    stakeToken(inputAmount)
  }

  return (
    <>
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
            {loadingBalance ? "Loading" : formatCurrency(userBalance)}
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

            {userAllowance >= +inputAmount ? (
              <button
                disabled={loadingStake || !inputAmount}
                className="btnGradientPurple btnMedium ml-1 !w-[168px]"
                onClick={handleStake}
              >
                <span>{loadingStake ? "Staking" : "Stake"}</span>
              </button>
            ) : (
              <button
                disabled={loadingApprove}
                className="btnGradientPurple btnMedium ml-1 !w-[168px]"
                onClick={handleApprove}
              >
                <span>{loadingApprove ? "Approving" : "Approve"}</span>
              </button>
            )}
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
                {formatCurrency(tokenStaked)}
              </span>
              <div>
                <button
                  disabled={loadingUnstake || !tokenStaked || tokenStaked <= 0}
                  onClick={() => setOpenUnstakeDialog(true)}
                  className="btnBorderOrangeDark btnSmall mt-3 w-full !border px-4"
                >
                  <span>Unstake</span>
                </button>
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
                {formatCurrency(convertBigIntToNumber((tokenPendingWithdraw || [0])[0]))}
              </span>
              <div>
                <button
                  disabled={disabledClaimPending}
                  className="btnGradientPurple btnSmall mt-3 w-full px-4"
                >
                  <span>Claim All</span>
                </button>
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
                <Image src={iconInfo} alt="" className="h-3 w-3" />
              </Tooltip>
            </div>
            <div className="flex items-end">
              <span className="text-28/36 font-bold">{userPosition}</span>
              <span className="ml-1 text-18/24 font-semibold">
                {getRankingSuffix(userPosition)}
              </span>
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
                        <span className={clsx("ml-1", getTierColor(index))}>{label}</span>
                        <span className="ml-auto">{desc}</span>
                      </div>
                    ))}
                  </div>
                }
              >
                <Image src={iconInfo} alt="" className="h-3 w-3" />
              </Tooltip>
            </div>
            <div className="flex">
              {userTier ? (
                <Image alt="" src={userTier?.icon ?? iconTrailblazer} className="h-8 w-8" />
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>
      </div>

      <UnstakeDialog
        open={openUnstakeDialog}
        unstakeToken={unstakeToken}
        handleClose={() => setOpenUnstakeDialog(false)}
        tokenStaked={tokenStaked}
        tokenDetail={tokenDetail}
        loadingUnstake={loadingUnstake}
      />
    </>
  )
}

export default StakingToken
