import React, { useEffect } from "react"

type IdoDetailPageProps = {
  poolDetail: any
  loading?: boolean
}

const IdoDetailPage = (props: IdoDetailPageProps) => {
  const { poolDetail, loading } = props

  useEffect(() => {
    console.log("IdoDetailPage", poolDetail, loading)
  }, [poolDetail, loading])

  return (
    <div className="blazePage section flex flex-col text-white">
      <div className="">IdoDetailPage</div>
      <div className="">{poolDetail?.name}</div>
    </div>
  )
}

export default IdoDetailPage
