// export enum PoolStatus {
//   BEFORE_WHITELIST = "BEFORE_WHITELIST",
//   WHITELIST = "WHITELIST",
//   PRIVATE_WL = "PRIVATE_WL",
//   PRIVATE_FCFS = "PRIVATE_FCFS",
//   PUBLIC_WL = "PUBLIC_WL",
//   PUBLIC_FCFS = "PUBLIC_FCFS",
//   CLAIM = "CLAIM",
//   CLOSED = "CLOSED",
//   TBA = "TBA"
// }
export enum PoolStatus {
  BEFORE_WHITELIST = -1,
  WHITELIST = 0,
  PRIVATE_WL = 1,
  PRIVATE_FCFS = 2,
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
  | PoolStatus.PRIVATE_WL
  | PoolStatus.PRIVATE_FCFS
  | PoolStatus.PUBLIC_WL
  | PoolStatus.PUBLIC_FCFS
  | PoolStatus.CLAIM
  | PoolStatus.CLOSED
  | PoolStatus.TBA
>

const isNotYetTime = (time: Date | undefined) => {
  return !!time && new Date().getTime() < time?.getTime()
}

const isCameTime = (time: Date | undefined) => {
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

  // console.log("getPoolDetailStatus", firstClaimTime, lastClaimTime)

  const publicPool = poolDetail.pools.find((item: any) => !item.is_private)
  const privatePool = poolDetail.pools.find((item: any) => !!item.is_private)

  const startJoinTime = getDateFromUnix(poolDetail?.start_join_time)
  const endJoinTime = getDateFromUnix(poolDetail?.end_join_time)
  const startBuyPrivateWL = getDateFromUnix(privatePool?.start_buy_time)
  const startBuyPrivateFCFS = getDateFromUnix(privatePool?.end_buy_time)
  const startBuyPublicWL = getDateFromUnix(publicPool?.start_buy_time)
  const startBuyPublicFCFS = getDateFromUnix(publicPool?.end_buy_time)
  if (!startJoinTime) return PoolStatus.TBA

  if (isNotYetTime(startJoinTime)) return PoolStatus.BEFORE_WHITELIST
  if (isNotYetTime(endJoinTime)) return PoolStatus.WHITELIST
  if (isNotYetTime(startBuyPrivateWL)) return PoolStatus.PRIVATE_WL
  if (isNotYetTime(startBuyPrivateFCFS)) return PoolStatus.PRIVATE_FCFS
  if (isNotYetTime(startBuyPublicWL)) return PoolStatus.PUBLIC_WL
  if (isNotYetTime(startBuyPublicFCFS)) return PoolStatus.PUBLIC_FCFS

  if (isNotYetTime(firstClaimTime)) return PoolStatus.CLAIM
  if (isCameTime(lastClaimTime)) return PoolStatus.CLOSED

  return PoolStatus.TBA
}
