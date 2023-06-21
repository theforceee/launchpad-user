import Image from "next/image"
import { useAccount } from "wagmi"
import { NftData } from "./CompatibleNFTs"
import { useNftGetApproved } from "@hooks/useErc721GetApproved"
import { DEFAULT_NFT_LOGO } from "@constants/index"
import clsx from "clsx"

export function StakableNftItem({
  nft,
  handleSelectNft,
  active
}: {
  nft: NftData
  handleSelectNft: (nft: NftData) => void
  active: boolean
}) {
  const { address: connectedAccount } = useAccount()
  const { isApproved } = useNftGetApproved(nft?.tokenAddress, nft?.tokenId, connectedAccount)

  return (
    <button
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
