import Image from "next/image"
import { StakedNft } from "./CompatibleNFTs"
import { Address, useAccount } from "wagmi"
import { useGetErc721Stakings } from "@hooks/useGetErc721Stakings"
import { DEFAULT_NFT_LOGO } from "@constants/index"
import clsx from "clsx"

export function StakedNFT({
  name,
  nftAddr,
  onSelectNft,
  chosenNft
}: {
  name: string
  nftAddr: Address
  onSelectNft: (stakedNft: StakedNft) => void
  chosenNft?: StakedNft
}) {
  const { address: connectedAccount } = useAccount()
  const { nftIds } = useGetErc721Stakings(connectedAccount, nftAddr)

  return (
    <div className="mt-5 flex flex-col">
      <span className="text-12/16 font-semibold text-textGray">{name}</span>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {nftIds.map((nftId) => (
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
                "bg-gradient-to-r from-clr-red-60 to-clr-orange-60":
                  chosenNft?.tokenAddress === nftAddr && chosenNft?.tokenId === nftId
              })}
            />
            <div className="text-12/20 text-white">#{nftId}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
