import { get } from "@/common/request"
import { PIONEER_NFT_CONTRACT, SHERIFF_NFT_CONTRACT } from "@constants/index"
import { useErc721Approve } from "@hooks/useErc721Aprrove"
import { useStakeMultipleERC721 } from "@hooks/useStakeMultipleERC721"
import iconInfo from "@images/icon-info.png"
import { Tooltip } from "@material-tailwind/react"
import clsx from "clsx"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { CompatibleNftsSlider } from "./CompatibleNftsSlider"
import { NftStakingEvent, useStakingNftContext } from "./StakingNftContext"
import styles from "./tabStaking.module.scss"
import { PendingWithdrawNft } from "@hooks/useGetPendingERC721Withdrawals"
import { useWithdrawMultipleErc721 } from "@hooks/useWithdrawMultipleERC721"
import { NftData } from "./typing"
import { useId } from "@components/Base/Identity"

export function CompatibleNFTs() {
  const { user } = useId()
  const connectedAccount = user?.wallet_address
  const { stakingNftSubject } = useStakingNftContext()

  const [pioneerNfts, setPioneerNfts] = useState<NftData[]>([])
  const [sheriffNfts, setSheriffNfts] = useState<NftData[]>([])

  const selectedNftsRef = useRef<NftData[]>([])
  const [selectedNfts, setSelectedNfts] = useState<NftData[]>([])
  const isAllNftsApproved = selectedNfts.every((nft) => nft.isApproved)
  selectedNftsRef.current = selectedNfts

  const [selectedWithdrableNfts, setSelectedWithdrableNfts] = useState<PendingWithdrawNft[]>([])

  const { stakeMultipleERC721, loadingStake, stakeMultipleERC721Status } =
    useStakeMultipleERC721(connectedAccount)

  const { withdrawMultipleERC721, isWithdrawing, withdrawMultipleERC721Status } =
    useWithdrawMultipleErc721(connectedAccount)

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

  const handleApprove = () => {
    const firstUnApprovedNft = selectedNfts.find((nft) => !nft.isApproved)
    firstUnApprovedNft && approve(firstUnApprovedNft.tokenId)
  }

  const handleSelectNft = (newNft: NftData) => {
    setSelectedNfts((nfts) => {
      if (newNft.symbol !== nfts[0]?.symbol) {
        return [newNft]
      }

      const isExists = nfts.some((chosenNft) => chosenNft.tokenId === newNft.tokenId)
      if (!isExists) {
        return [...nfts, newNft]
      }

      return nfts.filter((nft) => nft.tokenId !== newNft.tokenId)
    })
  }

  const handleSelectWithdrableNft = (newNft: PendingWithdrawNft) => {
    setSelectedWithdrableNfts((nfts) => {
      if (newNft.tokenAddress !== nfts[0]?.tokenAddress) {
        return [newNft]
      }

      const isExists = nfts.some((chosenNft) => chosenNft.tokenId === newNft.tokenId)
      if (!isExists) {
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
    if (!user) {
      setPioneerNfts([])
      setSheriffNfts([])
      return
    }

    fetchNfts()
  }, [fetchNfts, user])

  useEffect(() => {
    if (stakeMultipleERC721Status !== "success") {
      return
    }

    const selectedNfts = selectedNftsRef.current
    const isSherifNft = selectedNftsRef.current[0]?.symbol === "SHERIFF"

    isSherifNft
      ? setSheriffNfts((nfts) =>
          nfts.filter((nft) =>
            selectedNfts.every((selectedNft) => selectedNft.tokenId !== nft.tokenId)
          )
        )
      : setPioneerNfts((nfts) =>
          nfts.filter((nft) =>
            selectedNfts.every((selectedNft) => selectedNft.tokenId !== nft.tokenId)
          )
        )

    setSelectedNfts([])
    stakingNftSubject.next(NftStakingEvent.NFT_STAKED)
  }, [stakeMultipleERC721Status, stakingNftSubject])

  useEffect(() => {
    if (withdrawMultipleERC721Status !== "success") {
      return
    }

    setSelectedWithdrableNfts([])
    fetchNfts()
    stakingNftSubject.next(NftStakingEvent.NFT_WITHDRAWED)
    toast.success("Claim NFT(s) successfully")
  }, [withdrawMultipleERC721Status, stakingNftSubject])

  const handleStakeNft = () => {
    if (!selectedNfts.length) return

    stakeMultipleERC721(
      selectedNfts[0].tokenAddress,
      selectedNfts.map((nft) => nft.tokenId)
    )
  }

  const handleClaimAll = () => {
    if (!selectedWithdrableNfts.length) return

    withdrawMultipleERC721(
      selectedWithdrableNfts[0].tokenAddress,
      selectedWithdrableNfts.map((nft) => nft.tokenId)
    )
  }

  useEffect(() => {
    return stakingNftSubject.subscribe((event) => {
      if (event !== NftStakingEvent.NFT_UNSTAKED) return
      fetchNfts()
    })
  }, [fetchNfts, stakingNftSubject])

  return (
    <div
      className={clsx(styles.bgBorder, "flex flex-col rounded-xl bg-clr-purple-70 p-5 text-white")}
    >
      <div className="flex items-center">
        <span className="mr-2 font-poppins text-14/18 font-semibold tracking-wide">
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
        selectedWithdrableNfts={selectedWithdrableNfts}
        handleSelectNft={handleSelectNft}
        handleSelectWithdrableNft={handleSelectWithdrableNft}
      />

      <CompatibleNftsSlider
        nftName={"SHERIFF"}
        nftAddress={SHERIFF_NFT_CONTRACT}
        nftsGroup={sheriffNfts}
        selectedNfts={selectedNfts}
        selectedWithdrableNfts={selectedWithdrableNfts}
        handleSelectNft={handleSelectNft}
        handleSelectWithdrableNft={handleSelectWithdrableNft}
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
            <span>{loadingStake ? "Staking" : "Stake"}</span>
          </button>
        )}

        <button
          disabled={!selectedWithdrableNfts.length || isWithdrawing}
          onClick={handleClaimAll}
          type="button"
          className="btnSmall btnGradientOrange"
        >
          <span>Claim All</span>
        </button>
      </div>
    </div>
  )
}
