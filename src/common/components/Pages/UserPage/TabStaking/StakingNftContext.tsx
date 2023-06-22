import { Subject } from "@components/Base/rx"
import { createContext, useContext } from "react"

export enum NftStakingEvent {
  NONE = "",
  NFT_WITHDRAWED = "NFT_WITHDRAWED",
  NFT_STAKED = "NFT_STAKED",
  NFT_UNSTAKED = "NFT_UNSTAKED"
}

export const StakingNftContext = createContext<{
  stakingNftSubject: Subject<NftStakingEvent>
}>({
  stakingNftSubject: new Subject<NftStakingEvent>(NftStakingEvent.NONE)
})

export const useStakingNftContext = () => useContext(StakingNftContext)
