import { useMemo } from "react"
import { CompatibleNFTs } from "./CompatibleNFTs"
import { StakingNftContext, NftStakingEvent } from "./StakingNftContext"
import { Subject } from "@components/Base/rx"
import { StakedNfts } from "./StakedNfts"

const StakingNft = () => {
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
      </div>
    </StakingNftContext.Provider>
  )
}

export default StakingNft
