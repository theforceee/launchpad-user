import React from "react"

type LayoutProps = {
  children: any
}
const MainDefaultLayout = (props: LayoutProps) => {
  return <div className="flex-1 bg-main">{props.children}</div>
}

export default MainDefaultLayout
