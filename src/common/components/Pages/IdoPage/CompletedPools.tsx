import { URLS } from "@constants/index"
import useFetch from "@hooks/useFetch"
import fakeLogo from "@images/fake-project-logo.png"
import { Tooltip } from "@material-tailwind/react"
import { formatCurrency, getAllTags } from "@utils/index"
import BigNumber from "bignumber.js"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

const CompletedPools = () => {
  const [pools, setPools] = useState<any[]>([])
  const [tags, setTags] = useState<Array<any>>([])
  const [selectedTags, setSelectedTags] = useState<Array<string>>(["all"])

  const tagQuery = useMemo(() => {
    const haveAllTags = selectedTags.find((tag: string) => tag === "all")
    if (haveAllTags) return ""

    const realTags = selectedTags.filter((tag: string) => tag !== "all")
    return realTags.join(",")
  }, [selectedTags])

  const { data: resPools, mutate, loading } = useFetch<any>(`/pool?status=ENDED&tags=${tagQuery}`)

  useEffect(() => {
    if (!resPools || resPools.status !== 200) return
    const poolData = resPools.data?.data || []

    const allTags = getAllTags(poolData)
    setTags(allTags)
    setPools(poolData)
  }, [resPools])

  const handleSelectTag = (tagValue: any) => {
    let newTags = [...selectedTags]
    if (newTags.includes(tagValue)) newTags = newTags.filter((item: string) => item !== tagValue)
    else newTags.push(tagValue)
    setSelectedTags(newTags)
  }

  const getTotalRaise = (cardData: any) => {
    if (!cardData?.pools) return 0
    const privatePool = cardData.pools[0]
    const publicPool = cardData.pools[1]

    const privateRaise = privatePool
      ? new BigNumber(privatePool.token_allocated ?? 0).multipliedBy(
          privatePool.conversion_rate ?? 0
        )
      : 0
    const publicRaise = publicPool
      ? new BigNumber(publicPool.token_allocated ?? 0).multipliedBy(publicPool.conversion_rate ?? 0)
      : 0

    return new BigNumber(privateRaise).plus(publicRaise).toNumber()
  }

  const getTokenPrice = (pool: any) => {
    if (!pool) return "-"
    const privatePool = pool.pools[0]
    const publicPool = pool.pools[1]
    const avgPrice = new BigNumber(privatePool?.conversion_rate || 0)
      .plus(publicPool?.conversion_rate || 0)
      .div(2)
      .toString()

    return `${avgPrice} ${pool.accepted_currency}`
  }

  return (
    <div className="container flex w-full flex-col !py-10">
      <div className="flex flex-1 flex-col items-center gap-4 text-white md:flex-row">
        <div className="flex flex-1 flex-col items-center gap-4 text-white md:flex-row">
          <span className="text-28/36 font-bold">Complete IDOs</span>
          <div className="flex flex-1 flex-wrap justify-center gap-2">
            {tags.map((item: any, index: number) => (
              <div
                key={index}
                className={clsx(
                  "flex cursor-pointer rounded-lg px-5 py-2 capitalize text-white",
                  selectedTags.includes(item) ? "bg-[#504FBE]" : "bg-[#151532]"
                )}
                onClick={() => handleSelectTag(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="btnGradientOrange btnMedium !w-fit !px-8">
          <span>Calendar view</span>
        </div>
      </div>

      <div className={clsx("mt-5 flex flex-col space-y-2")}>
        {pools.map((pool: any, index: number) => (
          <div
            className="flex flex-col gap-4 rounded-xl bg-[#151532] py-[14px] px-5 sm:flex-row"
            key={index}
          >
            <div className="flex w-[312px] items-center">
              <div className="flex h-[60px] w-[60px]">
                <Image src={fakeLogo} alt="" className="object-contain" />
              </div>
              <div className="ml-3 flex flex-1 flex-col">
                <Tooltip
                  className="bg-[#33344D]"
                  content={
                    <div className="p-1 text-12/18 text-[#F2F0FF]">
                      {pool?.name || `Project's name`}
                    </div>
                  }
                >
                  <div className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap text-18/24 font-semibold text-white">
                    {pool?.name || `Project's name`}
                  </div>
                </Tooltip>
                <div className="mt-1 text-14/18 text-textGray">
                  {pool?.token?.token_id || `$TOKEN`}
                </div>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-8 text-white md:grid-cols-4">
              <div className="flex flex-col justify-center">
                <span className="text-12/16 font-semibold text-textGray">{`TOTAL RAISED`}</span>
                <span className="mt-1">{formatCurrency(getTotalRaise(pool))}</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-12/16 font-semibold text-textGray">{`PARTICIPANTS`}</span>
                <span className="mt-1">{false ? formatCurrency("20000") : "-"}</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-12/16 font-semibold text-textGray">{`IDO PRICE`}</span>
                <span className="mt-1">{getTokenPrice(pool)}</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-12/16 font-semibold text-textGray">{`ATH SINCE IDO`}</span>
                <span className="mt-1">{false ? `+45%` : "-"}</span>
              </div>
            </div>

            <a
              href={`${URLS.IDO}/${pool?.slug}`}
              className="my-auto flex h-fit justify-center rounded-md border border-white px-10 py-[10px] text-14/18 font-semibold text-white"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompletedPools
