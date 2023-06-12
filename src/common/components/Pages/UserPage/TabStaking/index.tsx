import StakingNft from "./StakingNft"
import StakingToken from "./StakingToken"

const TabStaking = () => {
  return (
    <div className="grid w-full grid-cols-2 py-6 text-white">
      <StakingToken />

      <StakingNft />
    </div>
  )
}

export default TabStaking
