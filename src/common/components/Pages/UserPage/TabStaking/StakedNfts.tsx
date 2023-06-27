import { PIONEER_NFT_CONTRACT, SHERIFF_NFT_CONTRACT } from "@constants/index"
import { useGetMultiplier } from "@hooks/useGetMultiplier"
import { useUnstakeMultipleERC721 } from "@hooks/useUnstakeMultipleERC721"
import iconInfo from "@images/icon-info.png"
import { Tooltip } from "@material-tailwind/react"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useAccount } from "wagmi"
import { StakedNFTSlider } from "./StakedNFTSlider"
import { NftStakingEvent, useStakingNftContext } from "./StakingNftContext"
import styles from "./tabStaking.module.scss"
import { StakedNft } from "./typing"
import { useId } from "@components/Base/Identity"

export function StakedNfts() {
  const { user } = useId()
  const connectedAccount = user?.wallet_address
  const { stakingNftSubject } = useStakingNftContext()
  const { unstakeMultipleERC721, loadingUnstake, unstakeMultipleERC721Status } =
    useUnstakeMultipleERC721(connectedAccount)
  const [chosenStakedNfts, setChosenStakedNfts] = useState<StakedNft[]>([])

  const { multiplier } = useGetMultiplier(connectedAccount)

  const stakedMultiplier = useMemo(
    () => (multiplier?.numerator ? `x${BigInt(multiplier?.numerator)}` : "..."),
    [multiplier?.numerator]
  )

  useEffect(() => {
    if (unstakeMultipleERC721Status !== "success") return

    setChosenStakedNfts([])
    stakingNftSubject.next(NftStakingEvent.NFT_UNSTAKED)
  }, [stakingNftSubject, unstakeMultipleERC721Status])

  const handleUnstakeNft = () => {
    if (!chosenStakedNfts.length) return

    unstakeMultipleERC721(
      chosenStakedNfts[0].tokenAddress,
      chosenStakedNfts.map((nft) => nft.tokenId)
    )
  }

  const handleSelectStakedNft = (nft: StakedNft) => {
    const isSameTokenType = chosenStakedNfts[0]?.tokenAddress === nft.tokenAddress
    if (!isSameTokenType) {
      setChosenStakedNfts([nft])
      return
    }

    setChosenStakedNfts((nfts) => {
      const isExists = nfts.some((chosenNft) => chosenNft.tokenId === nft.tokenId)
      if (isExists) return nfts.filter((chosenNft) => chosenNft.tokenId !== nft.tokenId)
      return [...nfts, nft]
    })
  }

  return (
    <div className={clsx(styles.bgBorder, "flex flex-col rounded-xl bg-clr-purple-70 p-5")}>
      <div className="relative flex items-center justify-between">
        <div className="flex gap-1">
          <span className="font-poppins text-14/18 font-semibold tracking-wide text-white">
            Staked NFTs
          </span>
          <Tooltip
            className="bg-clr-purple-50"
            content={
              <div className="w-[192px] p-1 text-12/18 text-clr-purple-10">
                Mighty Labs NFTs that you have currently staked within the Trailblaze NFT staking
                contract
              </div>
            }
          >
            <Image src={iconInfo} alt="" className="h-4 w-4" />
          </Tooltip>
        </div>

        <div className="absolute -right-4 -top-4 flex flex-col gap-1 rounded-lg bg-clr-purple-60 p-2">
          <div className="flex gap-1 font-poppins text-12/16 font-semibold uppercase">
            <span>Multiplier</span>
            <Tooltip
              className="bg-clr-purple-50"
              content={
                <div className="flex w-[361px] flex-col p-1 text-12/18 text-clr-purple-10">
                  <span className="text-14/18 font-semibold">Staking Mighty Labs NFTs</span>
                  <span className="mt-1">Leader Board points multiply by staking certain NFTs</span>
                </div>
              }
            >
              <Image src={iconInfo} alt="" className="h-4 w-4" />
            </Tooltip>
          </div>
          <div className="text-right font-poppins text-14/18 font-semibold">{stakedMultiplier}</div>
        </div>
      </div>

      <StakedNFTSlider
        name="PIONEER"
        nftAddr={PIONEER_NFT_CONTRACT}
        onSelectNft={handleSelectStakedNft}
        chosenNfts={chosenStakedNfts}
      />

      <StakedNFTSlider
        name="SHERIFF"
        nftAddr={SHERIFF_NFT_CONTRACT}
        onSelectNft={handleSelectStakedNft}
        chosenNfts={chosenStakedNfts}
      />

      <div className="mt-5 flex flex-col items-center">
        <button
          type="button"
          onClick={handleUnstakeNft}
          disabled={!chosenStakedNfts.length || loadingUnstake}
          className="btnBorderOrangeDark btnSmall px-4"
        >
          <span>{loadingUnstake ? "Unstaking" : "Unstake"}</span>
        </button>
        <span className="mt-2 text-12/16 text-textGray">30 days withdrawal cooldown</span>
      </div>
    </div>
  )
}
