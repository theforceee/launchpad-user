import Image from "next/image"
import { StakedNft } from "./CompatibleNFTs"
import { Address, useAccount } from "wagmi"
import { useGetErc721Stakings } from "@hooks/useGetErc721Stakings"
import { DEFAULT_NFT_LOGO } from "@constants/index"
import clsx from "clsx"
import { Swiper as SwiperClass } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from "react"
import iconNext from "@images/icon-next.svg"
import styles from "./tabStaking.module.scss"
import { NftStakingEvent, useStakingNftContext } from "./StakingNftContext"

export function StakedNFTSlider({
  name,
  nftAddr,
  onSelectNft,
  chosenNfts
}: {
  name: string
  nftAddr: Address
  onSelectNft: (stakedNft: StakedNft) => void
  chosenNfts: StakedNft[]
}) {
  const { stakingNftSubject } = useStakingNftContext()
  const { address: connectedAccount } = useAccount()
  const { nftIds, refetch } = useGetErc721Stakings(connectedAccount, nftAddr)
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const handleNextSlide = () => {
    swiper?.slideNext()
  }

  const handlePrevSlide = () => {
    swiper?.slidePrev()
  }

  useEffect(() => {
    return stakingNftSubject.subscribe((type) => {
      if (type !== NftStakingEvent.NFT_STAKED && type !== NftStakingEvent.NFT_UNSTAKED) return

      refetch()
    })
  }, [])

  return (
    <div className="mt-5 flex flex-col">
      <span className="text-12/16 font-semibold text-textGray">{name}</span>
      <div className="relative mt-2">
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
              invisible: nftIds.length - activeIdx < 4 || nftIds.length < 4
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
          {nftIds.map((nftId) => (
            <SwiperSlide key={nftId}>
              <button
                key={nftId}
                onClick={() =>
                  onSelectNft({
                    tokenAddress: nftAddr,
                    tokenId: nftId
                  })
                }
                className="flex flex-col"
              >
                <Image
                  src={DEFAULT_NFT_LOGO}
                  alt={"NFT logo"}
                  width={66}
                  height={66}
                  className={clsx("w-full rounded-lg p-[2px]", {
                    "bg-gradient-to-r from-clr-red-60 to-clr-orange-60": isNftSelected(
                      chosenNfts,
                      nftAddr,
                      nftId
                    )
                  })}
                />
                <div className="text-12/20 text-white">#{nftId}</div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

function isNftSelected(chosenNfts: StakedNft[], nftAddr: string, nftId: string) {
  return chosenNfts.some(
    (chosenNft) => chosenNft?.tokenAddress === nftAddr && chosenNft?.tokenId === nftId
  )
}
