import iconNext from "@images/icon-next.svg"
import clsx from "clsx"
import Image from "next/image"
import styles from "./tabStaking.module.scss"
import { useState } from "react"
import { Address, useAccount } from "wagmi"
import { Autoplay, Pagination, Swiper as SwiperClass } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useGetPendingERC721Withdrawals } from "@hooks/useGetPendingERC721Withdrawals"
import { StakableNftItem } from "./StakableNftItem"
import { PendingWithdrawNftItem } from "./PendingWithdrawNftItem"
import { NftData, isNftSelected } from "./CompatibleNFTs"

export function CompatibleNftsSlider({
  nftName,
  nftAddress,
  nftsGroup,
  handleSelectNft,
  selectedNfts
}: {
  nftName: string
  nftAddress: Address
  nftsGroup: NftData[]
  handleSelectNft: (nft: NftData) => void
  selectedNfts: NftData[]
}) {
  const { address: connectedAccount } = useAccount()
  const { pendingERC721Withdrawals } = useGetPendingERC721Withdrawals(connectedAccount, nftAddress)
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const handleNextSlide = () => {
    swiper?.slideNext()
  }

  const handlePrevSlide = () => {
    swiper?.slidePrev()
  }

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
              invisible: nftsGroup.length - activeIdx < 4 || nftsGroup.length < 4
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
          modules={[Autoplay, Pagination]}
          className={clsx("flex min-h-[87px] gap-[30px] overflow-hidden", styles.nftSLider)}
        >
          {nftsGroup.map((nft) => (
            <SwiperSlide key={`${nft.tokenAddress}:${nft.tokenId}`}>
              <StakableNftItem
                nft={nft}
                handleSelectNft={handleSelectNft}
                active={isNftSelected(selectedNfts, nft)}
              />
            </SwiperSlide>
          ))}

          {pendingERC721Withdrawals.map((pendingNft, idx) => (
            <SwiperSlide key={idx}>
              <PendingWithdrawNftItem nft={pendingNft} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
