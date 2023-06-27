import CompletedPools from "./CompletedPools"
import LivePools from "./LivePools"
import UpcomingPools from "./UpcomingPools"

const IdoPage = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="container">
        <div className="flex h-[600px] items-center justify-center bg-purple-600 text-white">
          Carousel
        </div>
      </div>

      <LivePools />

      <UpcomingPools />

      <CompletedPools />
    </div>
  )
}

export default IdoPage
