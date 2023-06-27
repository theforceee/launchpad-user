import BaseCard from "@components/Base/BaseCard"
import useFetch from "@hooks/useFetch"
import { getAllTags } from "@utils/index"
import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"

const UpcomingPools = () => {
  const [pools, setPools] = useState<any[]>([])
  const [tags, setTags] = useState<Array<any>>([])
  const [selectedTags, setSelectedTags] = useState<Array<string>>(["all"])

  const tagQuery = useMemo(() => {
    const haveAllTags = selectedTags.find((tag: string) => tag === "all")
    if (haveAllTags) return ""

    const realTags = selectedTags.filter((tag: string) => tag !== "all")
    return realTags.join(",")
  }, [selectedTags])

  const { data: resPools, mutate, loading } = useFetch<any>(`/pool/live?tags=${tagQuery}`)

  useEffect(() => {
    if (!resPools || resPools.status !== 200) return
    const poolData = resPools.data || []

    const allTags = getAllTags(poolData)
    setTags(allTags)
    setPools(poolData)
  }, [resPools])

  useEffect(() => {
    const timer = setTimeout(() => {
      mutate()
    }, 2000)
    return () => clearTimeout(timer)
  }, [mutate, selectedTags])

  const handleSelectTag = (tagValue: any) => {
    let newTags = [...selectedTags]
    if (newTags.includes(tagValue)) newTags = newTags.filter((item: string) => item !== tagValue)
    else newTags.push(tagValue)
    setSelectedTags(newTags)
  }

  return (
    <div className="container flex w-full flex-col !py-10">
      <div className="flex flex-1 flex-col items-center gap-4 text-white md:flex-row">
        <span className="text-28/36 font-bold">Live</span>
        <div className="flex flex-1 flex-wrap justify-center gap-2">
          {tags.map((item: any, index: number) => (
            <div
              className={clsx(
                "flex cursor-pointer rounded-lg px-5 py-2 capitalize text-white",
                selectedTags.includes(item) ? "bg-[#504FBE]" : "bg-[#151532]"
              )}
              key={index}
              onClick={() => handleSelectTag(item)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className=""></div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pools.map((item: any, index: number) => (
          <BaseCard cardData={item} key={index} />
        ))}
      </div>
    </div>
  )
}

export default UpcomingPools
