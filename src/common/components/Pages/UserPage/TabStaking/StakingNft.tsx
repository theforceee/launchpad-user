import Image from "next/image"
import React from "react"
import { Tooltip } from "@material-tailwind/react"
import styles from "./tabStaking.module.scss"

import iconInfo from "@images/icon-info.png"
import clsx from "clsx"

const StakingNft = () => {
  return (
    <div className="flex flex-col px-6">
      <div className="flex items-center">
        <span className="text-60/72 font-semibold tracking-wider">02</span>
        <span className="ml-3 w-full max-w-[400px] text-[24px] font-bold leading-7 tracking-wide">
          Get Leader Board Point Multipliers for staking Mighty Labs NFTs
        </span>
      </div>
      <ul className="mt-6 list-outside list-disc pl-5 text-14/20 text-[#CCCCD3]">
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
        <div className="flex flex-col rounded-xl bg-[#000122] p-5">
          <div className="flex items-center justify-center">
            <span className="mr-2 text-18/24 font-semibold tracking-wide">Compatible NFTs</span>
            <Tooltip
              className="bg-[#33344D]"
              content={
                <div className="w-[192px] p-1 text-12/18 text-[#F2F0FF]">
                  Mighty Labs NFTs that are currently in your connected wallet but are not yet
                  staked
                  <br />
                  <br />
                  NFTs that have a number overlayed represent NFTs you have recently unstaked and
                  the number displayed is the number of days left of the 30 day cooldown period at
                  which time they can then be staked again or recieved to your wallet
                </div>
              }
            >
              <Image src={iconInfo} alt="" className="h-4 w-4" />
            </Tooltip>
          </div>

          <div className="mt-5 flex flex-col">
            <span className="text-12/16 font-semibold text-textGray">SHERIFF</span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
            </div>
          </div>

          <div className="mt-5 flex flex-col">
            <span className="text-12/16 font-semibold text-textGray">PIONEEER</span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="btnSmall btnGradientPurple">
              <span>Stake</span>
            </div>
            <div className="btnSmall btnGradientOrange">
              <span>Claim All</span>
            </div>
          </div>
        </div>

        <div className={clsx(styles.bgBorder, "flex flex-col rounded-xl bg-[#000122] p-5")}>
          <div className="flex items-center justify-center">
            <span className="mr-2 text-18/24 font-semibold tracking-wide text-white">
              Staked NFTs
            </span>
            <Tooltip
              className="bg-[#33344D]"
              content={
                <div className="w-[192px] p-1 text-12/18 text-[#F2F0FF]">
                  Mighty Labs NFTs that you have currently staked within the Trailblaze NFT staking
                  contract
                </div>
              }
            >
              <Image src={iconInfo} alt="" className="h-4 w-4" />
            </Tooltip>
          </div>

          <div className="mt-5 flex flex-col">
            <span className="text-12/16 font-semibold text-textGray">SHERIFF</span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
            </div>
          </div>

          <div className="mt-5 flex flex-col">
            <span className="text-12/16 font-semibold text-textGray">PIONEEER</span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
              <div className="flex h-[66px] rounded-lg bg-[#66667B]"></div>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <div className="btnBorderOrangeDark btnSmall w-full">
              <span>Unstake</span>
            </div>
            <span className="mt-2 text-12/16 text-textGray">30 days withdrawal cooldown</span>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className=""></div>
        <div className={clsx(styles.bgBorder, "flex flex-col items-center p-5")}>
          <div className="flex items-center justify-center">
            <span className="mr-2 text-18/24 font-semibold tracking-wide text-white">
              Staked NFTs
            </span>
            <Tooltip
              className="bg-[#33344D]"
              content={
                <div className="flex w-[361px] flex-col p-1 text-12/18 text-[#F2F0FF]">
                  <span className="text-14/18 font-semibold">Staking Mighty Labs NFTs</span>
                  <span className="mt-1">Leader Board points multiply by staking certain NFTs</span>
                </div>
              }
            >
              <Image src={iconInfo} alt="" className="h-4 w-4" />
            </Tooltip>
          </div>

          <div className="mt-2 text-28/36 font-bold text-blazeOrange">x1.025</div>
        </div>
      </div>
    </div>
  )
}

export default StakingNft
