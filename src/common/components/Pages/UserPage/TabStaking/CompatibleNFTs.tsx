import { useStakeMultipleERC721 } from "@hooks/useStakeMultipleERC721"
import iconInfo from "@images/icon-info.png"
import { Tooltip } from "@material-tailwind/react"
import clsx from "clsx"
import Image from "next/image"
import styles from "./tabStaking.module.scss"
import { PIONEER_NFT_CONTRACT, SHERIFF_NFT_CONTRACT } from "@constants/index"
import { useCallback, useEffect, useState } from "react"
import { get } from "@/common/request"
import { Address, useAccount } from "wagmi"
import { toast } from "react-toastify"
import { useErc721Approve } from "@hooks/useErc721Aprrove"
import { useUnstakeErc721 } from "@hooks/useUnstakeErc721"
import { StakedNFT } from "./StakedNFT"
import { CompatibleNftsSlider } from "./CompatibleNftsSlider"

export function CompatibleNFTs() {
  const { address: connectedAccount } = useAccount()
  const [selectedNfts, setSelectedNfts] = useState<NftData[]>([])
  const [pioneerNfts, setPioneerNfts] = useState<NftData[]>([])
  const [sheriffNfts, setSheriffNfts] = useState<NftData[]>([])
  const isAllNftsApproved = selectedNfts.every((nft) => nft.isApproved)

  const { stakeMultipleERC721, loadingStake, stakeMultipleERC721Status } =
    useStakeMultipleERC721(connectedAccount)
  const { approve, isApproving } = useErc721Approve(
    selectedNfts[0]?.tokenAddress,
    connectedAccount,
    {
      onApproveSuccess() {
        const firstUnApprovedNftIdx = selectedNfts.findIndex((nft) => !nft.isApproved)
        const nextUnApprovedNft = selectedNfts.find(
          (nft, idx) => !nft.isApproved && idx !== firstUnApprovedNftIdx
        )

        setSelectedNfts((nfts) => {
          nfts[firstUnApprovedNftIdx] = {
            ...nfts[firstUnApprovedNftIdx],
            isApproved: true
          }
          return [...nfts]
        })

        if (nextUnApprovedNft) {
          approve(nextUnApprovedNft.tokenId)
          return
        }

        toast.success("SUCCESS: all selected NFTs are approved, you can stake now")
      }
    }
  )

  const handleSelectNft = (newNft: NftData) => {
    setSelectedNfts((nfts) => {
      if (newNft.symbol !== nfts[0]?.symbol) {
        return [newNft]
      }

      const isSelected = isNftSelected(nfts, newNft)
      if (!isSelected) {
        return [...nfts, newNft]
      }

      return nfts.filter((nft) => nft.tokenId !== newNft.tokenId)
    })
  }

  const fetchNfts = useCallback(async () => {
    const res = await get("nft")
    if (!res.data) return

    const pioneerNfts: NftData[] = []
    const sheriffNfts: NftData[] = []
    res.data.forEach((nft: NftData) => {
      if (nft.tokenAddress === SHERIFF_NFT_CONTRACT) {
        sheriffNfts.push(nft)
        return
      }
      pioneerNfts.push(nft)
    })

    setPioneerNfts(pioneerNfts)
    setSheriffNfts(sheriffNfts)
  }, [])

  useEffect(() => {
    fetchNfts()
  }, [fetchNfts])

  useEffect(() => {
    console.log("stakeMultipleERC721Status", stakeMultipleERC721Status)
    if (stakeMultipleERC721Status === "success") fetchNfts()
  }, [stakeMultipleERC721Status])

  const handleStakeNft = () => {
    if (!selectedNfts.length) return

    stakeMultipleERC721(
      selectedNfts[0].tokenAddress,
      selectedNfts.map((nft) => nft.tokenId)
    )
  }

  const handleApprove = () => {
    const firstUnApprovedNft = selectedNfts.find((nft) => !nft.isApproved)
    firstUnApprovedNft && approve(firstUnApprovedNft.tokenId)
    // if (!selectedNft) return
  }

  const [chosenStakedNft, setChosenStakedNft] = useState<StakedNft | undefined>()
  const handleSelectStakedNft = (nft: StakedNft) => {
    setChosenStakedNft(nft)
  }

  const { unstakeNft, loadingUnstake } = useUnstakeErc721(connectedAccount)

  const handleUnstakeNft = () => {
    if (!chosenStakedNft) return
    unstakeNft(chosenStakedNft.tokenAddress, chosenStakedNft.tokenId)
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <div
        className={clsx(
          styles.bgBorder,
          "flex flex-col rounded-xl bg-clr-purple-70 p-5 text-white"
        )}
      >
        <div className="flex items-center justify-center">
          <span className="mr-2 font-poppins text-18/24 font-semibold tracking-wide">
            Compatible NFTs
          </span>
          <Tooltip
            className="bg-clr-purple-50"
            content={
              <div className="w-[192px] p-1 text-12/18 text-clr-purple-10">
                Mighty Labs NFTs that are currently in your connected wallet but are not yet staked
                <br />
                <br />
                NFTs that have a number overlayed represent NFTs you have recently unstaked and the
                number displayed is the number of days left of the 30 day cooldown period at which
                time they can then be staked again or recieved to your wallet
              </div>
            }
          >
            <Image src={iconInfo} alt="" className="h-4 w-4" />
          </Tooltip>
        </div>

        <CompatibleNftsSlider
          nftName={"PIONEER"}
          nftAddress={PIONEER_NFT_CONTRACT}
          nftsGroup={pioneerNfts}
          selectedNfts={selectedNfts}
          handleSelectNft={handleSelectNft}
        />

        <CompatibleNftsSlider
          nftName={"SHERIFF"}
          nftAddress={SHERIFF_NFT_CONTRACT}
          nftsGroup={sheriffNfts}
          selectedNfts={selectedNfts}
          handleSelectNft={handleSelectNft}
        />

        <div className="mt-5 grid grid-cols-2 gap-2">
          {!isAllNftsApproved ? (
            <button
              disabled={isApproving}
              onClick={handleApprove}
              type="button"
              className="btnSmall btnGradientPurple duration-200"
            >
              <span>{isApproving ? "Approving" : "Approve"}</span>
            </button>
          ) : (
            <button
              disabled={loadingStake || !selectedNfts.length}
              onClick={handleStakeNft}
              type="button"
              className="btnSmall btnGradientPurple duration-200"
            >
              <span>Stake</span>
            </button>
          )}

          <button type="button" className="btnSmall btnGradientOrange">
            <span>Claim All</span>
          </button>
        </div>
      </div>

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

        <StakedNFT
          name="PIONEER"
          nftAddr={PIONEER_NFT_CONTRACT}
          onSelectNft={handleSelectStakedNft}
          chosenNft={chosenStakedNft}
        />

        <StakedNFT
          name="SHERIFF"
          nftAddr={SHERIFF_NFT_CONTRACT}
          onSelectNft={handleSelectStakedNft}
          chosenNft={chosenStakedNft}
        />

        <div className="mt-5 flex flex-col items-center">
          <button
            type="button"
            onClick={handleUnstakeNft}
            disabled={!chosenStakedNft || loadingUnstake}
            className="btnBorderOrangeDark btnSmall w-full"
          >
            <span>Unstake</span>
          </button>
          <span className="mt-2 text-12/16 text-textGray">30 days withdrawal cooldown</span>
        </div>
      </div>
    </div>
  )
}

export type StakedNft = {
  tokenAddress: string
  tokenId: string
}

export function isNftSelected(selectedNfts: NftData[], nft: NftData) {
  return selectedNfts.some(
    (selectedNft) =>
      selectedNft?.tokenAddress === nft.tokenAddress &&
      selectedNft?.tokenId === nft.tokenId &&
      selectedNft?.symbol === nft.symbol
  )
}

export interface NftData {
  chain: string
  contractType: string
  tokenAddress: Address
  tokenId: string
  name: string
  symbol: string
  amount: number
  blockNumberMinted: string
  blockNumber: string
  ownerOf: string
  tokenHash: string
  lastTokenUriSync: string
  possibleSpam: boolean
  isApproved?: boolean
  metadata?: {
    image: string
  }
}
