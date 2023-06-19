import React from "react"
import { formatCurrency } from "@utils/index"

const TABLE_HEAD = ["TIME", "TIME", "TOKENS"]

export type EmissionTypes = {
  claimTime: string
  tokenAmount: string
  status?: string | undefined
}

type EmissionTableProps = {
  emissions: Array<EmissionTypes>
}
const EmissionTable = ({ emissions }: EmissionTableProps) => {
  const displayNumOrder = (index: number) => {
    switch (index) {
      case 0:
        return "1st"
      case 1:
        return "2nd"
      case 2:
        return "3rd"
      default:
        return `${index + 1}th`
    }
  }

  return (
    <table className="w-full min-w-max table-auto border-separate border-spacing-y-[6px] text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="bg-transparent px-4 text-12/16 font-semibold text-textGray">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {emissions?.map(({ claimTime, tokenAmount, status }: EmissionTypes, index: number) => {
          return (
            <tr key={index} className="mb-1 bg-[#151532] text-14/18">
              <td className="rounded-tl-lg rounded-bl-lg p-4">
                <span className="">{displayNumOrder(index)}</span>
              </td>
              <td className="p-4">
                <span className="">{claimTime}</span>
              </td>
              <td className="rounded-tr-lg rounded-br-lg p-4">
                <span className="">{formatCurrency(tokenAmount)}</span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default EmissionTable
