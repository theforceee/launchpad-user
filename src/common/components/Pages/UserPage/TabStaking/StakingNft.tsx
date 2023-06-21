import useTokenStaking from "@hooks/useTokenStaking"
import iconInfo from "@images/icon-info.png"
import { Tooltip } from "@material-tailwind/react"
import clsx from "clsx"
import Image from "next/image"
import { useMemo } from "react"
import { useAccount } from "wagmi"
import styles from "./tabStaking.module.scss"
import { CompatibleNFTs } from "./CompatibleNFTs"
import { StakingNftContext, NftStakingEvent } from "./StakingNftContext"
import { Subject } from "@components/Base/rx"
import { StakedNfts } from "./StakedNfts"

const StakingNft = () => {
  const { address: connectedAccount } = useAccount()
  const { multiplier } = useTokenStaking(connectedAccount)

  const stakedMultiplier = useMemo(
    () => BigInt(multiplier?.numerator || "1").toString(),
    [multiplier?.numerator]
  )

  const stakingNftSubject = useMemo(() => new Subject(NftStakingEvent.NONE), [])

  return (
    <StakingNftContext.Provider value={{ stakingNftSubject }}>
      <div className="flex flex-col px-6">
        <div className="flex items-center">
          <span className="text-60/72 font-semibold tracking-wider">02</span>
          <span className="ml-3 w-full max-w-[400px] text-[24px] font-bold leading-7 tracking-wide">
            Get Leader Board Point Multipliers for staking Mighty Labs NFTs
          </span>
        </div>
        <ul className="mt-6 list-outside list-disc pl-5 text-14/20 text-clr-purple-20">
          <li className="">ranking determines tier and allocation of IDO tokens</li>
          <li className="">
            top 30% on Leader Board get IDO Private Sale access (top 2 tiers: Phoenix and Firedrake)
          </li>
        </ul>

        <div className="mt-6 flex items-center">
          <a href="#" target="_blank" className="btnMedium btnBorderOrange !px-8">
            <span>Learn more</span>
          </a>
          <a href="#" target="_blank" className="btnMedium btnGradientOrange ml-2">
            <span>Buy Mighty Labs NFTs</span>
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <CompatibleNFTs />
          <StakedNfts />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className=""></div>
          <div className={clsx(styles.bgBorder, "flex flex-col items-center p-5")}>
            <div className="flex items-center justify-center">
              <span className="mr-2 text-18/24 font-semibold tracking-wide text-white">
                Staked NFTs
              </span>
              <Tooltip
                className="bg-clr-purple-50"
                content={
                  <div className="flex w-[361px] flex-col p-1 text-12/18 text-clr-purple-10">
                    <span className="text-14/18 font-semibold">Staking Mighty Labs NFTs</span>
                    <span className="mt-1">
                      Leader Board points multiply by staking certain NFTs
                    </span>
                  </div>
                }
              >
                <Image src={iconInfo} alt="" className="h-4 w-4" />
              </Tooltip>
            </div>

            <div className="mt-2 text-28/36 font-bold text-blazeOrange">{`x${stakedMultiplier}`}</div>
          </div>
        </div>
      </div>
    </StakingNftContext.Provider>
  )
}

export default StakingNft
