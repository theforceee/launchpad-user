export enum PoolStatus {
  BEFORE_WHITELIST = -1,
  WHITELIST = 0,
  BEFORE_PRIVATE_WL = 12,
  PRIVATE_WL = 1,
  PRIVATE_FCFS = 2,
  BEFORE_PUBLIC_WL = 32,
  PUBLIC_WL = 3,
  PUBLIC_FCFS = 4,
  CLAIM = 5,
  CLOSED = 6,
  TBA = -99
}

export type poolStatus = Extract<
  PoolStatus,
  | PoolStatus.BEFORE_WHITELIST
  | PoolStatus.WHITELIST
  | PoolStatus.BEFORE_PRIVATE_WL
  | PoolStatus.PRIVATE_WL
  | PoolStatus.PRIVATE_FCFS
  | PoolStatus.BEFORE_PUBLIC_WL
  | PoolStatus.PUBLIC_WL
  | PoolStatus.PUBLIC_FCFS
  | PoolStatus.CLAIM
  | PoolStatus.CLOSED
  | PoolStatus.TBA
>

export type StepTypes = {
  name: string
  subName?: string
  value: poolStatus
}
export const timelineSteps: Array<StepTypes> = [
  {
    name: "WHITELIST",
    subName: "",
    value: PoolStatus.WHITELIST
  },
  {
    name: "PRIVATE",
    subName: "(WL)",
    value: PoolStatus.PRIVATE_WL
  },
  {
    name: "PRIVATE",
    subName: "(FCFS)",
    value: PoolStatus.PRIVATE_FCFS
  },
  {
    name: "PUBLIC",
    subName: "(WL)",
    value: PoolStatus.PUBLIC_WL
  },
  {
    name: "PUBLIC",
    subName: "(FCFS)",
    value: PoolStatus.PUBLIC_FCFS
  },
  {
    name: "CLAIM",
    value: PoolStatus.CLAIM
  },
  {
    name: "CLOSED",
    value: PoolStatus.CLOSED
  }
]
export const isNotYetTime = (time: Date | undefined) => {
  return !!time && new Date().getTime() < time?.getTime()
}

export const isCameTime = (time: Date | undefined) => {
  return !!time && new Date().getTime() >= time?.getTime()
}

export const getDateFromUnix = (unix: number | undefined) => {
  return unix ? new Date(unix * 1000) : undefined
}

export const getPoolDetailStatus = (poolDetail: any): poolStatus => {
  if (!poolDetail || !poolDetail.pools) return PoolStatus.TBA

  const emissions = poolDetail?.token?.tokenReleases || []

  const firstClaimTime = getDateFromUnix(emissions[0]?.release_time)
  const lastClaimTime = getDateFromUnix(emissions[emissions.length - 1]?.release_time)

  const publicPool = poolDetail.pools.find((item: any) => !item.is_private)
  const privatePool = poolDetail.pools.find((item: any) => !!item.is_private)

  const startJoinTime = getDateFromUnix(poolDetail?.start_join_time)
  const endJoinTime = getDateFromUnix(poolDetail?.end_join_time)
  const startBuyPrivateWL = getDateFromUnix(privatePool?.start_buy_time)
  const startBuyPrivateFCFS = getDateFromUnix(privatePool?.start_fcfs_time)
  const endBuyPrivateFCFS = getDateFromUnix(privatePool?.end_buy_time)
  const startBuyPublicWL = getDateFromUnix(publicPool?.start_buy_time)
  const startBuyPublicFCFS = getDateFromUnix(publicPool?.start_fcfs_time)
  const endBuyPublicFCFS = getDateFromUnix(publicPool?.end_buy_time)
  if (!startJoinTime) return PoolStatus.TBA

  if (isNotYetTime(startJoinTime)) return PoolStatus.BEFORE_WHITELIST
  if (isNotYetTime(endJoinTime)) return PoolStatus.WHITELIST
  if (isNotYetTime(startBuyPrivateWL)) return PoolStatus.BEFORE_PRIVATE_WL // end whitelist + chua den Pri WL
  if (isNotYetTime(startBuyPrivateFCFS)) return PoolStatus.PRIVATE_WL
  if (isNotYetTime(endBuyPrivateFCFS)) return PoolStatus.PRIVATE_FCFS
  if (isNotYetTime(startBuyPublicWL)) return PoolStatus.BEFORE_PUBLIC_WL // end Pri FCFS + chua den luc Pub WL
  if (isNotYetTime(startBuyPublicFCFS)) return PoolStatus.PUBLIC_WL
  if (isNotYetTime(endBuyPublicFCFS)) return PoolStatus.PUBLIC_FCFS

  if (isCameTime(firstClaimTime) && isNotYetTime(lastClaimTime)) return PoolStatus.CLAIM
  if (isCameTime(lastClaimTime)) return PoolStatus.CLOSED

  return PoolStatus.TBA
}

// for Pool Timeline
export const getPoolTimelineStatus = (poolDetail: any): poolStatus => {
  if (!poolDetail || !poolDetail.pools) return PoolStatus.TBA

  const emissions = poolDetail?.token?.tokenReleases || []

  const firstClaimTime = getDateFromUnix(emissions[0]?.release_time)
  const lastClaimTime = getDateFromUnix(emissions[emissions.length - 1]?.release_time)

  const publicPool = poolDetail.pools.find((item: any) => !item.is_private)
  const privatePool = poolDetail.pools.find((item: any) => !!item.is_private)

  const startJoinTime = getDateFromUnix(poolDetail?.start_join_time)
  const endJoinTime = getDateFromUnix(poolDetail?.end_join_time)
  const startBuyPrivateFCFS = getDateFromUnix(privatePool?.start_fcfs_time)
  const startBuyPublicWL = getDateFromUnix(publicPool?.start_buy_time)
  const startBuyPublicFCFS = getDateFromUnix(publicPool?.start_fcfs_time)
  const endBuyPublicFCFS = getDateFromUnix(publicPool?.end_buy_time)
  if (!startJoinTime) return PoolStatus.TBA

  if (isNotYetTime(startJoinTime)) return PoolStatus.BEFORE_WHITELIST
  if (isNotYetTime(endJoinTime)) return PoolStatus.WHITELIST
  if (isNotYetTime(startBuyPrivateFCFS)) return PoolStatus.PRIVATE_WL
  if (isNotYetTime(startBuyPublicWL)) return PoolStatus.PRIVATE_FCFS
  if (isNotYetTime(startBuyPublicFCFS)) return PoolStatus.PUBLIC_WL
  if (isNotYetTime(endBuyPublicFCFS)) return PoolStatus.PUBLIC_FCFS

  if (isCameTime(firstClaimTime) && isNotYetTime(lastClaimTime)) return PoolStatus.CLAIM
  if (isCameTime(lastClaimTime)) return PoolStatus.CLOSED

  return PoolStatus.TBA
}
