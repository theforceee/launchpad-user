import clsx from "clsx"
import Image from "next/image"
import iconInfo from "@images/icon-info.png"
import styles from "./tabStaking.module.scss"
import { Tooltip } from "@material-tailwind/react"
import { StakedNFTSlider } from "./StakedNFTSlider"
import { PIONEER_NFT_CONTRACT, SHERIFF_NFT_CONTRACT } from "@constants/index"
import { useEffect, useState } from "react"
import { StakedNft } from "./CompatibleNFTs"
import { useUnstakeMultipleERC721 } from "@hooks/useUnstakeMultipleERC721"
import { useAccount } from "wagmi"
import { NftStakingEvent, useStakingNftContext } from "./StakingNftContext"

export function StakedNfts() {
  const { stakingNftSubject } = useStakingNftContext()
  const { address: connectedAccount } = useAccount()
  const { unstakeMultipleERC721, loadingUnstake, unstakeMultipleERC721Status } =
    useUnstakeMultipleERC721(connectedAccount)
  const [chosenStakedNfts, setChosenStakedNfts] = useState<StakedNft[]>([])

  useEffect(() => {
    if (unstakeMultipleERC721Status !== "success") return

    setChosenStakedNfts([])
    stakingNftSubject.next(NftStakingEvent.NFT_UNSTAKED)
  }, [unstakeMultipleERC721Status])

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
      <div className="flex items-center justify-center">
        <span className="mr-2 font-poppins text-18/24 font-semibold tracking-wide text-white">
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