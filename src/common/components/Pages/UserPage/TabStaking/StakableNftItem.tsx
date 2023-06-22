import Image from "next/image"
import { useAccount } from "wagmi"
import { useNftGetApproved } from "@hooks/useErc721GetApproved"
import { DEFAULT_NFT_LOGO } from "@constants/index"
import clsx from "clsx"
import { NftData } from "./typing"
import { useIntersection } from "@hooks/useIntersection"
import { useRef } from "react"

export function StakableNftItem({
  nft,
  handleSelectNft,
  active
}: {
  nft: NftData
  handleSelectNft: (nft: NftData) => void
  active: boolean
}) {
  const domRef = useRef<HTMLButtonElement>(null)
  const { address: connectedAccount } = useAccount()
  const isIntersected = useIntersection(domRef)
  const { isApproved } = useNftGetApproved(
    nft?.tokenAddress,
    isIntersected ? nft?.tokenId : undefined,
    connectedAccount
  )

  return (
    <button
      ref={domRef}
      key={`${nft.tokenAddress}:${nft.tokenId}`}
      onClick={() =>
        handleSelectNft({
          ...nft,
          isApproved: isApproved
        })
      }
      className="flex flex-col"
    >
      <Image
        src={nft.metadata?.image || DEFAULT_NFT_LOGO}
        alt={""}
        width={66}
        height={66}
        className={clsx("w-full rounded-lg p-[2px]", {
          "bg-gradient-to-r from-clr-red-60 to-clr-orange-60": active
        })}
      />
      <div className="text-12/20">#{nft.tokenId}</div>
    </button>
  )
}
