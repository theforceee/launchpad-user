import Card from "@components/Base/Card"
import useFetch from "@hooks/useFetch"
import React, { useEffect, useState } from "react"
import styles from "./ido.module.scss"
import clsx from "clsx"

const tags = [
  { value: "all", label: "All" },
  { value: "gaming", label: "Gaming" },
  { value: "platform", label: "Platform" },
  { value: "tools", label: "Tools" },
  { value: "dao", label: "DAO" }
]

const IdoPage = () => {
  const [pools, setPools] = useState<any[]>([])
  const [shouldFetch, setShouldFetch] = useState<boolean>(true)

  const { data: resPool } = useFetch<any>(`/pool`, shouldFetch)

  useEffect(() => {
    if (!resPool || resPool.status !== 200) return

    console.log("resPool", resPool.data?.data)
    setPools(resPool.data?.data || [])
  }, [resPool])

  return (
    <div className="flex w-full flex-col">
      <div className="blazePage section !p-0">
        <div className="flex h-[600px] items-center justify-center bg-purple-600 text-white">
          Carousel
        </div>
      </div>
      <div className="section flex w-full flex-col !py-10">
        <div className="flex items-center justify-between text-white">
          <span className="text-28/36 font-bold">Upcoming IDOs</span>
          <div className="flex space-x-1">
            {tags.map((item: any, index: number) => (
              <div
                className={clsx(
                  "flex cursor-pointer rounded-lg px-5 py-2 text-white",
                  index === 0 ? "bg-[#504FBE]" : "bg-[#151532]"
                )}
                key={index}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="btnGradient !w-fit !px-8">Calendar view</div>
        </div>
        <div className={clsx(styles.list, "mt-5")}>
          {pools.map((item: any, index: number) => (
            <Card cardData={item} key={index} />
          ))}
          {new Array(10).fill(1).map((item: any, index: number) => (
            <Card cardData={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default IdoPage
