import iconNext from "@images/icon-next.svg"
import clsx from "clsx"
import Image from "next/image"
import styles from "./tabStaking.module.scss"
import { useEffect, useState } from "react"
import { Address, useAccount } from "wagmi"
import { Swiper as SwiperClass } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  PendingWithdrawNft,
  useGetPendingERC721Withdrawals
} from "@hooks/useGetPendingERC721Withdrawals"
import { StakableNftItem } from "./StakableNftItem"
import { PendingWithdrawNftItem } from "./PendingWithdrawNftItem"
import { NftStakingEvent, useStakingNftContext } from "./StakingNftContext"
import { NftData } from "./typing"
import { useId } from "@components/Base/Identity"

export function CompatibleNftsSlider({
  nftName,
  nftAddress,
  nftsGroup,
  handleSelectNft,
  handleSelectWithdrableNft,
  selectedNfts,
  selectedWithdrableNfts
}: {
  nftName: string
  nftAddress: Address
  nftsGroup: NftData[]
  handleSelectNft: (nft: NftData) => void
  handleSelectWithdrableNft: (nft: PendingWithdrawNft) => void
  selectedNfts: NftData[]
  selectedWithdrableNfts: PendingWithdrawNft[]
}) {
  const { user } = useId()
  const connectedAccount = user?.wallet_address
  const { pendingERC721Withdrawals, refetch } = useGetPendingERC721Withdrawals(
    connectedAccount,
    nftAddress
  )
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const { stakingNftSubject } = useStakingNftContext()

  const totalItems = nftsGroup.length + pendingERC721Withdrawals.length

  const handleNextSlide = () => {
    swiper?.slideNext()
  }

  const handlePrevSlide = () => {
    swiper?.slidePrev()
  }

  useEffect(() => {
    return stakingNftSubject.subscribe((evt) => {
      if (evt !== NftStakingEvent.NFT_WITHDRAWED) return

      refetch()
    })
  }, [])

  return (
    <div className="mt-5 flex flex-col">
      <span className="text-12/16 font-semibold text-textGray">{nftName}</span>
      <div className="relative mt-2 flex">
        <button
          className={clsx(
            " absolute top-[calc(50%-20px)] -left-[10px] z-10 flex h-[20px] w-[20px] rotate-180 items-center justify-center rounded-md bg-clr-purple-50 text-white duration-200 hover:bg-clr-purple-60",
            {
              invisible: activeIdx === 0
            }
          )}
          type="button"
          onClick={handlePrevSlide}
        >
          <Image src={iconNext} alt="" />
        </button>

        <button
          className={clsx(
            "absolute top-[calc(50%-20px)] -right-[10px] z-10 flex h-[20px] w-[20px] items-center justify-center rounded-md bg-clr-purple-50 text-white duration-200 hover:bg-clr-purple-60",
            {
              invisible: totalItems - activeIdx < 4 || totalItems < 4
            }
          )}
          type="button"
          onClick={handleNextSlide}
        >
          <Image src={iconNext} alt="" />
        </button>

        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(swiper) => {
            setActiveIdx(swiper.activeIndex)
          }}
          spaceBetween={8}
          slidesPerView={3}
          className={clsx("flex min-h-[87px] gap-[30px] overflow-hidden", styles.nftSLider)}
        >
          {nftsGroup.map((nft) => (
            <SwiperSlide key={nft.tokenId}>
              <StakableNftItem
                nft={nft}
                handleSelectNft={handleSelectNft}
                active={isNftSelected(selectedNfts, nft)}
              />
            </SwiperSlide>
          ))}

          {pendingERC721Withdrawals.map((pendingNft) => (
            <SwiperSlide key={pendingNft.tokenId}>
              <PendingWithdrawNftItem
                handleSelectWithdrableNft={handleSelectWithdrableNft}
                nft={pendingNft}
                active={isNftSelected(selectedWithdrableNfts, pendingNft)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

function isNftSelected(
  selectedNfts: { tokenId: string; tokenAddress: string }[],
  nft: { tokenId: string; tokenAddress: string }
) {
  return selectedNfts.some(
    (selectedNft) =>
      selectedNft?.tokenId === nft.tokenId && selectedNft?.tokenAddress === nft.tokenAddress
  )
}
