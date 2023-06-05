import { toast } from "react-toastify"
import EmissionTable from "./EmissionTable"

const ClaimEmissions = ({ emissions }: any) => {
  const handleClaimPrivate = () => {
    toast.info("handleClaimPrivate")
  }

  const handleClaimPublic = () => {
    toast.info("handleClaimPublic")
  }

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="flex w-full flex-col">
        <span className="text-18/24 font-semibold">PRIVATE SALE TOKENS</span>
        <div className="mt-5">
          <EmissionTable emissions={emissions} />
        </div>
        <div
          className="btnGradient mt-2 cursor-pointer"
          onClick={handleClaimPrivate}
        >
          CLAIM PRIVATE SALE TOKENS
        </div>
      </div>

      <div className="flex w-full flex-col">
        <span className="text-18/24 font-semibold">PUBLIC SALE TOKENS</span>
        <div className="mt-5">
          <EmissionTable emissions={emissions} />
        </div>
        <div
          className="btnGradient mt-2 cursor-pointer"
          onClick={handleClaimPublic}
        >
          CLAIM PUBLIC SALE TOKENS
        </div>
      </div>
    </div>
  )
}

export default ClaimEmissions
