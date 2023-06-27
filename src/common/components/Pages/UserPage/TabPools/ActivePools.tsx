import { LiveIcon } from "@/assets/icons/live-icon"

export function ActivePools() {
  return (
    <div>
      <div className="mb-2 text-center font-poppins text-24/32 font-semibold">Active pools</div>
      <div className="max-h- pretty-scrollbar overflow-auto">
        <table className="w-full table-auto border-separate border-spacing-y-[6px]">
          <thead>
            <tr className="h-[40px] min-h-[40px] text-left font-poppins text-12/16 text-clr-purple-30">
              <th className="w-[80px] min-w-[80px]"></th>
              <th className="w-[160px] min-w-[160px]">Start</th>
              <th className="w-[100px] min-w-[100px]">Pool type</th>
              <th className="w-[200px] min-w-[200px]">Project name</th>
              <th className="w-[200px] min-w-[200px]">Status</th>
              <th className="w-[80px] min-w-[80px]">Tier</th>
              <th className="w-[100px] min-w-[100px]">Allocation</th>
              <th className="w-[100px] min-w-[100px]">Claimed</th>
              <th className="w-[100px] min-w-[100px]"></th>
            </tr>
          </thead>

          <tbody className="text-14/18">
            {Array(20)
              .fill(0)
              .map((_, idx) => (
                <tr key={idx}>
                  <td className="rounded-tl-lg rounded-bl-lg bg-clr-purple-70 text-clr-green-70">
                    <div className="flex items-center justify-center gap-1">
                      <LiveIcon /> Live
                    </div>
                  </td>
                  <td className="bg-clr-purple-70">16/06/23 20:00 UTC</td>
                  <td className="bg-clr-purple-70">
                    <div className="w-fit rounded-xl bg-clr-green-20 px-3 py-1 font-semibold text-clr-green-70">
                      IDO
                    </div>
                  </td>
                  <td className="bg-clr-purple-70">Project X</td>
                  <td className="bg-clr-purple-70">Private sale WL</td>
                  <td className="bg-clr-purple-70">Tier</td>
                  <td className="bg-clr-purple-70">16,800/18,000</td>
                  <td className="bg-clr-purple-70">-</td>
                  <td className="flex h-[52px] min-h-[52px] items-center justify-end rounded-tr-lg rounded-br-lg bg-clr-purple-70 pr-4">
                    <button className="rounded-lg border px-4 py-2 font-poppins text-14/18 font-semibold">
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
