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
          className="btnGradientPurple btnMedium mt-2 !max-w-full cursor-pointer"
          onClick={handleClaimPrivate}
        >
          <span>CLAIM PRIVATE SALE TOKENS</span>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <span className="text-18/24 font-semibold">PUBLIC SALE TOKENS</span>
        <div className="mt-5">
          <EmissionTable emissions={emissions} />
        </div>
        <div
          className="btnGradientPurple btnMedium mt-2 !max-w-full  cursor-pointer"
          onClick={handleClaimPublic}
        >
          <span>CLAIM PUBLIC SALE TOKENS</span>
        </div>
      </div>
    </div>
  )
}

export default ClaimEmissions
