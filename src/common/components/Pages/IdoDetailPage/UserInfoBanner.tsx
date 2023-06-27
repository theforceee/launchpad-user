import { UserTierTypes } from "@constants/index"
import { PoolStatus, getDateFromUnix, isNotYetTime, poolStatus } from "@utils/getPoolDetailStatus"
import { formatCurrency, getTierColor } from "@utils/index"
import clsx from "clsx"
import Image from "next/image"

const UserInfoBanner = (props: {
  poolStatus: poolStatus
  connectedAccount: string | undefined
  userTier?: UserTierTypes | undefined
  endJoinTime?: Date | undefined
}) => {
  const { poolStatus, connectedAccount, userTier, endJoinTime } = props

  if (!connectedAccount) return <></>

  if ([PoolStatus.BEFORE_WHITELIST, PoolStatus.TBA].includes(poolStatus)) return <></>

  switch (poolStatus) {
    case PoolStatus.WHITELIST:
      return (
        <div className="mt-3 flex h-[72px] items-center justify-center rounded-[20px] bg-[#151532] text-18/24 font-semibold">
          {userTier?.icon && <Image src={userTier?.icon} alt="" className="mr-2 h-8 w-8" />}
          <span>You are</span>
          <span className={clsx("mx-1", getTierColor(userTier?.value))}>
            {userTier?.label || "-"}
          </span>
          <span>tier!</span>
        </div>
      )
    case PoolStatus.BEFORE_PRIVATE_WL:
    case PoolStatus.PRIVATE_WL:
      return (
        <div className="mt-3 flex flex-col items-center justify-center rounded-[20px] bg-[#151532] py-6 px-5 text-18/24 font-semibold">
          <span className="w-full border-b border-[#33344D] pb-3 text-center">
            PRIVATE SALE ALLOCATION
          </span>
          <div className="mt-3 flex items-center justify-center">
            {userTier?.icon && <Image src={userTier?.icon} alt="" className="mr-2 h-8 w-8" />}
            <span>{`${formatCurrency("1000000")} ${"$token"}`}</span>
          </div>
        </div>
      )
    default:
      return <></>
  }
}

export default UserInfoBanner
