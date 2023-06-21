import Image from "next/image"
import { DEFAULT_NFT_LOGO } from "@constants/index"
import { PendingWithdrawNft } from "@hooks/useGetPendingERC721Withdrawals"
import { useInterval } from "@hooks/useInterval"
import { useWithdrawErc721 } from "@hooks/useWithdrawERC721"
import { differenceInDays, intervalToDuration } from "date-fns"
import { useMemo } from "react"
import { useAccount } from "wagmi"
import { Tooltip } from "@material-tailwind/react"
import clsx from "clsx"

export function PendingWithdrawNftItem({ nft }: { nft: PendingWithdrawNft }) {
  const endTime = useMemo(() => {
    return new Date(Number(nft.applicableAt) * 1000)
  }, [])

  const duration = useInterval(
    () =>
      intervalToDuration({
        start: new Date(),
        end: endTime
      }),
    1000
  )

  const dayLeft = differenceInDays(endTime, new Date())
  const { address: connectedAccount } = useAccount()
  const { widthdrawERC721, isWithdrawing } = useWithdrawErc721(connectedAccount)
  const handleWithdrawErc721 = () => {
    widthdrawERC721(nft.nftAddress, nft.tokenId)
  }

  return (
    <div className="relative flex flex-col">
      <div className="relative">
        <Image
          src={DEFAULT_NFT_LOGO}
          alt={""}
          width={66}
          height={66}
          className={clsx("h-[66px] w-[66px] rounded-lg p-[2px]", {})}
        />

        <div className="absolute top-0 right-0 bottom-0 left-0 bg-clr-purple-70 opacity-50" />

        {dayLeft <= 0 && (
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
            <button
              disabled={isWithdrawing}
              onClick={handleWithdrawErc721}
              className="rounded-md bg-[#FF9633] bg-opacity-30 px-2 text-12/20 uppercase text-clr-orange-60 duration-200 hover:bg-opacity-40"
            >
              <span>Claim</span>
            </button>
          </div>
        )}

        {dayLeft > 0 && (
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center font-poppins text-18/24 font-semibold">
            <Tooltip
              className="bg-clr-purple-50"
              content={
                <div className="w-[192px] p-1 text-12/18 text-clr-purple-10">
                  Waiting for claiming this NFT:
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
    </div>
  )
}
