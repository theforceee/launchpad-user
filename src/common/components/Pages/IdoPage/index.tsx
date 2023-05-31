import Card from "@components/Base/Card"
import useFetch from "@hooks/useFetch"
import React, { useEffect, useState } from "react"
import styles from "./ido.module.scss"
import clsx from "clsx"

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
      <div className={clsx(styles.list, "section w-full bg-gray-600")}>
        {pools.map((item: any, index: number) => (
          <Card cardData={item} key={index} />
        ))}
        {new Array(10).fill(1).map((item: any, index: number) => (
          <Card cardData={item} key={index} />
        ))}
      </div>
    </div>
  )
}

export default IdoPage
