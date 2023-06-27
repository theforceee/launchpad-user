import { ActivePools } from "./ActivePools"

export const TabPools = () => {
  return (
    <div className="w-full py-6 text-white">
      <div className="mb-4 flex justify-center gap-2">
        <div className="flex cursor-pointer rounded-lg bg-clr-purple-70 px-6 py-1 font-semibold capitalize text-textGray duration-300 ease-linear">
          Active
        </div>
        <div className="flex cursor-pointer rounded-lg bg-clr-purple-80 px-6 py-1 font-semibold capitalize text-white duration-300 ease-linear">
          Closed
        </div>
      </div>

      <div>
        <ActivePools />
      </div>
    </div>
  )
}
