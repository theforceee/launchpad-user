import { DEFAULT_NFT_LOGO } from "@constants/index"
import { PendingWithdrawNft } from "@hooks/useGetPendingERC721Withdrawals"
import { useInterval } from "@hooks/useInterval"
import { useWithdrawMultipleErc721 } from "@hooks/useWithdrawMultipleERC721"
import { Tooltip } from "@material-tailwind/react"
import clsx from "clsx"
import { intervalToDuration } from "date-fns"
import Image from "next/image"
import { useMemo } from "react"
import { useAccount } from "wagmi"

export function PendingWithdrawNftItem({
  nft,
  handleSelectWithdrableNft,
  active
}: {
  nft: PendingWithdrawNft
  handleSelectWithdrableNft: (nft: PendingWithdrawNft) => void
  active: boolean
}) {
  const endTime = useMemo(() => {
    return new Date(Number(nft.applicableAt) * 1000)
  }, [nft.applicableAt])

  const duration = useInterval(
    () =>
      intervalToDuration({
        start: new Date(),
        end: endTime
      }),
    1000
  )
  const isWithdrawable = true //endTime.getTime() < new Date().getTime()

  const { address: connectedAccount } = useAccount()
  const { withdrawMultipleERC721, isWithdrawing } = useWithdrawMultipleErc721(connectedAccount)
  const handleWithdrawErc721 = () => {
    withdrawMultipleERC721(nft.tokenAddress, [nft.tokenId])
  }

  return (
    <button
      onClick={() => handleSelectWithdrableNft(nft)}
      type="button"
      disabled={!isWithdrawable || isWithdrawing}
      className="relative flex flex-col"
    >
      <div className="relative">
        <Image
          src={DEFAULT_NFT_LOGO}
          alt={""}
          width={66}
          height={66}
          className={clsx("w-full rounded-lg p-[2px]", {
            "bg-gradient-to-r from-clr-red-60 to-clr-orange-60": active
          })}
        />

        <div className="absolute top-0 right-0 bottom-0 left-0 m-[2px]  rounded-md bg-clr-purple-70 opacity-50" />

        {!active && isWithdrawable && (
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
            <div
              onClick={(e) => {
                if (isWithdrawing) return
                e.stopPropagation()
                handleWithdrawErc721()
              }}
              className="rounded-md bg-[#FF9633] bg-opacity-30 px-2 text-12/20 uppercase text-clr-orange-60 duration-200 hover:bg-opacity-40"
            >
              <span>Claim</span>
            </div>
          </div>
        )}

        {!isWithdrawable && (
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center font-poppins text-18/24 font-semibold">
            <Tooltip
              className="bg-clr-purple-50"
              content={
                <div className="w-[192px] p-1 text-12/18 text-clr-purple-10">
                  Withdrawal cooldown:
                  <div>
                    {duration.days} day(s)&nbsp;
                    {duration.hours}:{duration.minutes}:{duration.seconds}
                  </div>
                </div>
              }
            >
              <span>{duration.days}</span>
            </Tooltip>
          </div>
        )}
      </div>

      <div className="text-12/20">#{nft.tokenId}</div>
    </button>
  )
}
